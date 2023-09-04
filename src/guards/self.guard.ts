import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const id = req?.params?.id;

    if (req.user.id !== +id) throw new ForbiddenException('You are not allow');
    return true;
  }
}
