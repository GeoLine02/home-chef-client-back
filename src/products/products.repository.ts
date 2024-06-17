import { Products } from 'src/database/models/index';

export const productsRepository = [
  {
    provide: 'PRODUCT_REPO',
    useValue: Products,
  },
];
