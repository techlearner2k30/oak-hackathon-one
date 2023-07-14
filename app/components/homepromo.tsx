import React from 'react'
import Heading2, { SmallBlueHeading2 } from './general/heading2'
import HomePromoSection from './promo/homepromosection'

export default function HomePromo({productsList} : any) {
  return (
   
    <div className='py-12'>
        
        <SmallBlueHeading2 text="Promotion" style="text-center font-bold" />

        <Heading2 text="Our Promotion Events" style="text-center  font-bold" />

        <HomePromoSection productsList={productsList}/>

    </div>
  )
}
