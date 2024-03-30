"use client";

import { addToCart, removeFromCart } from '@/lib/features/userReducer';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';


// id={product.id}
// category={product.attributes.category.data.attributes.title}
// title={product.attributes.title}
// price={product.attributes.price}
// imageUrl={product.attributes.image.data[0].attributes.url}


export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.user);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if(!user){
            router.push('/login');
        }
    }, [])

    useEffect(() => {
        if(cart){
            let total = 0;
            cart.map((item) => {
                total += item.attributes.price*item.attributes.quantity;
            })
            setTotal(total);
            console.log(cart);
        }
    }, [cart])

    /* main logic of wishlist */
    const handleRemoveFromCart = (product) => {
      dispatch(removeFromCart(product));
    }

    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
    }

    const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

    const handlePayment = async () => {
      try {
        const stripe = await stripePromise;

        console.log('inside handlePayment function');

        const response = await fetch('http://localhost:1337/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({cart})
          // body: cart
        })

        // const response = await axios.post('http://localhost:1337/api/orders', {cart});

        console.log(response);

        await stripe.redirectToCheckout({
          sessionId: response.data.stripeSession.id,
        });
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="text-3xl mb-6">Cart</h1>
      <br/>
      
      {
        cart ? (
          cart.map((item, index) => (
            <div key={index} className="flex flex-row justify-between w-3/4 mx-auto my-4 border-b-2">
              <div className="flex flex-row">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={`http://localhost:1337${item.attributes.image.data[0].attributes.url}`}/>
                </a>
                <div className="flex flex-col my-auto px-5">
                  <p><b>Product: </b>{item.attributes.title}</p>
                  <p><b>Price: </b>{item.attributes.price}</p>
                </div>
              </div>
              <div className="flex flex-col my-auto">
                <div className="flex">
                  <button className="bg-black text-white hover:bg-white hover:text-black font-semibold my-1 py-1 px-4 border border-gray-400 rounded shadow" onClick={() => handleAddToCart(item)}> + </button>
                  <p className="px-3"> {item.attributes.quantity} </p>
                  <button className="bg-black text-white hover:bg-white hover:text-black font-semibold my-1 py-1 px-4 border border-gray-400 rounded shadow" onClick={() => handleRemoveFromCart(item)}> - </button>
                </div>
              </div>
            </div>
          ))
        ):(
          <p>Cart is empty</p>
        )
      }
      {
        cart && (
          <div className='flex justify-between'>
            <div className='text-lg ml-0 px-5 py-3'>
              <p>SubTotal: {total}</p>
              <p>VAT (5%): {total*0.05}</p>
              <p>Total   : {total + (total*0.05)}</p>
            </div>
            <button onClick={handlePayment} className="bg-black text-white hover:bg-white hover:text-black font-semibold my-1 py-2 px-16 border border-gray-400 rounded shadow">Checkout</button>
          </div>
        )
      }
    </div>
  )
}
