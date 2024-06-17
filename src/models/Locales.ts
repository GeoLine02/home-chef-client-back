import { Column, Model, PrimaryKey, Table, HasOne } from 'sequelize-typescript';
import { RestaurantAddress } from './restaurantAddress';

@Table
export class Locales extends Model<Locales> {
  @PrimaryKey
  @Column
  id: number;

  @Column({ unique: true })
  countryName: string;

  @Column
  countryShortHand: string;

  @Column({ unique: true })
  capital: string;

  @Column
  currency: string;

  @Column
  language: string;

  @Column
  phone: string;

  @HasOne(() => RestaurantAddress)
  restaurantLocale: RestaurantAddress;
}
