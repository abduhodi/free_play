import { Injectable } from '@nestjs/common';
import { CreateFilmCountryDto } from './dto/create-film_country.dto';
import { UpdateFilmCountryDto } from './dto/update-film_country.dto';

@Injectable()
export class FilmCountriesService {
  create(createFilmCountryDto: CreateFilmCountryDto) {
    return 'This action adds a new filmCountry';
  }

  findAll() {
    return `This action returns all filmCountries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filmCountry`;
  }

  update(id: number, updateFilmCountryDto: UpdateFilmCountryDto) {
    return `This action updates a #${id} filmCountry`;
  }

  remove(id: number) {
    return `This action removes a #${id} filmCountry`;
  }
}
