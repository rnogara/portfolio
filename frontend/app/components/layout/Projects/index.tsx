import React from 'react'
import ProjectCard from './ProjectCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../ui/carousel';
import { usePortfolio } from '@/app/context/PortfolioContext';
// import Autoplay from "embla-carousel-autoplay"

const Projects = ({title}: {title: string}) => {
  const { projects } = usePortfolio();
  const sortedProjects = projects.sort((a, b) => b.rate - a.rate);
  return (
    <div className='w-[80%] h-[100vh] flex flex-col gap-4 items-center justify-center z-10 mt-20'>
      <h2 className='text-center text-[2rem] md:text-[2rem] lg:text-[4rem] font-[Orbitron] text-shadow-xl text-gray-200 mb-20'>{title}</h2>
      <Carousel
        opts={{
          loop: true,
          align: 'center',
        }}
        // plugins={[
        //   Autoplay({ delay: 2000, stopOnInteraction: true }),
        // ]}
      >
        <CarouselContent>
          {sortedProjects.length > 0 && sortedProjects.map((project) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-w-[50%]" key={project.id}>
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Projects