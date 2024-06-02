import { IsArray, IsNumber } from 'class-validator';
import { Products } from 'src/models';

interface CustomProductType {
  product: Products;
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  products: CustomProductType[];

  @IsNumber()
  userAddressID: number;
}
