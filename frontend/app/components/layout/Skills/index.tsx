import { PortfolioContent } from '@/app/types'
import React from 'react'
import SkillCard from './SkillCard'
import LanguagesChart from './LanguagesChart';
import Heading from '../../ui/Heading';

const Skills = ({ skillsContent }: { skillsContent: PortfolioContent['skills']}) => {
  const tech = skillsContent?.tech;
  const tools = skillsContent?.tools;
  const cards = tech && tools ? [...tech, ...tools] : [];

  return (
    <div className='p-10 w-full h-fit flex flex-col gap-10'>
      <Heading level={2}>{skillsContent?.title}</Heading>
      <div className='w-full h-fit flex flex-col md:flex-row justify-center gap-10'>
        <div className='flex flex-wrap items-center justify-center gap-5 w-full md:max-w-[50%]'>
          {cards.map((skill, i) =>
            <SkillCard key={i} skill={skill} />
          )}
        </div>
        <LanguagesChart title={skillsContent?.chartTitle}/>
      </div>
    </div>
  )
}

export default Skills