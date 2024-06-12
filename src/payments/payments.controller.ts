import {
  Controller,
  Post,
  Body,
  Param,
  Req,
  Res,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response, Request } from 'express';
import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';
import { OrdersService } from 'src/orders/orders.service';
import { CustomOrderType } from 'src/types/custom.types';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('gateway/:userID')
  @UseInterceptors(TransactionInterceptor)
  async payment(
    @Body() paymentData: CustomOrderType,
    @Param('userID') userID: string,
    @Res() response: Response,
  ) {
    const order = await this.ordersService.createOrder(+userID, paymentData);

    return await this.paymentsService.paymentGateWay(
      paymentData,
      +userID,
      response,
      +order.id,
    );
  }

  // @Get('tokenize')
  // @UseInterceptors(TransactionInterceptor)
  // async tokenize(
  //   @Query('payment_transaction_id') payment_transaction_id: string,
  //   @Req() req: CustomRequest,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const options = {
  //       method: 'POST',
  //       url: 'https://payze.io/api/v1',
  //       headers: {
  //         accept: 'application/json',
  //         'content-type': 'application/json',
  //       },
  //       data: {
  //         method: 'getTransactionInfo',
  //         apiKey: process.env.PAYZE_API_KEY,
  //         apiSecret: process.env.PAYZE_API_SECRET,
  //         data: { transactionId: payment_transaction_id },
  //       },
  //     };
  //     const data = await axios.request(options);
  //     res.send(data.data);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // }
  @Post('get-card')
  @UseInterceptors(TransactionInterceptor)
  async getCard(
    @Req() req: Request,
    @Query('userID') userID: string,
    @Query('orderID') orderID: string,
  ) {
    const { Type, PaymentStatus } = req.body || {};

    if (Type === 'AddCard' && PaymentStatus === 'Captured') {
      const card = await this.paymentsService.addNewCard(req.body, +userID);
      return await this.ordersService.updateOrder(+orderID, +card.id);
    }

    if (Type === 'JustPay' && PaymentStatus === 'Captured') {
      return await this.paymentsService.justPay(req.body, +userID);
    }

    if (PaymentStatus === 'Failed') {
    }
  }
}
