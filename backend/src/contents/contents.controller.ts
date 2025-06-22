import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  HttpCode,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/admin.guard';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get('content/:language')
  @HttpCode(HttpStatus.OK)
  async getContent(@Param('language') language: string) {
    const content = await this.contentsService.getContent(language);
    if (!content) {
      throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
    }
    return content;
  }

  @Post('content')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  async createContent(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.createContent(createContentDto);
  }

  @Put('content/:language')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  async updateContent(
    @Param('language') language: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    const content = await this.contentsService.updateContent({
      ...updateContentDto,
      language,
    });
    if (!content) {
      throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
    }
    return content;
  }

  @Delete('content/:language')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AdminGuard)
  async deleteContent(@Param('language') language: string) {
    const content = await this.contentsService.deleteContent(language);
    if (!content) {
      throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
    }
    return content;
  }
}
