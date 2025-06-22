'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { PortfolioContent, Project } from '@/app/types';
import { api } from '@/app/lib/api';

interface PortfolioContextType {
  content: PortfolioContent | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await api.get<PortfolioContent>('/portfolio');
      setContent(response.data);
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
    const fetchData = async () => {
      await Promise.all([fetchContent(), fetchProjects()]);
    };
    
    fetchData();
  }, []);

  const refreshContent = async () => {
    await fetchContent();
  };

  const refreshProjects = async () => {
    await fetchProjects();
  };

  return (
    <PortfolioContext.Provider
      value={{
        content,
        projects,
        loading,
        error,
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
