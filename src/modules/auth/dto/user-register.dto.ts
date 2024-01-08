import { IsEmail, IsNotEmpty, MinLength, IsPhoneNumber } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  mobile: string;
}
