import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserSignupDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userSignupDto: UserSignupDto) {
    //find user
    const user = await this.userService.findByEmail(userSignupDto.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    let { password, ...rest } = userSignupDto;
    password = await bcrypt.hash(userSignupDto.password, 10);
    return await this.userService.create({
      password,
      ...rest,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const valid = await bcrypt.compare(password, user?.password);
    if (user && valid) {
      const {
        id,
        email,
        password,
        firstName,
        lastName,
        phone,
        createdAt,
        updatedAt,
        roles,
      } = user;
      const returnUser = {
        id,
        email,
        firstName,
        lastName,
        phone,
        createdAt,
        updatedAt,
        roles,
      };
      return returnUser;
    }
    throw new UnauthorizedException();
  }

  async createToken(user: User) {
    return {
      access_token: this.jwtService.sign({
        role: user.roles,
        email: user.email,
        sub: user.id,
      }),
      user,
    };
  }
}
