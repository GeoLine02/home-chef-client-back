import {
  Injectable,
  Inject,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { toFixedMoney } from 'src/helpers/currency';
import { Products } from 'src/database/models/index';
import { MqService } from 'src/mq/mq.service';
import { GlobalConfService } from 'src/global-conf/global-conf.service';
import {
  IOrder,
  IOrderProduct,
  IDeliveryOptions,
} from '../orders/interfaces/order.interfaces';

@Injectable()
export class CalculationService {
  constructor(
    @Inject('PRODUCT_REPO') private readonly productRepo: typeof Products,
    private readonly globalConfigService: GlobalConfService,
    private readonly mqService: MqService,
  ) {}

  private async calculateDeliveryPrice(
    deliveryData: IDeliveryOptions,
  ): Promise<number> {
    const deliveryTotalCost = await this.mqService.sendRequest(
      'calculate_delivery_price',
      deliveryData.points,
    );

    return deliveryTotalCost;
  }

  async calculateOrderTotalPrice(orderData: IOrder): Promise<number> {
    try {
      const [deliveryInfo, productCosts] = await Promise.all([
        this.calculateDeliveryPrice(orderData.deliveryOptions),
        this.calculateProductsCost(orderData.orderProducts),
      ]);

      const totalCost = deliveryInfo + productCosts;
      const serviceFee = await this.getFeeFromTotalCost(totalCost);

      return toFixedMoney(totalCost + serviceFee);
    } catch (error) {
      throw new HttpException('Unhandled server error', 500);
    }
  }

  private async calculateProductsCost(
    orderProducts: IOrderProduct[],
  ): Promise<number> {
    const productCosts = await Promise.all(
      orderProducts.map((product) => this.calculateProductCost(product)),
    );
    return productCosts.reduce((acc, cost) => acc + cost, 0);
  }

  private async calculateProductCost(product: IOrderProduct): Promise<number> {
    try {
      const productInfo = await this.productRepo.findOne({
        attributes: ['productPrice'],
        where: { id: product.id },
        raw: true,
      });

      if (!productInfo) {
        throw new NotFoundException('Unhandled data');
      }

      const price = productInfo.productPrice;

      return price * product.quantity;
    } catch (error) {
      console.log('error', error.message);
      throw error;
    }
  }

  private async getFeeFromTotalCost(totalCost: number): Promise<number> {
    const feePrice = +(await this.globalConfigService.get('feePricePercent'));
    return (totalCost * feePrice) / 100;
  }
}
