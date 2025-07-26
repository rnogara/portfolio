// backend/src/skills/skills.module.ts
import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';

@Module({
  controllers: [SkillsController],
})
export class SkillsModule {}
