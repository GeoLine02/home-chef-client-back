import { Restaurant } from '../models/index';

export const restaurantProviders = [
  {
    provide: 'RESTAURANT_REPOSITORY',
    useValue: Restaurant,
  },
];
