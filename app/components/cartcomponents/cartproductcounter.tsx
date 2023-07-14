import React from 'react'

export default function CartProductCounter({quantity ,index,size, dispatch} : any) {
  return (

          <ul className="flex gap-2 items-center">
            <li
              className="rounded-full w-8 h-8 flex text-2xl bg-gray-200 cursor-pointer items-center justify-center hover:bg-gray-400 hover:text-white"
              onClick={() =>
                dispatch({
                  type: "subtract_quantity",
                  index: index,
                  size:size
                })
              }
            >
              -
            </li>
            <li className="tet-2xl font-bold"> {quantity} </li>
            <li
              className="rounded-full w-8 h-8 flex text-2xl bg-gray-200 cursor-pointer items-center justify-center hover:bg-gray-400 hover:text-white"
              onClick={() =>
                dispatch({
                  type: "add_quantity",
                  index: index,
                  size:size
                })
              }
            >
              +
            </li>
          </ul>
  )
}
