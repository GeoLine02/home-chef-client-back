import { Inject, Injectable } from '@nestjs/common';
import { Op } from '@sequelize/core';
import {
  Products,
  Restaurant,
  RestaurantAddress,
  RestaurantSettings,
  RestaurantTypesJunctions,
} from 'src/database/models/index';
import { datePicker } from 'src/helpers';
import { RestaurantSettingsService } from 'src/restaurant-settings/restaurant-settings.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @Inject('RESTAURANT_REPOSITORY')
    private restaurantRepository: typeof Restaurant,
    private restaurantSettings: RestaurantSettingsService,
  ) {}

  async create(data: any): Promise<any> {
    const result = await this.restaurantRepository.create(data);
    return result;
  }

  async filter(queryParams: any): Promise<any> {
    const fixedWorkingTime = this.restaurantSettings.fixedRestaurantWorkingTime;
    const activeRestaurantSettingsJoin = {
      model: RestaurantSettings,
      required: true,
      where: {
        isRestaurantActive: true,
        workingFrom: {
          [Op.gte]: fixedWorkingTime,
        },
        [Op.or]: [
          {
            workingTill: {
              [Op.gte]: datePicker().time,
            },
          },
          {
            workingTill: {
              [Op.lte]: datePicker().time,
            },
          },
        ],
      },
    };
    const cacheKey = JSON.stringify(queryParams);
    const cacheRes = await this.cacheManager.get(cacheKey);
    if (cacheRes) {
      return cacheRes;
    }

    const query: any = {
      where: {},
      include: [
        activeRestaurantSettingsJoin,
        { model: RestaurantAddress, required: true },
      ],
    };

    const { selectedCategoryId, offset } = queryParams;

    if (selectedCategoryId) {
      this.addRestaurantTypeFilter(query, selectedCategoryId);
    }
    console.log(queryParams);

    const result = await this.restaurantRepository.findAll({
      ...query,
      raw: true,
      offset: offset || 0,
      limit: 15,
    });

    await this.cacheManager.set(cacheKey, result, 60); //1 minute defined in secs

    return result;
  }
  private addRestaurantTypeFilter(query: any, selectedCategoryId: any): void {
    const categoryJoin = {
      model: RestaurantTypesJunctions,
      required: true,
      where: { typeID: +selectedCategoryId },
    };
    query.include.push(categoryJoin);
  }
  async getRestaurantByName(name: string): Promise<any> {
    return await this.restaurantRepository.findAll({
      where: {
        name: {
          [Op.iLike]: name + '%',
        },
      },
    });
  }
  async getRestaurantByID(id: number): Promise<any> {
    return await this.restaurantRepository.findOne({
      where: { id },
      include: [
        Products,
        RestaurantSettings,
        RestaurantAddress,
        RestaurantTypesJunctions,
      ],
    });
  }
}
