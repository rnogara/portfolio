import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Body,
  Post,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/admin.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProjectById(@Param('id') id: string) {
    const project = await this.projectsService.getProjectById(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectsService.createProject(createProjectDto);
    if (!project) {
      throw new HttpException('Project already exists', HttpStatus.BAD_REQUEST);
    }
    return project;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.updateProject(
      id,
      updateProjectDto,
    );
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AdminGuard)
  async deleteProject(@Param('id') id: string) {
    const project = await this.projectsService.deleteProject(id);
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }
}
