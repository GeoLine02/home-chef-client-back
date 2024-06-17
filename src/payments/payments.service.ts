import {
  BadGatewayException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  PaymentTransactions,
  UserPaymentMethod,
} from 'src/database/models/index';
import axios from 'axios';
import { Response } from 'express';
import { CustomOrderType } from 'src/types/custom.types';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('USER_PAYMENTS_REPOSITORY')
    private userPaymentRepository: typeof UserPaymentMethod,
    @Inject('USER_PAYMENT_TRANSACTIONS_REPOSITORY')
    private paymentTransactionsRepository: typeof PaymentTransactions,
  ) {}
  async paymentGateWay(
    paymentData: CustomOrderType,
    userID: number,
    res: Response,
    orderID: number,
  ) {
    try {
      const { products } = paymentData;

      const deliveryPrice = 5;
      const cartItemsAmount = products.reduce((acc, item) => {
        acc += item.product.productPrice * item.quantity;
        return acc;
      }, 0);

      const options = {
        method: 'PUT',
        url: 'https://payze.io/v2/api/payment',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        data: {
          apiKey: process.env.PAYZE_API_KEY,
          apiSecret: process.env.PAYZE_API_SECRET,
          source: 'Card',
          // token: 'CC078875E5F6439F9CD85F4E1',
          amount: cartItemsAmount + deliveryPrice,

          currency: 'GEL',
          language: 'EN',
          cardPayment: {
            tokenizeCard: paymentData.tokenizeCard,
            preauthorize: false,
          },
          hooks: {
            webhookGateway: `${process.env.PAYZE_WEBHOOK_GATEWAY}/payments/get-card?userID=${userID}&orderID=${orderID}`,
            successRedirectGateway: `${process.env.PAYZE_SUCCESS_URL}/`,
            errorRedirectGateway: process.env.PAYZE_FAIL_URL,
          },
        },
      };

      const data = await axios(options);
      const response = data.data.data.payment;

      if (!response.paymentUrl) {
        return res.status(201).json(response);
      }

      res.status(201).json({ paymentUrl: response.paymentUrl });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addNewCard(body: any, userID: number) {
    try {
      const { Token, CardMask, CardBrand, Source } = body || {};
      console.log(userID);
      const paymentMethod = await this.userPaymentRepository.create({
        source: Source,
        cardMask: CardMask,
        cardBrand: CardBrand,
        cardToken: Token,
        userID,
      });

      return await this.paymentTransactionsRepository.create({
        userPaymentMethodID: paymentMethod.id,
        userID,
        amount: body.Amount,
        cardMask: body.CardMask,
        finalAmount: body.FinalAmount,
        commitDate: body.CaptureDateIso,
        type: body.Type,
        currency: body.Currency,
        amountRefunded: body.AmountRefunded,
        status: body.PaymentStatus,
        refundable: body.Refund.Refundable,
        paymentDate: body.CreateDateIso,
      });
    } catch (error) {
      switch (error.parent.code) {
        case '23505':
          throw new BadGatewayException('Card already exists');
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async justPay(body: any, userID: number) {
    console.log(body);
    try {
      return await this.paymentTransactionsRepository.create({
        userID,
        userPaymentMethodID: null,
        amount: body.Amount,
        cardMask: body.CardMask,
        finalAmount: body.FinalAmount,
        commitDate: body.CaptureDateIso,
        type: body.Type,
        currency: body.Currency,
        amountRefunded: body.AmountRefunded,
        status: body.PaymentStatus,
        refundable: body.Refund.Refundable,
        paymentDate: body.CreateDateIso,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async payWithCard(response: any) {
    return response;
  }

  async removeCard() {}

  async getTransactions() {}

  async getTransactionByID() {}
  /////////////////////////////////////////////////////////////////
}
