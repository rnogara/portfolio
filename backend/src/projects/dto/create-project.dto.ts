import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  titlePt: string;

  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @IsString()
  @IsNotEmpty()
  descriptionPt: string;

  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @IsString()
  @IsNotEmpty()
  technologiesTitlePt: string;

  @IsString()
  @IsNotEmpty()
  technologiesTitleEn: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  technologies: string[];

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  githubUrl: string;

  @IsString()
  videoUrl?: string;

  @IsString()
  siteUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  rate: number;
}
