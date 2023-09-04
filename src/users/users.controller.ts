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
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetTokenFromCookie, GetUserId, Public } from '../decorators';
import { Response } from 'express';
import {
  AccessJwtGuard,
  ActiveUserGuard,
  CheckLoggedInGuard,
  RefreshJwtGuard,
  SelfGuard,
} from '../guards';
import { CreateUserDto, VerifyUserDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(AccessJwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'sign-up' })
  @Public()
  @Post('sign-up') //user sign-up
  async signup(
    @Body() signupDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.create(signupDto, res);
  }

  @ApiOperation({ summary: 'sign-in' })
  @Public()
  @Post('sign-in') //user sign-in
  async signin(
    @Body() signinDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.signin(signinDto, res);
  }

  @ApiOperation({ summary: 'verify-account' })
  @Post('verify') //verify otp
  async verify(@GetUserId() id: number, @Body() verifyDto: VerifyUserDto) {
    return this.usersService.verifyUser(id, verifyDto.otp.toString());
  }

  @ApiOperation({ summary: 'refresh-tokens' })
  @UseGuards(ActiveUserGuard, CheckLoggedInGuard)
  @Post('refresh') //verify otp
  async refresh(
    @GetTokenFromCookie('free_play_key') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshTokens(token, res);
  }

  @ApiOperation({ summary: 'sign-out' })
  @Public()
  @UseGuards(RefreshJwtGuard, ActiveUserGuard)
  @Post('sign-out') //verify otp
  async signout(
    @GetUserId() id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.signout(id, res);
  }

  @ApiOperation({ summary: 'get-user-by-id' })
  @UseGuards(ActiveUserGuard, CheckLoggedInGuard)
  @Get('account-info')
  getUserById(@GetUserId() id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'delete-user-account' })
  @UseGuards(ActiveUserGuard, CheckLoggedInGuard, SelfGuard)
  @Delete('delete-account/:id')
  deleteUserAccount(
    @Param('id', ParseIntPipe) id: number,
    @GetUserId() userId: number,
  ) {
    return this.usersService.deleteUserAccount(id);
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
