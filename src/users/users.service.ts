import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(input) {
    console.log(input);
    const { email, password, firstName, lastName, phone } = input;
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
    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      return user;
    }
    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
