/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from "react";
import MoveImage from '../images/home/dabir-move.png'
export default function Colleagues(props) {

  return (<>
    <div ref={props.bamTRef} style={{margin: '-9vw 0 12vw'}}/>
    <div id="dabiran" className="teacher-banner">
        <div onClick={() => {
          props.history.push({
            pathname: '/baam-teachers',
          })
        }} className="button"></div>
        <img src={MoveImage} className="image" />
    </div>
  </>)
}