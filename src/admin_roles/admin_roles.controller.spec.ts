import { Test, TestingModule } from '@nestjs/testing';
import { AdminRolesController } from './admin_roles.controller';
import { AdminRolesService } from './admin_roles.service';

describe('AdminRolesController', () => {
  let controller: AdminRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminRolesController],
      providers: [AdminRolesService],
    }).compile();

    controller = module.get<AdminRolesController>(AdminRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
