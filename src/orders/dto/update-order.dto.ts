import { PartialType } from '@nestjs/mapped-types';
import { OrderDTO } from './create-order.dto';

export class UpdateOrderDto extends PartialType(OrderDTO) {}
