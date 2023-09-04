import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilmFilterDto {
  @ApiProperty({
    description: 'The ID of the country (optional)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  countryId?: number;

  @ApiProperty({
    description: 'The ID of the genre (optional)',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
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
