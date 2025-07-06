'use client';
import React from 'react';
import Background from './components/templates/Background';
import LanguageBtn from './components/templates/LanguageBtn';
import { usePortfolio } from '@/app/context/PortfolioContext';
import HomeContent from './components/layout/HomeContent';
import Typewriter from './components/ui/Typewriter';
import About from './components/layout/About';
import Projects from './components/layout/Projects';
import Skills from './components/layout/Skills';
import Contact from './components/layout/Contact';
import Menu from './components/layout/Menu';

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
      <main className="text-gray-200">
        <Menu menuContent={content.menu} />
        <LanguageBtn />
        <HomeContent homeContent={content.home} />
        <About aboutContent={content.about} />
        <Skills skillsContent={content.skills} />
        <Projects title={content.projects} />
        <Contact contactContent={content.contact} />
      </main>
    </div>
    ) 
  );
}
