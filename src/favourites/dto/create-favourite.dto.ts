import { IsNumber, IsNotEmpty, IsPositive, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidFilmId, IsValidProfileId } from '../../validators';

export class CreateFavouriteDto {
  @ApiProperty({
    description: 'The ID of the film to be added as a favorite',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Validate(IsValidFilmId)
  filmId: number;
}
