import { PortfolioContent } from '@/app/types'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SocialMedia = ({ contactContent }: { contactContent: PortfolioContent['contact'] }) => {
  return (
    <div className="flex gap-8 pb-20">
      <Link href={contactContent?.github || ''} target='_blank' rel='noopener noreferrer'>
        <Github className='h-8 w-8 lg:h-12 lg:w-12 hover:stroke-gray-200 hover:cursor-pointer stroke-green-400 transition-colors' />
      </Link>
      <Link href={contactContent?.linkedin || ''} target='_blank' rel='noopener noreferrer' >
        <Linkedin className='h-8 w-8 lg:h-12 lg:w-12 hover:stroke-gray-200 hover:cursor-pointer stroke-green-400 transition-colors' />
      </Link>
      <Link href={`mailto:${contactContent?.email}`} target='_blank' rel='noopener noreferrer'>
        <Mail className='h-8 w-8 lg:h-12 lg:w-12 hover:stroke-gray-200 hover:cursor-pointer stroke-green-400 transition-colors' />
      </Link>
      <Link href={`tel:${contactContent?.phone}`} target='_blank' rel='noopener noreferrer'>
        <Phone className='h-8 w-8 lg:h-12 lg:w-12 hover:stroke-gray-200 hover:cursor-pointer stroke-green-400 transition-colors' />
      </Link>
    </div>
  )
}

export default SocialMedia