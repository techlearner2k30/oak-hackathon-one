import React from 'react'
import Product from './product'

export default function ProductList({productsList} : { productsList : [Record<any,any>] } ) {
  return (

    <div className='products flex gap-2 flex-wrap justify-between'>
    {
        productsList.map( (product , index) => <Product key={product.id} id={product.id} title={product.title} imgUrl={product.imgUrl} price={product.price} textStyle=' font-bold text-xl text-black-900 py-1' wrapperstyle='flex flex-col py-6'/>) 
    }


</div>

    // <div className='products flex gap-6'>
    //     {
    //         products.map( (product , index) => <Product title={product.title} imgUrl={product.imgUrl} price={product.price} textStyle='text-bold text-2xl text-black-900'/>) 
    //     }

    
    // </div>
  )
}
