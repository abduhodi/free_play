import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty({
    description: 'one-time-password',
    example: '123456',
  })
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
