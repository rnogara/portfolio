import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Get,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  private readonly ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  private readonly ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
  private readonly JWT_EXPIRES_IN = '24h';
  private readonly jwtConstants = {
    secret: process.env.JWT_SECRET,
  };
  private readonly NODE_ENV = process.env.NODE_ENV;
  private readonly VERCEL_URL = process.env.VERCEL_URL;

  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  async login(
    @Body() { username, password }: { username: string; password: string },
    @Res() res: Response,
  ) {
    if (!this.jwtConstants.secret) {
      throw new HttpException(
        'Server configuration error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      this.ADMIN_PASSWORD_HASH as string,
    );

    if (username === this.ADMIN_USERNAME && isPasswordValid) {
      const token = this.jwtService.sign(
        { username },
        {
          secret: this.jwtConstants.secret,
          expiresIn: this.JWT_EXPIRES_IN,
        },
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: this.NODE_ENV === 'production',
        sameSite: this.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        domain: this.NODE_ENV === 'production' ? this.VERCEL_URL : undefined,
        path: '/',
      });

      return res.status(200).json({ success: true });
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: this.NODE_ENV === 'production',
      sameSite: this.NODE_ENV === 'production' ? 'none' : 'lax',
      domain:
        this.NODE_ENV === 'production' && this.VERCEL_URL
          ? this.VERCEL_URL.replace('https://', '').replace('http://', '')
          : undefined,
      path: '/',
    });
    return res.status(200).json({ success: true });
  }

  @Get('check')
  checkAuth(@Req() req: Request) {
    const token = req.cookies?.auth_token as string;

    if (!token) {
      return { isAuthenticated: false };
    }

    try {
      if (!this.jwtConstants.secret) {
        throw new Error('JWT_SECRET not configured');
      }

      this.jwtService.verify(token, { secret: this.jwtConstants.secret });
      return { isAuthenticated: true };
    } catch (error) {
      console.error(error);
      return { isAuthenticated: false };
    }
  }
}
