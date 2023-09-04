import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FilmsService } from './films.service';

import { AccessJwtGuard, ActiveUserGuard, CheckLoggedInGuard } from '../guards';

@Controller('films')
@UseGuards(AccessJwtGuard, ActiveUserGuard, CheckLoggedInGuard)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get(':id')
  findOneFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.findOne(id);
  }
}
