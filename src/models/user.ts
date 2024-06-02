import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  Restaurant,
  FavoriteRestaurants,
  UserAddress,
  PaymentTransactions,
  UserPaymentMethod,
} from './index';
import { Orders } from './orders';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  RESTAURANT_ADMIN = 'restaurant_owner',
}

@Table
export class User extends Model<User> {
  @Column({ allowNull: false, unique: true })
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  phoneNumber: string;

  @Column({
    type: 'enum',
    values: Object.values(UserRole),
    defaultValue: UserRole.USER,
  })
  role: UserRole;

  // @Column({ allowNull: true })
  // city: string;

  // @Column({ allowNull: true })
  // address: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isAccountActive: boolean;

  @HasOne(() => Restaurant)
  restaurants: Restaurant[];

  @HasMany(() => FavoriteRestaurants)
  favoriteRestaurants: FavoriteRestaurants[];

  @HasMany(() => UserAddress)
  address: UserAddress[];

  @HasMany(() => PaymentTransactions, { as: 'paymentTransactions' })
  paymentTransactions: PaymentTransactions[];

  @HasMany(() => UserPaymentMethod)
  paymentMethods: UserPaymentMethod[];

  @HasMany(() => Orders)
  orders: Orders[];
}
