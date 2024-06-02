import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Restaurant, FavoriteRestaurants, UserAddress, User } from 'src/models';
import { NewAddressDTO } from './dto/new-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('FAVORITE_RESTAURANTS_REPOSITORY')
    private favoriteRestaurantsRepository: typeof FavoriteRestaurants,
    @Inject('USER_ADDRESS_REPOSITORY')
    private userAddressRepository: typeof UserAddress,
  ) {}
  async addToFav(
    userID: number,
    restaurantID: number,
  ): Promise<FavoriteRestaurants> {
    try {
      const isAlreadyAddedInFavList =
        await this.favoriteRestaurantsRepository.findOne({
          where: { userID, restaurantID },
        });

      if (isAlreadyAddedInFavList) {
        throw new BadRequestException();
      }

      return await this.favoriteRestaurantsRepository.create<FavoriteRestaurants>(
        {
          userID,
          restaurantID,
        },
      );
    } catch (error) {
      switch (error.name) {
        case 'SequelizeDatabaseError':
          throw new BadRequestException(
            'Invalid restaurant ID or user ID provided',
          );
        case 'SequelizeForeignKeyConstraintError':
          throw new BadRequestException(error.parent.detail);
        case 'BadRequestException':
          throw new BadRequestException('Restaurant is already in your list');

        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async getFavorites(userID: number) {
    try {
      return await this.favoriteRestaurantsRepository.findAll({
        where: { userID },
        include: [{ model: Restaurant, as: 'favoriteRestaurant' }],
        raw: true,
      });
    } catch (error) {
      if (error.name === 'SequelizeDatabaseError') {
        throw new BadRequestException('Invalid user ID provided');
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(userID: number, restaurantID: number) {
    try {
      const isDeleted = await this.favoriteRestaurantsRepository.destroy({
        where: { userID, restaurantID },
      });
      if (!isDeleted) {
        throw new BadRequestException();
      }

      return { restaurantID, userID, removed: isDeleted };
    } catch (error) {
      switch (error.name) {
        case 'SequelizeDatabaseError':
          throw new BadRequestException(
            'Invalid restaurant ID or user ID provided',
          );

        case 'BadRequestException':
          throw new BadRequestException('Nothing found to delete');

        default:
          throw new InternalServerErrorException();
      }
    }
  }

  // Address////////////////////////////////////////////////////////////////

  async addNewAddress(
    userID: number,
    newAddressData: NewAddressDTO,
  ): Promise<UserAddress> {
    try {
      // Create new address
      return await this.userAddressRepository.create({
        userID,
        ...newAddressData,
      });
    } catch (error) {
      console.log(error);
      switch (error.parent.code) {
        case '23502':
          throw new BadRequestException(error.parent.message);
        case '23503':
          throw new BadRequestException(error.parent.message);
        case '22P02':
          throw new BadRequestException(error.parent.message);
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async removeAddress(
    userID: number,
    userAddressID: number,
  ): Promise<UserAddress[]> {
    try {
      const isDeleted = await this.userAddressRepository.destroy({
        where: { userID, id: userAddressID },
      });

      if (!isDeleted) {
        throw new BadRequestException();
      }

      return await this.userAddressRepository.findAll({
        where: { userID },
        include: [{ model: User, as: 'user' }],
        raw: true,
      });
    } catch (error) {
      switch (error.name) {
        case 'SequelizeDatabaseError':
          throw new BadRequestException('Invalid user or address ID provided');

        case 'BadRequestException':
          throw new BadRequestException('Nothing found to delete');

        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async updateAddress(
    userID: number,
    userAddressID: number,
    updateAddress: UpdateAddressDTO,
  ): Promise<UserAddress> {
    try {
      const isUpdated = await this.userAddressRepository.update<UserAddress>(
        updateAddress,
        { where: { id: userAddressID, userID } },
      );

      if (!isUpdated[0]) {
        throw new BadRequestException();
      }

      return await this.userAddressRepository.findOne({
        where: { userID, id: userAddressID },
        include: [{ model: User, as: 'user' }],
        raw: true,
      });
    } catch (error) {
      switch (error.name) {
        case 'SequelizeDatabaseError':
          throw new BadRequestException('Invalid user or address ID provided');

        case 'BadRequestException':
          throw new BadRequestException('Nothing found to update');

        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async getUserAddresses(userID: number) {
    try {
      return await this.userAddressRepository.findAll({
        where: { userID },
        // include: [{ model: User, as: 'user' }],
        raw: true,
      });
    } catch (error) {
      if (error.name === 'SequelizeDatabaseError') {
        throw new BadRequestException('Invalid user ID provided');
      }
      throw new InternalServerErrorException();
    }
  }

  async getUserSingleAddress(userID: number, userAddressID: number) {
    try {
      const isAddressExist = await this.userAddressRepository.findOne({
        where: { userID, id: userAddressID },
        include: [{ model: User, as: 'user' }],
        raw: true,
      });
      if (!isAddressExist) {
        throw new NotFoundException();
      }
    } catch (error) {
      switch (error.name) {
        case 'SequelizeDatabaseError':
          throw new BadRequestException('Invalid user or address ID provided');

        case 'NotFoundException':
          throw new NotFoundException('Nothing found');

        default:
          throw new InternalServerErrorException();
      }
    }
  }

  //////////////////////////////////////////////////////////////////
}
