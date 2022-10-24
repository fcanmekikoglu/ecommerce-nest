import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/auth/role.enum';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  phone: number;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.User,
  })
  roles: Role[];
}
