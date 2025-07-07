'use client';

import React from 'react';
import { usePortfolio } from '@/app/context/PortfolioContext';
import Image from 'next/image';

const SkillCard = ({ skill } : { skill: string}) => {
  const { skillIcons, loading } = usePortfolio();
  const iconSvg = skillIcons.get(skill.toLowerCase());

  return (
    <div className='group aspect-square [perspective:1000px] w-16 lg:w-20' title={skill}>
      <div className='relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
        {/* Front face */}
        <div className='absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-black/50 p-4 [backface-visibility:hidden] shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm'>
          {loading ? (
            <div className="h-12 w-12 animate-pulse rounded-md bg-gray-300 dark:bg-gray-600"></div>
          ) : iconSvg ? (
            <div className='relative h-12 w-12 flex items-center justify-center'>
              <Image 
                src={iconSvg} 
                alt={skill} 
                width={48} 
                height={48} 
                className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
              />
            </div>
          ) : (
            <p className='text-center text-gray-900 dark:text-gray-100 font-medium'>{skill}</p>
          )}
        </div>
        
        {/* Back face */}
        <div className='absolute inset-0 flex items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg'>
          <p className='text-center font-medium text-gray-900 dark:text-gray-100'>{skill}</p>
        </div>
      </div>
    </div>
  )
}

export default SkillCard