import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RefreshJwtPayload } from '../types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AdminsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { login: createAdminDto.login },
    });
    if (admin) throw new BadRequestException('login is already exists');
    const hashedPassword = await bcrypt.hash(createAdminDto.login, 7);
    const newAdmin = await this.prisma.admin.create({
      data: { login: createAdminDto.login, password: hashedPassword },
    });
    return { message: 'Create success', newAdmin };
  }

  async findAllAdmins() {
    const admins = await this.prisma.admin.findMany();
    return { admins };
  }

  async signin(createAdminDto: LoginDto, res: Response) {
    //searching admin with given login
    const admin = await this.prisma.admin.findUnique({
      where: { login: createAdminDto.login },
    });
    //checking admin is exists and it is active or not
    if (!admin) {
      throw new NotFoundException('login or password is incorrect');
    }
    const isMatched = await bcrypt.compare(
      createAdminDto.password,
      admin.password,
    );
    if (!isMatched) {
      throw new NotFoundException('login or password is incorrect');
    }
    //generating token
    const refresh = await this.generateRefreshToken(admin.id, admin.isActive);
    const access = await this.generateAccessToken(admin.id, admin.isActive);
    //hashing generated token
    const hashedToken = await bcrypt.hash(refresh, 7);
    //updating admin's token field
    await this.prisma.admin.update({
      where: { id: admin.id },
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

  async findAdmin(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    return { admin };
  }

  async updateAdminSuper(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new BadRequestException('Admin is not exists');
    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data: { isSuper: true },
    });
    return { message: 'Update to Super Admin success', updatedAdmin };
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new BadRequestException('Admin is not exists');
    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
    return { message: 'Update Login success', updatedAdmin };
  }

  async updateAdminLogin(id: number, updateLoginDto: UpdateLoginDto) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new BadRequestException('Admin is not exists');
    const existLogin = await this.prisma.admin.findFirst({
      where: { login: updateLoginDto.login },
    });
    if (existLogin) throw new BadRequestException('Login is already exists');
    //TODO verify with otp
    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data: updateLoginDto,
    });
    return { message: 'Update Login success', updatedAdmin };
  }

  async updateAdminPassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new BadRequestException('Admin is not exists');
    const { confirmPassword, newPassword, oldPassword } = updatePasswordDto;
    if (confirmPassword !== newPassword)
      throw new BadRequestException('Confirm password is not matched');
    if (!(await bcrypt.compare(oldPassword, admin.password)))
      throw new BadRequestException('Password is not matched');
    const hashedPassword = await bcrypt.hash(newPassword, 7);
    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data: { password: hashedPassword },
    });
    return { message: 'Update Password success', updatedAdmin };
  }

  async removeAdmin(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new BadRequestException('Admin is not exists');
    await this.prisma.admin.delete({ where: { id } });
    return { message: 'Delete success' };
  }

  async refreshTokens(token: string, res: Response) {
    let decoded: RefreshJwtPayload;
    try {
      decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (error) {
      //TODO delete admin's tokens
      res.clearCookie('free_play_key');
      console.log(error);
      throw new ForbiddenException('Redirecting to the login page');
    }
    const { id } = decoded;
    if (typeof id !== 'number') throw new ForbiddenException('Invalid token');
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      throw new ForbiddenException(
        'Your device has been blocked by our privacy',
      );
    }
    const isMatched = await bcrypt.compare(token, admin.refreshToken);
    if (!isMatched) {
      throw new ForbiddenException(
        'Your device has been blocked by our privacy',
      );
    }
    const refresh = await this.generateRefreshToken(admin.id, admin.isActive);
    const access = await this.generateAccessToken(admin.id, admin.isActive);
    const hashedToken = await bcrypt.hash(refresh, 7);
    await this.prisma.admin.update({
      where: { id },
      data: { refreshToken: hashedToken },
    });
    res.cookie('free_play_key', refresh, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { message: 'Refresh tokens success', token: access };
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

  async signout(id: number, res: Response) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      throw new ForbiddenException(
        'Your device has been blocked by our privacy',
      );
    }
    res.clearCookie('free_play_key');
    await this.prisma.admin.update({
      where: { id },
      data: { refreshToken: null },
    });
    return { message: 'Signout success' };
  }
}
