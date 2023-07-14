import React, { useContext } from "react";
import Nav from "./header/nav";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import CartContext from "../themecontext/ThemeContext";
import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const cartData: any = useContext(CartContext);

  return (
    <header className="flex gap-5 justify-between max-w-[1200px] my-5 mx-auto items-center px-5">
      <Link className="" href={`/`}>
        <Image src="/assets/Logo.png" width={150} height={40} alt={""} />
      </Link>
      <Nav
        cartlength={
          cartData.cartGlobalState[0] &&
          (cartData.cartGlobalState.length as number)
        }
      />
      <input
        type="search"
        name="search"
        id="search"
        className="border-2 h-6 rounded-lg max-[768px]:w-36"
      />
      <Link href="/cart">
        <div className="circle_wrapper rounded-full relative cursor-pointer hover:bg-gray-50 max-[768px]:hidden ">
          <AiOutlineShoppingCart />
          {cartData.cartGlobalState[0] && (
            <span className="absolute text-white text-sm rounded-full w-5 h-5 top-[-5px] text-center bg-red-700">
              {cartData.cartGlobalState.length}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
};

export default Header;
