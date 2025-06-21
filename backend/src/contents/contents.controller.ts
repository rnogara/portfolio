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
} from '@nestjs/common';
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
  async createContent(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.createContent(createContentDto);
  }

  @Put('content/:language')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async deleteContent(@Param('language') language: string) {
    const content = await this.contentsService.deleteContent(language);
    if (!content) {
      throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
    }
    return content;
  }
}
