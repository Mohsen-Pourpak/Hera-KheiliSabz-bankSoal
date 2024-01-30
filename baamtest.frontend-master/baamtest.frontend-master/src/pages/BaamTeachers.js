/* eslint-disable react/react-in-jsx-scope */
import React, {useState, useEffect} from "react";
import HomeSlider from '../components/HomeSlider';
import {Backdrop, Fade, CircularProgress} from '@material-ui/core';
// Import Swiper styles
import "../themes/home.css";
import InfoUsers from "../components/InfoUsers";
import InfoSources from "../components/InfoSources";
import BaamTeacherLeaders from "../components/BaamTeacherLeaders";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Colleagues from "../components/Colleagues";
import BG1 from '../images/home/bg-4.png'
import SliderTest from '../images/home/SliderTest.png'
import { getBamTeacherLeader } from "../api/services/home";

export default function BaamTeachers(props) {

    const [bamTeachersLeaders, setBamTeachersLeaders] = useState([])
    const [progress, setProgress] = useState(true)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getBamTeacherLeader().then(res => {
            setBamTeachersLeaders(res.data.filter(el => el.type === 'TeamLeader').sort((a, b) => a.priority - b.priority))
            setProgress(false)
            const topView = document.getElementById('topView');
            topView.scrollIntoView({behavior: 'smooth'});
        })
    }, [])

    let bamTRef = React.createRef()
    let familyRef = React.createRef()
    
    return (
        <div style={{overflowX: 'hidden !important'}}>
            <Backdrop style={{zIndex: 1000000, color: '#228b22'}} open={isLoading} onClick={() => console.log('clicked')}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!show && <Fade exit onExited={() => setShow(true)} in={progress}>
                <div style={{display: 'flex', justifyContent: "center", alignItems: "center", width: '100vw', height: '100vh'}}>
                    <CircularProgress disableShrink />
                </div>
            </Fade>}
                {!progress && <>
                <img src={BG1} style={{position: 'absolute', width: '101vw', zIndex: -1, right: '-1vw', top: '-21vw', height: '33vw'}}  />
                <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <div style={{width: '100%', paddingBottom: 0}}>
                        <Header familyRef={familyRef} bamTRef={bamTRef} history={props.history} />
                        <div ref={familyRef} style={{height: '7vw'}} />
                        <div id="topView" style={{marginTop: '-20vw', marginBottom: '23vw'}} />
                        <Colleagues history={props.history} bamTRef={bamTRef} />
                        <BaamTeacherLeaders data={bamTeachersLeaders} />
                    </div>
                </div>
                <Footer /></>}
        </div>
    );
};