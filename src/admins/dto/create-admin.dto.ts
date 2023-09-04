import { Validate } from 'class-validator';
import { LoginValidator } from '../../validators';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ name: 'login', example: 'example@mail.ru or +998901234567' })
  @Validate(LoginValidator, { message: 'Enter either email or phone number' })
  login: string;
}
