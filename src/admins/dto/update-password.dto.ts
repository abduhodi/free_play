import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ name: 'old password', example: 'vErySt0ngP@s@word' })
  @IsStrongPassword({ minLength: 6, minSymbols: 0, minUppercase: 0 })
  oldPassword: string;

  @ApiProperty({ name: 'new password', example: 'vErySt0ngP@s@word' })
  @IsStrongPassword({ minLength: 6, minSymbols: 0, minUppercase: 0 })
  newPassword: string;

  @ApiProperty({ name: 'confirm password', example: 'vErySt0ngP@s@word' })
  @IsStrongPassword({ minLength: 6, minSymbols: 0, minUppercase: 0 })
  confirmPassword: string;
}
