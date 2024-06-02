import { RestaurantTypes } from '../models/index';

export const restaurantTypesProviders = [
  {
    provide: 'RESTAURANT_TYPES_REPOSITORY',
    useValue: RestaurantTypes,
  },
];
