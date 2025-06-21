import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';
import { ContentsModule } from './contents/contents.module';

@Module({
  imports: [ProjectsModule, PrismaModule, ContentsModule],
  providers: [ContentsService],
  controllers: [ContentsController],
})
export class AppModule {}
