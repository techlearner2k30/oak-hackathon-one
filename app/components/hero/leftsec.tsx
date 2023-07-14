import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import HorizontallistImages from '../helper/horizontallistImages';
import HorizontalList from '../helper/horizontallist';
import VerticalList from '../helper/verticalList';
import socialIcons from '../icons/icons';
import HorizontalListIcons from '../helper/horizontallisticons';
import Link from 'next/link';

const featuredImages = ['Featured1','Featured2','Featured3','Featured4'];

export default function LeftSec() {
  return (
    <div className='flex flex-col gap-8 justify-between basis-1/2 order-2 md:order-1'>
        <span  className="bg-blue-100 font-bold rounded-2xl px-4 py-4 self-start text-blue-900"> Sale 70% </span>
        <h2 className="text-3xl md:text-6xl font-bold">An Industrial Take on Streetwear</h2>
        <p className="text-base text-gray-400">Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>
        <Link href="/products/">
        <button className='flex gap-2 bg-black text-white px-8 py-4 self-start items-center text-lg'>
            Start Shopping <AiOutlineShoppingCart />
        </button>
        </Link>
        <HorizontallistImages list={featuredImages}/>
        
        {/* <HorizontalList list={featuredImages} tag='li' wrapper='ul' style=" list-none"/> */}
        {/* <VerticalList list={featuredImages} tag='li' wrapper='ul' style="list-none gap-10"/>
        <HorizontalListIcons list={socialIcons} tag='span' wrapper='div' style="p-4 rounded-md list-none gap-10 flex" childStyle='p-4 rounded-md bg-gray-100' /> */}

    </div>
  )
}
