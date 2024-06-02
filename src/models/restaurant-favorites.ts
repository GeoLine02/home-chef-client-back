import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Restaurant, User } from './index';

@Table({ timestamps: true })
export class FavoriteRestaurants extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userID: number;

  @BelongsTo(() => User, { as: 'user', foreignKey: 'userID' })
  user: User;

  @ForeignKey(() => Restaurant)
  @Column
  restaurantID: number;

  @BelongsTo(() => Restaurant, { as: 'favoriteRestaurant' })
  restaurants: Restaurant;
}
