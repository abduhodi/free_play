import { Test, TestingModule } from '@nestjs/testing';
import { FilmActorsService } from './film_actors.service';

describe('FilmActorsService', () => {
  let service: FilmActorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmActorsService],
    }).compile();

    service = module.get<FilmActorsService>(FilmActorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
