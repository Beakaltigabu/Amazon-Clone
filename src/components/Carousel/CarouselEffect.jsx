import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {img} from "./img/data"
import classes from "./Carousel.module.css"

function CarouselEffect() {
  return (
    <div>
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        >
        {
            img.map((imageItemLink)=>{
                    return <img src={imageItemLink}  />
                })

        }
        </Carousel>
        <div className={classes.hero__img}>

        </div>

    </div>
  )
}

export default CarouselEffect
