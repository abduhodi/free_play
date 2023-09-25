import { Test, TestingModule } from '@nestjs/testing';
import { CollectoinsController } from './collectoins.controller';
import { CollectoinsService } from './collectoins.service';

describe('CollectoinsController', () => {
  let controller: CollectoinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectoinsController],
      providers: [CollectoinsService],
    }).compile();

    controller = module.get<CollectoinsController>(CollectoinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
