import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { restaurantProviders } from './restaurant.repository';
import { RestaurantSettingsModule } from 'src/restaurant-settings/restaurant-settings.module';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, ...restaurantProviders],
  exports: [RestaurantService, ...restaurantProviders],
  imports: [RestaurantSettingsModule],
})
export class RestaurantModule {}
