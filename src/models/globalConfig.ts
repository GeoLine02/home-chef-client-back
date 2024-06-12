import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class GlobalConfig extends Model {
  @PrimaryKey
  @Column({ unique: true })
  id: number;
  key: string;

  @Column
  value: string;
}
