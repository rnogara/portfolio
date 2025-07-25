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
        id: true,
        language: true,
        home: true,
        menu: true,
        projects: true,
        icon: true,
        errorPage: true,
        error404: true,
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

  async getAllContents() {
    const contents = await this.prisma.portfolioContent.findMany({
      select: {
        id: true,
        language: true,
        home: true,
        menu: true,
        projects: true,
        icon: true,
        errorPage: true,
        error404: true,
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
    return contents;
  }

  async updateContent(language: string, updateContentDto: UpdateContentDto) {
    const { about, skills, contact, ...rest } = updateContentDto;

    return this.prisma.portfolioContent.update({
      where: { language },
      data: {
        ...rest,
        ...(about && {
          about: {
            update: {
              ...about,
              ...(about.experience && {
                experience: {
                  deleteMany: {},
                  create: about.experience,
                },
              }),
              ...(about.education && {
                education: {
                  deleteMany: {},
                  create: about.education,
                },
              }),
            },
          },
        }),
        ...(skills && {
          skills: {
            update: skills,
          },
        }),
        ...(contact && {
          contact: {
            update: contact,
          },
        }),
      },
      include: {
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
  }

  async createContent(createContentDto: CreateContentDto) {
    const { about, skills, contact, ...contentData } = createContentDto;

    const experienceData = about?.experience
      ? (Array.isArray(about.experience)
          ? about.experience
          : [about.experience]
        ).map((exp) => ({
          company: exp.company,
          title: exp.title,
          periodStart: exp.periodStart,
          periodEnd: exp.periodEnd,
          description: exp.description,
        }))
      : [];

    const educationData = about?.education
      ? (Array.isArray(about.education)
          ? about.education
          : [about.education]
        ).map((edu) => ({
          institution: edu.institution,
          degree: edu.degree,
          periodStart: edu.periodStart,
          periodEnd: edu.periodEnd,
          relevant: edu.relevant || [],
        }))
      : [];

    return this.prisma.portfolioContent.create({
      data: {
        ...contentData,
        ...(about && {
          about: {
            create: {
              title: about.title || '',
              educationBtn: about.educationBtn || '',
              experienceBtn: about.experienceBtn || '',
              cvUrl: about.cvUrl || '',
              cvBtn: about.cvBtn || '',
              ...(experienceData.length > 0 && {
                experience: { create: experienceData },
              }),
              ...(educationData.length > 0 && {
                education: { create: educationData },
              }),
            },
          },
        }),
        ...(skills && {
          skills: {
            create: {
              title: skills.title || '',
              chartTitle: skills.chartTitle || '',
              tech: skills.tech || [],
              tools: skills.tools || [],
              concepts: skills.concepts || [],
              soft: skills.soft || [],
            },
          },
        }),
        ...(contact && {
          contact: {
            create: {
              title: contact.title || '',
              formName: contact.formName || '',
              formEmail: contact.formEmail || '',
              formMessage: contact.formMessage || '',
              formButton: contact.formButton || '',
              formLabelName: contact.formLabelName || '',
              formLabelEmail: contact.formLabelEmail || '',
              formLabelMessage: contact.formLabelMessage || '',
              formNameError: contact.formNameError || '',
              formEmailError: contact.formEmailError || '',
              formMessageError: contact.formMessageError || '',
              formSuccess: contact.formSuccess || '',
              formError: contact.formError || '',
              linkedin: contact.linkedin || '',
              github: contact.github || '',
              email: contact.email || '',
              phone: contact.phone || '',
            },
          },
        }),
      },
      include: {
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
  }

  async deleteContent(language: string) {
    return this.prisma.portfolioContent.delete({
      where: { language },
    });
  }
}
