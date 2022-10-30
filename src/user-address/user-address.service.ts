import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './entities/user-address.entity copy';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAddress)
    private readonly userAddressModel: typeof UserAddress,
  ) {}

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

  findAll() {
    return `This action returns all userAddress`;
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
