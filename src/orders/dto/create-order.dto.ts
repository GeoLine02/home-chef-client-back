import {
  IsArray,
  IsNotEmpty,
  IsObject,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  IsInt,
  Min,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IOrder,
  IOrderProduct,
  IDeliveryPoint,
  IDeliveryOptions,
} from '../interfaces/order.interfaces';

export class OrderProduct implements IOrderProduct {
  @IsInt()
  id: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class DeliveryPointDTO implements IDeliveryPoint {
  @IsString()
  @IsNotEmpty()
  address: string;
}

export class DeliveryOptionsDTO implements IDeliveryOptions {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeliveryPointDTO)
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  points: DeliveryPointDTO[];
}

export class OrderDTO implements IOrder {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  @IsNotEmpty()
  orderProducts: OrderProduct[];

  @IsObject()
  @ValidateNested()
  @Type(() => DeliveryOptionsDTO)
  @IsNotEmpty()
  deliveryOptions: DeliveryOptionsDTO;

  @IsOptional()
  @IsString()
  userAddressID: number;
}
