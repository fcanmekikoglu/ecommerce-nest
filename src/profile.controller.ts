import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Role } from './auth/role.enum';
import { Roles } from './auth/roles.decorator';
import { CreateUserAddressDto } from './user-address/dto/create-user-address.dto';
import { DeleteAddressDto } from './user-address/dto/delete-user-address.dto';
import { UpdateUserAddressDto } from './user-address/dto/update-user-address.dto';
import { UserAddressService } from './user-address/user-address.service';
import { AreYouSure } from './users/dto/remove-user-check.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UsersService } from './users/users.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly usersService: UsersService,
    private readonly addressService: UserAddressService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get()
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Patch()
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete()
  deleteProfile(@Request() req, @Body() areyousure: AreYouSure) {
    return this.usersService.removeUser(req.user.id, areyousure);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('address')
  createAddress(
    @Request() req,
    @Body() createUserAddressDto: CreateUserAddressDto,
  ) {
    return this.addressService.create(req.user.id, createUserAddressDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('address')
  getAddresses(@Request() req) {
    return this.addressService.getAddresses(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Patch('address')
  updateAddresses(
    @Request() req,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.addressService.updateAddress(
      updateUserAddressDto.id,
      updateUserAddressDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('address')
  deleteAddress(@Request() req, @Body() deleteAddressDto: DeleteAddressDto) {
    return this.addressService.deleteAddress(
      deleteAddressDto.id,
      deleteAddressDto.areyousure,
    );
  }
}
