import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Restaurant } from './index';
import { TIME } from 'sequelize';

@Table
export class RestaurantSettings extends Model {
  @ForeignKey(() => Restaurant)
  @Column
  restaurantID: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @Column({ type: TIME, allowNull: false })
  workingFrom: string;

  @Column({ type: TIME, allowNull: false })
  workingTill: string;

  @Column({ defaultValue: true })
  isRestaurantActive: boolean;
}
