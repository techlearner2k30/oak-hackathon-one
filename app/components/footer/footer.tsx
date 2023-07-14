import React from 'react'
import FooterLeft1 from './footer_left1'
import VerticalList from '../helper/verticalList'

const footerNavObj = [
    {
        cat : "Company",
        nav : ["About" , "Terms of Use" , "Privacy Policy" , "How it Works" , "Contact Us"]
    },
    {
        cat : "Support",
        nav : ["Support Career" , "24h Service" , "Quick Chat" ]
    },
    {
        cat : "Contact",
        nav : ["WHatsApp" , "24h Support"]
    }
]

const ftlist1 = ['About' , 'Terms'];

export default function Footer() {
  return (
    <footer className='flex flex-col p-4 md:flex-row md:pt-12 md:py-8 gap-8 justify-between'>
       <FooterLeft1 />
       {
        footerNavObj.map( (item , index) => {
            return (
                <div key={index}>
                    <h2 className="text-2xl font-bold py-4">{item.cat}</h2>
                    <VerticalList list={item.nav} tag='li' wrapper='ul' style="list-none gap-4 text-[#666]" />
                </div>
            )
        })
       }
      
    </footer>
  )
}
