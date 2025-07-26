import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(createProjectDto: CreateProjectDto) {
    return this.prisma.portfolioProject.create({
      data: createProjectDto,
    });
  }

  async getAllProjects() {
    return this.prisma.portfolioProject.findMany();
  }

  async getProjectById(id: string) {
    return this.prisma.portfolioProject.findUnique({
      where: { id },
    });
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.portfolioProject.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async deleteProject(id: string) {
    return this.prisma.portfolioProject.delete({
      where: { id },
    });
  }
}
