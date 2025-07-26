import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import { jwtConstants } from './constants';
import { ProjectsModule } from '../projects/projects.module';
import { ContentsModule } from '../contents/contents.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ProjectsModule,
    ContentsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AdminGuard],
  exports: [AdminGuard],
})
export class AuthModule {}
