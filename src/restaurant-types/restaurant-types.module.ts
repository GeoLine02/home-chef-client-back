import { Module } from '@nestjs/common';
import { RestaurantCategoriesService } from './restaurant-types.service';
import { RestaurantCategoriesController } from './restaurant-types.controller';
import { restaurantTypesProviders } from './restaurant.types.repository';

@Module({
  providers: [RestaurantCategoriesService, ...restaurantTypesProviders],
  controllers: [RestaurantCategoriesController],
  exports: [...restaurantTypesProviders],
})
export class RestaurantCategoriesModule {}
