import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @UseInterceptors(NoFilesInterceptor())
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.create(userRegisterDto);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() request: Request) {
    return this.authService.createToken(request.user);
  }
}
