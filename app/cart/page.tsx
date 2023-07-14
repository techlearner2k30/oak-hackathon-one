"use client";
import React, { useContext, useReducer } from "react";
import CartContext from "../themecontext/ThemeContext";
import ProductCounter from "../components/singleproduct/productcounter";
import CartProductCounter from "../components/cartcomponents/cartproductcounter";
import Link from "next/link";
import getStipePromise from "../../lib/stripe"
import { clearScreenDown } from "readline";

export default function Cart() {

  async function handleStripe(){
    const stipe = await getStipePromise();
    console.log("ok in cart");
    const response = await fetch('/api/stripe-session/' , {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache : "no-cache",
      body : JSON.stringify(cartData.cartGlobalState),

    });

    const data = await response.json();

    if (data.session) {
      console.log("for checkout");
      await stipe?.redirectToCheckout({ sessionId: data.session.id });
    }

  }

  const cartData: any = useContext(CartContext);
 
  function reducer(productCounter: any, action: any) {
    let cartTempState = cartData.cartGlobalState;
    let productQuantity;
    switch (action.type) {
      case "add_quantity": {

        cartTempState[action.index]["specs"][action.size] = Number(cartData.cartGlobalState[action.index]["specs"][action.size]) + 1;

       cartData.setCartGlobalState((cartTempState:any) => [...cartTempState]);
       
        return (
          { quantity: cartData.cartGlobalState[action.index]["specs"][action.size] + 1 }
        )


      }
      case "subtract_quantity": {

        productQuantity = cartData.cartGlobalState[action.index]["specs"][action.size];
        Number(productQuantity) > 0
          ? cartTempState[action.index]["specs"][action.size] = Number(cartTempState[action.index]["specs"][action.size]) - 1
          : '';

          cartData.setCartGlobalState((cartTempState:any) => [...cartTempState]);
       
        return (
          { quantity: cartData.cartGlobalState[action.index]["specs"][action.size] - 1 }
        )
      }
      case "delete_product": {
        cartTempState.splice(action.index, 1);
        cartData.setCartGlobalState((cartTempState:any) => [...cartTempState]);
        return (
          { quantity: 0 }
        )
      }
    }
    throw Error("Unknown action: " + action.type);
  }


  const [productCounter, dispatch] = useReducer(reducer, {
    quantity: 1,
  })

  let totalQuantity = 0;
  let totalPrice = 0;
  {
    if (!cartData.cartGlobalState || !cartData.cartGlobalState[0])
      return <h2>No items in cart yet</h2>;
  }
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-col">
        {cartData.cartGlobalState.map((item: any, index: number) => {
          totalQuantity = 0
          let specKeys = Object.keys(item?.specs);

          return (
            <div className="flex flex-col md:flex-row gap-5 max-w-[760px] p-8 bg-grey-300 shadow-lg my-4 rounded-2xl" key={`div-${index}`}>
              <Link href={`/products/${item.id}`}><img src={item.imageurl} alt="Product" className="" width={`275px`} height={`275px`}  /></Link>
              <div className="flex flex-col p-5 gap-4 md:w-[60%]">
                <h2 className="font-bold text-xl text-blue-800"> <Link href={`/products/${item.id}`}>{item.title} </Link> </h2>
                <div
                  key={index}
                  className="flex flex-col gap-4"
                >

                  {specKeys.map((key) => {
                    totalQuantity = totalQuantity + Number(item.specs[key]);
                    totalPrice = totalPrice + item.unitPrice * totalQuantity;
                    console.log("totalQuantity", totalQuantity);
                    return (
                      <ul className="flex text-base text-center items-center" key={`prod_ul_${key}`}>
                        <li className="border-[1px] p-2 " key={`size_${key}`}>
                          {" "}
                          Size : <span className="font-bold">{key}</span>
                        </li>
                        <li className="border-[1px] p-2 " key={`quantity_${key}`}>
                          {" "}
                          Quantity : <CartProductCounter quantity={item?.specs[key]} index={index} size={key} dispatch={dispatch} />
                        </li>
                        <li className="border-[1px] p-2 "  key={`price_${key}`}>
                          {" "}
                          Unit Price : PKR <span className="font-bold">{item.unitPrice}</span>
                        </li>
                      </ul>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center">
                  <ul className="flex w-full">
                    <li className="border-[1px] p-2 text-center">
                      Total Quantity <br />
                      <span className="font-bold">
                        {totalQuantity}
                      </span>
                    </li>
                    <li className="border-[1px] p-2 text-center">
                      Total Price : PKR  <br />
                      <span className="font-bold">
                        {Math.round(item.unitPrice * totalQuantity * 100) / 100}
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  className="flex bg-red-800 gap-2 text-white px-8 py-2 self-center md:self-end items-center text-lg" onClick={() =>
                    dispatch({
                      type: "delete_product",
                      index: index,
                    })
                  }
                >
                  Delete
                </button>
              </div>


            </div>
          );
        })}

      </div>
      <div className="flex flex-col gap-5 p-8 bg-grey-300 shadow-lg my-4 rounded-2xl">
        <h2 className="font-bold text-xl border-[1px] p-2 text-center">Total Price <br /> PKR :  <span className=" text-blue-800 py-2"> {Math.round(totalPrice * 100) / 100} </span>   </h2>
        <button
          className="flex gap-2 bg-black text-white px-8 py-2 self-end md:self-start items-center text-lg" onClick={handleStripe} >
          Checkout
        </button>
      </div>
    </div>
  );
}


