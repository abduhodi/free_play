import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as otpGeneator from 'otp-generator';
import { RedisService } from '../redis/redis.service';
import { MailService } from '../mail/mail.service';
import { SmsService } from '../sms/sms.service';
import { User } from '@prisma/client';
import { RefreshJwtPayload } from '../types';
import { UpdateLoginDto } from '../admins/dto/update-login.dto';
import { UpdatePasswordDto } from '../admins/dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private readonly smsService: SmsService,
  ) {}

  //create new user
  async create(createUserDto: CreateUserDto, res: Response) {
    //searching user with given login
    const user = await this.prisma.user.findUnique({
      where: { login: createUserDto.login },
    });
    //checking user is exists and it is active or not
    let newUser: User;
    let hashedPassword: string;
    if (user) {
      if (user.isActive) {
        throw new NotAcceptableException('user is already exists');
      }
      //hashing password
      hashedPassword = await bcrypt.hash(createUserDto.password, 7);
      //creating new user
      newUser = await this.prisma.user.update({
        where: { login: createUserDto.login },
        data: {
          password: hashedPassword,
        },
      });
    } else {
      //hashing password
      hashedPassword = await bcrypt.hash(createUserDto.password, 7);
      //creating new user
      newUser = await this.prisma.user.create({
        data: {
          login: createUserDto.login,
          password: hashedPassword,
        },
      });
    }
    //generating token
    const refresh = await this.generateRefreshToken(
      newUser.id,
      newUser.isActive,
    );
    const access = await this.generateAccessToken(newUser.id, newUser.isActive);
    //hashing generated token
    const hashedToken = await bcrypt.hash(refresh, 7);
    //updating user's token field
    await this.prisma.user.update({
      where: { id: newUser.id },
      data: { refreshToken: hashedToken },
    });
    //generating one-time-password
    const otp = otpGeneator.generate(6, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    //setting otp to the redis cloud
    await this.redisService.set({ key: newUser.id.toString(), value: otp });
    await this.redisService.set({
      key: newUser.id.toString() + '_count',
      value: '0',
    });
    // checking login is email or phone
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      createUserDto.login,
    );
    const isPhone = /^\+998\d{9}$/.test(createUserDto.login);
    let message: string;
    if (isEmail) {
      //send otp to the email address.
      await this.mailService.sendConfirmationMail(newUser.login, otp);
      message =
        'Code has been send to ' + createUserDto.login.slice(0, 5) + '*****';
    } else if (isPhone) {
      //send otp to the phone number.
      const resp = await this.smsService.sendSms(newUser.login.slice(1), otp);
      if (resp.status !== 200)
        throw new ServiceUnavailableException("Otp jo'natilmadi");
      message =
        'Code has been send to *****' +
        createUserDto.login.slice(createUserDto.login.length - 4);
    }
    res.cookie('free_play_key', refresh, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    return {
      message,
      token: access,
    };
  }

  async signin(createUserDto: CreateUserDto, res: Response) {
    //searching user with given login
    const user = await this.prisma.user.findUnique({
      where: { login: createUserDto.login },
    });
    //checking user is exists and it is active or not
    if (!user) {
      throw new NotFoundException('login or password is incorrect');
    }
    const isMatched = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );
    if (!isMatched) {
      throw new NotFoundException('login or password is incorrect');
    }
    //generating token
    const refresh = await this.generateRefreshToken(user.id, user.isActive);
    const access = await this.generateAccessToken(user.id, user.isActive);
    //hashing generated token
    const hashedToken = await bcrypt.hash(refresh, 7);
    //updating user's token field
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedToken },
    });

    res.cookie('free_play_key', refresh, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      message: 'Signin success',
      token: access,
    };
  }

  async generateRefreshToken(id: number, isActive: boolean) {
    return this.jwtService.sign(
      { id, isActive },
      {
        expiresIn: process.env.REFRESH_TOKEN_TIME,
        secret: process.env.REFRESH_TOKEN_SECRET,
      },
    );
  }

  async generateAccessToken(id: number, isActive: boolean) {
    return this.jwtService.sign(
      { id, isActive },
      {
        expiresIn: process.env.ACCESS_TOKEN_TIME,
        secret: process.env.ACCESS_TOKEN_SECRET,
      },
    );
  }

  async verifyUser(id: number, otp: string) {
    const attempt = await this.redisService.count(id.toString() + '_count');
    if (attempt > 3) {
      throw new ForbiddenException('Too many attempts. Please try again later');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new ForbiddenException('Invalid token');
    const userOtp = await this.redisService.get(id.toString());
    if (userOtp !== otp) {
      throw new NotFoundException('otp is not matched');
    }
    await this.redisService.del(id.toString());
    await this.redisService.del(id.toString() + '_count');
    await this.prisma.user.update({ where: { id }, data: { isActive: true } });
    return { status: 'OK', message: 'Verified successfully' };
  }

  async refreshTokens(token: string, res: Response) {
    let decoded: RefreshJwtPayload;
    try {
      decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (error) {
      //TODO delete user's tokens
      throw new ForbiddenException('Redirecting to the login page');
    }
    const { id } = decoded;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new ForbiddenException(
        'Your device has been blocked by our privacy',
      );
    }
    const isMatched = await bcrypt.compare(token, user.refreshToken);
    if (!isMatched) {
      throw new ForbiddenException(
        'Your device has been blocked by our privacy',
      );
    }
    const refresh = await this.generateRefreshToken(user.id, user.isActive);
    const access = await this.generateAccessToken(user.id, user.isActive);
    const hashedToken = await bcrypt.hash(refresh, 7);
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: hashedToken },
    });
    res.cookie('free_play_key', refresh, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { message: 'Refresh tokens success', token: access };
  }

  async signout(id: number, res: Response) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new ForbiddenException(
        'Your device has been blocked by our privacy',
      );
    }
    res.clearCookie('free_play_key');
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });
    return { message: 'Signout success' };
  }

  async getAllUsers() {
    return this.prisma.user.findMany({});
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async deleteUserAccount(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async updateUserLogin(id: number, updateLoginDto: UpdateLoginDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('User is not exists');
    const existLogin = await this.prisma.user.findUnique({
      where: { login: updateLoginDto.login },
    });
    if (existLogin) throw new BadRequestException('Login is already exists');
    //TODO verify with otp
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateLoginDto,
    });
    return { message: 'Update Login success', updatedUser };
  }

  async updateUserPassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('User is not exists');
    const { confirmPassword, newPassword, oldPassword } = updatePasswordDto;
    if (confirmPassword !== newPassword)
      throw new BadRequestException('Confirm password is not matched');
    if (!(await bcrypt.compare(oldPassword, user.password)))
      throw new BadRequestException('Password is not matched');
    const hashedPassword = await bcrypt.hash(newPassword, 7);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    return { message: 'Update Password success', updatedUser };
  }
}
