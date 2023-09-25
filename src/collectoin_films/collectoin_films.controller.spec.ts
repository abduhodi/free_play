import { Test, TestingModule } from '@nestjs/testing';
import { CollectoinFilmsController } from './collectoin_films.controller';
import { CollectoinFilmsService } from './collectoin_films.service';

describe('CollectoinFilmsController', () => {
  let controller: CollectoinFilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectoinFilmsController],
      providers: [CollectoinFilmsService],
    }).compile();

    controller = module.get<CollectoinFilmsController>(CollectoinFilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
