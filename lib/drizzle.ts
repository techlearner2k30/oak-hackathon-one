import { sql } from '@vercel/postgres';
import { InferModel } from 'drizzle-orm';
import { pgTable, serial , text , varchar , integer , numeric } from 'drizzle-orm/pg-core';
import {drizzle} from "drizzle-orm/vercel-postgres";

export const productsTable = pgTable("products" , {
    id : serial("id").primaryKey() ,
    name: varchar("name" , {length : 255}).notNull(), 
    description : text("description" ),
    imgurl : varchar("imgurl" , {length:255}).notNull(),
    price : numeric("price").notNull(),
    sizes : varchar("sizes"),
    category:varchar("category").notNull()
})

export const ordersTable = pgTable("orders" , {
    id : serial("id").primaryKey() ,
    sessionid : varchar("sessionid" , {length : 255}).notNull(), 
    name: varchar("name" , {length : 255}).notNull(), 
    description : text("description" ),
    imgurl : varchar("imgurl" , {length:255}).notNull(),
    price : numeric("price").notNull(),
    sizes : varchar("sizes"),
    category:varchar("category").notNull(),
    payment : varchar("payment").notNull(),
})

export type products = InferModel<typeof productsTable>
export type insertProducts = InferModel<typeof productsTable , "insert">

export type orders = InferModel<typeof ordersTable>
export type insertOrders = InferModel<typeof ordersTable , "insert">

export const db = drizzle(sql);