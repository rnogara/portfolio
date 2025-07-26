import React from 'react'
import { Experience as ExperienceType } from '../../../types'

const Experience = ({experience}: {experience: ExperienceType[]}) => {
  const experienceSorted = experience.sort((a, b) => new Date(b.periodStart).getTime() - new Date(a.periodStart).getTime());
  return (
    <div className='flex flex-col gap-4'>
    {experienceSorted.map((experience) => (
        <div key={experience.id}>
          <div className='flex justify-between items-center'>
            <h3 className='md:text-md lg:text-lg font-[Orbitron] max-w-[80%]'>{experience.company}</h3>
            <p className='text-xs md:text-sm lg:text-md'>{experience.periodStart} | {experience.periodEnd}</p>
          </div>
          <p className='mb-2 text-sm md:text-md lg:text-lg'>{experience.title}</p>
          {experience.description.replace(/\\n/g, '\n').split('\n').map((line, index) => (
            <p key={index} className='text-xs md:text-sm lg:text-md'>{line}</p>
          ))}
        </div>
    ))}
</div>
  )
}

export default Experience