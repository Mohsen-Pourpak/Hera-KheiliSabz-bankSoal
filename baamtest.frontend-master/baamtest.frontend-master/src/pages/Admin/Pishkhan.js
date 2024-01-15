import React from 'react';
import { IconButton } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";

import mask from '../../images/mask.svg'
import "../../themes/DatePicker.css";
import { getEvent } from '../../api/services/calender';
import jMoment from "moment-jalaali";

import { toEn, toFA } from '../../utils/Utils';
import { getBalance, getName, getStar } from '../../api/services/user';
import { getProfileSc } from '../../api/services/school';
import { getProfileAd } from '../../api/services/advisor';
import { getProfileTe } from '../../api/services/teacher';
import { getProfileSt } from '../../api/services/student';
import { BASE_URL } from '../../api';
import avatarPlaceholder from "../../images/pishkhan/avatar-placeholder.jpg"


const Mask = ({ image, size }) => (
    <div className="profile-mask" style={{ height: size, width: size, maskImage: `url("${mask}")`, WebkitMaskImage: `url("${mask}")`, maskSize: '100%', WebkitMaskSize: '100%' }}>
        <img src={image} style={{ width: size }} />
    </div>
)

const ActionButton = ({ Icon, onClick }) => {
    return (
        <IconButton
            color="inherit"
            aria-controls="profile-menu"
            onClick={onClick}
            style={{ float: 'left', marginBottom: -45, marginTop: 5, marginLeft: 5 }}
        >
            <Icon style={{ fill: '#3d82a4', fontSize: 20 }} />
        </IconButton>
    )
}
class Pishkhan extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            selectedDayPlan: [],
            crop: {
                unit: 'px', // default, can be 'px' or '%'
                x: 130,
                y: 50,
                width: 200,
                height: 200
            }
        };
    }
    async componentDidMount() {
        let userType = localStorage.getItem('userType')
        let token = localStorage.getItem('userToken')

        let isStudent = userType === 'Student'
        let isTeacher = userType === 'Teacher'
        let isAdvisor = userType === 'Advisor'
        let isSchool = userType === 'School'

        let userData;

        if (isSchool) {
            userData = await getProfileSc(token)
        } else if (isAdvisor) {
            userData = await getProfileAd(token)
        } else if (isTeacher) {
            userData = await getProfileTe(token)
        } else if (isStudent) {
            userData = await getProfileSt(token)
        }

        let avatar = !userData.data.avatar ? avatarPlaceholder : BASE_URL + userData.data.avatar;

        let name = await getName(token)
        let star = await getStar(token)
        let balance = await getBalance(token)

        this.setState({ userType, userName: name.data, avatar, star: toFA(star.data.toFixed(4)), balance: toFA(balance.data.toLocaleString()) })
    }
    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
        })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    getEvents = day => {
        let date = jMoment(`${day.year}/${day.month}/${day.day}`, 'jYYYY/jM/jD').format('YYYY-M-D')
        let newDate = new Date(toEn(date)).toISOString()
        let token = localStorage.getItem('userToken')
        getEvent(newDate, token).then(res => {
            console.warn('res', res)
            if (res.isSuccess) {
                this.setState({ selectedDay: day, selectedDayPlan: res.data })
            }
        })
    }

    render() {
        const classes = this.props.classes
        const { selectedDay } = this.state
        return (
            <>
                <PageTitle title="پیشخوان" />
            </>
        );
    }
};

export default Pishkhan;