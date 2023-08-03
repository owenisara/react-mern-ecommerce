import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';

const SingleProductCard = ({product}) => {
    const {images} = product
  return (
    <>
    <Carousel>
        {images && images.map((item,index)=>  <img key={index} src={item.url} alt=''/>)}        
    </Carousel>
    </>
  )
}

export default SingleProductCard
