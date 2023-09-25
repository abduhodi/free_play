import { PartialType } from '@nestjs/swagger';
import { CreateFilmCountryDto } from './create-film_country.dto';

export class UpdateFilmCountryDto extends PartialType(CreateFilmCountryDto) {}
