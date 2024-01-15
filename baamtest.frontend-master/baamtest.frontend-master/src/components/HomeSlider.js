/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
 
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

// import Swiper core and required modules
import SwiperCore, {
  Pagination, Navigation, Autoplay
} from 'swiper/core';
import { BASE_URL } from "../api";

// install Swiper modules
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay])


export default function HomeSlider(props) {
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  return (
    <>
      <Swiper dir="rtl"
        navigation={{
          prevEl: navigationPrevRef.current ? navigationPrevRef.current : undefined,
          nextEl: navigationNextRef.current ? navigationNextRef.current : undefined,
        }}
        onInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.update();
        }}
        autoplay={{ delay: 6000 }}
        pagination={{
            bulletClass: 'none'
        }}
        className="mySwiper">
        {props.data.map(el => {
          return <SwiperSlide>
            <img src={BASE_URL + '/Images/Sliders/' + el.image} style={{width: '90vw'}}  />
          </SwiperSlide>
        })}
        <div class="bottom-nav">
          <div class="slideNext-btn bottom-nav__item" ref={navigationPrevRef}>
          </div>
          <div class="slidePrev-btn bottom-nav__item" ref={navigationNextRef}>
          </div>
        </div>
      </Swiper>
    </>
  )
}