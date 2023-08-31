import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { AccessJwtPayload, RefreshJwtPayload } from '../types';

export const GetUserId = createParamDecorator(
  (_: any, context: ExecutionContext): number => {
    const req = context.switchToHttp().getRequest();
    const payload = req.user as AccessJwtPayload | RefreshJwtPayload;
    if (!payload) throw new ForbiddenException('Invalid token');
    return payload.id;
  },
);
