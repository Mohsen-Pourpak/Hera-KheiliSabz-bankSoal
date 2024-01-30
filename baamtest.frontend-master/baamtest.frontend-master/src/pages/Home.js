/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
import HomeSlider from '../components/HomeSlider';
import { Backdrop, Fade, CircularProgress } from '@material-ui/core';
// Import Swiper styles
import "../themes/home.css";
import InfoUsers from "../components/InfoUsers";
import InfoSources from "../components/InfoSources";
import BamTeachers from "../components/BamTeachers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Colleagues from "../components/Colleagues";
import BG1 from '../images/home/bg-1.png'
import { getBamSchools, getHome } from "../api/services/home";
import BamSchools  from "../components/BamSchools";

export default function Home(props) {

    const [sliders, setSliders] = useState([])
    const [students, setStudents] = useState(0)
    const [teachersAdvisors, setTeachersAdvisors] = useState(0)
    const [schools, setSchools] = useState(0)
    const [progress, setProgress] = useState(true)
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [bamSchools, setBamSchools] = useState([])

    useEffect(() => {
        getHome().then(res => {
            setSliders(res.data.slider.map(el => {
                return {
                    image: el.pictureLink,
                    title: el.title,
                    description: el.shortDescription
                }
            }))
            setSchools(res.data.schoolsRegistered)
            setStudents(res.data.studentsRegistered)
            setTeachersAdvisors(res.data.teachersRegistered + res.data.advisorsRegistered)
            setProgress(false)
        })
        getBamSchools().then(res => {
            setBamSchools(res.data);
            setProgress(false);
        })
    }, [])

    let familyRef = React.createRef()
    let bamTRef = React.createRef()


    return (
        <div style={{ overflowX: 'hidden !important' }}>
            <Backdrop style={{ zIndex: 1000000, color: '#228b22' }} open={isLoading} onClick={() => console.log('clicked')}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {!show && <Fade exit onExited={() => setShow(true)} in={progress}>
                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: '100vw', height: '100vh' }}>
                    <CircularProgress disableShrink />
                </div>
            </Fade>}
            {!progress && <>
                <img src={BG1} style={{ position: 'absolute', width: '101vw', zIndex: -1, right: '-1vw', top: '-10vw' }} />
                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <div style={{ width: '100%', paddingBottom: 0 }}>
                        <Header familyRef={familyRef} bamTRef={bamTRef} history={props.history} />
                        <HomeSlider data={sliders} />
                        <InfoUsers familyRef={familyRef} students={students} teachersAdvisors={teachersAdvisors} schools={schools} />
                        <Colleagues history={props.history} bamTRef={bamTRef} />
                        {/* <InfoSources questions={questions} exams={exams} handouts={handouts} /> */}
                        {/* <BamTeachers setIsLoading={setIsLoading} data={sliders} /> */}
                        <BamSchools data={bamSchools}/>
                    </div>
                </div>
                <Footer /></>}
        </div>
    );
};