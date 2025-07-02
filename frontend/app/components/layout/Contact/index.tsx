import React from 'react'
import { PortfolioContent } from '@/app/types'
import ContactForm from './ContactForm'
import SocialMedia from './SocialMedia'

const Contact = ({ contactContent }: { contactContent: PortfolioContent['contact'] }) => {
  return (
    <div className='w-[80%] h-[100vh] flex flex-col items-center justify-center z-10 mt-20 mx-auto gap-8'>
      <div className='bg-black/60 rounded-lg p-10 border border-green-400'>
        <h2 className='text-center text-[2rem] md:text-[2rem] lg:text-[4rem] font-[Orbitron] text-shadow-xl text-gray-200 mb-10'>{contactContent?.title}</h2>
        <ContactForm contactContent={contactContent} />
      </div>
      <SocialMedia contactContent={contactContent} />
    </div>
  )
}

export default Contact