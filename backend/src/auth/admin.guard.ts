import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

interface LoginDto {
  username: string;
  password: string;
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request<object, object, LoginDto>>();
    const { username, password } = request.body;

    if (!username || !password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (!adminUsername || !adminPassword) {
      throw new HttpException(
        'Admin credentials not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (username !== adminUsername || password !== adminPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
