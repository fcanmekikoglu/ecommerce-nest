import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserSignupDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  //signup
  async signup(userSignupDto: UserSignupDto) {
    //find user
    const user = await this.userService.findByEmail(userSignupDto.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    const password = await bcrypt.hash(userSignupDto.password, 10);

    return await this.userService.create({ ...userSignupDto, password });
  }
  //validate user

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const valid = await bcrypt.compare(password, user?.password);
    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
  }
  //login

  async login(user) {
    return {
      access_token: this.jwtService.sign({
        usermail: user.email,
        sub: user.id,
      }),
      user,
    };
  }
}
