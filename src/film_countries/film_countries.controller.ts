import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmCountriesService } from './film_countries.service';
import { CreateFilmCountryDto } from './dto/create-film_country.dto';
import { UpdateFilmCountryDto } from './dto/update-film_country.dto';

@Controller('film-countries')
export class FilmCountriesController {
  constructor(private readonly filmCountriesService: FilmCountriesService) {}

  @Post()
  create(@Body() createFilmCountryDto: CreateFilmCountryDto) {
    return this.filmCountriesService.create(createFilmCountryDto);
  }

  @Get()
  findAll() {
    return this.filmCountriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmCountriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmCountryDto: UpdateFilmCountryDto) {
    return this.filmCountriesService.update(+id, updateFilmCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmCountriesService.remove(+id);
  }
}
