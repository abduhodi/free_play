import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFilmGenreDto } from './dto/create-film_genre.dto';
import { UpdateFilmGenreDto } from './dto/update-film_genre.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilmGenresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmGenreDto: CreateFilmGenreDto) {
    const isExist = await this.prisma.film_Genres.findFirst({
      where: {
        filmId: createFilmGenreDto.filmId,
        genreId: createFilmGenreDto.genreId,
      },
    });
    if (isExist) throw new BadRequestException('Genre is already part of film');
    return this.prisma.film_Genres.create({ data: createFilmGenreDto });
  }

  async findAll() {
    return this.prisma.film_Genres.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.film_Genres.findMany({ where: { id } });
  }

  async update(id: number, updateFilmGenreDto: UpdateFilmGenreDto) {
    return this.prisma.film_Genres.update({
      where: { id },
      data: updateFilmGenreDto,
    });
  }

  async getFilmGenres(filmId: number) {
    return this.prisma.film_Genres.findMany({
      where: { filmId },
      select: { genre: true },
    });
  }

  async getGenreFilms(genreId: number) {
    return this.prisma.film_Genres.findMany({
      where: { genreId },
      select: { film: true },
    });
  }

  async remove(id: number) {
    return this.prisma.film_Genres.delete({ where: { id } });
  }
}
