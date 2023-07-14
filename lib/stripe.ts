import { Stripe, loadStripe } from '@stripe/stripe-js';
//import Stripe from 'stripe';

let stripePromise: Promise<Stripe|null>

const getStipePromise = ()=>{
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
    if(!stripePromise && !!key){
        stripePromise = loadStripe(key);
    }

    return stripePromise;
}

export default getStipePromise;



// CREATE TABLE orders(
//     id serial PRIMARY KEY,
//     sessionid varchar(255), 
//     name varchar(255), 
//     description text,
//     imgurl varchar(255),
//     price number,
//     sizes varchar(255),
//     category varchar(255)
//     );