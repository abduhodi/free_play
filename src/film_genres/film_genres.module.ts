import { Module } from '@nestjs/common';
import { FilmGenresService } from './film_genres.service';
import { FilmGenresController } from './film_genres.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FilmGenresController],
  providers: [FilmGenresService],
  exports: [FilmGenresService],
})
export class FilmGenresModule {}
