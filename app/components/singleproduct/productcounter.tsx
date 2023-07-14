import React from 'react'

export default function ProductCounter({productData , dispatch} : any) {
  return (
    <div className="quantity_sec flex gap-8 justify-start items-center">
          <h3 className="font-bold text-2xl">Quantity : </h3>
          <ul className="flex gap-4 items-center">
            <li
              className="rounded-full w-12 h-12 flex text-2xl bg-gray-200 cursor-pointer items-center justify-center hover:bg-gray-400 hover:text-white"
              onClick={() =>
                dispatch({
                  type: "subtract_quantity",
                })
              }
            >
              -
            </li>
            <li className="tet-2xl font-bold"> {productData.quantity} </li>
            <li
              className="rounded-full w-12 h-12 flex text-2xl bg-gray-200 cursor-pointer items-center justify-center hover:bg-gray-400 hover:text-white"
              onClick={() =>
                dispatch({
                  type: "add_quantity",
                })
              }
            >
              +
            </li>
          </ul>
        </div>
  )
}
