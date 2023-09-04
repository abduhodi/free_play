import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The ID of the parent category (optional)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  parentCategoryId?: number;
}
