import React from 'react';
import Typewriter from '../ui/Typewriter';
import Heading from '../ui/Heading';

const HomeContent = ({ homeContent }: { homeContent: string }) => {
  const processedContent = homeContent.replace(/\\n/g, '\n');
  
  return (
    <div id='home' className='w-full h-[80vh] flex items-center justify-center z-10'>
      <div className='flex flex-col items-center justify-center gap-2 font-[Orbitron] text-[1rem] font-bold md:text-2xl lg:text-3xl'>
        <Heading level={1} className='text-[1.5rem] md:text-[2rem] lg:text-[3rem] font-[Metamorphous]'>
          ROBERTA NOGARA
        </Heading>
        <div className='text-center text-gray-300'>
          <Typewriter strings={processedContent.split('\n').filter(Boolean)} delay={1700} />
        </div>
      </div>
    </div>
  )
}

export default HomeContent