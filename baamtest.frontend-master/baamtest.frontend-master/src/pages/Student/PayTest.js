import React from 'react';
import { Grid, Select, Input, MenuItem } from '@material-ui/core';
import TextField from '../../components/Form/TextField'
import PageTitle from "../../components/PageTitle/PageTitle";
import { DeleteSweep } from '@material-ui/icons';
import { createTest } from '../../api/services/exam';
import mask from '../../images/mask.svg'
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { fields } from '../../api/services/tags';
import { toast } from 'react-toastify';

import { toFA, QUESTION_PRICE } from '../../utils/Utils';
import { getBalance, getHeads } from '../../api/services/user';

// const imagem = 'https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg';

const Mask = ({ image, size }) => (
    <div className="profile-mask" style={{ height: size, width: size, maskImage: `url("${mask}")`, WebkitMaskImage: `url("${mask}")`, maskSize: '100%', WebkitMaskSize: '100%' }}>
        <img src={image} style={{ width: size }} alt='mask' />
    </div>
)

const styles = {
    trItem: {
        backgroundColor: '#f4faff',
        color: '#000',
        display: 'flex',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 2.5px',
        padding: '10px 10px'
    },
    thItem: {
        color: '#fe5f55',
        display: 'flex',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 2.5px',
        padding: '15px 10px 5px'
    },
    countInput: {
        borderRadius: 30,
        margin: '0px 10px',
        color: '#fff',
        textAlign: 'center'
    }
}

class RegisterTest extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            grades: [],
            fields: [],
            title: '',
            fieldId: 'd',
            gradeId: 'd',
            level: 'Hard',
            userLessons: [],
            selectedList: [],
            heads: [],
            credit: 0,
            grade: '',
            headId: 'none',
            discount: ''
        };
    }
    componentDidMount() {

        let isSchool = localStorage.getItem('userType') === 'isSchool'
        console.error('isSchool', isSchool)
        this.setState({ isSchool })

        let finalExam = localStorage.getItem('finalExamObj')
        let gradeTitle = localStorage.getItem('gradeTitle')
        let finalExamObj = JSON.parse(finalExam)
        console.warn(finalExamObj)
        let token = localStorage.getItem('userToken')
        let selectedList = localStorage.getItem('selectedList')
        this.setState({ selectedList: JSON.parse(selectedList), exam: finalExamObj, grade: gradeTitle })

        getBalance(token).then(res => {
            console.warn(res)
            if (res.isSuccess) {
                this.setState({ credit: parseInt(res.data) })
            }
        })

        getHeads(token).then(res => {
            if (res.isSuccess) {
                console.error({ res })
                let heads = res.data.filter((x, i, a) => a.indexOf(x) === i).map(el => { return { id: el.id, title: el.fullName } })
                this.setState({ heads })
            }
        })
        fields().then(res => {
            if (res.isSuccess) {
                this.setState({ fields: res.data })
            }
        })
    }
    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
        })
    }

    finalRegisterExam = () => {
        let token = localStorage.getItem('userToken')
        let newObj = this.state.exam
        if (this.state.headId !== 'none') {
            newObj.headId = `${this.state.headId}`
        } else {
            newObj.headId = this.state.exam.ownerId
        }
        delete newObj['fieldId']
        let new__ = this.state.fields.filter(e => e.id === this.state.fieldId)
        newObj['field'] = new__.length === 0 ? '' : new__[0].title
        createTest(this.state.discount, newObj, token).then(res => {
            console.error(res)
            if (res.isSuccess) {
                toast.success(res.message)
                this.props.history.push({
                    pathname: `/dashboard/test/`,
                })
            }
        })
    }

    renderSelectedList = items => {
        return items.map(item => {
            return (
                <div
                    style={{ backgroundColor: '#0000006b', display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderRadius: 35, padding: '10px 15px', textAlign: 'right', marginLeft: 5 }}
                >
                    <div style={{ color: '#fff', fontSize: 17, textAlign: 'right' }}>{item.title}</div>
                    <div onClick={() => {
                        let selectedList = this.state.selectedList.filter(el => el !== item)
                        this.setState({ selectedList })
                    }} style={{ backgroundColor: '#fe5f55', cursor: 'pointer', width: 45, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30 }}>
                        <DeleteSweep style={{ fill: '#fff' }} />
                    </div>
                </div>
            )
        })
    }

    renderMenuItem = items => {
        return items.map(item => {
            return <MenuItem value={item.id}>{item.title}</MenuItem>
        })
    }

    render() {
        // const classes = this.props.classes
        return (
            <>
                <PageTitle title="ساخت آزمون - تولید آزمون" />
                <Grid container item xs={12} style={{ padding: '0 10px' }}>
                    <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{ padding: 20, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20 }}>
                        {this.state.exam && <Grid direction="column" container item xs={12}>
                            <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{ padding: '7.5px', margin: 0, width: '100%' }}>
                                <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <div style={{ ...styles.thItem, flex: 4 }}>نام آزمون</div>
                                        <div style={{ ...styles.thItem, flex: 2 }}>پایه</div>
                                        <div style={{ ...styles.thItem, flex: 2 }}>تعداد سوال</div>
                                        <div style={{ ...styles.thItem, flex: 2 }}>قیمت (تومان)</div>

                                    </div>
                                    <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <div style={{ ...styles.trItem, flex: 4 }}>
                                            <TextField
                                                value={this.state.exam.title}
                                                style={{ height: 40, background: 'transparent', paddingTop: 0, textAlign: 'center' }}
                                                onChange={e => this.setState({ exam: { ...this.state.exam, title: e.target.value } })}
                                            />
                                        </div>
                                        <div style={{ ...styles.trItem, flex: 2 }}>{this.state.grade || '---'}</div>
                                        <div style={{ ...styles.trItem, flex: 2 }}>
                                            {toFA(this.state.exam.questionsIdsAndNumbers.length)}
                                        </div>
                                        <div style={{ ...styles.trItem, flex: 2 }}>{toFA(this.state.exam.questionsIdsAndNumbers.length * QUESTION_PRICE).toLocaleString()}</div>

                                    </div>
                                </div>
                            </Grid>
                            <div style={{ display: 'flex', width: '100%', marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <div style={{ flex: 5 }}>
                                    {/* <div style={{background: '#fff', color: '#3d82a4', borderRadius: 50, padding: '10px 15px', marginBottom: 10}}>
                                    هر خرید با پرداخت آنلاین 9 % مالیات بر ارزش افزوده   
                                </div> */}
                                    {/* <div style={{background: '#fff', color: '#3d82a4', borderRadius: 50, padding: '10px 15px', marginBottom: 10}}>
                                    حداقل میزان مجاز برای خرید معادل ۱,۰۰۰ تومان است
                                </div> */}
                                    <div style={{ flexDirection: 'row', marginRight: "50%", display: 'flex', background: '#fff', height: 45, borderRadius: 50, width: '50%', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#FF0000', height: 45 }}>
                                            موجودی اعتبار شما
                                        </div>
                                        <div style={{ flex: 1, textAlign: 'center' }}>
                                            {toFA((this.state.credit).toLocaleString())} تومان
                                        </div>
                                    </div>
                                </div>
                                <div style={{ flex: 4 }} />
                                <div style={{ background: '#fff', borderRadius: 20, flex: 3, height: '100%', padding: 10 }}>
                                    <div style={{ ...styles.trItem, padding: 15, background: '#228B22', color: '#fff', marginBottom: 10 }}>مبلغ قابل پرداخت تومان</div>
                                    <div style={{ ...styles.trItem, padding: 15 }}>{toFA(this.state.exam.questionsIdsAndNumbers.length * QUESTION_PRICE).toLocaleString()}</div>
                                </div>
                            </div>
                        </Grid>}
                    </Grid>
                    <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{ padding: 20, marginTop: 40, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20 }}>
                        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {(!this.state.isSchool && this.state.heads.length !== 0) && <>
                                <div>پرداخت با شارژ: </div>
                                <div style={{ width: 200, marginBottom: -20, marginRight: 20 }}>
                                    <Grid item spacing={1} alignItems="center" className='inputContainer' style={{ padding: 0, paddingRight: 10, margin: '0px !important', width: '100%' }}>
                                        <Grid item style={{ paddingTop: 5, paddingBottom: 5, width: '82.5%', marginRight: 10 }}>
                                            <Select
                                                id="demo-simple-select"
                                                value={this.state.headId}
                                                style={{ width: '100%' }}
                                                input={<Input disableUnderline />}
                                                onChange={e => this.changeInput('headId', e)}
                                            >
                                                <MenuItem value="none">خودم</MenuItem>
                                                {this.renderMenuItem(this.state.heads)}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ flexDirection: 'row', marginRight: 20, display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#228B22', height: 45 }}>
                                        کد تخفیف
                                    </div>
                                    <div style={{ flex: 1, textAlign: 'center', width: 200 }}>
                                        <span style={{ fontSize: 17, width: 200, textAlign: 'center', display: 'flex', alignItems: 'center', padding: '0 15px' }}>{
                                            <TextField
                                                placeholder="کد را وارد کنید"
                                                style={{ height: 40, background: 'transparent', paddingTop: 0, textAlign: 'center' }}
                                                onChange={e => this.changeInput('discount', e)}
                                            />
                                        }</span>
                                    </div>
                                </div>
                                {this.state.headId !== 'none' && <div style={{ fontSize: 17, color: '#000', paddingTop: 15, marginRight: 20 }}>
                                    آیا از پرداختن با شارژ "{this.state.heads.filter(el => el.id === this.state.headId)[0].title}" اطمینان دارید؟
                                </div>}</>}
                            <div style={{ flex: 1 }} />
                            {this.state.headId !== 'none' && <div>
                                <div onClick={() => this.setState({ headId: 'none' })} style={{ flexDirection: 'row', display: 'flex', background: '#fe5f55', color: '#fff', borderRadius: 50, padding: '15px 30px', marginLeft: 20, alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    لغو
                                </div>
                            </div>}
                            <div>
                                <div onClick={this.finalRegisterExam} style={{ flexDirection: 'row', display: 'flex', background: '#228B22', color: '#fff', borderRadius: 50, padding: '15px 20px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    تایید و کم شدن از شارژ
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