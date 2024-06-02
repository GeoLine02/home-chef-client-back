import { OrderProducts, Orders, Products } from 'src/models';

export const orderProviders = [
  {
    provide: 'ORDERS_REPOSITORY',
    useValue: Orders,
  },
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Products,
  },
  {
    provide: 'ORDER_PRODUCTS_REPOSITORY',
    useValue: OrderProducts,
  },
];
