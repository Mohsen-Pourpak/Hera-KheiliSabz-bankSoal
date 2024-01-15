/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from "react";
// Import Swiper React components

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import backgroundImage from '../images/home-background-2.svg'
import backgroundImage1 from '../images/exams-c.svg'
import backgroundImage2 from '../images/questions-c.svg'
import backgroundImage3 from '../images/handouts-c.svg'


export default function InfoUsers(props) {

  return (
    <>
        <div style={{display: 'flex', flexDirection: 'row', padding: '5% 8% 5% 5%', maxHeight: 840, justifyContent: 'space-between', width: '100%', height: '62vw'}}>
            <div style={{flex: 0.2, display: 'flex', padding: '10% 0 10% 8%', flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: '100%'}}>
                <div className="aviny" style={{fontSize: '3vw', width: '100%', flex: 1, display: 'flex', backgroundRepeat: 'no-repeat', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', color: '#fff', backgroundPosition: 'center', backgroundImage: `url('${backgroundImage1}')`, backgroundSize: 'contain'}}>{props.questions}</div>
                <div className="aviny" style={{fontSize: '3vw', width: '100%', flex: 1, display: 'flex', backgroundRepeat: 'no-repeat', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', color: '#fff', backgroundPosition: 'center', backgroundImage: `url('${backgroundImage2}')`, backgroundSize: 'contain'}}>{props.questions}</div>
                <div className="aviny" style={{fontSize: '3vw', width: '100%', flex: 1, display: 'flex', backgroundRepeat: 'no-repeat', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', color: '#fff', backgroundPosition: 'center', backgroundImage: `url('${backgroundImage3}')`, backgroundSize: 'contain'}}>{props.questions}</div>
            </div>
            <div style={{flex: 0.8, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url('${backgroundImage}')`, backgroundSize: '100%', justifyContent: 'center', textAlign: 'left', paddingLeft: '2%', alignSelf: 'center', alignItems: 'center', height: '100%'}}>
               
            </div>
        </div>
    </>
  )
}