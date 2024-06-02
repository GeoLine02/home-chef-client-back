import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user';

@Table
export class UserPaymentMethod extends Model<UserPaymentMethod> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  source: string;

  @Column
  cardMask: string;

  @Column
  cardBrand: string;

  @Column({ unique: true })
  cardToken: string;

  @Column
  @ForeignKey(() => User)
  userID: number;

  @BelongsTo(() => User, { foreignKey: 'userID' })
  user: User;
}
