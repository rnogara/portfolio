import { Prisma } from '@prisma/client';

export class CreateContentDto {
  language: string;
  home: string;
  menu: string[];
  projects: string;
  about: Prisma.PortfolioContentAboutCreateNestedOneWithoutContentInput;
  skills: Prisma.PortfolioContentSkillsCreateNestedOneWithoutContentInput;
  contact: Prisma.PortfolioContentContactCreateNestedOneWithoutContentInput;
}
