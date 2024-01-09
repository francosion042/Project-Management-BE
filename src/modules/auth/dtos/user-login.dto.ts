import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
