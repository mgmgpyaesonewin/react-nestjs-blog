import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      if (await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.create(registerUserDto);
    return user;
  }
}
