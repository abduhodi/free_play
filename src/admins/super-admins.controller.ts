import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AccessJwtGuard, SuperAdminGuard } from '../guards';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('SuperAdmin')
@Controller('super-admins')
@UseGuards(AccessJwtGuard, SuperAdminGuard)
export class SuperAdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'create-admin' })
  @Post('create-admin')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.createAdmin(createAdminDto);
  }

  @ApiOperation({ summary: 'get-all-admins' })
  @Get('get-all-admins')
  findAllAdmins() {
    return this.adminsService.findAllAdmins();
  }

  @ApiOperation({ summary: 'get-any-admin-by-id' })
  @Get('get-admin/:id')
  findOneAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.findAdmin(id);
  }

  @ApiOperation({ summary: 'update-any-admin-by-id' })
  @Patch('update-admin/:id')
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminsService.updateAdmin(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'upgrade-admin-to-superAdmin' })
  @Patch('upgrade-admin/:id')
  updateAdminToSuper(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.updateAdminSuper(id);
  }

  @ApiOperation({ summary: 'delete-any-admin-by-id' })
  @Delete('delete-admin/:id')
  removeAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.removeAdmin(id);
  }
}
