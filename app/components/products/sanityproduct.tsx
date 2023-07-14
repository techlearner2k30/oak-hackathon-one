import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function SanityProduct({
  id,
  imgUrl,
  title,
  price,
  textStyle,
  wrapperstyle,
} : {
  id : string|number,
  imgUrl: string,
  title: string,
  price: number,
  textStyle: string,
  wrapperstyle: string,
}) {
  return (
    <div className={wrapperstyle}>
      {/* {          <img src={`./assets/${imgUrl}`} alt={title} /> */}
      <Link href={`/products/${id}`}>
        {" "}
        <img src={`${imgUrl}`} alt={title} width={`275px`} height={`275px`} />
      </Link>
      <div className="">
        <h3 className={textStyle}>{title}</h3>
        <h3 className={textStyle}>$ {price}</h3>
      </div>
    </div>
  );
}
