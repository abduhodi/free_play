import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';

export class CreateUserDto {
  @Validate((login: string) => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      login,
    );
    const isPhone = /^\+998\d{9}$/.test(login);
    isEmail || isPhone ? true : false;
  })
  login: string;

  @IsStrongPassword({ minLength: 6, minSymbols: 0, minUppercase: 0 })
  password: string;
}
