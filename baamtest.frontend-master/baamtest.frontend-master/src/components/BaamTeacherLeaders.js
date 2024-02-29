/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from "react";
import { BASE_URL } from "../api";
import { getBamTeacherSingleLesson } from "../api/services/home";
// import { toFA } from "../utils/Utils";
import BaamTeacherSingleLesson from "./BaamTeacherSingleLesson";

export default function BaamTeacherLeaders(props) {

  const [selectedItem, setSelectedItem] = useState(null)
  const [lessonTeachers, setLessonTeachers] = useState([])

  let refT = React.useRef(null)

  const onLeaderClick = async (item) => {
      setSelectedItem(item)
      let data = await getBamTeacherSingleLesson(item.lesson)
      setLessonTeachers(data.data.filter(el => el.type !== 'TeamLeader').sort((a, b) => b.priority - a.priority))
    //   if (refT && refT.current) {
        
    //   }
    const whatIDo = document.getElementById('section-76');
    whatIDo.scrollIntoView({behavior: 'smooth'});
    // refT.current.scrollIntoView({behavior: 'smooth'})
  }

  return (<>
    <div id="baam_test_family">
        <div style={{alignItems: 'center', display: 'flex', justifyItems: 'center', margin: '3vw 0px -11vw'}}>
            <div className="devider" />
            <div className="news-title" style={{width: '15vw', fontWeight: 'bold'}}>
                تیم تالیف خیلی سبز            </div>
        </div>
        <div className="section-44">
            <div className="box">
                {props.data.map(el => {
                    return (
                        <div onClick={() => onLeaderClick(el)} className={`leader${Boolean(selectedItem && el.pictureLink === selectedItem.pictureLink) ? ' active' : ''}`}>
                            <img src={BASE_URL + '/Images/BamTeachers/' + el.pictureLink} />
                        </div>
                    )
                })}
            </div>
        </div>
        <div id="section-76" />
        {selectedItem && <div className="section-45">
            <div className="box">
                <div className="leader">
                    <img src={BASE_URL + '/Images/BamTeachers/' + selectedItem.pictureLink} />
                </div>
                <BaamTeacherSingleLesson data={lessonTeachers} />
            </div>
        </div>}
    </div>
  </>)
}