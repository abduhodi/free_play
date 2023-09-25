import { Module } from '@nestjs/common';
import { FilmActorsService } from './film_actors.service';
import { FilmActorsController } from './film_actors.controller';

@Module({
  controllers: [FilmActorsController],
  providers: [FilmActorsService],
})
export class FilmActorsModule {}
