import { IsInt, IsOptional, IsPositive, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidGenreId } from '../../validators';
import { IsValidCountryId } from '../../validators';

export class FilmFilterDto {
  @ApiProperty({
    description: 'The ID of the country (optional)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Validate(IsValidCountryId)
  countryId?: number;

  @ApiProperty({
    description: 'The ID of the genre (optional)',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Validate(IsValidGenreId)
  genreId?: number;

  @ApiProperty({
    description: 'The release year (optional)',
    example: 2023,
    required: false,
  })
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiProperty({
    description: 'The minimum positive rate (optional)',
    example: 4.5,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  rate?: number;
}
