import React from 'react';
import { PortfolioContent } from '../../types';
import Education from './Education';
import Experience from './Experience';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '../dialog';
import DownloadCV from './DownloadCV';

const About = ({ aboutContent }: { aboutContent: PortfolioContent['about'] }) => {
  const story = aboutContent?.story.replace(/\\n/g, '\n').split('\n');

  return (
    !aboutContent ? (
      <div>...</div>
    ) : (
    <div className='max-w-full h-fit flex items-center justify-center z-10 mt-60'>
      <div className='w-[90%] h-auto bg-black/20 flex flex-col justify-center z-10 p-6 gap-4 rounded-lg text-gray-200 font-[Jura] overflow-hidden'>
        <h2 className='text-center text-[1.5rem] md:text-[2rem] lg:text-[3rem] font-[Orbitron] text-shadow-md'>{aboutContent.title}</h2>
        {story?.map((line, index) => (
          <p key={index} className='text-[0.75rem] md:text-[1em] lg:text-[1.2rem] text-shadow-md'>{line}</p>
        ))}
        <div className='flex flex-col gap-4 md:flex-row justify-evenly items-center mt-4'>
          <Dialog>
            <DialogTrigger className='border border-white p-2 rounded-lg hover:bg-white hover:text-black transition-colors cursor-pointer font-[Jura] text-[1rem] font-bold md:text-xl text-shadow-md'>
              {aboutContent.educationBtn}
            </DialogTrigger>
            <DialogContent className='overflow-y-auto bg-gray-200'>
              <DialogHeader className='text-start md:text-center'>
                <DialogTitle className='font-[Orbitron] text-[1rem] md:text-[1.5rem] lg:text-[2rem]'>{aboutContent.educationBtn}</DialogTitle>
              </DialogHeader>
              <Education education={aboutContent.education} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className='border border-white p-2 rounded-lg hover:bg-white hover:text-black transition-colors cursor-pointer font-[Jura] text-[1rem] font-bold md:text-xl text-shadow-md'>
              {aboutContent.experienceBtn}
            </DialogTrigger>
            <DialogContent className='min-w-[70%] h-[90%] overflow-y-auto bg-gray-200'>
              <DialogHeader className='text-start md:text-center'>
                <DialogTitle className='font-[Orbitron] text-[1rem] md:text-[1.5rem] lg:text-[2rem]'>{aboutContent.experienceBtn}</DialogTitle>
              </DialogHeader>
                <Experience experience={aboutContent.experience} />
            </DialogContent>
          </Dialog>
          <DownloadCV cvUrl={aboutContent?.cvUrl} />
        </div>
      </div>
    </div>
    )
  )
}

export default About