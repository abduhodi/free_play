import { Module } from '@nestjs/common';
import { FilmCountriesService } from './film_countries.service';
import { FilmCountriesController } from './film_countries.controller';

@Module({
  controllers: [FilmCountriesController],
  providers: [FilmCountriesService],
})
export class FilmCountriesModule {}
