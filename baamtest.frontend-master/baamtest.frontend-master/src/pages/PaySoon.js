/* eslint-disable react/react-in-jsx-scope */
import React, {useState, useEffect} from "react";
import HomeSlider from '../components/HomeSlider';
import {CssBaseline, Fade, CircularProgress, Button} from '@material-ui/core';
// Import Swiper styles
import "../themes/base.css";
import InfoUsers from "../components/InfoUsers";
import InfoSources from "../components/InfoSources";
import BamTeachers from "../components/BamTeachers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getHome } from "../api/services/user";
import Colleagues from "../components/Colleagues";
import logo from '../images/logo-p.png'
import SliderTest from '../images/home/SliderTest.png'

export default function PaySoon(props) {

    return (
        <div style={{overflowX: 'hidden !important'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", width: '100vw', height: '100vh', position: 'absolute'}}>
                <img src={logo} style={{width: '14vw'}}  />
                <div style={{fontSize: '1.5vw', textAlign: 'center', marginTop: '4vw'}}>
                    توجه <br />        
                    نیاز به پرداخت هزینه از طریق درگاه نمی باشد<br />    
                    برای استفاده از تخفیف ویژه‌ی افتتاحیه ی خیلی سبز، با شماره های زیر تماس حاصل فرمایید تا برای شما به صورت ویژه فعال سازی این بخش انجام شود<br />  
                    09911525220<br />    
                    09911525200<br />    
                    09922002443<br />    
                    021-91307484<br />    
                </div>
                <Button
                    onClick={() => props.history.goBack()}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{fontSize: "1rem", textAlign : 'center', fontFamily: "Dana", width: 'fit-content', marginTop: '2vw'}}
                  >
                    بازگشت
                </Button> 
            </div>
        </div>
    );
};