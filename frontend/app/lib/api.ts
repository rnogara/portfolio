import axios from 'axios';
import { AdminCredentials, CreateProjectDto, ErrorMessage, PortfolioContent, Project } from '../types';
import { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class AuthService {
  static async login(username: string, password: string): Promise<boolean> {
    const response = await api.post('/auth/login', { username, password }, { withCredentials: true });
    return response.status === 200;
  }

  static async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  static async isAuthenticated(): Promise<boolean> {
    try {
      const response = await api.get('/auth/check');
      return response.data.isAuthenticated;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }
}

export class ProjectService {
  static async getAllProjects(): Promise<Project[]> {
    const response = await api.get('/projects');
    return response.data;
  }

  static async getProjectById(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  }

  static async createProject(
    project: CreateProjectDto,
    credentials: AdminCredentials
  ): Promise<Project> {
    const response = await api.post('/projects', {
      ...project,
      ...credentials,
    });
    return response.data;
  }

  static async updateProject(
    id: string,
    project: Partial<CreateProjectDto>,
    credentials: AdminCredentials
  ): Promise<Project> {
    const response = await api.put(`/projects/${id}`, {
      ...project,
      ...credentials,
    });
    return response.data;
  }

  static async deleteProject(
    id: string,
    credentials: AdminCredentials
  ): Promise<void> {
    await api.delete(`/projects/${id}`, {
      data: credentials,
    });
  } 
}

export class ContentsService {
  static async getContent(language: string = 'pt-BR'): Promise<PortfolioContent> {
    const response = await api.get(`/contents/${language}`);
    return response.data;
  }

  static async getAllContents(): Promise<PortfolioContent[]> {
    const response = await api.get('/contents');
    return response.data;
  }

  static async createContent(
    content: Omit<PortfolioContent, 'id'>,
    credentials: AdminCredentials
  ): Promise<PortfolioContent> {
    const response = await api.post('/contents', {
      ...content,
      ...credentials,
    });
    return response.data;
  }

  static async updateContent(
    language: string,
    content: Partial<Omit<PortfolioContent, 'id' | 'language'>>,
    credentials: AdminCredentials
  ): Promise<PortfolioContent> {
    const response = await api.put(`/contents/${language}`, {
      ...content,
      ...credentials,
    });
    return response.data;
  }

  static async deleteContent(
    language: string,
    credentials: AdminCredentials
  ): Promise<void> {
    await api.delete(`/contents/${language}`, {
      data: credentials,
    });
  }
}

export const useApiState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeApiCall = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return result;
    } catch (err: unknown) {
      const errorMessage = (err as ErrorMessage).response?.data?.message || 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeApiCall };
};
