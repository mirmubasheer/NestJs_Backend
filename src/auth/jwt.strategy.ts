import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'c2VjcmV0LWtleS1mb3ItanYtZXhhbXBsZQ==',
    });
  }

  async validate(payload: any) {
    return { email: payload.email, id: payload.sub };
  }
}
