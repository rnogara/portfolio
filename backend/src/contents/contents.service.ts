import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentsService {
  constructor(private prisma: PrismaService) {}

  async getContent(language: string = 'pt-BR') {
    const content = this.prisma.portfolioContent.findUnique({
      where: { language },
    });
    return content;
  }

  async updateContent(updateContentDto: UpdateContentDto) {
    return this.prisma.portfolioContent.update({
      where: { language: updateContentDto.language },
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
