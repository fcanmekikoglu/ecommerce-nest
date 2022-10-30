import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AreYouSure } from './dto/remove-user-check.dto';
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

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    console.log(id);
    await this.userModel.update(updateUserDto, { where: { id } });
    return this.findById(id);
  }

  async removeUser(id: number, areyousure: AreYouSure) {
    if (areyousure.areyousure === false) {
      return null;
    }
    await this.userModel.destroy({ where: { id } });
    return 'Profile deleted';
  }
}
