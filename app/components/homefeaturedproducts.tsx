import React from 'react'
import ProductList from './products/productlist'
import Heading2, { SmallBlueHeading2 } from './general/heading2'

export default function HomeFeaturedProducts({productsList} : any) {
  return (
    <div className='py-12'>

    <SmallBlueHeading2 text="Check What We Have" style="text-center font-bold" />

    <Heading2 text="Check What We Have" style="text-center  font-bold" />

    <ProductList productsList={productsList}/> 

  </div>
  )
}
