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
export interface Contact {
  id?: string;
  title: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  formButton: string;
  formSuccess: string;
  formError: string;
  formLabelName: string;
  formLabelEmail: string;
  formLabelMessage: string;
  formNameError: string;
  formEmailError: string;
  formMessageError: string;
  github: string;
  linkedin: string;
  email: string;
  phone: string;
}

export interface Skill {
  id?: string;
  title: string;
  tech: string[];
  tools: string[];
  concepts: string[];
  soft: string[];
  chartTitle: string;
}
export interface Experience {
  id?: string;
  company: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  description: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  periodStart: string;
  periodEnd: string;
  relevant: string[];
}
export interface About  {
  id?: string;
  title: string;
  educationBtn: string;
  experienceBtn: string;
  cvUrl: string;
  cvBtn: string;
  education: Education[];
  experience: Experience[];
}
export interface PortfolioContent {
  id: string;
  language: string;
  home: string;
  menu: string[];
  projects: string;
  icon: string;
  error404: string[];
  errorPage: string[];
  about: About;
  contact: Contact;
  skills: Skill;
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

export interface User {
  username: string;
  password: string;
}
