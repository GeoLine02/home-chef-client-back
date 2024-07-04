import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Months extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  month: string;
}
