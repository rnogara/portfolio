'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Experience, Education, Contact, Skill, PortfolioContent, About } from '../types';

type AdminContextType = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  projectId: string | null;
  setProjectId: (id: string | null) => void;
  contentId: string | null;
  setContentId: (id: string | null) => void;
  experienceId: string | null;
  setExperienceId: (id: string | null) => void;
  educationId: string | null;
  setEducationId: (id: string | null) => void;
  contentIsOpen: string | null;
  setContentIsOpen: (id: string | null) => void;
  experience: Experience[] | null;
  setExperience: (experience: Experience[] | null) => void;
  education: Education[] | null;
  setEducation: (education: Education[] | null) => void;
  contact: Contact | null;
  setContact: (contact: Contact | null) => void;
  skills: Skill | null;
  setSkills: (skills: Skill | null) => void;
  about: About | null;
  setAbout: (about: About | null) => void;
  contentForm: PortfolioContent | null;
  setContentForm: (contentForm: PortfolioContent | null) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState('Projects');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [contentId, setContentId] = useState<string | null>(null);
  const [experienceId, setExperienceId] = useState<string | null>(null);
  const [educationId, setEducationId] = useState<string | null>(null);
  const [contentIsOpen, setContentIsOpen] = useState<string | null>(null);
  const [experience, setExperience] = useState<Experience[] | null>(null);
  const [education, setEducation] = useState<Education[] | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [skills, setSkills] = useState<Skill | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [contentForm, setContentForm] = useState<PortfolioContent | null>(null);

  return (
    <AdminContext.Provider 
      value={{
        selectedTab,
        setSelectedTab,
        contentIsOpen,
        setContentIsOpen,
        projectId,
        setProjectId,
        contentId,
        setContentId,
        experienceId,
        setExperienceId,
        educationId,
        setEducationId,
        experience,
        setExperience,
        education,
        setEducation,
        contact,
        setContact,
        skills,
        setSkills,
        about,
        setAbout,
        contentForm,
        setContentForm,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
