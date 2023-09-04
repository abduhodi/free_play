import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req?.user?.isActive)
      throw new ForbiddenException('Activate your account please');
    const admin = await this.prisma.admin.findUnique({
      where: { id: req?.user?.id },
    });
    if (!admin) throw new ForbiddenException('Admin root required');
    if (!admin.refreshToken) throw new ForbiddenException('Login required');
    if (!admin.isSuper)
      throw new ForbiddenException('Super Admin root required');
    return true;
  }
}
