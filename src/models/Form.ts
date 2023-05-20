import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
  ForeignKey,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { Property } from "./Property";
import { Broker } from "./Broker";
import { User } from "./User";

enum TypeVivienda {
  CASA = "casa",
  PH = "ph",
  DEPARTAMENTO = "departamento",
  EDIFICIO = "edificio",
  LOCAL = "local",
  INDUSTRIA = "industria",
  OFICINA = "oficina",
  LOFT = "loft",
  TERRENO = "terreno",
}

@Table({ timestamps: true })
//Almacena todas las OPERACIONES
export default class Form extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id!: BigInteger;

  //Mercado  Pago
  @Column({
    allowNull: true,
    type: DataType.ENUM("vender", "tasar", "rentar"),
  })
  title!: string;

  @Column({ allowNull: true })
  description!: string;

  @Column({ allowNull: true, type: DataType.ARRAY(DataType.JSON) })
  picture_url!: object;

  @Column({ type: DataType.INTEGER, allowNull: true })
  unit_price!: BigInteger;

  //Datos usuario
  @Column({ type: DataType.INTEGER, allowNull: false })
  dni!: BigInteger;

  @Column({ type: DataType.INTEGER, allowNull: false })
  tel!: BigInteger;

  //Tipo de propiedad
  @Column({
    allowNull: false,
    type: DataType.ENUM("local", "industria", "vivienda", "oficina"),
  })
  type_prop!: string;

  @Column({
    type: DataType.ENUM(...Object.values(TypeVivienda)),
    allowNull: false,
  })
  type_vivienda!: TypeVivienda;

  // Detalles Propiedad
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number!: BigInteger;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  apartment!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  floor!: BigInteger;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  province!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postalCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  preferenceIdMP!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  payed!: string;

  // RELACIIONAR CON USER (USUARIO)
  @ForeignKey(() => User)
  @Column
  userId!: BigInteger;

  @BelongsTo(() => User)
  user!: User;

  // RELACIONAR CON BROKER (EMPLEADO)
  @ForeignKey(() => Broker)
  @Column
  brokerId!: BigInteger;

  @BelongsTo(() => Broker)
  broker!: Broker;
}
