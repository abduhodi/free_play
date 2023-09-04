import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const GetProfileIdFromCookie = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    const profileId = req.cookies[data];
    if (!profileId) {
      throw new ForbiddenException('Token is not provided');
    }
    return profileId;
  },
);
