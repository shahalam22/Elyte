"use client";

import { removeFromWishlist } from '@/lib/features/userReducer';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


// id={product.id}
// category={product.attributes.category.data.attributes.title}
// title={product.attributes.title}
// price={product.attributes.price}
// imageUrl={product.attributes.image.data[0].attributes.url}


export default function Wishlist() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.user);
    
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if(!user){
            router.push('/login');
          }
        }, [])
        
    /* main logic of wishlist */
    const handleRemoveFromWishlist = (product) => {
      dispatch(removeFromWishlist(product))
    }

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="text-3xl mb-6">Wish List</h1>
      <br/>
      
      {
        wishlist ? (
              wishlist.map((item, index) => (
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
                    {/* <button className="bg-black text-white hover:bg-white hover:text-black font-semibold my-1 py-2 px-5 border border-gray-400 rounded shadow">Add to Cart</button> */}
                    <button className="bg-black text-white hover:bg-white hover:text-black font-semibold my-1 py-2 px-5 border border-gray-400 rounded shadow" onClick={() => handleRemoveFromWishlist(item)}>Remove</button>
                  </div>
                </div>
              ))
        ):(
          <p>Wishlist is empty</p>
        )
      }
    </div>
  )
}
