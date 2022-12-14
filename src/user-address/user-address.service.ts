import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './entities/user-address.entity copy';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAddress)
    private readonly userAddressModel: typeof UserAddress,
    private readonly userService: UsersService,
  ) {}

  async checkAddressOwnership(user_id: string, address_id: string) {
    const address = await this.userAddressModel.findOne({
      where: { id: address_id },
    });
    const { id, userId } = address;
    if (user_id === userId) {
      return true;
    }
    return false;
  }

  create(userId: string, createUserAddressDto: CreateUserAddressDto) {
    const {
      address_title,
      line1,
      line2,
      city,
      country,
      postal_code,
      phone_mobile,
      phone_work,
      email,
    } = createUserAddressDto;

    return this.userAddressModel.create({
      userId,
      address_title,
      line1,
      line2,
      city,
      country,
      postal_code,
      phone_mobile,
      phone_work,
      email,
    });
  }

  getAddresses(userId: string) {
    return this.userAddressModel.findAll({ where: { userId } });
  }

  async findAll() {
    return await this.userAddressModel.findAll();
  }

  async updateAddress(id: string, updateUserAddressDto: UpdateUserAddressDto) {
    await this.userAddressModel.update(updateUserAddressDto, {
      where: { id },
    });
    return this.userAddressModel.findByPk(id);
  }

  async deleteAddress(id, areyousure) {
    if (areyousure === true) {
      await this.userAddressModel.destroy({ where: { id } });
      return 'Address deleted!';
    }
    return null;
  }
}
