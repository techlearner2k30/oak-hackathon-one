"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";
import SanityProductList from "../components/products/sanityproductList";

export default function Home({ params }: { params: { products: string } }) {
  let output, productsdata:any, productsDataJson: any;
  let query = '';

  const [productsState , setProductsState ] = useState([]);

  var products1: any = [];

  useEffect(() => {
    console.log("asdasd");
    
    params.products === "products" ? query = '*[_type == "product" ]' : query = `*[_type == "product" && category->name == "${params.products}"]`;

    const productOutput = async ()=>{

        const res = await client.fetch(`${query}{_id, name , price, image , description , 
          "category": category->name , 
        "size" : size[]->name}`);
        setProductsState(res);
      }
    productOutput();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  },[]);

  return <SanityProductList productsList={productsState} />
}
