/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from "react";
import { toFA } from "../utils/Utils";

export default function InfoUsers(props) {

  return (<>
    <div ref={props.familyRef} style={{margin: '-10vw 0 13vw'}}/>
    <div id="baam_test_family">
        <div style={{alignItems: 'center', display: 'flex', justifyItems: 'center', margin: '3vw 0px -11vw'}}>
            <div className="devider" />
            <div className="news-title" style={{width: '15vw', fontWeight: 'bold'}}>
                خانواده بزرگ بام تست
            </div>
        </div>
        <div className="section-2">
            <div className="image-container">
              <div className="teacher img" />
              <div className="school img" />
              <div className="student img" />
            </div>
            <div className="count-container">
                <div onClick={() => props.history.push({ pathname: '/teachers' })} className="count-box">
                <span>{toFA(props.teachersAdvisors)}</span><br />
                  دبیر/مشاور
                </div>
                <div onClick={() => props.history.push({ pathname: '/schools' })} className="count-box">
                  <span>{toFA(props.schools)}</span><br />
                  مدرسه/آموزشگاه
                </div>
                <div onClick={() => props.history.push({ pathname: '/students' })} className="count-box">
                <span>{toFA(props.students)}</span><br />
                  دانش آموز
                </div>
            </div>
            
        </div>
    </div>
  </>)
}