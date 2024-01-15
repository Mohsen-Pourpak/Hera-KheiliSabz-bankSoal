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
  Pagination, Navigation, Autoplay
} from 'swiper/core';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { BASE_URL } from "../api";
import { BAAMTEACHERS_TYPES } from "../utils/Utils";

// install Swiper modules
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay])

export default function BamTeachers(props) {
  
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
            <div ref={props.refT} />
        <div className="single-lesson">
            <div style={{margin: '0 2vw'}}>
                    <Swiper
                        dir="rtl"
                        ref={swiperRef}
                        slidesPerView={5}
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
                        autoplay={{ delay: 6000 }}
                        pagination={{
                            bulletClass: 'none'
                        }}
                        className="mySwiper2">
                        {props.data.map((el, idx) => {
                            return <SwiperSlide>
                                <div className="picture">
                                    <div className="teacher">
                                        <img src={BASE_URL + '/Images/BamTeachers/' + el.pictureLink} />
                                    </div>
                                    <div className="text">{el.firstName} {el.lastName}</div>
                                    <div className="text">{BAAMTEACHERS_TYPES.filter(i => i.id === el.type)[0].title} {el.lesson}</div>
                                </div>
                            </SwiperSlide>
                        })}
                        <div class="bottom-nav" style={{marginTop: 0}}>

                        <div class="slideNext-btn bottom-nav__item" ref={navigationPrevRef}>
                        </div>
                        <div class="slidePrev-btn bottom-nav__item" ref={navigationNextRef}>
                        </div>
                        </div>
                    </Swiper>
            </div>
        </div>
    </>)
}