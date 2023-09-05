import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessJwtPayload } from '../types';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class CheckLoggedInStrategy extends PassportStrategy(
  Strategy,
  'logged-in-check',
) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AccessJwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user || !user?.refreshToken)
      throw new ForbiddenException('You are not logged in yet');
    const token = req.cookies['free_play_key'];
    if (!token) throw new ForbiddenException('Login required');
    const match = await bcrypt.compare(token, user.refreshToken);
    if (!match) throw new ForbiddenException('Login required');
    // const profileId = req.cookies['free_play_profile_id'];
    // if (!profileId) throw new ForbiddenException('checkout profile required');
    return payload;
  }
}
