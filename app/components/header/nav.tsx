import Link from 'next/link'
import React, { useId, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';

const navList = ["Female", "Male", "Kids", "All Products"];
const navUrl = ["female", "male", "kids", "products"];

export default function Nav({ cartlength }: { cartlength: number }) {

  const [isMenuOpen, setiIsMenuOpen] = useState(false);



  return (
    <>
      <ul className='max-[768px]:hidden flex gap-4 item-center'>
        {
          navList.map((item, index) => <li key={index}> <Link href={`/${navUrl[index]}`}>{item}</Link> </li>)
        }
      </ul>

      <div className='min-[768px]:hidden min-[768px]:ml-auto order-3 relative' >
        <button className=' text-white bg-blue-700 w-6 h-6 rounded-full text-sm' onClick={() => setiIsMenuOpen(!isMenuOpen)}> {!isMenuOpen ? "+" : "-"} </button>
        {isMenuOpen &&
          <ul className='flex-col gap-8 text-bold item-center absolute w-[120px] right-[5px] bg-slate-200 py-2 px-4 z-20 shadow-lg'>
            {
              navList.map((item, index) => <li key={index} > <Link href={`/${navUrl[index]}`} onClick={() => setiIsMenuOpen(!isMenuOpen)}  >{item}</Link> </li>)
            }
            <Link href='/cart' onClick={() => setiIsMenuOpen(!isMenuOpen)}  > 
            <li className='flex rounded-full relative hover:bg-black-500 bg-blue-200 items-center justify-center h-9 w-9 my-2'>

              <AiOutlineShoppingCart />
              {cartlength && cartlength > 0 && (
                <span className="absolute text-white text-sm rounded-full w-5 h-5 top-[-5px] text-center bg-red-700 right-0">
                  {cartlength}
                </span>

              )}
            </li>
            </Link>
          </ul>
        }
      </div>
    </>
  )
}
