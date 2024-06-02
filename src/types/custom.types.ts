import { Transaction } from 'sequelize';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { CardPaymentDTO } from 'src/profile/dto/card-payment.dto';

export interface CustomRequest extends Request {
  transaction?: Transaction;
}

export interface CustomOrderType extends CreateOrderDto, CardPaymentDTO {}
