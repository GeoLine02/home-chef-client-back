import { Module } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { CalculationController } from './calculation.controller';
import { globalConfigRepository } from 'src/global-conf/global-conf.repository';
import { GlobalConfModule } from 'src/global-conf/global-conf.module';
import { GlobalConfService } from 'src/global-conf/global-conf.service';
import { productsRepository } from 'src/products/products.repository';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { MqModule } from 'src/mq/mq.module';

@Module({
  imports: [GlobalConfModule, ProductsModule, MqModule],
  providers: [
    CalculationService,
    globalConfigRepository,
    GlobalConfService,
    ...productsRepository,
    ProductsService,
  ],
  controllers: [CalculationController],
  exports: [CalculationService],
})
export class CalculationModule {}
