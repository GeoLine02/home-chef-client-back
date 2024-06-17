import { Products } from '../models/index';

export const productsRepository = [
  {
    provide: 'PRODUCT_REPO',
    useValue: Products,
  },
];
