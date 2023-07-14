import React from 'react'

export default function Size({sizes,productData,handleSizeChange} : any) {
  return (
    <div className="select_size py-4">
    <h3 className="text-xl font-bold">Select</h3>
    <ul className="flex justify-center gap-4 py-4">
      {sizes.map((size:string, index:number) => (
        <li
          className={`rounded-full w-12 h-12 flex font-bold text-base bg-gray-200 cursor-pointer items-center justify-center hover:bg-gray-400 hover:text-white ${
            size === productData.size ? "bg-gray-400 text-white" : ""
          }`}
          data-value={size}
          onClick={ (e) => handleSizeChange(e) } 
          key={index}
        >
          {size}
        </li>
      ))}
    </ul>
  </div>
  )
}
