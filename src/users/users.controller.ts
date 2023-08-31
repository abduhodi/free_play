import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetTokenFromCookie, GetUserId, Public } from '../decorators';
import { Response } from 'express';
import { AccessJwtGuard, RefreshJwtGuard } from '../guards';
import { CreateUserDto, VerifyUserDto } from './dto';

@UseGuards(AccessJwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('sign-up') //user sign-up
  async signup(
    @Body() signupDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.create(signupDto, res);
  }

  @Public()
  @Post('sign-in') //user sign-in
  async signin(
    @Body() signinDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.signin(signinDto, res);
  }

  @Post('verify') //verify otp
  async verify(@GetUserId() id: number, @Body() verifyDto: VerifyUserDto) {
    return this.usersService.verifyUser(id, verifyDto.otp.toString());
  }

  @Post('refresh') //verify otp
  async refresh(
    @GetTokenFromCookie('free_play_key') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshTokens(token, res);
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('sign-out') //verify otp
  async signout(
    @GetUserId() id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.signout(id, res);
  }

  // @Get('settings')
  // settings(@Body() signinDto: CreateUserDto) {
  //   return this.usersService.create(signinDto);
  // }

  // @Post('settings/change-password')
  // changePassword(@Body() signinDto: CreateUserDto) {
  //   return this.usersService.create(signinDto);
  // }

  // @Post('settings/change-login')
  // changeLogin(@Body() signinDto: CreateUserDto) {
  //   return this.usersService.create(signinDto);
  // }

  // @Get('payment-history')
  // paymentAndHistory(@Body() signinDto: CreateUserDto) {
  //   return this.usersService.create(signinDto);
  // }

  // @Get('subscriptions')
  // subscriptions(@Body() signinDto: CreateUserDto) {
  //   return this.usersService.create(signinDto);
  // }

  // @Get('sessions')
  // sessions(@Body() signinDto: CreateUserDto) {
  //   return this.usersService.create(signinDto);
  // }
}
