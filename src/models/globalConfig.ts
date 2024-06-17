import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'GlobalConfigs' })
export class GlobalConfigs extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  key: string;

  @Column({ type: DataType.STRING, allowNull: false })
  value: string;
}
