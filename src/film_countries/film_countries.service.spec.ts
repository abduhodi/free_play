import { Test, TestingModule } from '@nestjs/testing';
import { FilmCountriesService } from './film_countries.service';

describe('FilmCountriesService', () => {
  let service: FilmCountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmCountriesService],
    }).compile();

    service = module.get<FilmCountriesService>(FilmCountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
