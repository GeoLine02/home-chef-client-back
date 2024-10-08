import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './dto/create-order.dto';
import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';
import { Sequelize } from 'sequelize-typescript';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private sequelize: Sequelize,
  ) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  async create(
    @Body() createOrderDto: OrderDTO,

    @Param('userID', new ParseIntPipe()) userID: number,
  ) {
    const transaction = await this.sequelize.transaction();
    return this.ordersService.createOrder(userID, createOrderDto, transaction);
  }

  @Get()
  findAll(@Query('userID') userID: string, @Query('offset') offset: string) {
    return this.ordersService.findAll(+userID, +offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
