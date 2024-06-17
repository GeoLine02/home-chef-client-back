import {
  Restaurant,
  FavoriteRestaurants,
  UserAddress,
  User,
} from 'src/database/models/index';

export const profileProviders = [
  {
    provide: 'FAVORITE_RESTAURANTS_REPOSITORY',
    useValue: FavoriteRestaurants,
  },
  {
    provide: 'RESTAURANTS_REPOSITORY',
    useValue: Restaurant,
  },
  {
    provide: 'USER_ADDRESS_REPOSITORY',
    useValue: UserAddress,
  },
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
