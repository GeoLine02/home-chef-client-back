import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class GlobalConfig extends Model {
  @Column({ unique: true })
  @PrimaryKey
  id: number;
  key: string;

  @Column
  value: string;
}
