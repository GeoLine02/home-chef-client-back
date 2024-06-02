import { IsBoolean } from 'class-validator';

export class CardPaymentDTO {
  @IsBoolean()
  tokenizeCard: boolean;
}
