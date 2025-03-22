import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      return await this.authService.login({ loginAuthDto });
    } catch (error) {
      throw new HttpException(
        'Login failed: ' + error.message,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('create')
  async create(@Body() createAuthDto: CreateAuthDto) {
    try {
      await this.authService.create(createAuthDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create user: ' + error.message,
        HttpStatus.CONFLICT,
      );
    }
  }
}
