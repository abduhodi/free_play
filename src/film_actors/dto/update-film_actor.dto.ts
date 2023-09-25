import { PartialType } from '@nestjs/swagger';
import { CreateFilmActorDto } from './create-film_actor.dto';

export class UpdateFilmActorDto extends PartialType(CreateFilmActorDto) {}
