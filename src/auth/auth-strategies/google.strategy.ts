import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallBack } from 'passport-google-oauth20';
import { BASE_URL } from 'src/helpers/constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super({
      clientID:
        '607884791235-585vo6hgcu644vcth985g0ivllqor13r.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: `${BASE_URL}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallBack,
  ): Promise<any> {
    const { name, emails, photos } = profile || {};
    const email = emails[0].value;
    let user = await this.userService.finByEmail(email);
    let jwt: string;
    if (!user) {
      user = await this.userService.create({
        email,
        firstName: name.givenName,
        lastName: name.familyName,
        photos,
        role: 'user',
        isAccountActive: true,
      });
    }
    const stringify = JSON.stringify(user);
    jwt = await this.jwtService.signAsync(stringify);
    return done(null, jwt);
  }
}
