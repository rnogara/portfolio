'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Language, PortfolioContent, Project } from '@/app/types';
import { api } from '@/app/lib/api';
import { detectUserLanguage } from '@/app/services/languageDetector';

interface PortfolioContextType {
  content: PortfolioContent | undefined;
  languages: Language[];
  projects: Project[];
  loading: boolean;
  error: string | null;
  currentLanguage: string;
  refreshContent: (language: string) => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>('');

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const response = await api.get<Language[]>('/contents');
      setLanguages(response.data);
    } catch (err) {
      setError('Failed to fetch languages');
      console.error('Error fetching languages:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async (language: string) => {
    try {
      setLoading(true);
      const response = await api.get<PortfolioContent>(`/contents/${language}`);
      setContent(response.data);
      setCurrentLanguage(language);
    } catch (err) {
      setError('Failed to fetch portfolio data');
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get<Project[]>('/projects');
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAllImagesLoaded = () => {
      const images = document.querySelectorAll('img');
      if (images.length === 0) return true;
      
      return Array.from(images).every(img => img.complete);
    };

    const waitForImages = () => {
      return new Promise<void>((resolve) => {
        const check = () => {
          if (checkAllImagesLoaded()) {
            resolve();
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });
    };

    const initializeContent = async () => {
      try {
        setLoading(true);
        const userLanguage = await detectUserLanguage();
        await Promise.all([
          fetchContent(userLanguage),
          fetchProjects(),
          fetchLanguages()
        ]);

        // Wait for all images to load
        await waitForImages();
      } catch (error) {
        console.error('Error initializing content:', error);
        // Fallback to English in case of error
        await Promise.all([
          fetchContent('en'),
          fetchProjects(),
          fetchLanguages()
        ]);
      } finally {
        setLoading(false);
      }
    };

    initializeContent();
  }, []);

  const refreshContent = async (language: string) => {
    await fetchContent(language);
  };

  const refreshProjects = async () => {
    await fetchProjects();
  };

  return (
    <PortfolioContext.Provider
      value={{
        content,
        projects,
        languages,
        loading,
        error,
        currentLanguage,
        refreshContent,
        refreshProjects,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
