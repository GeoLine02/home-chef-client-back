import { Strategy } from 'passport-vkontakte';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VkAuth extends PassportStrategy(Strategy, 'vkontakte') {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super(
      {
        clientID: 51826756,
        clientSecret: '1MPqoZlRrmRXFrDJVg3U',
        callbackURL:
          'https://7fcd-2a00-1370-817c-354-c258-24a9-69dd-cdd8.ngrok-free.app/auth/vkontakte/callback',
        scope: ['email'],
        profileFields: ['email'],
      },
      async (
        accessToken: any,
        refreshToken: any,
        params: any,
        vkontakteProfile: any,
        done: any,
      ) => {
        const {
          emails,
          _json: { first_name, last_name },
        } = vkontakteProfile;
        const email = emails[0].value;

        let user = await this.userService.finByEmail(email);
        let jwt: string;

        if (!user) {
          user = await this.userService.create({
            email,
            firstName: first_name,
            lastName: last_name,
            role: 'user',
            isAccountActive: true,
          });
        }

        jwt = await this.jwtService.signAsync(user);
        return done(null, jwt);
      },
    );
  }
}
