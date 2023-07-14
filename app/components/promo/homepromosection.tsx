import React from 'react'
import PromoCard from './promocard'
import ImgOverlayText from '../helper/imgoverlay'

export default function HomePromoSection({productsList}:{productsList : Record<string|number,string|number>[]}) {
  return (
    <div className='flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch'>

          <div className='m-auto md:w-2/4 flex flex-col justify-around h-full gap-8'>
            <div className='bg-[#d6d6d7] justify-center px-4'>
              <div className='flex gap-2 items-center'>
                <div className='px-2'>
                <h2 className='text-4xl font-bold'>GET 60% Off</h2>
                 <p className='text-xl py-2'>For the Summer Season</p>
                </div>
                <img src='./assets/event1.png' alt="event1"/>
              </div>
            </div>
            <div className='text-center p-4 bg-[#212121]'>
              <PromoCard off={30} promoCode='DINEWEEKENDSALE' />
            </div>
          </div>

          <ImgOverlayText 
            imgUrl={productsList[0].imgUrl} 
            title={productsList[0].title} 
            price={productsList[0].price} 
            cutPrice={Number(productsList[0].price) - 50} 
          />

          <ImgOverlayText 
            imgUrl={productsList[0].imgUrl} 
            title={productsList[0].title} 
            price={productsList[0].price} 
            cutPrice={Number(productsList[0].price) - 50} 
          />
      </div>

  )
}
