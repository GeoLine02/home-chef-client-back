import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { isEmail } from 'src/helpers';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authWithEmail(email: string): Promise<any> {
    try {
      const isCorrectEmail = isEmail(email);

      if (!isCorrectEmail) {
        throw new BadRequestException({ message: 'incorrect email format' });
      }

      let result = await this.userService.finByEmail(email);

      if (!result) {
        return false;
      }

      return result;
    } catch (error) {
      console.log('error', error.message);
      throw error;
    }
  }
  async authWithGoogle(request: any) {
    try {
      if (!request.user) {
        throw new NotFoundException();
      }
      console.log(request.user);
      return request.user;
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new NotFoundException('User Not in google');
      }
      throw new InternalServerErrorException();
    }
  }
}
