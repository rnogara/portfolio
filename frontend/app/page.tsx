'use client';
import React from 'react';
import Background from './components/Background';
import LanguageBtn from './components/LanguageBtn';
import { usePortfolio } from '@/app/context/PortfolioContext';
import HomeContent from './components/HomeContent';
import Typewriter from './components/Typewriter';
import About from './components/About';

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
    <div className="relative">
      <Background bgUrls={bgUrls} />
      <div className="content">
        <LanguageBtn />
        <HomeContent homeContent={content.home} />
        <About aboutContent={content.about} />
        <div className="section" style={{ height: '100vh' }}>
          <div className="section-content">
            <h2>Section 3</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante tincidunt placerat.</p>
          </div>
        </div>
        <div className="section" style={{ height: '100vh' }}>
          <div className="section-content bg-black">
            <h2>Section 4</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante tincidunt placerat.</p>
          </div>
        </div>
      </div>
    </div>
    ) 
  );
}
