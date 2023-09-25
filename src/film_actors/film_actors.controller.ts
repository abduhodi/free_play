import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmActorsService } from './film_actors.service';
import { CreateFilmActorDto } from './dto/create-film_actor.dto';
import { UpdateFilmActorDto } from './dto/update-film_actor.dto';

@Controller('film-actors')
export class FilmActorsController {
  constructor(private readonly filmActorsService: FilmActorsService) {}

  @Post()
  create(@Body() createFilmActorDto: CreateFilmActorDto) {
    return this.filmActorsService.create(createFilmActorDto);
  }

  @Get()
  findAll() {
    return this.filmActorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmActorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmActorDto: UpdateFilmActorDto) {
    return this.filmActorsService.update(+id, updateFilmActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmActorsService.remove(+id);
  }
}
