import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  HasMany,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user';
import {
  Products,
  RestaurantTypesJunctions,
  RestaurantSettings,
  FavoriteRestaurants,
} from './index';

@Table
export class Restaurant extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @BelongsTo(() => User)
  user: User;

  @Column
  @ForeignKey(() => User)
  ownerId: number;

  @Column({ allowNull: false })
  address: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  phoneNumber: string;

  @HasMany(() => RestaurantTypesJunctions)
  types: RestaurantTypesJunctions[];

  @HasOne(() => RestaurantSettings)
  settings: RestaurantSettings;

  @HasMany(() => Products)
  products: Products[];

  @BelongsToMany(() => User, () => FavoriteRestaurants)
  users: User[];

  @HasOne(() => FavoriteRestaurants)
  favoriteRestaurants: FavoriteRestaurants;
}
