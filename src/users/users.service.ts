import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName, phone } = createUserDto;
    return this.userModel.create({
      email,
      password,
      firstName,
      lastName,
      phone,
    });
  }

  findAll() {
    return this.userModel.findAll();
  }

  async findById(id: string) {
    return await this.userModel.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
