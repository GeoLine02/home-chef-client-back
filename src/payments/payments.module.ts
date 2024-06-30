import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { paymentsProvider } from './payments.repository';
import { PaymentsController } from './payments.controller';
import { OrdersService } from 'src/orders/orders.service';
import { orderProviders } from 'src/orders/orders.repository';
import { CalculationModule } from 'src/calculation/calculation.module';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    ...paymentsProvider,
    OrdersService,
    ...orderProviders,
  ],
  exports: [PaymentsService, ...paymentsProvider],
  imports: [CalculationModule],
})
export class PaymentsModule {}
