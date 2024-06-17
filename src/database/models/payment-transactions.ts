import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User, UserPaymentMethod } from './index';

@Table
export class PaymentTransactions extends Model<PaymentTransactions> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  cardMask: string;

  @Column
  amount: number;

  @Column
  finalAmount: number;

  @Column
  commitDate: string;

  @Column
  type: string;

  @Column
  currency: string;

  @Column
  amountRefunded: number;

  @Column
  refundable: boolean;

  @Column
  paymentDate: string;

  @Column
  status: string;

  @ForeignKey(() => User)
  @Column
  userID: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => UserPaymentMethod)
  @Column
  userPaymentMethodID: number;

  @BelongsTo(() => UserPaymentMethod, {
    foreignKey: 'userPaymentMethodID', // Corrected foreign key
  })
  userPaymentMethod: UserPaymentMethod;
}
