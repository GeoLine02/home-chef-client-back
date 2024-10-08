import {
  BadGatewayException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderDTO } from './dto/create-order.dto';
import {
  OrderProducts,
  Orders,
  Products,
  UserAddress,
} from 'src/database/models/index';
//raise condition multex
@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private readonly orderRepository: typeof Orders,
    @Inject('ORDER_PRODUCTS_REPOSITORY')
    private readonly orderProductsRepository: typeof OrderProducts,
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepository: typeof Products,
  ) {}
  async createOrder(userID: number, createOrder: OrderDTO, transaction: any) {
    try {
      const products = await this.productsRepository.findAll({
        where: { id: createOrder.orderProducts.map((i) => i.id) },
        transaction,
      });

      const totalAmount = 0;

      const order = await this.orderRepository.create(
        {
          userID,
          totalAmount: totalAmount + 5,
          amount: totalAmount,
          deliveryAmount: 5,
          userAddressID: createOrder.userAddressID,
        },
        { transaction },
      );

      await Promise.all(
        products.map(
          async (product) =>
            await this.orderProductsRepository.create(
              {
                orderID: order.id,
                productID: product.id,
              },
              { transaction },
            ),
        ),
      );

      return order;
    } catch (error) {
      switch (error.parent.code) {
        case '22P02':
          throw new BadGatewayException(error.parent.message);
        case '23502':
          throw new BadGatewayException(error.parent.message);
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  async findAll(userID: number, offset: number) {
    try {
      const query: any = {
        where: { userID },
        include: [{ model: Products }, { model: UserAddress }],
      };
      return await this.orderRepository.findAll({
        ...query,
        offset: offset || 0,
        limit: 10,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(userID: number) {
    try {
      const query: any = {
        where: { userID },
        include: [{ model: Products }, { model: UserAddress }],
      };
      return await this.orderRepository.findOne({
        ...query,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateOrder(orderID: number, cardID: number) {
    try {
      return await this.orderRepository.update(
        { status: 'Placed', userPaymentMethodID: cardID },
        { where: { id: orderID } },
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.parent.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
