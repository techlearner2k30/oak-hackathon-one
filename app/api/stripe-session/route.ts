import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
import { drizzle } from "drizzle-orm/vercel-postgres";
import { QueryResult, sql } from '@vercel/postgres';
import { ordersTable, orders, insertOrders, db } from '@/lib/drizzle'


const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
    apiVersion: "2022-11-15"
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);
    // const client = await db.connect();

    // const insertData:insertOrders = {
    //     "name" : "Owais Ahmed 12345678",
    //     "sessionid" : "asdasda-23132132",
    //     "description" : "test data",
    //     "imgurl" : "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    //     "price" : "200",
    //     "sizes" : "[\"XS\" , \"S\" , \"M\" , \"L\", \"XL\" ]",
    //     "category" : "Men",
    //     "payment" : "pending"
    // }

    try {

        //const insertedData = await db.insert(ordersTable).values(insertData).returning();
        //console.log("imserteddata => ",insertedData);
        // Create Checkout Sessions from body params.

        const insertData: insertOrders[] = [];


        const session = await stripe.checkout.sessions.create({
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1NQXSrIBsT56tTTBzanR9aF3'
                },
                // {
                //     shipping_rate : 'shr_1NQXVHIBsT56tTTBBvecXtDu'
                // },
            ],
            invoice_creation: {
                enabled: true
            },
            line_items: body.map((product: any) => {
                let totalQuantity = 0;
                let sizeStr = "";
                let productKeys = Object.keys(product?.specs);




                {
                    productKeys.map((key) => {
                        sizeStr = `${sizeStr} ; Size-${key} : ${Number(product.specs[key])}`
                        totalQuantity = totalQuantity + Number(product.specs[key]);
                    })
                }



                return {
                    price_data: {
                        currency: 'pkr',
                        product_data: {
                            name: `${product.title} => ${sizeStr}`,

                        },
                        unit_amount: product.unitPrice * 100,

                    },
                    quantity: totalQuantity,
                    // adjustable_quantity : {
                    //     enabled : true,
                    //     minimum : 1,
                    //     maximum : 999
                    // },
                }
            }),
            // mode: 'payment',
            success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get("origin")}/cancel`,
        });

        // const insertData:insertOrders =  {
        //     "name" : "Owais Ahmed sess",
        //     "sessionid" : session.id,
        //     "description" : "test data",
        //     "imgurl" : "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        //     "price" : "200",
        //     "sizes" : "[\"XS\" , \"S\" , \"M\" , \"L\", \"XL\" ]",
        //     "category" : "Men",
        //     "payment" : "pending"
        // }


        body.map((product: any) => {
            var totalQuantity = 0;
            var sizeStr = "";
            var productKeys = Object.keys(product?.specs);




            {
                productKeys.map((key) => {
                    sizeStr = `${sizeStr} ; Size-${key} : ${Number(product.specs[key])}`
                    totalQuantity = totalQuantity + Number(product.specs[key]);
                })
            }

            insertData.push({
                "name": `${product.title} => ${sizeStr}`,
                "sessionid": session.id,
                "description": `${product.description}`,
                "imgurl": `${product.imageurl}`,
                "price": `${product.unitPrice * totalQuantity}`,
                "sizes": JSON.stringify(product.specs),
                "category": `${product.category}`,
                "payment": "pending"
            });

            console.log("insertData", insertData)

        })

        const insertedData = await db.insert(ordersTable).values(insertData).returning();
        console.log("imserteddata => ", insertedData);

        return NextResponse.json({ session });
        // res.redirect(303, session.url);
    } catch (err: any) {
        return NextResponse.json({ message: err.message });
        // res.status(err.statusCode || 500).json(err.message);
    }

    return new Response("asdasd in post req");
} 