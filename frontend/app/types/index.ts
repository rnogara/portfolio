export interface Project {
  id: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  moreBtnPt: string;
  moreBtnEn: string;
  technologiesTitlePt: string;
  technologiesTitleEn: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  videoUrl?: string;
  siteUrl?: string;
  rate: number;
}

export interface CreateProjectDto {
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  videoUrl?: string;
  siteUrl?: string;
  rate: number;
}

export interface PortfolioContent {
  id: string;
  language: string;
  home: string;
  menu: string[];
  projects: string;
  icon: string;
  about?: {
    title: string;
    educationBtn: string;
    experienceBtn: string;
    cvUrl: string;
    story: string;
    experience: Experience[];
    education: Education[];
  };
  skills?: {
    title: string;
    tech: string[];
    tools: string[];
    concepts: string[];
    soft: string[];
    chartTitle: string;
  };
  contact?: {
    title: string;
    formName: string;
    formEmail: string;
    formMessage: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  periodStart: string;
  periodEnd: string;
  relevant: string[];
}

export interface Language {
  language: string;
  icon: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface ErrorMessage {
  response: {
    data: {
      message: string
    }
  }
}

export interface WakaTimeLanguage {
  color: string;
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
}

export interface SvglApiResponse {
  id: number;
  title: string;
  category: string;
  route: {
    light: string;
    dark: string;
  } | string;
  wordmark?:
    | {
        light: string;
        dark: string;
      }
    | string;
  url: string;
}