import React from 'react'
import { PortfolioContent } from '@/app/types'
import ContactForm from './ContactForm'
import SocialMedia from './SocialMedia'
import Heading from '../../ui/Heading'

const Contact = ({ contactContent }: { contactContent: PortfolioContent['contact'] }) => {
  return (
    <div className='w-[80%] h-fit flex flex-col items-center justify-center z-10 mt-20 mx-auto gap-8'>
      <div className='bg-black/60 rounded-lg p-10 border border-green-400'>
        <Heading level={2} className='text-green-400'>{contactContent?.title}</Heading>
        <ContactForm contactContent={contactContent} />
      </div>
      <SocialMedia contactContent={contactContent} />
    </div>
  )
}

export default Contact