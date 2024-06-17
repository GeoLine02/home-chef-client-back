import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Products, User, UserAddress, UserPaymentMethod } from './index';
import { OrderProducts } from './orderProducts';

@Table({ timestamps: true })
export class Orders extends Model<Orders> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  deliveryAmount: number;

  @Column
  amount: number;

  @Column
  totalAmount: number;

  @Column
  status: string;

  //here we can use database normalization principles to avoid repeating data

  @Column
  @ForeignKey(() => UserAddress)
  userAddressID: number;

  @BelongsTo(() => UserAddress)
  userAddress: UserAddress;

  @Column
  @ForeignKey(() => User)
  userID: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  @ForeignKey(() => UserPaymentMethod)
  userPaymentMethodID: number;

  @BelongsToMany(() => Products, () => OrderProducts)
  products: Products[];

  @CreatedAt
  createdAt?: any;

  @UpdatedAt
  updatedAt?: any;

  @DeletedAt
  deletedAt?: any;
}
