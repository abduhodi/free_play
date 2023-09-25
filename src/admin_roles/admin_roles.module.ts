import { Module } from '@nestjs/common';
import { AdminRolesService } from './admin_roles.service';
import { AdminRolesController } from './admin_roles.controller';

@Module({
  controllers: [AdminRolesController],
  providers: [AdminRolesService],
})
export class AdminRolesModule {}
