'use client';

import React from 'react';
import { usePortfolio } from '@/app/context/PortfolioContext';
import Image from 'next/image';

const SkillCard = ({ skill } : { skill: string}) => {
  const { skillIcons, loading } = usePortfolio();
  const iconSvg = skillIcons.get(skill.toLowerCase());

  return (
    <div className='group aspect-square [perspective:1000px] w-16 lg:w-20' title={skill}>
      <div className='relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] flex flex-col justify-center items-center gap-5'>
        {/* Front face */}
        <div className='absolute flex items-center w-16 lg:w-20 h-16 lg:h-20 justify-center rounded-lg border border-gray-700 bg-black/50 p-4 [backface-visibility:hidden]'>
          {loading ? (
            <div className="h-16 w-16 animate-pulse rounded-md bg-gray-700"></div>
          ) : iconSvg ? (
            <Image src={iconSvg} alt={skill} width={50} height={50} className='drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] transition-all duration-500 group-hover:drop-shadow-none' />
          ) : (
            <p className='text-center text-gray-200'>{skill}</p>
          )}
        </div>
        {/* Back face */}
        <div className='absolute flex h-full w-full items-center justify-center rounded-lg border border-gray-700 bg-black/80 p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]'>
          <p className='text-center text-gray-200'>{skill}</p>
        </div>
      </div>
    </div>
  )
}

export default SkillCard