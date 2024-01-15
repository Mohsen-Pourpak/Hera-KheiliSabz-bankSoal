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
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { BASE_URL } from "../api";

// install Swiper modules
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);

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
        <div style={{alignItems: 'center', display: 'flex', justifyItems: 'center', margin: '3vw 0 -8vw'}}>
            <div className="devider" />
            <div className="news-title" style={{fontWeight: 'bold'}}>
                اخبــار
            </div>
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
                        {props.data.map((el, idx) => {
                            return <SwiperSlide>
                                <div className="new-card">
                                    <div className="card">
                                        <img src="http://awazemrooz.ir/wp-content/uploads/2018/08/IMG_4206-500x375.jpg" />
                                        <div className="line" />
                                        <div className="details">
                                            <div className="title">مراسم رونمایی از برند بام تست</div>
                                            <div className="description">به گزارش خبرگزاری، هم اندیشی تشکیلاتی دبیران کانون های دانش آموختگان سراسر کشور صبح امروز با حضور ۱۴۵ نفر از مسئولان کانون آغاز شد</div>
                                            <div className="button-continue">
                                                ادامه مطلب...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                        <div class="bottom-nav" style={{marginTop: 0}}>

                        <div class="slideNext-btn bottom-nav__item" ref={navigationPrevRef}
                        />
                        <div class="slidePrev-btn bottom-nav__item" ref={navigationNextRef}/>
                        </div>
                    </Swiper>
            </div>
            <button onClick={()=> navigationNextRef.current.click()}>salam</button>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div onClick={() => setActive(0)} className={`cat-button${activeButton===0?' active':''}`}>
                    همایش ها
                </div>
                <div onClick={() => setActive(1)} className={`cat-button${activeButton===1?' active':''}`}>
                    آموزشی
                </div>
                <div onClick={() => setActive(2)} className={`cat-button${activeButton===2?' active':''}`}>
                    جدید
                </div>
                <div onClick={() => setActive(3)} className={`cat-button${activeButton===3?' active':''}`}>
                    مدارس
                </div>
            </div>
        </div>
    </>)
}