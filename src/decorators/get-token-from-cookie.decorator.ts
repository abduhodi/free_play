import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const GetTokenFromCookie = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.cookies[data];
    if (!token) {
      throw new ForbiddenException('Token is not provided');
    }
    return token;
  },
);
