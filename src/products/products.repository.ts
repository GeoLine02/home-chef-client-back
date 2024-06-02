import { Restaurant } from '../models/index';

export const restaurantProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useValue: Restaurant,
  },
];
