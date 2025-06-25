const PORTUGUESE_SPEAKING_COUNTRIES = ['BR', 'PT', 'AO', 'MZ', 'GW', 'TL', 'ST', 'CV', 'GQ'];

type GeolocationService = {
  url: string;
  getCountryCode: (data: unknown) => string;
};

const GEOLOCATION_SERVICES: GeolocationService[] = [
  {
    url: 'https://ipapi.co/json/',
    getCountryCode: (data: unknown) => (data as { country: string }).country
  },
  {
    url: 'https://ipwho.is/',
    getCountryCode: (data: unknown) => (data as { country_code: string }).country_code
  },
  {
    url: 'https://geolocation-db.com/json/',
    getCountryCode: (data: unknown) => (data as { country_code: string }).country_code
  }
];

const detectCountryCode = async (): Promise<string | null> => {
  for (const service of GEOLOCATION_SERVICES) {
    try {
      const response = await fetch(service.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) continue;
      
      const data = await response.json();
      const countryCode = service.getCountryCode(data);
      
      if (countryCode) {
        return countryCode.toUpperCase();
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${service.url}:`, error);
      continue;
    }
  }
  
  return null;
};

export const detectUserLanguage = async (): Promise<'pt-BR' | 'en'> => {
  try {
    const countryCode = await detectCountryCode();
    if (countryCode) {
      return PORTUGUESE_SPEAKING_COUNTRIES.includes(countryCode) ? 'pt-BR' : 'en';
    }
  } catch (error) {
    console.error('Error detecting country code:', error);
  }
  
  if (typeof navigator !== 'undefined') {
    const browserLanguage = navigator.language;
    if (browserLanguage) {
      return browserLanguage.startsWith('pt') ? 'pt-BR' : 'en';
    }
  }
  
  return 'pt-BR';
};

export type LanguageCode = 'pt-BR' | 'en';
