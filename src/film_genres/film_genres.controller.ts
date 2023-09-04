import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FilmGenresService } from './film_genres.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessJwtGuard, AdminGuard } from '../guards';
import { UpdateFilmGenreDto } from './dto/update-film_genre.dto';

@ApiTags('Film_Genres')
@Controller('film-genres')
export class FilmGenresController {
  constructor(private readonly filmGenresService: FilmGenresService) {}

  @ApiOperation({ summary: 'get-all-genres-films' })
  @UseGuards(AccessJwtGuard, AdminGuard)
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

  @ApiOperation({ summary: 'update-film-genres' })
  @UseGuards(AccessJwtGuard, AdminGuard)
  @Patch(':id')
  updateFilmGenre(
    @Param('id', ParseIntPipe) filmId: number,
    @Body() updateFilmGenreDto: UpdateFilmGenreDto,
  ) {
    return this.filmGenresService.update(filmId, updateFilmGenreDto);
  }

  @ApiOperation({ summary: 'delete-film-genres' })
  @UseGuards(AccessJwtGuard, AdminGuard)
  @Delete(':id')
  deleteFilmGenre(@Param('id', ParseIntPipe) filmId: number) {
    return this.filmGenresService.remove(filmId);
  }
}
