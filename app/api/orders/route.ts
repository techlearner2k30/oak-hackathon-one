import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
import { drizzle } from "drizzle-orm/vercel-postgres";
import { QueryResult, sql } from '@vercel/postgres';
import { ordersTable, orders, insertOrders, db } from '@/lib/drizzle'
import { InferModel, eq } from 'drizzle-orm';

// export async function POST(request:NextRequest) {
//     const body = await request.json();
//     // console.log(body);
//     // const client = await db.connect();

// const insertData:insertOrders = {
//     "name" : "Owais Ahmed 12345678",
//     "sessionid" : body.sessionId,
//     "description" : "test data",
//     "imgurl" : "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//     "price" : "200",
//     "sizes" : "[\"XS\" , \"S\" , \"M\" , \"L\", \"XL\" ]",
//     "category" : "Men",
//     "payment" : "pending"
// }

//     try {

//         const insertedData = await db.update(ordersTable).values(insertData).returning();
//         console.log("imserteddata => ",insertedData);

//         return NextResponse.json({ab:123});
//         // res.redirect(303, session.url);
//       } catch (err:any) {
//         return NextResponse.json({message : err.message});
//         // res.status(err.statusCode || 500).json(err.message);
//       }

//     return new Response("asdasd in post req");
// } 

export async function GET(request: NextRequest) {

  try {

    if (!!request.nextUrl.searchParams.get("session_id")) {
      const session_id = request.nextUrl.searchParams.get("session_id");
      const getResult = await db.select()
        .from(ordersTable)
        .where(eq(ordersTable.sessionid, `${session_id}`));
      return NextResponse.json(getResult)
    }
    //const req = await request.json();

    // if(req.sessionId){
    //   const getResult = await db.select().from(ordersTable);
    //   return NextResponse.json({data : getResult})
    // }

    //return NextResponse.json({ req: request })

  } catch (error) {
    return NextResponse.json({ mesage: error })
  }

}

export async function PUT(request: NextRequest) {

  const req = await request.json();
  console.log("in orders api");
  console.log(req.sessionId);
  if (req.sessionId) {

    const updateResult = await db.update(ordersTable)
      .set({ payment: "confirmed" })
      .where(eq(ordersTable.sessionid, req.sessionId))
      .returning({
        id: ordersTable.id,
        sessionid: ordersTable.sessionid
      })

    return NextResponse.json(updateResult);
  }

  return NextResponse.json({ message: "Wrong action." })

}