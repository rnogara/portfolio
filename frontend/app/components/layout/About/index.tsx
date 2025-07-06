import React from 'react';
import { PortfolioContent } from '../../../types';
import Education from './Education';
import Experience from './Experience';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '../../ui/dialog';
import DownloadCV from './DownloadCV';
import Heading from '../../ui/Heading';

const About = ({ aboutContent }: { aboutContent: PortfolioContent['about'] }) => {
  return (
    !aboutContent ? (
      <div>...</div>
    ) : (
      <div id={aboutContent.title.toLowerCase()} className='w-full h-[80vh] flex flex-col items-center justify-center mt-40 mb-20'>
        <Heading level={2} className='mb-20'>{aboutContent.title}</Heading>
        <div className='w-full h-fit flex flex-col gap-8 md:flex-row justify-evenly items-center text-gray-200'>
          <Dialog>
            <DialogTrigger className='border border-white p-2 rounded-lg hover:border-green-400 hover:text-green-400 transition-colors cursor-pointer text-[1rem] font-bold md:text-xl text-shadow-md bg-black/50'>
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
            <DialogTrigger className='border border-white p-2 rounded-lg hover:border-green-400 hover:text-green-400 transition-colors cursor-pointer text-[1rem] font-bold md:text-xl text-shadow-md bg-black/50'>
              {aboutContent.experienceBtn}
            </DialogTrigger>
            <DialogContent className='min-w-[70%] h-[90%] overflow-y-auto bg-gray-200'>
              <DialogHeader className='text-start md:text-center'>
                <DialogTitle className='font-[Orbitron] text-[1rem] md:text-[1.5rem] lg:text-[2rem]'>{aboutContent.experienceBtn}</DialogTitle>
              </DialogHeader>
                <Experience experience={aboutContent.experience} />
            </DialogContent>
          </Dialog>
          <DownloadCV className='border border-white p-2 rounded-lg hover:border-green-400 hover:text-green-400 bg-black/50 transition-colors cursor-pointer text-[1rem] font-bold md:text-xl text-shadow-md w-auto' cvUrl={aboutContent?.cvUrl} cvBtn={aboutContent?.cvBtn}/>
        </div>
      </div>
    )
  )
}

export default About