import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
} from "sequelize-typescript";
import Form from "./Form";
import { Signal } from "./Signal";
@Table({
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id!: number;

  //Modificado tipo enum que sea cliente o proveedor
  @Column({
    allowNull: false,
    type: DataType.ENUM("Cliente", "Proveedor"),
    defaultValue: "Cliente",
  })
  rol!: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({ allowNull: true })
  password!: string;

  //Modificado tipo enum que sea persona fisica o persona juridica
  @Column({
    allowNull: false,
    type: DataType.ENUM("Persona Fisica", "Persona Juridica"),
    defaultValue: "Persona Fisica",
  })
  person_type!: string;

  @Column({ allowNull: false })
  name!: string;

  @Column({
    allowNull: false,
    defaultValue: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
  })
  avatar!: string;
  @Column({
    allowNull: true,
    defaultValue: null,
  })
  hashgoogle!: string;

  //Agrega todas las Operaciones del usuario (vender, rentar, tasar)
  @HasMany(() => Form)
  properties!: Form[];

  @HasMany(() => Signal)
  signals!: Signal[];
}
