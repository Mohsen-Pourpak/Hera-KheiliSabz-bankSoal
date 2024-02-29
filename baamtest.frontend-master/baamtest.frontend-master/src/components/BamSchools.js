/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "../themes/bamTeachers.css";


// import Swiper core and required modules
import SwiperCore, {
  Pagination, Navigation, On
} from 'swiper/core';
import { BASE_URL } from "../api";

// install Swiper modules
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);

export default function BamSchools(props) {
  
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    const swiperRef = React.useRef(null)
    const [className, setClassName] = useState('article-content')
    const [activeButton, setActiveButton] = useState(0)

    const setActive = item => {
        props.setIsLoading(true)
        setTimeout(() => {
            setActiveButton(item)
            props.setIsLoading(false)
        }, 1000);
    }
  
    return (<>
        <div style={{alignItems: 'center', display: 'flex', justifyItems: 'center', margin: '3vw 0 -8vw'}}>
            <div className="devider" />
            <div className="news-title" style={{fontWeight: 'bold'}}>
                مدارس خیلی سبز            </div>
        </div>
        <div className="news">
            <div style={{margin: '0 2vw'}}>
                    <Swiper
                        autoplay={true}
                        dir="rtl"
                        ref={swiperRef}
                        slidesPerView={3}
                        effect="fade"
                        slidesPerGroup={2}
                        navigation={{
                            prevEl: navigationPrevRef.current ? navigationPrevRef.current : undefined,
                            nextEl: navigationNextRef.current ? navigationNextRef.current : undefined,
                        }}
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                            swiper.navigation.update();
                        }}
                        on={{
                            init: function () {
                            console.error('init')
                            setClassName("article-content active");
                            },
                            transitionStart: function() {
                            console.error('transitionStart')
                            setClassName("article-content");
                            },
                            transitionEnd: function(swiper) {
                            console.error('transitionEnd')
                            setClassName("article-content active");
                            }
                        }}
                        pagination={{
                            bulletClass: 'none'
                        }}>
                        {props.data.map((item, idx) => {
                            return <SwiperSlide>
                                <div className="new-card">
                                    <div className="card">
                                        <img src={item.pictureLink ? `${BASE_URL}${item.pictureLink}` : ""} />
                                            <div className="title">{" مدرسه" + item.name}</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                        {/* <div class="bottom-nav" style={{marginTop: 0}}>

                        <div class="slideNext-btn bottom-nav__item" ref={navigationPrevRef}
                        />
                        <div class="slidePrev-btn bottom-nav__item" ref={navigationNextRef}/>
                        </div> */}
                    </Swiper>
            </div>
        </div>
    </>)
}