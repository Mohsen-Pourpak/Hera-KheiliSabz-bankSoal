/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from "react";
// Import Swiper React components

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import tel from '../images/home/tel.png'
import ins from '../images/home/ins.png'


export default function Footer(props) {
  
  return (
    <div className="footer">
      <div style={{display: 'flex', width: '100%', marginBottom: '3.5vw'}}>
        <div style={{flex: 1}}>
          <a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=182758&amp;Code=W4ggoo7ej1QnMlP2x88e"><img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=182758&amp;Code=W4ggoo7ej1QnMlP2x88e" alt="" style={{cursor:'pointer', width: '9vw'}} id="W4ggoo7ej1QnMlP2x88e" /></a>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
          <div style={{fontSize: '1vw', display: 'flex', textAlign: 'center', color: '#9986d2', alignItems: 'center', marginBottom: '1vw'}}>
              
              <div>baamtest@ | </div>
              <a target="_blank" href="https://www.instagram.com/baamtest/"><img src={ins} style={{height: '1.7vw', width: '1.7vw', marginRight: '0.5vw'}} /></a>
              <a target="_blank" href="https://t.me/s/baamtest"><img src={tel} style={{height: '1.6vw', width: '1.6vw', marginRight: '0.5vw'}} /></a>

            </div>
          <div style={{display: 'flex', marginBottom: '1vw'}}>
            
            <div style={{fontSize: '1vw', textAlign: 'center', color: '#fff', marginLeft: '1vw'}}>
              <span style={{color: '#ffa200'}}>آدرس: </span>تهران، دروازه شمیران، خیابان ابن سینا، کوچه جلایی پور
            </div>
            <div style={{fontSize: '1vw', textAlign: 'center', color: '#fff'}}>
              <span style={{color: '#ffa200'}}>ایمیل: </span>baamtest@gmail.com
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{fontSize: '1vw', textAlign: 'center', color: '#fff', marginLeft: '1vw'}}>
              <span style={{color: '#ffa200'}}>تلفن: </span>۹۱۳۰۷۴۸۴ - ۰۲۱
            </div>
            <div style={{fontSize: '1vw', textAlign: 'center', color: '#fff'}}>
              <span style={{color: '#ffa200'}}>پشتیبانی: </span>۰۹۹۱۱۵۲۵۲۲۰ - ۰۹۹۱۱۵۲۵۲۰۰
            </div>
          </div>
        </div>
        <div style={{flex: 1}}>
          <a style={{width: '9vw'}}></a>
        </div>
      </div>
      
      <div style={{fontSize: '1vw', textAlign: 'center', width: '100vw', justifyContent: 'center', display: 'flex', color: '#9986d2', marginBottom: '1.1vw'}}>
        کلیه حقوق این سایت متعلق به موسسه بام تست می باشد
      </div>
    </div>
  )
}