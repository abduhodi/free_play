import { Injectable } from '@nestjs/common';
import { CreateCollectoinFilmDto } from './dto/create-collectoin_film.dto';
import { UpdateCollectoinFilmDto } from './dto/update-collectoin_film.dto';

@Injectable()
export class CollectoinFilmsService {
  create(createCollectoinFilmDto: CreateCollectoinFilmDto) {
    return 'This action adds a new collectoinFilm';
  }

  findAll() {
    return `This action returns all collectoinFilms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectoinFilm`;
  }

  update(id: number, updateCollectoinFilmDto: UpdateCollectoinFilmDto) {
    return `This action updates a #${id} collectoinFilm`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectoinFilm`;
  }
}
