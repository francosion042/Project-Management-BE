import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register({ req }: { req: any }) {
    return this.authService.login(req.user);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login({ req }: { req: any }) {
    return this.authService.login(req.user);
  }
}
