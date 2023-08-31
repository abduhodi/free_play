import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyUserDto {
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
