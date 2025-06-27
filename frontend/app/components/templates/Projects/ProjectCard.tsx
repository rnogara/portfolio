import React from 'react'
import { Project as ProjectType } from '@/app/types'
import { usePortfolio } from '@/app/context/PortfolioContext';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Link, Github } from 'lucide-react';
import Image from 'next/image';

const ProjectCard = ({project}: {project: ProjectType}) => {
  const { currentLanguage } = usePortfolio();

  const title = currentLanguage === 'pt-BR' ? project.titlePt : project.titleEn;
  const description = currentLanguage === 'pt-BR' ? project.descriptionPt.replace(/\\n/g, '\n').split('\n') : project.descriptionEn.replace(/\\n/g, '\n').split('\n');
  const moreBtn = currentLanguage === 'pt-BR' ? 'Saiba mais' : 'More';
  const technologiesTitle = currentLanguage === 'pt-BR' ? project.technologiesTitlePt : project.technologiesTitleEn;

  return (
    <div className='flex flex-col items-center justify-center gap-6 text-gray-200 border border-white bg-black/30 backdrop-blur-sm rounded-[1rem] py-6 px-4 w-full'>
      <h2 className='font-[Orbitron] text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] text-shadow-md font-bold'>{title}</h2>
      <Image src={project.imageUrl} alt={title} width={1434} height={747} className='w-[50%] lg:w-full h-auto'/>
      <div className='flex justify-evenly w-full items-center'>
        <a href={project.siteUrl} target="_blank" rel="noopener noreferrer" className='hover:text-green-400 transition-colors cursor-pointer'><Link className='md:w-8 md:h-8' /></a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className='hover:text-green-400 transition-colors cursor-pointer'><Github className='md:w-8 md:h-8' /></a>
      </div>
      <ul className='flex flex-wrap gap-2 md:gap-6 max-w-[80%]'>
        {project.technologies.map((technology, index) => (
          <li key={index}>- {technology}</li>
        ))}
      </ul>
      <Dialog>
        <DialogTrigger className='font-[Jura] text-[1rem] font-bold md:text-xl text-shadow-md text-gray-200 hover:text-green-400 transition-colors cursor-pointer hover:underline'>{moreBtn}</DialogTrigger>
        <DialogContent className='h-[90%] overflow-y-auto bg-gray-200'>
          <DialogHeader>
            <DialogTitle className='font-[Orbitron] text-[1rem] md:text-[1.5rem] lg:text-[2rem] text-shadow-md font-bold'>{title}</DialogTitle>
          </DialogHeader>
          {project.videoUrl ? (
            <video controls>
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image src={project.imageUrl} alt={title} width={1434} height={747} />
          )}
          {description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          <h4 className='font-[Orbitron]'>{technologiesTitle} :</h4>
          <ul className='flex flex-wrap gap-6'>
            {project.technologies.map((technology, index) => (
              <li key={index}>- {technology} -</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectCard;