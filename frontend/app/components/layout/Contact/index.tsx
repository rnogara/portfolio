import React from 'react'
import { PortfolioContent } from '@/app/types'
import ContactForm from './ContactForm'
import SocialMedia from './SocialMedia'
import Heading from '../../ui/Heading'

const Contact = ({ contactContent }: { contactContent: PortfolioContent['contact'] }) => {
  return (
    <div id={contactContent?.title.toLowerCase()} className='w-[80%] h-fit flex flex-col items-center justify-center z-10 mt-20 mx-auto gap-8'>
      <div className='bg-white/10 dark:bg-black/30 backdrop-blur-sm rounded-lg p-10 border border-green-400 dark:border-green-400'>
        <Heading level={2} className='text-green-400 dark:text-green-400'>{contactContent?.title}</Heading>
        <ContactForm contactContent={contactContent} />
      </div>
      <SocialMedia contactContent={contactContent} />
    </div>
  )
}

export default Contact