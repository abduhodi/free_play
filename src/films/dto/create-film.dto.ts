import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsPositive,
  Validate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidCategoryId } from '../../validators';

export class CreateFilmDto {
  @ApiProperty({
    description: 'The title of the film',
    example: 'Inception',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The thumbnail URL of the film',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @ApiProperty({
    description: 'The description of the film',
    example: 'A science fiction thriller.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The release year of the film',
    example: 2010,
  })
  @IsNumber()
  @IsPositive()
  year: number;

  @ApiProperty({
    description: 'Min age limit',
    example: 18,
  })
  @IsNumber()
  @IsPositive()
  minAge: number;

  @ApiProperty({
    description: 'The duration of the film in minutes',
    example: 148,
  })
  @IsNumber()
  @IsPositive()
  duration: number;

  @ApiProperty({
    description: 'Indicates if subtitles are required',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isSubsRequired: boolean;

  @ApiProperty({
    description: 'The ID of the film category',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @Validate(IsValidCategoryId)
  categoryId: number;
}
