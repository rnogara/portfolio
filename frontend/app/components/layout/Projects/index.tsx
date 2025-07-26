import React from 'react'
import ProjectCard from './ProjectCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../ui/carousel';
import { usePortfolio } from '@/app/context/PortfolioContext';
import Autoplay from "embla-carousel-autoplay"
import Heading from '../../ui/Heading';

const Projects = ({title}: {title: string}) => {
  const { projects } = usePortfolio();
  const sortedProjects = projects.sort((a, b) => b.rate - a.rate);
  const projectQuantity = sortedProjects.length;
  
  return (
    <div id={title.toLowerCase()} className='w-full min-h-screen py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <Heading level={2} className='text-center mb-12 md:mb-16'>{title}</Heading>
        
        {projectQuantity > 0 ? (
          <div className='relative'>
            <Carousel
              opts={{
                loop: true,
                align: 'start',
              }}
              plugins={[
                Autoplay({ delay: 5000, stopOnInteraction: true }),
              ]}
              className='w-full px-8 md:px-12'
            >
              <CarouselContent className='-ml-4 py-4'>
                {sortedProjects.map((project) => (
                  <CarouselItem key={project.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                    <ProjectCard project={project} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <CarouselPrevious className='left-0 h-10 w-10 rounded-full bg-white/80 dark:bg-black/80 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-green-400 hover:text-green-400 dark:hover:border-green-400 dark:hover:text-green-400 cursor-pointer transition-colors' />
              <CarouselNext className='right-0 h-10 w-10 rounded-full bg-white/80 dark:bg-black/80 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-green-400 hover:text-green-400 dark:hover:border-green-400 dark:hover:text-green-400 cursor-pointer transition-colors' />
            </Carousel>
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-600 dark:text-gray-400'>Nenhum projeto disponível no momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects