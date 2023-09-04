import { IsStrongPassword, Validate } from 'class-validator';
import { LoginValidator } from '../../validators';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'login',
    example: 'example@mail.ru',
  })
  @Validate(LoginValidator, { message: 'Enter either email or phone number' })
  login: string;

  @ApiProperty({
    description: 'password',
    example: 'passwd123',
  })
  @IsStrongPassword({ minLength: 6, minSymbols: 0, minUppercase: 0 })
  password: string;
}
