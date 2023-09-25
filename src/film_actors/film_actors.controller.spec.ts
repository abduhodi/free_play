import { Test, TestingModule } from '@nestjs/testing';
import { FilmActorsController } from './film_actors.controller';
import { FilmActorsService } from './film_actors.service';

describe('FilmActorsController', () => {
  let controller: FilmActorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmActorsController],
      providers: [FilmActorsService],
    }).compile();

    controller = module.get<FilmActorsController>(FilmActorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
