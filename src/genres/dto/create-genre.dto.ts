import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({
    description: 'The name of the genre',
    example: 'Action',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
