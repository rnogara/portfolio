import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import fs from 'fs';

interface SvglApiResponse {
  id: number;
  title: string;
  category: string;
  route: string;
  wordmark?:
    | {
        light: string;
        dark: string;
      }
    | string;
  url: string;
}

let iconCache: {
  data: SvglApiResponse[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

@Controller('skills')
export class SkillsController {
  private async loadLocalIcons(): Promise<SvglApiResponse[]> {
    try {
      const data = await fs.promises.readFile('sgvl.json', 'utf-8');
      console.log(data);
      return JSON.parse(data) as SvglApiResponse[];
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error loading local icons:', error.message);
      }
      throw new HttpException(
        'Failed to load local skill icons',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('icons/all')
  async getAllIcons() {
    const now = Date.now();

    if (iconCache && now - iconCache.timestamp < CACHE_DURATION) {
      return iconCache.data;
    }

    try {
      const response = await axios.get<SvglApiResponse[]>(
        'https://api.svgl.app',
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            Accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            Referer: 'https://svgl.app/',
          },
          timeout: 10000, // 10 segundos de timeout
        },
      );

      iconCache = { data: response.data, timestamp: now };

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.warn(
          'Falha ao buscar ícones da API, usando fallback local:',
          error.message,
        );
      }
      try {
        return await this.loadLocalIcons();
      } catch (localError) {
        console.error('Falha ao carregar ícones locais:', localError);
        throw new HttpException(
          'Failed to fetch skill icons from all sources',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
