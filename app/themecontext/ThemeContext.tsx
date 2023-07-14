import { useState } from "react";
import React , { createContext } from 'react'

const CartContext = createContext([]);

export function CartContextProvider({children} : {children : any}) {


const [cartGlobalState, setCartGlobalState] = useState([""]);

const UpdateCart = (
  productData: any ) => {

  let indexOfProductCheck = -999;
  cartGlobalState.forEach((item:any, index:number) => {
    if (item.id == productData.id) {
      let specskey:any = Object.keys(productData.specs);
      if (specskey in item.specs) {
        productData.specs[specskey[0]] =
          Number(productData.specs[specskey[0]]) +
          Number(item.specs[specskey[0]]);
      }
       productData.specs = { ...item.specs, ...productData.specs };
      indexOfProductCheck = index;
       return;
    }
  });

  if (indexOfProductCheck == -999) {
    setCartGlobalState((cartGlobalState) =>
      cartGlobalState[0] ? [...cartGlobalState, productData] : [productData]
    );
  } else {
    cartGlobalState[indexOfProductCheck] = productData;
    setCartGlobalState((cartGlobalState) => [...cartGlobalState]);
  }

};

  return (
    
    <CartContext.Provider value={{ cartGlobalState, setCartGlobalState , UpdateCart }}>
        {children}
    </CartContext.Provider>
  )
}




export default CartContext;

