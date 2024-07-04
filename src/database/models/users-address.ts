import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user';
import { Orders } from './orders';

@Table
export class UserAddress extends Model<UserAddress> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  city: string;

  @Column
  street: string;

  @Column
  neighborhood: string;

  @Column
  lat: number;

  @Column
  lng: number;

  @Column
  @ForeignKey(() => User)
  userID: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Orders)
  orders: Orders[];
}
