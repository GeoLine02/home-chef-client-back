import {
  Column,
  HasMany,
  Model,
  Table,
  PrimaryKey,
} from 'sequelize-typescript';
import { RestaurantTypesJunctions } from './index';

@Table
export class RestaurantTypes extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column({ allowNull: false, unique: true })
  typeName: string;

  @Column({ allowNull: false, unique: true })
  typeNameRU: string;

  @HasMany(() => RestaurantTypesJunctions)
  junctions: RestaurantTypesJunctions[];
}
