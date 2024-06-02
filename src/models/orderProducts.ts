import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Orders, Products } from '../models/index';
@Table
export class OrderProducts extends Model<OrderProducts> {
  @Column
  @ForeignKey(() => Orders)
  orderID: number;

  @BelongsTo(() => Orders)
  orders: Orders;

  @Column
  @ForeignKey(() => Products)
  productID: number;

  @BelongsTo(() => Products)
  products: Products;
}
