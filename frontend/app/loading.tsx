import React from 'react'
import Typewriter from './components/ui/Typewriter'

const loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center z-50 text-2xl bg-black text-white font-[Orbitron] text-shadow-md'>
        <Typewriter strings={['Loading...']} loop={false} typingSpeed={10} />
      </div>
  )
}

export default loading