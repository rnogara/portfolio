'use client';
import React from 'react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { usePortfolio } from '../../context/PortfolioContext';
import { PortfolioContent } from '../../types';

const LanguageBtn = () => {
  const { contents, refreshContent, loading, currentLanguage } = usePortfolio();

  if (loading) {
    return (
      <div className='fixed top-2 right-2 md:top-4 md:right-6 z-50 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-200 animate-pulse' />
    );
  }

  const languageOptions = contents?.filter((language: PortfolioContent) => language.language !== currentLanguage);
  const currentLanguageData = contents?.find((language: PortfolioContent) => language.language === currentLanguage);

  if (!contents || contents.length === 0 || !currentLanguageData) {
    console.warn('No languages available or current language not found');
    return null;
  }

  const currentIcon = currentLanguageData.icon;

  if (!currentIcon) {
    return (
      <div className='fixed top-2 right-2 md:top-4 md:right-6 z-50 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center'>
        <span className='text-xs'>{currentLanguageData.language.substring(0, 2).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <div className='fixed top-2 right-2 md:top-4 md:right-6 z-50'>
      <DropdownMenu>
        <DropdownMenuTrigger className='w-8 h-8 md:w-12 md:h-12 rounded-full'>
          <Image width={240} height={240} src={currentIcon} alt={`A flag corresponding to ${currentLanguage}`} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="overflow-y-auto bg-transparent min-w-auto border-none shadow-none"
          align="end"
          sideOffset={8}
        >
          {languageOptions?.map((language: PortfolioContent) => (
            <DropdownMenuItem 
              key={language.language} 
              onClick={() => refreshContent(language.language)}
              className="p-0 md:p-2 rounded-full"
            >
              <Image 
                width={40} 
                height={40} 
                src={language.icon} 
                alt={`A flag corresponding to ${language.language}`} 
                className="w-7 h-7 md:w-10 md:h-10"
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default LanguageBtn