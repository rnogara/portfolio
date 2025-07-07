import { cn } from '@/app/lib/utils'
import React from 'react'

interface HeadingProps {
  level: number;
  children: React.ReactNode;
  className?: string;
}

const Heading = ({level, children, className}: HeadingProps) => {
  const style = 'text-center text-[2rem] md:text-[3rem] lg:text-[4rem] font-[Orbitron] text-shadow-xl text-gray-200 mb-10 text-gray-200'
  return (
    level === 1 ? (<h1
    className={cn(style, className)}
    >
      {children}
    </h1>) : level === 2 ? (<h2
    className={cn(style, className)}
    >
      {children}
    </h2>) : level === 3 ? (<h3
    className={cn(style, className)}
    >
      {children}
    </h3>) : (<h4
    className={cn(style, className)}
    >
      {children}
    </h4>)
  )
}

export default Heading