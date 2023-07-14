import React from 'react'

export default function HorizontallistImages( { list  } : any) {
  return (
    <div className='flex flex-wrap md:flex-row md:flex-nowrap justify-center md:justify-between mt-auto pt-10 gap-8 md:gap-2 items-center'>
    {
      list.map( (img:string, index:number) => <img src={`./assets/${img}.png`} alt ={img} key={index}/> )
    }
  </div>
  )
}
