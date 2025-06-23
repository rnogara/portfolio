'use client';
import React from 'react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { PortfolioContent } from '@/app/types';

const iconsUrl = {
  'pt-Br': 'https://img.icons8.com/fluency/240/brazil-circular.png',
  'en': 'https://img.icons8.com/fluency/240/usa-circular.png'
}

interface LanguageBtnProps {
  content: PortfolioContent[] | null;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageBtn = ({ content,setLanguage }: LanguageBtnProps) => {

  const languageOptions = content?.map((content) => content.language) || [];

  const handlePlace = () => {
    for (let i = 0; i < languageOptions?.length; i++) {
      if (languageOptions[i] === 'pt-Br') {
        return 'Brazil';
      } else if (languageOptions[i] === 'en') {
        return 'USA';
      }
    }
    return 'Brazil';
  }

  const handleLanguageChange = async (e: string) => {
    setLanguage(e);
  }

  return (
    <div className='fixed top-4 right-6 z-50'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          Language
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {languageOptions.map((language) => (
            <DropdownMenuItem className='w-12 h-12' key={language} onClick={() => handleLanguageChange(language)}>
              <Image width={240} height={240} src={iconsUrl[language as keyof typeof iconsUrl]} alt={`A flag of ${handlePlace()}`} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default LanguageBtn