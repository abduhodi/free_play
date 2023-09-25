import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectoinFilmsService } from './collectoin_films.service';
import { CreateCollectoinFilmDto } from './dto/create-collectoin_film.dto';
import { UpdateCollectoinFilmDto } from './dto/update-collectoin_film.dto';

@Controller('collectoin-films')
export class CollectoinFilmsController {
  constructor(private readonly collectoinFilmsService: CollectoinFilmsService) {}

  @Post()
  create(@Body() createCollectoinFilmDto: CreateCollectoinFilmDto) {
    return this.collectoinFilmsService.create(createCollectoinFilmDto);
  }

  @Get()
  findAll() {
    return this.collectoinFilmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectoinFilmsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectoinFilmDto: UpdateCollectoinFilmDto) {
    return this.collectoinFilmsService.update(+id, updateCollectoinFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectoinFilmsService.remove(+id);
  }
}
