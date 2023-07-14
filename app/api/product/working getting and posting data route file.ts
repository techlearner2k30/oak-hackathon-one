import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";

// create TABLE Products(id SERIAL,name VARCHAR(255), description TEXT,imgurl VARCHAR(255), price money, sizeid int)

// INSERT INTO TABLE Products(name,description,imgurl,price,sizes,category) 
// VALUES('DANVOUY Womens T Shirt Casual Cotton Short' ,'95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.', 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg' , 12.99 , "['XS' , 'S' , 'M' , 'L' , 'XL']" )

// ALTER TABLE Products
// ADD CONSTRAINT fk_sizeid  FOREIGN KEY (sizeid) REFERENCES ProductSizes (sizeid)

//     ALTER TABLE products
// ADD COLUMN category varchar(255)

export async function GET(Req: NextRequest) {
    console.log(db);
    try {
        const client = await db.connect();
        await client.sql`create TABLE IF NOT EXISTS Products(id SERIAL,name VARCHAR(255), description TEXT,imgurl VARCHAR(255), price money, sizeid int);`
        const rowData = await client.sql`select * from products where id = 17`;
        var json = JSON.parse(rowData.rows[0].sizes );
        console.log(json);
        console.log(json[3]);
       // console.log(json.parse(rowData.rows[0].sizes));
        return NextResponse.json({ data: rowData.rows });
        //console.log(client);
    } catch (err) {
        console.log(err)
        return new Response("Something is wrong");
    }
    // console.log(NextRequest);
    return NextResponse.json({ message: "how are you. you are here now" });
}

export async function POST(request: NextRequest) {
    const req = await request.json();
    const client1 = await db.connect();
    console.log(req);
    try {
        if (req.name) {

            // const respInsert = await client1.sql`INSERT INTO products(name,description,imgurl,price,sizes,category) VALUES('DANVOUY Womens T Shirt Casual Cotton Short' ,
            // '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.', 
            // 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg' ,
            //  12.99 ,
            //  '["XS" , "S" , "M" , "L" , "XL"]',
            //  'Men' )`;


            const respInsert = await client1.sql`INSERT INTO products(name,description,imgurl,price,sizes,category) VALUES(${req.name} , 
                ${req.description},
                    ${req.imgurl},
                        ${req.price},
                            ${JSON.stringify(req.sizes)},
                                ${req.category}
                )`;
            console.log(respInsert);
            return new NextResponse("Added product successfully");
        } else {
            throw new Error("you must provide name of product");
        }
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })
    }
}



// {
//     "name" : "Owais Ahmed",
//     "description" : "test data",
//     "imgurl" : "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//     "price" : 200,
//     "sizes" : "[\"XS\" , \"S\" , \"M\" , \"L\" , \"XL\" ]",
//     "category" : "Men"
// }