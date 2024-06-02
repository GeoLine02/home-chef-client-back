import { Module } from '@nestjs/common';
import { RestaurantSettingsService } from './restaurant-settings.service';
import { restaurantSettingsProviders } from './restaurant-settings.repository';

@Module({
  providers: [RestaurantSettingsService, ...restaurantSettingsProviders],
  exports: [RestaurantSettingsService, ...restaurantSettingsProviders],
})
export class RestaurantSettingsModule {}
