import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FilmGenresService } from './film_genres.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Film_Genres')
@Controller('film-genres')
export class FilmGenresController {
  constructor(private readonly filmGenresService: FilmGenresService) {}

  @ApiOperation({ summary: 'get-all-genres-films' })
  @Get()
  findAll() {
    return this.filmGenresService.findAll();
  }

  @ApiOperation({ summary: 'get-genre-all-films' })
  @Get('get-genre-films/:id')
  findOneGenreFilms(@Param('id', ParseIntPipe) genreId: number) {
    return this.filmGenresService.getGenreFilms(genreId);
  }

  @ApiOperation({ summary: 'get-film-all-genres' })
  @Get('get-film-genres/:id')
  findOneFilmGenres(@Param('id', ParseIntPipe) filmId: number) {
    return this.filmGenresService.getFilmGenres(filmId);
  }
}
