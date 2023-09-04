import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { LoginValidator } from '../../validators';

export class UpdateLoginDto {
  @ApiProperty({ name: 'login', example: 'example@mail.ru or +998901234567' })
  @Validate(LoginValidator, { message: 'Enter either email or phone number' })
  login: string;
}
