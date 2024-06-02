import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { paymentsProvider } from './payments.repository';
import { PaymentsController } from './payments.controller';
import { OrdersService } from 'src/orders/orders.service';
import { orderProviders } from 'src/orders/orders.repository';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    ...paymentsProvider,
    OrdersService,
    ...orderProviders,
  ],
  exports: [PaymentsService, ...paymentsProvider],
})
export class PaymentsModule {}
