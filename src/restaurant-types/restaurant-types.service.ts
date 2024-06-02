import { Injectable, Inject } from '@nestjs/common';
import { RestaurantTypes } from 'src/models/index';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

export interface IRestaurantCategories {
  typeName: string;
  typeNameRU: string;
  id?: number;
}

@Injectable()
export class RestaurantCategoriesService {
  private cacheKey = 'restaurantCategories';

  constructor(
    @Inject('RESTAURANT_TYPES_REPOSITORY')
    private restaurantRepository: typeof RestaurantTypes,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAll(): Promise<IRestaurantCategories[]> {
    const cachedData: IRestaurantCategories[] = await this.cacheManager.get(
      this.cacheKey,
    );

    if (cachedData) {
      return cachedData;
    }

    const res = await this.restaurantRepository.findAll({});
    await this.cacheManager.set(this.cacheKey, res, 86400);
    return res;
  }

  async create(translates: { en: string; ru: string }): Promise<boolean> {
    try {
      await this.restaurantRepository.create({
        typeName: translates.en,
        typeNameRU: translates.ru,
      });
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
