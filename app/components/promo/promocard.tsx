import React from 'react'

export default function PromoCard({off , promoCode} : {off : string|number, promoCode: string|number}) {
  return (
        <div className=' text-white flex flex-col gap-4 justify-center'>
            <h2 className='text-4xl font-bold'>GET {off}% Off</h2>
            <p className=''>USE PROMO CODE</p>
            <h3 className='py-2 px-4 bg-[#666] text-2xl rounded-lg self-center'>{promoCode}</h3>
        </div>

  )
}
