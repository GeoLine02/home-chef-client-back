import {
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsInt,
  Min,
  IsLongitude,
  IsLatitude,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderProduct {
  @IsInt()
  id: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

class GeoLocation {
  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;
}

export class OrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  @IsNotEmpty()
  orderProducts: OrderProduct[];

  @ValidateNested()
  @Type(() => GeoLocation)
  pickupLocation: GeoLocation;

  @ValidateNested()
  @Type(() => GeoLocation)
  deliveryLocation: GeoLocation;

  @IsNumber()
  orderKG: number;
}
