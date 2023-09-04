import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'The username',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Indicates if the user is an adult',
    example: true,
  })
  @IsBoolean()
  isAdult: boolean;

  @ApiProperty({
    description: 'The age of the user',
    example: 25,
  })
  @IsNumber()
  @IsPositive()
  age: number;

  @ApiProperty({
    description: 'The gender of the user',
    example: 'male',
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    description: 'Indicates if the user has a PIN (optional)',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  hasPIN?: boolean;

  @ApiProperty({
    description: "The user's PIN code (optional)",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  pincode?: number;

  @ApiProperty({
    description: "The ID of the user's avatar (optional)",
    example: 42,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  avatarId?: number;
}
