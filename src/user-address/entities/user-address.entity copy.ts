import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({ tableName: 'user_address' })
export class UserAddress extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  line1: string;

  @Column
  line2: string;

  @Column
  city: string;

  @Column
  country: string;

  @Column
  postalCode: number;

  @Column
  phone_mobile: string;

  @Column
  phone_work: string;

  @Column
  email: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;
}
