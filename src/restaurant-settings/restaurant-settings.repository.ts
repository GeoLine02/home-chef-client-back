import { RestaurantSettings } from '../models/index';

export const restaurantSettingsProviders = [
  {
    provide: 'RESTAURANT_SETTINGS_REPOSITORY',
    useValue: RestaurantSettings,
  },
];
