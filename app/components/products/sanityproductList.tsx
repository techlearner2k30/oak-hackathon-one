import React from "react";
import Product from "./product";
//import myConfiguredSanityClient from './sanityClient'
import { client } from "@/lib/sanity.client";
import imageUrlBuilder from '@sanity/image-url'
import SanityProduct from "./sanityproduct";

const builder = imageUrlBuilder(client)

function urlFor(source:any) {
  return builder.image(source)
}

export default function SanityProductList({ productsList }: any) {
    
  return (
    <div className="products flex gap-8 flex-wrap justify-center">
      {
        productsList.map((product: any, index: number) => {
            console.log(product);
          //console.log(`'${product.title}' ,'${product.description}', '${product.image}' , ${product.price} , '["XS" , "S" , "M" , "L" , "XL"]'  ` );
          return (
            <SanityProduct
              id={product._id}
              title={product.name}
              imgUrl={urlFor(product.image).url()}
              price={product.price}
              textStyle=" font-bold text-xl text-black-900 py-1"
              wrapperstyle="flex flex-col py-6 gap-8 item-end justify-around"
              key={product._id}
            />
          )
        })
      }
    </div>
  );
}

