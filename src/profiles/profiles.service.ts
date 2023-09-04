import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto, userId: number) {
    const count = await this.prisma.profile.count({
      where: { userId },
    });
    if (count > 5) {
      throw new ForbiddenException('Profile limit reached');
    }
    const profile = await this.prisma.profile.create({
      data: { ...createProfileDto, userId },
    });
    if (count < 1) {
      await this.prisma.profile.update({
        where: { id: profile.id },
        data: { isMain: true },
      });
    }
    return { message: 'Profile create success' };
  }

  getUserProfiles(userId: number) {
    return this.prisma.profile.findMany({ where: { userId } });
  }

  getUserSingleProfile(userId: number, profileId: number) {
    return this.prisma.profile.findFirst({
      where: { id: profileId, userId },
      include: { user: true },
    });
  }

  deleteUserProfile(userId: number, profileId: number) {
    return this.prisma.profile.delete({
      where: { id: profileId, userId },
      include: { user: true },
    });
  }

  updateUserProfile(
    userId: number,
    profileId: number,
    updateProfileDto: UpdateProfileDto,
  ) {
    return this.prisma.profile.update({
      where: { id: profileId, userId },
      include: { user: true },
      data: updateProfileDto,
    });
  }

  async selectProfile(userId: number, profileId: number, res: Response) {
    const profile = await this.prisma.profile.findFirst({
      where: { id: profileId, userId },
      include: { user: true },
    });
    if (!profile) throw new NotFoundException('Profile is not found');
    res.cookie('free_play_profile_id', profile.id);
    return { message: 'Selected profile: ' + profile.username };
  }
}
