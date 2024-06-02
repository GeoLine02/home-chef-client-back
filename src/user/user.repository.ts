import { UserAddress } from 'src/models';
import { User } from '../models/user';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
  {
    provide: 'USER_ADDRESS_REPOSITORY',
    useValue: UserAddress,
  },
];
