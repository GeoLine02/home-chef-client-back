import { UserPaymentMethod, PaymentTransactions, Orders } from 'src/models';

export const paymentsProvider = [
  {
    provide: 'USER_PAYMENTS_REPOSITORY',
    useValue: UserPaymentMethod,
  },
  {
    provide: 'USER_PAYMENT_TRANSACTIONS_REPOSITORY',
    useValue: PaymentTransactions,
  },
  {
    provide: 'ORDER_REPOSITORY',
    useValue: Orders,
  },
];
