import { Restaurant } from 'src/database/models/index';

export const restaurantProviders = [
  {
    provide: 'RESTAURANT_REPOSITORY',
    useValue: Restaurant,
  },
];
