'use client';
import React from 'react';
import Background from './components/layout/Background';
import LanguageBtn from './components/layout/LanguageBtn';
import { usePortfolio } from '@/app/context/PortfolioContext';
import HomeContent from './components/templates/HomeContent';
import Typewriter from './components/ui/Typewriter';
import About from './components/templates/About';
import Projects from './components/templates/Projects';

export default function Home() {
  const { content } = usePortfolio();

  const bgUrls: string[] = [
    '/background/first.jpg',
    '/background/second.jpg',
    '/background/matrix.mp4',
    '/background/helloWorld.mp4'
  ];

  return (
    !content ? (
      <div className='w-full h-screen flex items-center justify-center z-50 text-2xl bg-black text-white font-[Orbitron] text-shadow-md'>
        <Typewriter strings={['Loading...']} loop={false} typingSpeed={10} />
      </div>
    ) : (
    <div className="relative overflow-hidden w-full">
      <Background bgUrls={bgUrls} />
      <main className="flex flex-col gap-10 items-center justify-center">
        <LanguageBtn />
        <HomeContent homeContent={content.home} />
        <About aboutContent={content.about} />
        <Projects title={content.projects} />
      </main>
    </div>
    ) 
  );
}
