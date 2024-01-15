/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import headerLogo from '../images/home/headerLogo.svg'
import {Person, ExitToApp} from '@material-ui/icons';
import { signOut, useUserDispatch, useUserState } from "../context/UserContext";
import { getName } from "../api/services/user";

export default function Header(props) {
    var { isAuthenticated, isAdmin } = useUserState();
    var userDispatch = useUserDispatch();
    const [userName, setUserName] = useState('')

    const [currentStorage, SyncWithLocalStorage] = useState(localStorage || {});

    window.addEventListener("storage", e => {
        SyncWithLocalStorage(localStorage);
    });

    const [small, setSmall] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setSmall(window.pageYOffset > 200)
            );
        }
    }, []);


    const menus = [
        {
            title: 'خانه',
            link: 'home'
        }, {
            title: 'طراحان بام تست',
            link: 'login',
            ref: props.bamTRef
        }, {
            title: 'خانواده بزرگ بام تست',
            link: 'login',
            ref: props.familyRef
        }, {
            title: 'سوالات متداول و راهنما',
            link: 'normal-questions'
        }, {
            title: 'درباره ما',
            link: 'about-us'
        }, {
            title: 'تماس با ما',
            link: 'contact-us'
        }, 
    ]

    useEffect(() => {
        if (isAuthenticated) {
            let token = currentStorage.getItem("userToken")
            getName(token).then(res => {
                console.error({res});
                setUserName(res.data)
            })
        }
    }, [])

    return (
        <div style={{position: small ? 'fixed' : 'absolute', zIndex: 1000000, width: '100%'}}>
            <div className={`bg-header${small ? ' active' : ''}`} />
            <div className={`main-header${small ? ' active' : ''}`}>
                <img onClick={() => props.history.push({ pathname: '/home' })} style={{cursor: 'pointer'}} src={headerLogo} className={`header-logo${small ? ' active' : ''}`}  />
                <div style={{flex: 1, borderLeft: '0.07vw solid #ADB6E6', height: '2vw'}} />
                <div style={{borderBottom: '0.07vw solid #ADB6E6', margin: '0 2vw', display: 'flex', paddingBottom: '1vw'}}>
                    {menus.map(el => {
                        let isActive = window.location.href.includes(el.link)
                        return (
                            <div className={`header-button${isActive ? ' active' : ''}`} onClick={() => {
                                if (el.ref) {
                                    el.ref.current.scrollIntoView({behavior: 'smooth'})
                                } else {
                                    props.history.push({
                                        pathname: `/${el.link}`,
                                    })
                                }
                            }}>
                                {el.title}
                            </div>
                        )
                    })}
                </div>
                <div style={{flex: '0.07vw', borderRight: '0.07vw solid #ADB6E6', height: '2vw'}} />
                {isAuthenticated ? <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{display: 'flex'}} onClick={() => props.history.push({
                        pathname: `/login`,
                    })} className='header-button'>
                        <Person className="profile-icon" />
                        {userName}
                    </div>
                    <div onClick={() => signOut(userDispatch, props.history)} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: '0.5vw'}}><ExitToApp style={{fill: '#828ADB'}} /></div>
                </div> : <><div onClick={() => props.history.push({
                    pathname: `/register`,
                })} className='header-button'>
                    ثبت نام
                </div>
                <div style={{width: '0.07vw', margin: '0.3vw 0.5vw', backgroundColor: '#ADB6E6', height: '2vw'}} />
                <div onClick={() => props.history.push({
                    pathname: `/login`,
                })} className='header-button'>
                    ورود
                </div></>}
            </div>
        </div>
    )
}