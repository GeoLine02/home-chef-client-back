import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { Restaurant, RestaurantTypes } from './index';

@Table
export class RestaurantTypesJunctions extends Model {
  @Column
  @ForeignKey(() => RestaurantTypes)
  typeID: number;

  @Column
  @ForeignKey(() => Restaurant)
  restaurantID: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @BelongsTo(() => RestaurantTypes)
  types: RestaurantTypes;
}
