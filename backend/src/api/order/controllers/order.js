'use strict';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


/**
 * order controller
 */


const { createCoreController } = require('@strapi/strapi').factories;
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

module.exports = createCoreController('api::order.order', ({ strapi }) => ({

    async create(ctx) {
        const BASE_URL = 'http://localhost:3000';

        // console.log("inside strapi");

        const { cart } = ctx.request.body;

        if (!cart) {
            ctx.status = 400;
            ctx.body = { message: 'Cart is empty' };
            return;
        }

        const line_items = cart.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.attributes.title,
                    images: [item.image]
                },
                unit_amount: item.attributes.price * 100
            },
            quantity: item.attributes.quantity
        }));

        // console.log("Inside strapy order")

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${BASE_URL}`,
        })

        const newOrder = await strapi.db.query('api::order.order').create({
            data: {
                stripeid: session.id,
                products: cart,
            }
        });

        return { id: session.id, newOrder };
        
    }
}));



// 'use strict';
// // import Stripe from 'stripe';

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// /**
//  * order controller
//  */


// const { createCoreController } = require('@strapi/strapi').factories;
// const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// module.exports = createCoreController('api::order.order', ({ strapi }) => ({

//     async create(ctx) {
//         const { cart } = ctx.request.body;
//         try{
//             const BASE_URL = ctx.request.headers.origin || 'http://localhost:3000';

//             const lineItems = await Promise.all(
//                 cart.map(async (product) => {
//                     const item = await strapi.query('product').findOne({ id: product.id });

//                     return {
//                         price_data: {
//                             currency: 'usd',
//                             product_data: {
//                                 name: item.attributes.title,
//                                 images: [item.image.url]
//                             },
//                             unit_amount: Math.round(item.attributes.price * 100),
//                         },
//                         quantity: product.attributes.quantity,
//                     };
//                 })
//             );

//             const session = await stripe.checkout.sessions.create({
//                 payment_method_types: ['card'],
//                 line_items: lineItems,
//                 mode: 'payment',
//                 success_url: `${BASE_URL}/success`,
//                 cancel_url: `${BASE_URL}`,
//             });

//             await strapi.service("api::order.order").create({
//                 data: {
//                     stripeid: session.id,
//                     products: cart,
//                 }
//             });

//             return { stripeSession: session };

//         }catch(error){
//             ctx.response.status = 500;
//             return { error };
//         }
//     }
// }));
