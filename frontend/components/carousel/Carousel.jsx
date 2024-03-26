'use client';
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import { HeroCasouselData } from "@/components/carousel/heroCarouselData"


const items = 
[
    {
      "id": 1,
      "title": "Headphone",
      "body": "Bootstrap Carousel Example",
      "imageUrl": "1.png",
    },
    {
      "id": 2,
      "title": "Smartphone",
      "body": "Bootstrap Carousel Example",
      "imageUrl": "2.png",
    },
    {
      "id": 3,
      "title": "Laptop",
      "body": "Bootstrap Carousel Example",
      "imageUrl": "3.png",
    }
  ]



const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return(
    <Carousel className='bg-black z-50' activeIndex={index} onSelect={handleSelect}>
      {
        items.map((item) => (
            <Carousel.Item key={item.id} interval={4000}>
              <img
                className="d-block w-100"
                src={item.imageUrl}
                alt="slides"
              />
              <Carousel.Caption>
                {/* <h3>{item.title}</h3>
                <p>{item.description}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          )
        )
      }
    </Carousel>
  )
}

export default HeroCarousel;