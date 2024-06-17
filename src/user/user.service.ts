import { Inject, Injectable } from '@nestjs/common';
import {
  User,
  FavoriteRestaurants,
  UserAddress,
} from 'src/database/models/index';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  async create(createData: any): Promise<any> {
    return await this.userRepository.create(createData);
  }

  async finByEmail(email: string): Promise<any> {
    return await this.userRepository.findOne({
      where: { email, isAccountActive: true },
      raw: true,
    });
  }

  async findUser(id: number): Promise<any> {
    return await this.userRepository.findOne({
      where: { id },
      include: [
        { model: UserAddress, as: 'address' },
        { model: FavoriteRestaurants, as: 'favoriteRestaurants' },
      ],
    });
  }

  async findUserList(): Promise<any> {
    try {
      return await this.userRepository.findAll({
        include: [
          { model: UserAddress, as: 'address' },
          { model: FavoriteRestaurants, as: 'favoriteRestaurants' },
        ],
      });
    } catch (error) {
      console.log(error);
      throw error; // rethrow the error to be handled by the caller
    }
  }

  async findByPhoneNumber(phoneNumber: string): Promise<any> {
    return await this.userRepository.findOne({
      where: { phoneNumber },
      raw: true,
    });
  }
}
