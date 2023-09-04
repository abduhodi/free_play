import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetUserId } from '../decorators';
import { AccessJwtGuard, CheckLoggedInGuard, ActiveUserGuard } from '../guards';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Response } from 'express';

@ApiTags('Profile')
@Controller('profiles')
@UseGuards(AccessJwtGuard, ActiveUserGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(CheckLoggedInGuard)
  @ApiOperation({ summary: 'add-new-profile' })
  @Post('add-profile')
  create(
    @Body() createProfileDto: CreateProfileDto,
    @GetUserId() userId: number,
  ) {
    return this.profilesService.create(createProfileDto, userId);
  }

  @UseGuards(CheckLoggedInGuard)
  @ApiOperation({ summary: 'get-all-own-profiles' })
  @Get('profiles')
  getAllProfiles(@GetUserId() userId: number) {
    return this.profilesService.getUserProfiles(userId);
  }

  @UseGuards(CheckLoggedInGuard)
  @ApiOperation({ summary: 'get-own-profile-by-id' })
  @Get('profile/:id')
  getProfile(
    @Param('id', ParseIntPipe) profileId: number,
    @GetUserId() userId: number,
  ) {
    return this.profilesService.getUserSingleProfile(userId, profileId);
  }

  @UseGuards(CheckLoggedInGuard)
  @ApiOperation({ summary: 'delete-own-profile-by-id' })
  @Delete('profile/:id')
  deleteProfile(
    @Param('id', ParseIntPipe) profileId: number,
    @GetUserId() userId: number,
  ) {
    return this.profilesService.deleteUserProfile(userId, profileId);
  }

  @UseGuards(CheckLoggedInGuard)
  @ApiOperation({ summary: 'update-own-profile-by-id' })
  @Patch('profile/:id')
  updateProfile(
    @Param('id', ParseIntPipe) profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
    @GetUserId() userId: number,
  ) {
    return this.profilesService.updateUserProfile(
      userId,
      profileId,
      updateProfileDto,
    );
  }

  @ApiOperation({ summary: 'select-profile' })
  @Get('select-profile/:id')
  selectProfile(
    @Param('id', ParseIntPipe) profileId: number,
    @GetUserId() userId: number,
    res: Response,
  ) {
    return this.profilesService.selectProfile(userId, profileId, res);
  }
}
