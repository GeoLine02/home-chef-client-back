import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { orderProviders } from './orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ...orderProviders],
  exports: [OrdersService, ...orderProviders],
})
export class OrdersModule {}
