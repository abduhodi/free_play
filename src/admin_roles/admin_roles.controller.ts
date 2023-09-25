import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminRolesService } from './admin_roles.service';
import { CreateAdminRoleDto } from './dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin_role.dto';

@Controller('admin-roles')
export class AdminRolesController {
  constructor(private readonly adminRolesService: AdminRolesService) {}

  @Post()
  create(@Body() createAdminRoleDto: CreateAdminRoleDto) {
    return this.adminRolesService.create(createAdminRoleDto);
  }

  @Get()
  findAll() {
    return this.adminRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminRoleDto: UpdateAdminRoleDto) {
    return this.adminRolesService.update(+id, updateAdminRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminRolesService.remove(+id);
  }
}
