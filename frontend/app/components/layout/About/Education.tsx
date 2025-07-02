import React from 'react'
import { Education as EducationType } from '@/app/types'

const Education = ({education}: {education: EducationType[]}) => {
  const educationSorted = education.sort((a, b) => new Date(b.periodStart).getTime() - new Date(a.periodStart).getTime());
  return (
    <div className='flex flex-col gap-4 md:gap-6 lg:gap-8'>
      {educationSorted.map((education) => (
          <div key={education.id}>
              <div className='flex justify-between items-center'>
                <h3 className='md:text-md lg:text-lg font-[Orbitron]'>{education.institution}</h3>
                <p className='text-xs md:text-sm lg:text-md'>{education.periodStart} | {education.periodEnd}</p>
              </div>
              <p className='mb-2 text-sm md:text-md lg:text-lg'>{education.degree}</p>
              <ul className='text-xs w-full md:text-sm lg:text-md'>
                {education.relevant.map((relevant, index) => (
                    <li key={index}>- {relevant}</li>
                ))}
              </ul>
          </div>
      ))}
</div>
  )
}

export default Education