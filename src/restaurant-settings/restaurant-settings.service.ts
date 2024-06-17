import { Inject, Injectable } from '@nestjs/common';
import { RestaurantSettings } from '../database/models/index';

@Injectable()
export class RestaurantSettingsService {
  private readonly fixedRestaurantWorkingStartTime = '09:00:00';

  constructor(
    @Inject('RESTAURANT_SETTINGS_REPOSITORY')
    private readonly restaurantSettingsRepository: typeof RestaurantSettings,
  ) {}

  get fixedRestaurantWorkingTime() {
    return this.fixedRestaurantWorkingStartTime;
  }
}
