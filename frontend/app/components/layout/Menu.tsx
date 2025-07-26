import React from 'react'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

const Menu = ({ menuContent } : { menuContent: string[] } ) => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon className='size-6 md:size-8 stroke-gray-200 shadow-2xl m-3 md:m-4 hover:stroke-green-400 hover:cursor-pointer fixed' />
      </SheetTrigger>
      <SheetContent side="left" className='m-2 rounded-2xl w-fit h-fit pb-8 pr-10'>
        <SheetHeader className='flex flex-row items-center justify-between'>
          <SheetTitle className='font-[Orbitron] text-[0.75rem] md:text-[1rem]'>Menu</SheetTitle>
        </SheetHeader>
          <div className='flex flex-col justify-center gap-4 pl-4'>
            {menuContent.map((item, index) => 
              <Link key={index} href={`#${item.toLowerCase()}`} className='hover:underline hover:font-bold text-[0.75rem] md:text-[1rem]'>{item}</Link>
            )}
          </div>
      </SheetContent>
    </Sheet>
  )
}

export default Menu