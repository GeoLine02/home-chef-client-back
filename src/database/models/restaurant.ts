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
  RestaurantAddress,
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

  @HasMany(() => RestaurantTypesJunctions)
  types: RestaurantTypesJunctions[];

  @HasOne(() => RestaurantAddress)
  restaurantAddress: RestaurantAddress;

  @HasOne(() => RestaurantSettings)
  settings: RestaurantSettings;

  @HasMany(() => Products)
  products: Products[];

  @BelongsToMany(() => User, () => FavoriteRestaurants)
  users: User[];

  @HasOne(() => FavoriteRestaurants)
  favoriteRestaurants: FavoriteRestaurants;
}
