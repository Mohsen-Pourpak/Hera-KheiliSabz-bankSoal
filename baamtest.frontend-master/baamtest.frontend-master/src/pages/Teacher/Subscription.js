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
import Image5 from '../../images/teacher/get-price.svg';
import {books, fields} from '../../api/services/tags';
import { toast } from 'react-toastify';
import {payment} from '../../api/services/buy';
import * as qs from "qs";
import { getPriceSc, activateAccountSc } from '../../api/services/school';
import { getPriceTe, activateAccountTe } from '../../api/services/teacher';
import { getPriceAd, activateAccountAd } from '../../api/services/advisor';

import { getUserTypeStr, toEn, toFA } from '../../utils/Utils';

const imagem = 'https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg';

const Mask = ({ image, size }) => (
    <div className="profile-mask" style={{height: size, width: size, maskImage: `url("${mask}")`, WebkitMaskImage: `url("${mask}")`, maskSize: '100%', WebkitMaskSize: '100%'}}>
      <img src={image} style={{width: size}} />
    </div>
)

const style = {
    sortFilter: {
        backgroundColor: 'transparent',
        border: '1px solid #3d82a4',
        color: '#3d82a4',
        width: 'fit-content',
        height: 40,
        padding: '0 50px',
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
        height: 40,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
}

class RegisterTest extends React.Component {
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
            price: 0,
            discount: ''
        };
    }
    componentDidMount() {

        let userType = localStorage.getItem('userType')

        let isStudent = userType === 'Student'
        let isTeacher = userType === 'Teacher'
        let isAdvisor = userType === 'Advisor'
        let isSchool = userType === 'School'
        console.error('isStudent', isStudent)
        this.setState({isStudent, isAdvisor, isSchool, isTeacher, userType})
        
        if (isTeacher) {
            books().then(res => {
                if (res.isSuccess) {
                    console.warn(res)
                    let fields = res.data.sort((a, b) => b.gradeId - a.gradeId).reduce(function (r, a) {
                        r[a.gradeId] = r[a.gradeId] || [];
                        r[a.gradeId].push(a);
                        return r;
                    }, Object.create(null))
                    this.setState({fields})
                    // console.error({fields: Object.values(fields)})
                }
            })
        } else {
            fields().then(res => {
                if (res.isSuccess) {
                    console.warn(res)
                    this.setState({fields: res.data})
                }
            })
        }
        
    }

    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
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

        if (this.state.isSchool) {
            getPriceSc(this.state.discount, data, token).then(res => {
                console.warn(res)
                this.setState({
                    price: parseInt(res.data.finalPrice),
                })
            })
        } else if (this.state.isAdvisor) {
            getPriceAd(this.state.discount, data, token).then(res => {
                console.warn(res)
                this.setState({
                    price: parseInt(res.data.finalPrice),
                })
            })
        } else if (this.state.isTeacher) {
            getPriceTe(this.state.discount, data, token).then(res => {
                console.warn(res)
                this.setState({
                    price: parseInt(res.data.finalPrice),
                })
            })
        }
        
    }

    finalActivate = () => {
        let token = localStorage.getItem('userToken')

        let data = JSON.stringify(this.state.selectedFields);

        if (this.state.isSchool) {
            activateAccountSc(this.state.discount, data, token).then(res => {
                console.warn(res)
                if (res.isSuccess) {
                    toast.success(res.data)
                }
            })
        } else if (this.state.isAdvisor) {
            activateAccountAd(this.state.discount, data, token).then(res => {
                console.warn(res)
                if (res.isSuccess) {
                    toast.success(res.data)
                }
            })
        } else if (this.state.isTeacher) {
            activateAccountTe(this.state.discount, data, token).then(res => {
                console.warn(res)
                if (res.isSuccess) {
                    toast.success(res.data)
                }
            })
        }
    }

    render() {
        const classes = this.props.classes
        return (
            <>
                <PageTitle title={`خرید اشتراک (برای ${getUserTypeStr(this.state.userType)})`} />
                <Grid container item xs={12} style={{padding: '0 10px'}}>
                    <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <Grid direction="column" container item xs={12}>
                        <div style={{flexDirection: 'row', display: 'flex', width: '100%'}}>
                            <div>
                                <div style={{width: '100%'}}>
                                    <PageTitle title="جهت خرید اشتراک سالانه ی بام تست به نکات زیر توجه فرمایید :" size="h2" color="#3d82a4" />
                                </div>
                                {this.state.isSchool ? <div style={{fontSize: '1rem', padding: '0 15px'}}>
                                ۱ - شما میتوانید بر اساس رشته های تحصیلی موجود در مدرسه /موسسه ی خویش، رشته های تحصیلی مورد نیازتان را انتخاب کنید. <br />
                                ۲ - بعد از خرید اشتراک سالانه ، به مقدار هزینه ی ثبت ۱۵۰۰۰ سوال برای شما در بخش اعتبار ،شارژ انجام می شود که می‌توانید از آن در بخش های مختلف استفاده کنید.<br />
                                ۳ - پس از خرید اشتراک سالانه، می‌توانید یک مشاور به ازای هر پایه و یک دبیر به ازای هر درس در هر پایه، به صورت رایگان به عنوان زیرگروه خود اضافه کنید که فرآیند طراحی و برگزاری آزمون برای شما بسیار آسان تر بشود.برای این کار کافیست به بخش "مدیریت کلاس"مراجعه کنید.<br />
                                ۴ - بعد از خرید اشتراک سالانه، می‌توانید دانش آموزان خود را به زیرگروه خود اضافه کنید و آن ها را کلاس بندی(گروه بندی) کنید و برای آن ها آزمون آنلاین(و به زودی خدمات گسترده تر و بیشتر ) برگزار کنید و کارنامه بدهید. برای این کار کافیست به بخش "خرید زیرگروه" مراجعه کنید.<br />
                                ۵ - پس از اتمام اعتبار ،برای بهره گیری از خدمات بیشتر، می‌توانید اعتبار خود را افزایش دهید و برای این کار تنها کافیست که به بخش "افزایش اعتبار" مراجعه کنید.<br />
                                ۶ - برای تک تک هزینه هایی که در داخل بام تست انجام می‌دهید، نگران نباشید؛زیرا علاوه بر خدمات گیری از بام تست ،ستاره دریافت می کنید که این ستاره ها در نهایت می تواند به هدایای نفیسی از طرف بام تست به شما تبدیل شود.<br />
                                ۷ -  بعد از گذشت یک سال ،اشتراک به حالت اولیه بازمی‌گردد و تنها تعداد ستاره های آن باقی میماند که می‌تواند به هدایای نفیسی از طرف بام تست به شما تبدیل شود ؛ برای اطلاعات بیشتر می‌توانید با بخش پشتیبانی تماس حاصل بفرمایید.
                                </div> : this.state.isAdvisor ? <div style={{fontSize: '1rem', padding: '0 15px'}}>
                                ۱ - شما میتوانید بر اساس رشته های تحصیلی مورد نیازتان، اشتراک خود را دریافت کنید و به سوالات آن رشته (رشته های)تحصیلی دسترسی پیدا کنید.<br />
                                ۲ - بعد از خرید اشتراک سالانه ، به مقدار هزینه ی ثبت ۱۰۰۰۰ سوال برای شما در بخش اعتبار ،شارژ انجام می شود که می‌توانید از آن در بخش های مختلف استفاده کنید.<br />
                                ۳ - پس از خرید اشتراک سالانه، می‌توانید دبیران خود را به زیرگروه خود اضافه کنید و آن ها را سامان دهی کنید. براي اين کار کافیست به بخش "خرید زیرگروه"مراجعه کنید.<br />
                                ۴ - بعد از خرید اشتراک سالانه، می‌توانید دانش آموزان خود را به زیرگروه خود اضافه کنید و آن ها را کلاس بندی(گروه بندی) کنید و برای آن ها آزمون آنلاین(و به زودی خدمات گسترده تر و بیشتر ) برگزار کنید و کارنامه بدهید.برای این کار کافیست به بخش "خرید زیرگروه" مراجعه کنید.<br />
                                ۵ - پس از اتمام اعتبار ،برای بهره گیری از خدمات بیشتر، می‌توانید اعتبار خود را افزایش دهید و برای این کار تنها کافیست که به بخش "افزایش اعتبار" مراجعه کنید.<br />
                                ۶ - برای تک تک هزینه هایی که در داخل بام تست انجام می‌دهید، نگران نباشید؛زیرا علاوه بر خدمات گیری از بام تست ،ستاره دریافت می کنید که این ستاره ها در نهایت می تواند به هدایای نفیسی از طرف بام تست به شما تبدیل شود.<br />
                                ۷ -  بعد از گذشت یک سال ،اشتراک به حالت اولیه بازمی‌گردد و تنها تعداد ستاره های آن باقی میماند که می‌تواند به هدایای نفیسی از طرف بام تست به شما تبدیل شود ؛ برای اطلاعات بیشتر می‌توانید با بخش پشتیبانی تماس حاصل بفرمایید.
                                </div> : <div style={{fontSize: '1rem', padding: '0 15px'}}>
                                ۱ - شما میتوانید بر اساس دروس مورد نیازتان، اشتراک خود را دریافت کنید و به سوالات آن درس(دروس)دسترسی پیدا کنید.<br />
                                ۲ - بعد از خرید اشتراک سالانه ، به مقدار هزینه ی ثبت ۲۰۰۰ سوال برای شما در بخش اعتبار ،شارژ انجام می شود که می‌توانید از آن در بخش های مختلف استفاده کنید.<br />
                                ۳ - بعد از خرید اشتراک سالانه، می‌توانید دانش آموزان خود را به زیرگروه خود اضافه کنید و آن ها را کلاس بندی(گروه بندی) کنید و برای آن ها آزمون آنلاین(و به زودی خدمات گسترده تر و بیشتر ) برگزار کنید و کارنامه بدهید.برای این کار کافیست به بخش "خرید زیرگروه" مراجعه کنید.<br />
                                ۴ - پس از اتمام اعتبار ،برای بهره گیری از خدمات بیشتر، می‌توانید اعتبار خود را افزایش دهید و برای این کار تنها کافیست که به بخش "افزایش اعتبار" مراجعه کنید.<br />
                                ۵ - برای تک تک هزینه هایی که در داخل بام تست انجام می‌دهید، نگران نباشید؛زیرا علاوه بر خدمات گیری از بام تست ،ستاره دریافت می کنید که این ستاره ها در نهایت می تواند به هدایای نفیسی از طرف بام تست به شما تبدیل شود.<br />
                                ۶ -  بعد از گذشت یک سال ،اشتراک به حالت اولیه بازمی‌گردد و تنها تعداد ستاره های آن باقی میماند که می‌تواند به هدایای نفیسی از طرف بام تست به شما تبدیل شود ؛ برای اطلاعات بیشتر می‌توانید با بخش پشتیبانی تماس حاصل بفرمایید.
                                </div>}
                            </div>
                            <img src={Image5} style={{height: 200}} />
                        </div>
                    </Grid>
                </Grid>
                <Grid direction="column" alignItems="flex-start" spacing={1} justify="flex-start" container style={{padding: 20, marginTop: 40, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <div style={{width: '100%', marginBottom: -40}}>
                        <PageTitle title={this.state.isTeacher ? "انتخاب کتاب" : "انتخاب رشته"} size="h2" color="#000" />
                    </div>
                    {this.state.isTeacher ? Object.values(this.state.fields).map((item_) => {
                        return (<>
                        <PageTitle title={item_[0].gradeTitle} size="h2" color="#000" style={{margin: '15px 0'}} />
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gridGap: 20, justifyContent: 'flex-start',}}>
                        {item_.map((item, idx) => {
                            return (
                                <div onClick={() => this.gradeOnClick(item.id)} style={this.state.selectedFields.includes(item.id) ? style.sortFilterActive : style.sortFilter}>
                                    {item.name}
                                </div>
                            )
                        })}
                    </div></>)}) : <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gridGap: 20, justifyContent: 'flex-start', marginTop: 20}}>
                        {this.state.fields.map((item) => {
                            return (
                                <div onClick={() => this.gradeOnClick(item.id)} style={this.state.selectedFields.includes(item.id) ? style.sortFilterActive : style.sortFilter}>
                                    {item.title}
                                </div>
                            )
                        })}
                    </div>}
                </Grid>
                <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, marginTop: 40, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between',}}>
                        <div style={{flexDirection: 'row', display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                            <div style={{flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 45}}>
                                مدت زمان باقی مانده
                            </div>
                            <div style={{flex: 1, textAlign: 'center', width: 200}}>
                                <span style={{fontSize: 17, width: 200, textAlign: 'center'}}>{toFA(this.props.info.expireTime)} روز</span>
                            </div>
                        </div>
                        <div style={{flex: 0.5}} />
                        <div style={{flexDirection: 'row', marginRight: 20, display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                            <div style={{flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 45}}>
                                کد تخفیف
                            </div>
                            <div style={{flex: 1, textAlign: 'center', width: 200}}>
                                <span style={{fontSize: 17, width: 200, textAlign: 'center', display: 'flex', alignItems: 'center', padding: '0 15px'}}>{
                                    <TextField
                                        placeholder="کد را وارد کنید"
                                        style={{height: 40, background: 'transparent', paddingTop: 0, textAlign: 'center'}}
                                        onChange={e => this.changeInput('discount', e)}
                                    />
                                }</span>
                            </div>
                        </div>
                        <div style={{flex: 0.5}} />
                        <div style={{flexDirection: 'row', display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                            <div style={{flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 45}}>
                                قیمت
                            </div>
                            <div style={{flex: 1, textAlign: 'center', width: 200}}>
                                <span style={{fontSize: 17, width: 200, textAlign: 'center'}}>{toFA((this.state.price).toLocaleString())} تومان</span>
                            </div>
                        </div>
                        <div style={{flex: 1}} />
                        <div style={{}}>
                            <div onClick={this.finalActivate} style={{flexDirection: 'row', display: 'flex', background: '#fe5f55', color: '#fff', borderRadius: 50, padding: '15px 20px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                                ثبت نهایی
                            </div>
                        </div>
                    </div>
                </Grid>
                </Grid>
            </>
        );
    }
};

export default RegisterTest;