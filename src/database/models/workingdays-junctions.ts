import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
// import { Restaurant, RestaurantWorkingDays } from './index';

// @Table
// export class RestaurantWorkingDaysJunctions extends Model {
//   @Column
//   @ForeignKey(() => RestaurantWorkingDays)
//   workingDaysID: number;

//   @Column
//   @ForeignKey(() => Restaurant)
//   restaurantID: number;

//   @BelongsTo(() => RestaurantWorkingDays)
//   wokringDays: RestaurantWorkingDays;
// }
