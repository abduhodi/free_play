import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiOperation({ summary: 'get-all-genres' })
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @ApiOperation({ summary: 'get-genre-by-id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(+id);
  }
}
