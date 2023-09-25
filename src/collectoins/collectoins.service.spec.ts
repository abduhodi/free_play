import { Test, TestingModule } from '@nestjs/testing';
import { CollectoinsService } from './collectoins.service';

describe('CollectoinsService', () => {
  let service: CollectoinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectoinsService],
    }).compile();

    service = module.get<CollectoinsService>(CollectoinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
