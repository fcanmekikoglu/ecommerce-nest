import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Role } from './auth/role.enum';
import { Roles } from './auth/roles.decorator';
import { AreYouSure } from './users/dto/remove-user-check.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UsersService } from './users/users.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

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

  // POST/profile/address
  // GET/profile/address
  // GET/profile/address/:id
}
