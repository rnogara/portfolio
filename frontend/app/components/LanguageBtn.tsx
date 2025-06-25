'use client';
import React from 'react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { usePortfolio } from '../context/PortfolioContext';
import { Language } from '../types';

interface LanguageBtnProps {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
}

const LanguageBtn = ({ currentLanguage, setCurrentLanguage }: LanguageBtnProps) => {
  const { languages, refreshContent } = usePortfolio();

  const languageOptions = languages.filter((language: Language) => language.language !== currentLanguage);

  const currentLanguageData = languages.find((language: Language) => language.language === currentLanguage);
  const currentIcon = currentLanguageData?.icon;

  if (!currentIcon) {
    return null;
  }

  const handleLanguageChange = async (language: string) => {
    refreshContent(language);
    setCurrentLanguage(language);
  }

  return (
    <div className='fixed top-2 right-2 md:top-4 md:right-6 z-50'>
      <DropdownMenu>
        <DropdownMenuTrigger className='w-8 h-8 md:w-12 md:h-12 rounded-full'>
          <Image width={240} height={240} src={currentIcon} alt={`A flag corresponding to ${currentLanguage}`} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="overflow-y-auto bg-transparent min-w-auto"
          align="end"
          sideOffset={8}
        >
          {languageOptions.map((language: Language) => (
            <DropdownMenuItem 
              key={language.language} 
              onClick={() => handleLanguageChange(language.language)}
              className="p-0 md:p-2"
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