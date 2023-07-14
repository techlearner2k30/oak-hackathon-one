import React from 'react'
import HorizontalListIcons from '../helper/horizontallisticons'
import socialIcons from '../icons/icons'

export default function FooterLeft1() {
  return (
        <div className='footer_left flex flex-col gap-8 basis-1/4'>
            <img src="/assets/Logo.png" alt="logo" className='self-start'/>
            <p className='text-[#666]'>Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</p>
            <HorizontalListIcons list={socialIcons} tag='span' wrapper='div' style="p-4 rounded-md list-none gap-10 flex" childStyle='p-4 rounded-md bg-gray-100' />
        </div>
    )
}