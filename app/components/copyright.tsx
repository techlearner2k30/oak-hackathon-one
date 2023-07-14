import React from 'react'
import HorizontalList from './helper/horizontallist'

const copyright = ['copyright @2023' , "Designed by : IOT-49967 " , "Coded by : IOT-49967" ]

export default function Copyright() {
  return (
    <div className='footer_bottom copyright justify-between mt-12 py-4 border-t-2 items-center'>
    <HorizontalList list={copyright} tag='li' wrapper='ul' style=" list-none p-4  m-auto max-w-7xl flex-col md:flex-row gap-2 justify-around"/>
    </div>
  )
}
