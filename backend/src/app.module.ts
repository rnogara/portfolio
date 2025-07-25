import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ContentsModule } from './contents/contents.module';
import { AdminGuard } from './auth/admin.guard';
import { SkillsModule } from './skills/skills.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProjectsModule,
    PrismaModule,
    ContentsModule,
    SkillsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    AdminGuard,
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
})
export class AppModule {}
