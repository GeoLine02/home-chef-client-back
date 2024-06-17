import { UserAddress } from 'src/database/models/index';
import { User } from 'src/database/models/index';

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
