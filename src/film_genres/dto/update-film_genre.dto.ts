import { PartialType } from '@nestjs/swagger';
import { CreateFilmGenreDto } from './create-film_genre.dto';

export class UpdateFilmGenreDto extends PartialType(CreateFilmGenreDto) {}
