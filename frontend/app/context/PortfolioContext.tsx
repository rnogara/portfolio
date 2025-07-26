'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { PortfolioContent, Project, SvglApiResponse, WakaTimeLanguage } from '@/app/types';
import { api, ContentsService, ProjectService } from '@/app/lib/api';
import { detectUserLanguage } from '@/app/services/languageDetector';
import fetchJsonp from 'fetch-jsonp';
import { useTheme } from './theme';

interface PortfolioContextType {
  content: PortfolioContent | undefined;
  wakaTimeData: WakaTimeLanguage[];
  projects: Project[];
  contents: PortfolioContent[];
  skillIcons: Map<string, string | null>;
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
  const [contents, setContents] = useState<PortfolioContent[]>([]);
  const [skillIcons, setSkillIcons] = useState<Map<string, string>>(new Map());
  const [wakaTimeData, setWakaTimeData] = useState<WakaTimeLanguage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>('');
  const { theme } = useTheme();

  const fetchAllContents = async () => {
    try {
      setLoading(true);
      const response = await ContentsService.getAllContents();
      setContents(response);
    } catch (err) {
      setError('Failed to fetch contents');
      console.error('Error fetching contents:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async (language: string) => {
    try {
      setLoading(true);
      const response = await ContentsService.getContent(language);
      setContent(response);
      setCurrentLanguage(language);
      return response;
    } catch (err) {
      setError('Failed to fetch portfolio data');
      console.error('Error fetching portfolio:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSkillIcons = async () => {
    try {
      const response = await api.get<SvglApiResponse[]>('/skills/icons/all');
      const iconMap = new Map(
        response.data.map(item => {
          if (typeof item.route === 'string') {
            return [item.title.toLowerCase(), item.route];
          }
          return [item.title.toLowerCase(), item.route.dark];
        })
      );
    setSkillIcons(iconMap);
    } catch (error) {
      console.error('Error fetching all skill icons:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true); 
      const response = await ProjectService.getAllProjects();
      setProjects(response);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWakaTimeData = async () => {
    const wakatimeUrl = process.env.NEXT_PUBLIC_WAKATIME_URL;
    if (!wakatimeUrl) {
      console.error('WAKATIME_URL is not defined in environment variables.');
      return;
    }

    try {
      const response = await fetchJsonp(wakatimeUrl, {
        timeout: 5000,
      });
      const data = await response.json();
      setWakaTimeData(data.data);
    } catch (err) {
      setError((prevError) => prevError ? `${prevError}, Failed to fetch WakaTime data` : 'Failed to fetch WakaTime data');
      console.error('Error fetching WakaTime data:', err);
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
        const initialContent = await fetchContent(userLanguage)

        if (initialContent) {
            await Promise.all([
                fetchProjects(),
                fetchWakaTimeData(),
                fetchAllSkillIcons(),
                fetchAllContents(),
            ]);
        }

        // Wait for all images to load
        await waitForImages();
      } catch (error) {
        console.error('Error initializing content:', error);
        // Fallback to English in case of error
        const fallbackContent = await fetchContent('en')
        if(fallbackContent) {
            await Promise.all([fetchProjects(), fetchWakaTimeData(), fetchAllSkillIcons(), fetchAllContents()]);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeContent();
  }, [theme]);

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
        contents,
        wakaTimeData,
        skillIcons,
        projects,
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
