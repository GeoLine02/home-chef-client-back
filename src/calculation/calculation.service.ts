import {
  Injectable,
  Inject,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { calculateDistance, mToKM } from 'src/helpers/index';
import { toFixedMoney } from 'src/helpers/currency';
import { GlobalConfService } from 'src/global-conf/global-conf.service';
import { Products } from 'src/database/models/index';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface OrderProduct {
  id: number;
  quantity: number;
}

interface OrderData {
  pickupLocation: Coordinates;
  deliveryLocation: Coordinates;
  orderKG: number;
  orderProducts: OrderProduct[];
}

@Injectable()
export class CalculationService {
  constructor(
    @Inject('PRODUCT_REPO') private readonly productRepo: typeof Products,
    private readonly globalConfigService: GlobalConfService,
  ) {}

  async calculateOrderTotalPrice(orderData: OrderData): Promise<number> {
    try {
      const [pricePerKM, pricePerKG] = await this.getPrices();

      const distance = mToKM(
        calculateDistance(orderData.pickupLocation, orderData.deliveryLocation),
      );

      const distanceCost = this.calculateDistanceCost(distance, +pricePerKM);

      const weightCost = this.calculateWeightCost(
        orderData.orderKG,
        pricePerKG,
      );
      const productCosts = await this.calculateProductsCost(
        orderData.orderProducts,
      );

      const totalCost = distanceCost + weightCost + productCosts;

      return toFixedMoney(totalCost);
    } catch (error) {
      throw new HttpException('unhandled server error', 500);
    }
  }

  private async getPrices(): Promise<[number, number]> {
    const [pricePerKMResult, pricePerKGResult] = await Promise.all([
      this.globalConfigService.get('pricePerKM'),
      this.globalConfigService.get('pricePerKG'),
    ]);

    const pricePerKM = +pricePerKMResult?.value;
    const pricePerKG = +pricePerKGResult?.value;

    return [pricePerKM, pricePerKG];
  }

  private calculateDistanceCost(distance: number, pricePerKM: number): number {
    if (distance <= 0) return 0;

    let res = 0;

    if (distance > 10) {
      const bonusKM = distance - 10;
      res += toFixedMoney(pricePerKM * bonusKM);
    }

    res += pricePerKM * distance;

    return res;
  }

  private calculateWeightCost(weight: number, pricePerKG: number): number {
    if (weight <= 15) return 0;

    const bonusKGS = weight - 15;
    return pricePerKG * bonusKGS;
  }

  private async calculateProductsCost(
    orderProducts: OrderProduct[],
  ): Promise<number> {
    const productCosts = await Promise.all(
      orderProducts.map((product) => this.calculateProductCost(product)),
    );

    return productCosts.reduce((acc, cost) => acc + cost, 0);
  }

  private async calculateProductCost(product: OrderProduct): Promise<number> {
    const productInfo = await this.productRepo.findOne({
      attributes: ['productPrice'],
      where: { id: product.id },
    });
    if (!productInfo) {
      throw new NotFoundException('unhandled data');
    }

    const price = productInfo.productPrice;

    return price * product.quantity;
  }
}
