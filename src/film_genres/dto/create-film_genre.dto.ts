import { IsNumber, IsNotEmpty, IsPositive, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidFilmId, IsValidGenreId } from '../../validators';

export class CreateFilmGenreDto {
  @ApiProperty({
    description: 'The ID of the film',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Validate(IsValidFilmId)
  filmId: number;

  @ApiProperty({
    description: 'The ID of the genre',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Validate(IsValidGenreId)
  genreId: number;
}
