import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { validateHash } from '../../common/utils';
import { UserNotFoundException } from '../../exceptions';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const isPasswordValid = await validateHash(password, user?.password);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
  async createToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
