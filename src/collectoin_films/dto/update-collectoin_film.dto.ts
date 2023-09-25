import { PartialType } from '@nestjs/swagger';
import { CreateCollectoinFilmDto } from './create-collectoin_film.dto';

export class UpdateCollectoinFilmDto extends PartialType(CreateCollectoinFilmDto) {}
