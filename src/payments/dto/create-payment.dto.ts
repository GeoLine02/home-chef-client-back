import { IsArray, IsBoolean } from 'class-validator';
import { Products } from 'src/database/models/index';

export class CreatePaymentDto {
  @IsBoolean()
  tokenizeCard: boolean;

  @IsArray()
  cartItems: Products[];
}
