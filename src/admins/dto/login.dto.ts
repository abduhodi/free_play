import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { LoginValidator } from '../../validators';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ name: 'login', example: 'example@mail.ru or +998901234567' })
  @Validate(LoginValidator, { message: 'Enter either email or phone number' })
  login: string;

  @ApiProperty({ name: 'password', example: 'Password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
