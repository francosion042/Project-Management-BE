import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvConfigService } from '../../envConfig/envConfig.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    envConfigService: EnvConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.getString('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<User> {
    return await this.userService.findOneOrFail(payload.sub);
  }
}
