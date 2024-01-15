import React from 'react';
import {Container, Grid, Button, Select, Input, MenuItem} from '@material-ui/core';
import TextField from '../../components/Form/TextField'
import PageTitle from "../../components/PageTitle/PageTitle";
import {Bookmark, SubdirectoryArrowLeft, School, DeleteSweep} from '@material-ui/icons';
import axios from 'axios';
import {createTest} from '../../api/services/exam';
import mask from '../../images/mask.svg'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import ArrowIcon from '../../images/icons/circle-arrow-icon.svg';
import Image2 from '../../images/test/Untitled-1.jpg';
import Image3 from '../../images/pishkhan/Untitled-3.svg';
import Image4 from '../../images/pishkhan/Untitled-4.svg';
import Image5 from '../../images/invitioan.png';
import {fields} from '../../api/services/tags';
import { toast } from 'react-toastify';
import {payment} from '../../api/services/buy';
import * as qs from "qs";
import { getPriceSc } from '../../api/services/school';

import { addCommas, getUserTypeStr, toEn, toFA } from '../../utils/Utils';
import { getBalance, getIdentifierCode, getStar } from '../../api/services/user';


const style = {
    sortFilter: {
        backgroundColor: 'transparent',
        border: '1px solid #3d82a4',
        color: '#3d82a4',
        width: 'fit-content',
        height: 40,
        padding: '0 50px',
        marginLeft: 20,
        flex: 1,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    sortFilterActive: {
        backgroundColor: '#3d82a4',
        border: '1px solid #3d82a4',
        color: '#fff',
        width: 'fit-content',
        padding: '0 50px',
        marginLeft: 20,
        height: 40,
        flex: 1,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
}

class Invitetion extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            fields: [],
            title: '',
            fieldId: 'd',
            gradeId: 'd',
            level: 'Hard',
            selectedFields: [],
            selectedList: [],
            grade: '',
            price: '',
            code: '',
            credit: 0
        };
    }
    componentDidMount() {
        let token = localStorage.getItem('userToken')
        let userType = localStorage.getItem('userType')
        let isStudent = userType === 'Student'
        console.error('isStudent', isStudent)
        this.setState({isStudent, userType})
        
        getIdentifierCode(token).then(res => {
            if (res.isSuccess) {
                console.error({res})
                this.setState({code: res.data.discountCode})
            }
        })
    }

    changeInput = (field, e) => {
        let value = e.target.value;

        this.setState({
            [field]: value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        })
    }


    gradeOnClick = (id) => {
        const {selectedFields} = this.state
        let newList;

        if (selectedFields.includes(id)) {
            newList = selectedFields.filter(el => el !== id)
            this.setState({selectedFields: newList})
        } else {
            newList = [...this.state.selectedFields, id]
            this.setState({selectedFields: newList})
        }

        let token = localStorage.getItem('userToken')
        let data = JSON.stringify(newList);

        getPriceSc(data, token).then(res => {
            console.warn(res)
            this.setState({
                price: parseInt(res.data.finalPrice),
            })
        })
    }

    finalActivate = () => {
        let token = localStorage.getItem('userToken')

        payment(toEn(parseInt(this.state.price.replace(/,/g, ''))), token).then(res => {
            console.warn(res)
            if (res.isSuccess) {
                toast.success(res.Message)
                window.location.href = res.data
            }
        })
    }

    render() {
        const classes = this.props.classes
        return (
            <>
                <PageTitle title={`دعوت از دوستان`} />
                <Grid container item xs={12} style={{padding: '0 10px'}}>
                    <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <Grid direction="column" container item xs={12}>
                        <div style={{flexDirection: 'row', display: 'flex', width: '100%'}}>
                            <div>
                                <div style={{fontSize: '1rem', padding: '0 15px'}}>
                                برای شما که در بام تست ثبت نام کرده اید ،یک کد دعوت فعال شده است که می‌توانید با آن از دوستان خود دعوت کنید که در بام تست به جمع بزرگ ما بپیوندند.
این کد دعوت را می توانید به تمام مدارس، موسسات، مشاوران،دبیران و دانش آموزان بدهید و آن ها با استفاده از کد دعوت شما در اولین خرید خود ،تخفیف دریافت کنند و شما به عنوان دعوت کننده ،از بام تست ستاره دریافت کنید که این ستاره ها در نهایت می توانند به هدایای نفیسی از طرف بام تست به شما تبدیل شود؛ برای اطلاعات بیشتر می توانید با بخش پشتیبانی تماس حاصل بفرمایید                                </div>
                                <div style={{display: 'flex', marginTop: 20, alignItems: 'center'}}>
                                    <div style={{fontSize: 17, fontWeight: 'bolder', color: '#3d81a4', marginRight: 15}}>کد اختصاصی شما</div>
                                    <div style={{background: 'white',
    borderRadius: 100,    marginRight: 20,
    minWidth: 300,
    fontSize: 18,
    display: 'flex',
    fontWeight: 'bolder',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    boxShadow: '0 0 1vw -0.25vw #0000003d'}}>{this.state.code}</div>
                                </div>
                            </div>
                            <img src={Image5} style={{height: 200}} />
                        </div>
                    </Grid>
                </Grid>
                
                </Grid>
            </>
        );
    }
};

export default Invitetion;