import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAddress } from './entities/user-address.entity copy';

@Module({
  imports: [SequelizeModule.forFeature([UserAddress])],
  controllers: [UserAddressController],
  providers: [UserAddressService],
  exports: [UserAddressService],
})
export class UserAddressModule {}
