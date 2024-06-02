import { IsArray, IsBoolean } from 'class-validator';
import { Products } from 'src/models';

export class CreatePaymentDto {
  @IsBoolean()
  tokenizeCard: boolean;

  @IsArray()
  cartItems: Products[];
}
