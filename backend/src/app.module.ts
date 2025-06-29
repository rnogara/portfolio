import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';
import { ContentsModule } from './contents/contents.module';
import { AdminGuard } from './auth/admin.guard';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ProjectsModule,
    PrismaModule,
    ContentsModule,
    SkillsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    ContentsService,
    AdminGuard,
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  controllers: [ContentsController],
})
export class AppModule {}
