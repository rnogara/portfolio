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
    <div className='w-[80%] h-[100vh] flex flex-col gap-4 items-center justify-center z-10 mt-20'>
      <Heading level={2}>{title}</Heading>
      <Carousel
        opts={{
          loop: true,
          align: 'center',
        }}
        plugins={[
          Autoplay({ delay: 2000, stopOnInteraction: true }),
        ]}
      >
        <CarouselContent>
          {projectQuantity > 0 && sortedProjects.map((project) => (
            <CarouselItem className="min-w-[100%] md:min-w-[10%] md:basis-1/2 lg:basis-1/3 max-w-[50%]" key={project.id}>
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {
          projectQuantity > 3 && (
            <>
              <CarouselPrevious className='hidden md:block' />
              <CarouselNext className='hidden md:block' />
            </>
          )
        }
      </Carousel>
    </div>
  )
}

export default Projects