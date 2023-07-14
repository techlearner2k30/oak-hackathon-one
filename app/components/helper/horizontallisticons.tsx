import React from 'react'

export default function HorizontalListIcons( { list ,tag , wrapper, style='' , childStyle='' } : any) {

    const CustomTag = tag;
    const CustomWrapper = wrapper;

  return (
    <CustomWrapper className={`${style}`}>
    {
      list.map( (item:any , index:number) => <CustomTag key={index} className={childStyle}> {item.icon} </CustomTag> )
    }
  </CustomWrapper>
  )
}
