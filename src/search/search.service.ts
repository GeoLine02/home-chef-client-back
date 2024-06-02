import { Injectable } from '@nestjs/common';
import { RestaurantService } from 'src/restaurant/restaurant.service';

@Injectable()
export class SearchService {
  constructor(private readonly restaurantService: RestaurantService) {}

  async getSearchValue(searchValue: string) {
    return await this.restaurantService.getRestaurantByName(searchValue);
  }
}
