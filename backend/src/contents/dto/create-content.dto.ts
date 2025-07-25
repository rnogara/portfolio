export class CreateContentDto {
  language: string;
  home: string;
  menu: string[];
  projects: string;
  icon: string;
  about: {
    title: string;
    educationBtn: string;
    experienceBtn: string;
    cvUrl: string;
    cvBtn: string;
    experience: {
      company: string;
      title: string;
      periodStart: string;
      periodEnd: string;
      description: string;
    }[];
    education: {
      institution: string;
      degree: string;
      periodStart: string;
      periodEnd: string;
      relevant: string[];
    }[];
  };
  skills: {
    title: string;
    chartTitle: string;
    tech: string[];
    tools: string[];
    concepts: string[];
    soft: string[];
  };
  contact: {
    title: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formButton: string;
    formLabelName: string;
    formLabelEmail: string;
    formLabelMessage: string;
    formNameError: string;
    formEmailError: string;
    formMessageError: string;
    formSuccess: string;
    formError: string;
    linkedin: string;
    github: string;
    email: string;
    phone: string;
  };
}
