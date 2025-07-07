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
      <div id={aboutContent.title.toLowerCase()} className='w-full min-h-screen flex flex-col items-center justify-center py-20'>
        <Heading level={2} className='mb-12 md:mb-20'>{aboutContent.title}</Heading>
        <div className='w-full flex flex-col gap-12 md:flex-row justify-center items-center flex-wrap px-4'>
          <Dialog>
            <DialogTrigger className='w-full md:w-auto px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-400 text-gray-200 dark:text-gray-300 hover:border-green-400 hover:text-green-400 dark:hover:border-green-400 dark:hover:text-green-400 transition-colors cursor-pointer text-base font-bold md:text-lg lg:text-xl lg:py-4 lg:px-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm'>
              {aboutContent.educationBtn}
            </DialogTrigger>
            <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'>
              <DialogHeader className='text-start'>
                <DialogTitle className='font-[Orbitron] text-gray-900 dark:text-gray-100 text-xl md:text-2xl'>
                  {aboutContent.educationBtn}
                </DialogTitle>
              </DialogHeader>
              <Education education={aboutContent.education} />
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger className='w-full md:w-auto px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-400 text-gray-200 dark:text-gray-300 hover:border-green-400 hover:text-green-400 dark:hover:border-green-400 dark:hover:text-green-400 transition-colors cursor-pointer text-base font-bold md:text-lg lg:text-xl lg:py-4 lg:px-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm'>
              {aboutContent.experienceBtn}
            </DialogTrigger>
            <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'>
              <DialogHeader className='text-start'>
                <DialogTitle className='font-[Orbitron] text-gray-900 dark:text-gray-100 text-xl md:text-2xl'>
                  {aboutContent.experienceBtn}
                </DialogTitle>
              </DialogHeader>
              <Experience experience={aboutContent.experience} />
            </DialogContent>
          </Dialog>
          
          <DownloadCV 
            className='w-full md:w-auto px-6 py-3 rounded-lg border-2 border-gray-200 bg-white/20 dark:bg-black/20 backdrop-blur-sm dark:border-gray-400 text-gray-200 dark:text-gray-300 hover:border-green-400 hover:text-green-400 dark:hover:border-green-400 dark:hover:text-green-400 transition-colors cursor-pointer text-base font-bold md:text-lg lg:text-xl lg:py-4 lg:px-8'
            cvUrl={aboutContent?.cvUrl} 
            cvBtn={aboutContent?.cvBtn}
          />
        </div>
      </div>
    )
  )
}

export default About