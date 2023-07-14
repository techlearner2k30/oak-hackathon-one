import React from 'react'

export default function Heading2({text , style} : {text: string , style : string} ) {
  return (
    <h2 className={`text-[#212121] text-3xl text py-4 ${style}`}>{text}</h2>
  )
}

export function SmallBlueHeading2({text , style} : {text: string , style : string} ) {
    return (
      <h4 className={`text-blue-800 text-sm ${style}`}>{text}</h4>
    )
  }
