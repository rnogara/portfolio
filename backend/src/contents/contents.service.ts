import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(private prisma: PrismaService) {}

  async getContent(language: string) {
    const content = await this.prisma.portfolioContent.findUnique({
      where: { language },
      select: {
        language: true,
        home: true,
        menu: true,
        projects: true,
        icon: true,
        about: {
          include: {
            experience: true,
            education: true,
          },
        },
        skills: true,
        contact: true,
      },
    });
    return content;
  }

  async getAllLanguages() {
    const languages = await this.prisma.portfolioContent.findMany({
      select: {
        language: true,
        icon: true,
      },
    });
    return languages;
  }

  async updateContent(language: string, updateContentDto: UpdateContentDto) {
    return this.prisma.portfolioContent.update({
      where: { language },
      data: updateContentDto,
    });
  }

  async createContent(createContentDto: CreateContentDto) {
    return this.prisma.portfolioContent.create({
      data: createContentDto,
    });
  }

  async deleteContent(language: string) {
    return this.prisma.portfolioContent.delete({
      where: { language },
    });
  }
}
