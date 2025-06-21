import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDto } from '../dto/create-content.dto';

export class UpdateContentDto extends PartialType(CreateContentDto) {}
