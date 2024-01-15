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
import {books, fields, grades} from '../../api/services/tags';
import { toast } from 'react-toastify';
import {payment} from '../../api/services/buy';
import * as qs from "qs";
import { buyStudentSc, buyTeacherSc, buyAdvisorSc, getPriceStudentSc, getPriceTeacherSc, getPriceAdvisorSc } from '../../api/services/school';
import { buyStudentTe, getPriceStudentTe } from '../../api/services/teacher';
import { buyStudentAd, getPriceStudentAd, buyTeacherAd, getPriceTeacherAd } from '../../api/services/advisor';

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
        width: 'max-content',
        height: 40,
        padding: '0 30px',
        marginLeft: 20,
        marginBottom: 15,
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
        width: 'max-content',
        padding: '0 30px',
        marginLeft: 20,
        marginBottom: 15,
        height: 40,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },

    sortFilter1: {
        backgroundColor: 'transparent',
        border: '1px solid #fe5f55',
        color: '#fe5f55',
        width: 'max-content',
        height: 40,
        padding: '0 50px',
        marginLeft: 20,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    sortFilterActive1: {
        backgroundColor: '#fe5f55',
        border: '1px solid #fe5f55',
        color: '#fff',
        width: 'max-content',
        padding: '0 50px',
        marginLeft: 20,
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
            books: [],
            grades: [],
            title: '',
            fieldId: 'd',
            gradeId: 'd',
            level: 'Hard',
            selectedFields: [],
            selectedList: [],
            grade: '',
            price: 0,
            count: '',
            discount: '',
            type: 'st'
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
        
        grades().then(res => {
            console.warn(res)
            if (res.isSuccess) {
                this.setState({grades: res.data})
            }
        })

        books().then(res => {
            console.warn(res)
            if (res.isSuccess) {
                let books = res.data.sort((a, b) => b.gradeId - a.gradeId).reduce(function (r, a) {
                    r[a.gradeId] = r[a.gradeId] || [];
                    r[a.gradeId].push(a);
                    return r;
                }, Object.create(null))
                this.setState({books})
            }
        })


    }

    changeType = (value) => {
        this.setState({
            type: value,
        })
    }

    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
        })
    }

    getPricePack = () => {
        if (this.state.isSchool) {
            this.getPricePackSchool()
        } else if (this.state.isTeacher) {
            this.getPricePackTeacher()
        } else if (this.state.isAdvisor) {
            this.getPricePackAdvisor()
        }
    }

    finalActivate = () => {
        if (this.state.isSchool) {
            this.finalActivateSchool()
        } else if (this.state.isTeacher) {
            this.finalActivateTeacher()
        } else if (this.state.isAdvisor) {
            this.finalActivateAdvisor()
        }
    }

    getPricePackSchool = () => {

        let token = localStorage.getItem('userToken')
        let data = `${toEn(this.state.count)}`;
        let discount = this.state.discount;

        if (this.state.type === 'st') {
            getPriceStudentSc(discount, data, token).then(res => {
                console.warn(res)
                this.setState({
                    price: parseInt(res.data.finalPrice),
                })
            })
        }
        if (this.state.type === 'te') {
            let obj = [
                {
                    bookId: parseInt(this.state.bookId),
                    count: parseInt(data)
                }
            ]
            getPriceTeacherSc(discount, obj, token).then(res => {
                console.warn(res)
                this.setState({
                    price: parseInt(res.data.finalPrice),
                })
            })
        }
        if (this.state.type === 'ad') {
            let obj = [
                {
                    gradeId: parseInt(this.state.gradeId),
                    count: parseInt(data)
                }
            ]
            getPriceAdvisorSc(discount, obj, token).then(res => {
                console.warn(res)
                this.setState({
                    price: parseInt(res.data.finalPrice),
                })
            })
        }
        
    }

    finalActivateSchool = () => {
        let token = localStorage.getItem('userToken')
        let data = `${toEn(this.state.count)}`;
        let discount = this.state.discount;

        if (this.state.type === 'st') {
            buyStudentSc(discount, data, token).then(res => {
                console.warn(res)
                if (res.isSuccess) {
                    toast.success(res.data)
                }
            })
        }
        if (this.state.type === 'te') {
            let obj = [
                {
                    bookId: parseInt(this.state.bookId),
                    count: parseInt(data)
                }
            ]
            buyTeacherSc(discount, obj, token).then(res => {
                console.warn(res)
                if (res.isSuccess) {
                    toast.success(res.data)
                }
            })
        }
        if (this.state.type === 'ad') {
            let obj = [
                {
                    gradeId: parseInt(this.state.gradeId),
                    count: parseInt(data)
                }
            ]
            buyAdvisorSc(discount, obj, token).then(res => {
                console.warn(res)
                if (res.isSuccess) {
                    toast.success(res.data)
                }
            })
        }
    }


    getPricePackAdvisor = () => {

        let token = localStorage.getItem('userToken')
        let data = `${toEn(this.state.count)}`;
        let discount = this.state.discount;

        if (this.state.type === 'st') {
            getPriceStudentAd(discount, data, token).then(res => {
                console.warn(res)
                this.setState({
                    price: parseInt(res.data.finalPrice),
                })
            })
        }
        if (this.state.type === 'te') {
            let obj = [
                {
                    bookId: parseInt(this.state.bookId),
                    count: parseInt(data)
                }
            ]
            getPriceTeacherAd(discount, obj, token).then(res => {
                console.warn(res)
                this.setState({
                    price: parseInt(res.data.finalPrice),
                })
            })
        }
        
    }

    finalActivateAdvisor = () => {
        let token = localStorage.getItem('userToken')
        let data = `${toEn(this.state.count)}`;
        let discount = this.state.discount;

        if (this.state.type === 'st') {
            buyStudentAd(discount, data, token).then(res => {
                console.warn(res)
                if (res.isSuccess) {
                    toast.success(res.data)
                }
            })
        }
        if (this.state.type === 'te') {
            let obj = [
                {
                    bookId: parseInt(this.state.bookId),
                    count: parseInt(data)
                }
            ]
            buyTeacherAd(discount, obj, token).then(res => {
                console.warn(res)
                if (res.isSuccess) {
                    toast.success(res.data)
                }
            })
        }
    }

    getPricePackTeacher = () => {

        let token = localStorage.getItem('userToken')
        let data = `${toEn(this.state.count)}`;
        let discount = this.state.discount;

        getPriceStudentTe(discount, data, token).then(res => {
            console.warn(res)
            this.setState({
                price: parseInt(res.data.finalPrice),
            })
        })
        
    }

    finalActivateTeacher = () => {
        let token = localStorage.getItem('userToken')
        let data = `${toEn(this.state.count)}`;
        let discount = this.state.discount;

        buyStudentTe(discount, data, token).then(res => {
            console.warn(res)
            if (res.isSuccess) {
                toast.success(res.data)
            }
        })
    }

    

    render() {
        const classes = this.props.classes
        return (
            <>
                <PageTitle title={`خرید زیرگروه (برای ${getUserTypeStr(this.state.userType)})`} />
                <Grid container item xs={12} style={{padding: '0 10px'}}>
                    <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <Grid direction="column" container item xs={12}>
                        <div style={{flexDirection: 'row', display: 'flex', width: '100%'}}>
                            <div>
                                <div style={{width: '100%'}}>
                                    <PageTitle title="قوانین خرید" size="h2" color="#3d82a4" />
                                </div>
                                {this.state.isSchool ? <div style={{fontSize: '1rem', padding: '0 15px'}}>
                                ۱_توجه داشته باشید ،شما در اشتراک خود می‌توانید یک مشاور به ازای هر پایه و یک دبیر به ازای هر درس در هر پایه، به صورت رایگان به عنوان زیرگروه خود اضافه کنید و لازم نیست برای آن هزینه ی مجدد بپردازید. <br />
                                ۲_اگر مایل به زیر گروه گرفتن مشاور یا دبیر مازاد هستید ،می توانید در این بخش ، آن را انتخاب کنید و بعد از اتمام این فرآیند، در قسمت"مدیریت کلاس ها" ، "مدیریت مشاور ها " و " مدیریت دبیر ها " ،آن ها را سامان دهی کنید.<br />
                                ۳_در صورت تمایل ، می توانید دانش آموزان خود را به عنوان زیرگروه اضافه کنید؛تنها کافیست تعداد آن ها را وارد کنید و پس از اتمام فرآیند،در قسمت "مدیریت کلاس ها" ،آن ها را کلاس بندی (گروه بندی) کنید.<br />
                                ۴_ لازم به ذکر است بعد از انجام این بخش ، به ازای پرداخت شما برایتان ستاره ثبت می شود که در نهایت این ستاره ها می توانند به هدایای نفیسی از طرف بام تست به شما تبدیل شود؛برای اطلاعات بیشتر می‌توانید با بخش پشتیبانی تماس حاصل بفرمایید.
                                </div> : this.state.isAdvisor ? <div style={{fontSize: '1rem', padding: '0 15px'}}>
                                ۱_اگر مایل به زیر گروه گرفتن دبیر هستید ،می  توانید در این بخش ، آن را انتخاب کنید و بعد از اتمام این فرآیند،در قسمت "مدیریت کلاس ها" و "مدیریت دبیر ها" ، آن ها را سامان دهی کنید.<br />
                                ۲_در صورت تمایل ، می توانید دانش آموزان خود را به عنوان زیرگروه اضافه کنید؛تنها کافیست تعداد آن ها را وارد کنید و پس از اتمام فرآیند،در قسمت "مدیریت کلاس ها" ،آن ها را کلاس بندی (گروه بندی) کنید.<br />
                                ۳_ لازم به ذکر است بعد از انجام این بخش ، به ازای پرداخت شما برایتان ستاره ثبت می شود که در نهایت این ستاره ها می توانند به هدایای نفیسی از طرف بام تست به شما تبدیل شود؛برای اطلاعات بیشتر می‌توانید با بخش پشتیبانی تماس حاصل بفرمایید.
                                </div> : <div style={{fontSize: '1rem', padding: '0 15px'}}>
                                ۱_در صورت تمایل ، می توانید دانش آموزان خود را به عنوان زیرگروه اضافه کنید؛تنها کافیست تعداد آن ها را وارد کنید و پس از اتمام فرآیند،در قسمت "مدیریت کلاس ها" ،آن ها را کلاس بندی (گروه بندی) کنید.<br />
                                ۲_ لازم به ذکر است بعد از انجام این بخش ، به ازای پرداخت شما برایتان ستاره ثبت می شود که در نهایت این ستاره ها می توانند به هدایای نفیسی از طرف بام تست به شما تبدیل شود؛برای اطلاعات بیشتر می‌توانید با بخش پشت     
                                </div>}
                            </div>
                            <img src={Image5} style={{height: 200}} />
                        </div>
                    </Grid>
                </Grid>
                <Grid direction="column" alignItems="flex-start" spacing={1} justify="flex-start" container style={{padding: 20, marginTop: 40, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    
                    <div style={{display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                    <div style={{width: 200, marginBottom: -30}}><PageTitle title="انتخاب بسته زیرگروه" size="h2" color="#000" /></div>
                    <div style={{display: 'flex', flex: 2, flexDirection: 'row', justifyContent: 'center',}}>
                            <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center', width: '100%'}}>
                                <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                                    {(this.state.isAdvisor || this.state.isSchool) && <div onClick={() => this.changeType('te')} style={this.state.type === 'te' ? style.sortFilterActive1 : style.sortFilter1}>
                                        دبیر
                                    </div>}
                                    <div style={{flex: 0.1}} />
                                    <div onClick={() => this.changeType('st')} style={this.state.type === 'st' ? style.sortFilterActive1 : style.sortFilter1}>
                                        دانش آموز
                                    </div>
                                    <div style={{flex: 0.1}} />
                                    {this.state.isSchool && <div onClick={() => this.changeType('ad')} style={this.state.type === 'ad' ? style.sortFilterActive1 : style.sortFilter1}>
                                        مشاور
                                    </div>}
                                </div>
                            </div>
                    </div>
                    <div style={{width: 200}} />
                    </div>
                        {this.state.type === 'te' && Object.values(this.state.books).map((item_) => {
                            return (<>
                            <PageTitle title={item_[0].gradeTitle} size="h2" color="#000" style={{margin: '10px auto'}} />
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', flexWrap: 'inherit'}}>
                            {item_.map((item, idx) => {
                                return (
                                    <div onClick={() => this.setState({bookId: item.id})} style={this.state.bookId === (item.id) ? style.sortFilterActive : style.sortFilter}>
                                        {item.name}
                                    </div>
                                )
                            })}
                        </div></>)})}
                        {this.state.type === 'ad' && (
                            <div style={{display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'center', width: '100%', flexWrap: 'inherit'}}>
                                {this.state.grades.map(item => {
                                    return (
                                        <div onClick={() => this.setState({gradeId: item.id})} style={this.state.gradeId === (item.id) ? style.sortFilterActive : style.sortFilter}>
                                            {item.title}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                </Grid>
                <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, marginTop: 40, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between',}}>
                        <div style={{flexDirection: 'row', display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                            <div style={{flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 45}}>
                                تعداد
                            </div>
                            <div style={{flex: 1, textAlign: 'center', width: 100}}>
                                <span style={{fontSize: 17, width: 100, textAlign: 'center', display: 'flex', alignItems: 'center', padding: '0 15px'}}>{
                                    <TextField
                                        placeholder=""
                                        value={toFA((this.state.count).toLocaleString())}
                                        style={{height: 40, background: 'transparent', paddingTop: 0, textAlign: 'center'}}
                                        onChange={e => this.changeInput('count', e)}
                                    />
                                }</span>
                            </div>
                        </div>
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
                        <div style={{marginRight: 20}}>
                            <div onClick={this.getPricePack} style={{flexDirection: 'row', display: 'flex', height: 45, background: '#fe5f55', color: '#fff', borderRadius: 50, padding: '15px 20px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                                محاسبه قیمت
                            </div>
                        </div>
                        <div style={{flex: 1}} />
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