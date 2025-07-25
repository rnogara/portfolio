import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = request.headers.cookie?.split(';').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );

    const token = cookies?.auth_token;

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const payload: { username: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );
      if (payload?.username) {
        const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
        if (payload.username === adminUsername) {
          return true;
        }
      }

      throw new UnauthorizedException('Invalid token');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Authentication error:', error.message);
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
