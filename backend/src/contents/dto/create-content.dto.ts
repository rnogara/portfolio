import { Prisma } from '@prisma/client';

export class CreateContentDto {
  language: string;
  home: string;
  menu: string[];
  projects: string;
  icon: string;
  about: Prisma.PortfolioContentAboutCreateNestedOneWithoutContentInput;
  skills: Prisma.PortfolioContentSkillsCreateNestedOneWithoutContentInput;
  contact: Prisma.PortfolioContentContactCreateNestedOneWithoutContentInput;
}
