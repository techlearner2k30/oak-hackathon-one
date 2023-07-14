import React from 'react'

export default function ImgOverlayText({ imgUrl, title, price, cutPrice='' } : any ) {
  return (
    <div className='relative bg-[#d6d6d7] flex max-w-[300px]'>

        <img src={`./assets/${imgUrl}`} alt={title} className='ml-auto md:self-end'/>
        <div className='absolute top-4 left-4'>
            <h3 className="text-lg">{title}</h3>
            <h3 className="text-lg">
                <s>$ {price}</s> 
                { cutPrice && cutPrice != "" ? <span className='pl-2 font-bold'>$ {cutPrice}</span> : "" }
                </h3>
        </div>
    </div>
  )
}
