import { Test, TestingModule } from '@nestjs/testing';
import { FilmCountriesController } from './film_countries.controller';
import { FilmCountriesService } from './film_countries.service';

describe('FilmCountriesController', () => {
  let controller: FilmCountriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmCountriesController],
      providers: [FilmCountriesService],
    }).compile();

    controller = module.get<FilmCountriesController>(FilmCountriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
