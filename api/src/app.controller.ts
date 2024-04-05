import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RegisterUserDto } from './auth/dto/register-user.dto';
import { LoginUserDto } from './auth/dto/login-user.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() user: LoginUserDto) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
