import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

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
      console.error('Error fetching all icons:', (error as Error).message);
      throw new HttpException(
        'Failed to fetch all skill icons',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
