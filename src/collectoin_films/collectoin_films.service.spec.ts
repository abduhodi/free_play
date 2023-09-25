import { Test, TestingModule } from '@nestjs/testing';
import { CollectoinFilmsService } from './collectoin_films.service';

describe('CollectoinFilmsService', () => {
  let service: CollectoinFilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectoinFilmsService],
    }).compile();

    service = module.get<CollectoinFilmsService>(CollectoinFilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
