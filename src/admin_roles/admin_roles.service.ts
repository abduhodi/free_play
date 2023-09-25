import { Injectable } from '@nestjs/common';
import { CreateAdminRoleDto } from './dto/create-admin_role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin_role.dto';

@Injectable()
export class AdminRolesService {
  create(createAdminRoleDto: CreateAdminRoleDto) {
    return 'This action adds a new adminRole';
  }

  findAll() {
    return `This action returns all adminRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminRole`;
  }

  update(id: number, updateAdminRoleDto: UpdateAdminRoleDto) {
    return `This action updates a #${id} adminRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminRole`;
  }
}
