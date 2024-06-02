import {
  Column,
  Table,
  ForeignKey,
  PrimaryKey,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Orders, Restaurant, OrderProducts } from './index';

@Table
export class Products extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  @ForeignKey(() => Restaurant)
  restaurantID: number;

  @Column
  productName: string;

  @Column
  productDescription: string;

  @Column
  productComposition: string;

  @Column
  productPrice: number;

  @Column
  productPhoto: string;

  @BelongsToMany(() => Orders, () => OrderProducts)
  orders: Orders[];
}
