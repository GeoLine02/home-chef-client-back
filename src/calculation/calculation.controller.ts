import { Body, Controller, Post } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { OrderDTO } from './dto/orderCalc.dto';

@Controller('calculation')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Post()
  async calculateOrderPrice(@Body() orderDTO: OrderDTO) {
    return await this.calculationService.calculateOrderTotalPrice(orderDTO);
  }
}
