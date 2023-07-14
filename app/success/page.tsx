'use client'
import Link from "next/link";
import { useEffect } from "react";


export default async function Success( {searchParams}  : any) {


    useEffect( ()=>{

        async function confirmPayment(){
            if(searchParams.hasOwnProperty('session_id')){
                try {
                const resp = await fetch(`/api/orders`,{
                      method : "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                      cache : "no-cache",
                      body : JSON.stringify({ sessionId: searchParams.session_id }),
                
                    });
                }catch(err){
                    console.log({message : err})
                }
        
            }
        }

        confirmPayment();

        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[])

    


    return (
        <div className="text-center flex flex-col gap-12">
            <h2 className="text-2xl text-green">
                Successfully done. You can use following id for checking your Order
            </h2>
            <h3 className="text-2xl text-gray">id : {searchParams.session_id}</h3>
            <h3 className="text-2xl text-gray my-4">To check your Order <Link href={`/ordersearch?session_id=${searchParams.session_id}`}><button className="py-2 px-4 bg-blue-600 text-white text-xl"> Click Here </button> </Link></h3>
        </div>
    )
}