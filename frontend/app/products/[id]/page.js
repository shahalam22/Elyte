"use client";

import { setProducts } from "@/lib/features/filterReducer";
import { addToCart, addToWishlist } from "@/lib/features/userReducer";

import { fetchDatafromSstrapi } from "@/utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductView({params}) {
    const dispatch = useDispatch();
    const {id} = params;
    const [product, setProduct] = useState();

    const [specificationType, setSpecificationType] = useState('description');
    const [specificetionsection, setSpecificetionsection] = useState('');
    const [imageID, setImageID] = useState(0);

    const handleSpecificationSection = (value) => {
        if(value === 'description'){
            setSpecificetionsection(product.attributes.description);
            setSpecificationType('description');
        }else if(value === 'features'){
            setSpecificetionsection(product.attributes.features);
            setSpecificationType('features');
        }else if(value === 'specifications'){
            setSpecificetionsection(product.attributes.specification);
            setSpecificationType('specifications');
        }
    }

    useEffect(() => {
        const fetchAsyncData = async () => {
            try {
                const fetchedProduct = await fetchDatafromSstrapi(`products/${id}`);
                // dispatch(setProducts(fetchedProducts.data));
                console.log(fetchedProduct.data)
                setProduct(fetchedProduct.data);
                setSpecificetionsection(fetchedProduct.data.attributes.description);
            } catch (error) {
                console.error("Error fetching product", error);
            }
        };

        fetchAsyncData();
    }, [])

    const handleAddToWishlist = (data) => {
      const tempdata = { 
        ...data,
        attributes: {
          ...data.attributes,
          quantity: 1,
        }, 
      };
      // tempdata.attributes.quantity = 1;
      dispatch(addToWishlist(tempdata));
    }

    const handleAddToCart = (data) => {
      const tempdata = { 
        ...data,
        attributes: {
          ...data.attributes,
          quantity: 1,
        }, 
      };
      // tempdata.attributes.quantity = 1;
      dispatch(addToCart(tempdata));
    }

    const handleImageChange = (index) => {
        setImageID(index);
    }

    return (
      <div>
        {product && (
            <div className="flex flex-col">
                <div className="flex flex-col items-center">
                    <img width="80%" src={`http://localhost:1337${product?.attributes.image.data[imageID].attributes.url}`} alt="product" />
                    <h1>Image galary</h1>
                    <div className="flex">
                        {product?.attributes.image.data.map((image, index) => (
                            <button key={index} onClick={() => handleImageChange(index)}>
                                <img height="160px" width="120px" src={`http://localhost:1337${image.attributes.url}`} alt="product" />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mx-10">
                    <h1 className="text-3xl my-2"><b>{product.attributes.title}</b></h1>
                    <p className="text-xl my-2">Price: ${product.attributes.price}</p>
                    <p className="text-lg my-1">Brand: {product.attributes.brand.data.attributes.title}</p>
                    <p className="my-2">Hurry Up! only {product.attributes.quantity} products left in the stock!</p>
                    <div className="flex py-4">
                      <button className="bg-black text-white hover:bg-white hover:text-black font-semibold my-1 mr-5 py-1 px-5 border border-gray-400 rounded shadow" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                      <button className="bg-black text-white hover:bg-white hover:text-black font-semibold my-1 mr-5 py-1 px-5 border border-gray-400 rounded shadow" onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
                    </div>
                </div>
                <div className="flex flex-col mx-10 my-10">
                    <div className="flex justify-between text-lg">
                        <button className={`${specificationType === 'description' ? 'border-b-4 border-black rounded' : ''}`} onClick={()=> handleSpecificationSection('description')}>Description</button>
                        <button className={`${specificationType === 'features' ? 'border-b-4 border-black rounded' : ''}`} onClick={()=> handleSpecificationSection('features')}>Features</button>
                        <button className={`${specificationType === 'specifications' ? 'border-b-4 border-black rounded' : ''}`} onClick={()=> handleSpecificationSection('specifications')}>Specifications</button>
                    </div>
                    <div className="my-8">
                        <p>{specificetionsection}</p>
                    </div>
                </div>
            </div>
        )}
      </div>
    )
}
