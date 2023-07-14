"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";



export default function OrderSearch({searchParams}  : any) {

    const [orderState, setOrderState] = useState([""]);

    var refOrderId = useRef<any>();

useEffect(()=>{
    async function findOrderFromSession() {
    if( searchParams.session_id){
        try {
                const resp = await fetch(`/api/orders?session_id=${searchParams.session_id}`);
                if (resp.ok) {
                    const data = await resp.json();
                    setOrderState(orderState => [...data]);
                }else{
                    setOrderState(orderState => [""])
                }

        } catch (error) {
            console.log({ message: error });
        }
    }
}

findOrderFromSession();

// eslint-disable-next-line react-hooks/exhaustive-deps

} , [])
  
    async function findOrder() {

        var inputStr: any = refOrderId?.current?.value;
        // if( searchParams.hasOwnProperty('session_id')){
        //     inputStr = searchParams.session_id;
        // }
        
        try {
            if (inputStr) {
                const resp = await fetch(`/api/orders?session_id=${inputStr}`);
                if (resp.ok) {
                    const data = await resp.json();
                    //console.log("resp.ok" , resp.ok , "data",data.length);
                    setOrderState(orderState => [...data]);
                }else{
                    setOrderState(orderState => [""])
                }
            }
        } catch (error) {
            console.log({ message: error });
        }


    }  //  console.log("orderState", (JSON.parse(orderState[0]?.sizes))[1] );

    //console.log("orderState", orderState[0].sessionid, orderState[0].hasOwnProperty('sessionid'));

    
    console.log("refOrderId",refOrderId);

    let totalQuantity = 0;
    let totalPrice = 0;
    if (!orderState[0]?.hasOwnProperty('sessionid')) {
        return (
            <>
                <h2 className="text-2xl font-bold text-blue-700 text-center">Enter Order id to search for you Order</h2>
                <div className="text-center flex my-4 items-stretch px-4">

                <input type="text" id="order_id" ref={refOrderId} className="ml-8 border-2 p-2 flex-1" placeholder="Enter Order id :" 
                    // value={searchParams.hasOwnProperty('session_id') ? searchParams.session_id : ""}
                    />
                    <button onClick={findOrder} className="bg-gray-900 text-white py-2 p-4 pointer w-20 ">Search</button>
                </div>
                {refOrderId.current && <h3  className="py-8 text-2xl font-bold text-red-700 text-center">Order Id typed in above search is not correct</h3> }


            </>
        );
    }
    if (orderState[0].hasOwnProperty('sizes')) {
        return (
            <>
                <h2 className="text-2xl font-bold text-blue-700 text-center">Enter Order id to search for you Order</h2>
                <div className="text-center flex my-4 items-stretch px-4">

                <input type="text" id="order_id" ref={refOrderId} className="ml-8 border-2 p-2 flex-1" placeholder="Enter Order id :" 
                    // value={searchParams.hasOwnProperty('session_id') ? searchParams.session_id : ""}
                    />
                    <button onClick={findOrder} className="bg-gray-900 text-white py-2 p-4 pointer w-20 ">Search</button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center m-auto">

                        {orderState.map((item: any, index: number) => {
                            totalQuantity = 0;
                            console.log("item", item);
                            let objSpecs = JSON.parse(item?.sizes);
                            let specKeys = Object.keys(JSON.parse(item?.sizes));
                            console.log("objSpecs", objSpecs);


                            return (

                                <div className="flex flex-col w-full md:flex-row gap-5 p-8 bg-grey-300 shadow-lg my-4 rounded-2xl" key={`div-${index}`}>
                                    <img src={item.imgurl} alt="Product" className="self-center" width={`275px`} height={`275px`} />
                                    <div className="flex flex-col p-5 gap-4 w-full">
                                        <h2 className="font-bold text-xl text-blue-800"> {item.name} </h2>
                                        <div
                                            key={index}
                                            className="flex flex-col"
                                        >


                                            {
                                                specKeys.map((key) => {
                                                    console.log("key", key, "item.sizes", item.sizes, objSpecs[key]);
                                                    totalQuantity = totalQuantity + Number(objSpecs[key]);
                                                    totalPrice = totalPrice + item.price * totalQuantity;
                                                    console.log("totalQuantity", totalQuantity);
                                                    return (
                                                        <ul className="flex text-base text-center flex-row w-full" key={`prod_ul_${key}`}>
                                                            <li className="border-[1px] p-2 flex-1" key={`size_${key}`}>
                                                                {" "}
                                                                Size : <span className="font-bold">{key}</span>
                                                            </li>
                                                            <li className="border-[1px] p-2 flex-1" key={`quantity_${key}`}>
                                                                {" "}
                                                                Quantity :
                                                                <span className="font-bold">{objSpecs[key]}</span>
                                                            </li>
                                                            <li className="border-[1px] p-2 flex-1" key={`price_${key}`}>
                                                                {" "}
                                                                Unit Price : <span className="font-bold">{item.price}</span>
                                                            </li>
                                                        </ul>
                                                    )
                                                })
                                            }



                                        </div>

                                        <div className="flex justify-between items-center">
                                            <ul className="flex w-full">
                                                <li className="border-[1px] p-2 text-center flex-1">
                                                    Total Quantity :
                                                    <span className="font-bold">
                                                        {totalQuantity}
                                                    </span>
                                                </li>
                                                <li className="border-[1px] p-2 text-center flex-1">
                                                    Total Price :
                                                    <span className="font-bold">
                                                        {Math.round(item.price * totalQuantity * 100) / 100}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>


                                    </div>


                                </div>
                            );
                        })}

                    </div>
                </div>


            </>
        );
    }
}