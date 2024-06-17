import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Restaurant } from './index';
import { Locales } from './index';

@Table
export class RestaurantAddress extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Restaurant)
  @Column
  restaurantID: number;

  @ForeignKey(() => Locales)
  @Column
  countryID: number;

  @Column
  address: string;

  @Column({
    type: DataType.DECIMAL(10, 8),
  })
  latitude: number;

  @Column({
    type: DataType.DECIMAL(11, 8),
  })
  longitude: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @BelongsTo(() => Locales)
  locale: Locales;
}
