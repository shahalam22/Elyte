import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler (req, res) {
    if (req.method === 'POST'){
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                line_items: req.body.map((item) => {
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.attribute.title
                            },
                            unit_amount: item.attribute.price * 100
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.attributes.quantity
                    };
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}`
            };

            const session = await stripe.checkout.create(params);
            res.status(200).json(session);
        } catch (error) {
            console.log({error});
            res.status(err.statusCode || 500).json({error: error.message});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method not allowed');
    }
}