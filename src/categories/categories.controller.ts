import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { FilmFilterDto } from './dto/filter.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'fetch all categories' })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'fetch categories by id' })
  @Post(':id')
  findOneById(
    @Param('id', ParseIntPipe) id: number,
    @Body() filter: FilmFilterDto,
  ) {
    return this.categoriesService.findOneById(id, filter);
  }

  // @Get('by-name/:name')
  // findOneByName(@Param('name') name: string) {
  //   return this.categoriesService.findOneByName(name);
  // }
}
