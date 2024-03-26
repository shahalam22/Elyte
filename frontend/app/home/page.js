'use client';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/carousel/Carousel'
import { fetchDatafromSstrapi } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import {FreeMode, Pagination} from 'swiper/modules';

//custom function
const sortByCreatedAt = (a, b) => {
  const dateA = new Date(a.attributes.createdAt);
  const dateB = new Date(b.attributes.createdAt);
  return dateB - dateA;
}

export default function Home() {
  const [featuredProducts, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const fetchedProducts = await fetchDatafromSstrapi('products');
          const featuredProducts = fetchedProducts.data.filter((product) => product.attributes.featured === true);
          setProducts(featuredProducts);
          const newProducts = fetchedProducts.data.filter((product)=> product.id != -1);
          setNewProducts(newProducts.sort(sortByCreatedAt).slice(0,4));
      } catch (error) {
          console.error("Error fetching product", error);
      }
    }
    fetchProducts();
  }, []);
  
  return (
    <>
      <HeroCarousel/>

      <div className='w-3/4 bg-gray-400 align-center p-16 mx-auto mt-16'>
        <h1>HeadPhone<br/>Bits</h1>
        <br/>
        <br/>
        <Button variant='dark'>Shop Now</Button>
      </div>
      <div className='w-3/4 bg-red-400 align-center p-16 mx-auto mt-16'>
        <h1>Laptop<br/>Mania</h1>
        <br/>
        <br/>
        <Button variant='dark'>Shop Now</Button>
      </div>

      <section className="text-gray-600 body-font mx-auto">
        <h1 className='pt-32 pb-16 text-center'>Featured Products</h1>
        {/* <div className="container"> */}
          <div className="flex items-center justify-center flex-col">
            <Swiper
              breakpoints={{
                340: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
                700: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
              }}

              freeMode={true}
              pagination={{ clickable: true }}
              modules={[FreeMode, Pagination]}
              className="max-w-[90%] lg:max-w-[90%] h-auto"
            >
              {
                featuredProducts && featuredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="flex justify-center items-center">
                      <ProductCard data={product}/>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
      </section>

    
      <br/>
      <br/>
      <br/>


      <div className='w-full bg-red-400 align-center p-16 mx-auto mt-16'>
        <p><u>Be Smart, Buy Smart</u></p>
        <h1>Let's the world<br/>watch your watch</h1>
        <p>Lorem ipsum is simply dummy text of the printing any typesetting industry's standarf dummy text ever since the 1500s</p>
        <Button variant='dark'>Shop Now</Button>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>[There will an image]</p>
        <br/>
        <br/>
      </div>

      <section className="text-gray-600 body-font mx-auto">
      <h1 className='pt-32 pb-16 text-center'>New Products</h1>
      {/* <div className="container"> */}
        <div className="flex items-center justify-center flex-col">
          <Swiper
            breakpoints={{
              340: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 20
              },
            }}

            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
            className="max-w-[90%] lg:max-w-[90%] h-auto"
          >
            {
              newProducts && newProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="flex justify-center items-center">
                    <ProductCard data={product}/>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
    </section>



    <section className="text-gray-600 body-font mx-auto">
      <h1 className='pt-32 pb-16 text-center'>News Letter</h1>
      <div>
        <Form>
          <div className="text-center w-3/4 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 align-center mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
            </svg>
            <h3 className='mt-3'>Subscribe Now!</h3>
            <p>So you don't miss out the any news,<br/> daily tips and tricks about the tech.</p>
            <div className='w-3/4 mx-auto'>
              <Form.Control className='w-50px' type='email' placeholder='name@example.com'></Form.Control>
            </div>
            <Button className='m-3' variant='dark' type='submit'>Subscribe</Button>
          </div>
        </Form>
      </div>
    </section>

    </>
  )
}