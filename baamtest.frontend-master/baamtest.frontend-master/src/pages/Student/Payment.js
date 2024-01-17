import React from 'react';
import {CircularProgress, Grid, Button, Backdrop, Input, MenuItem} from '@material-ui/core';
import TextField from '../../components/Form/TextField'
import PageTitle from "../../components/PageTitle/PageTitle";
import {Bookmark, SubdirectoryArrowLeft, School, DeleteSweep} from '@material-ui/icons';
import axios from 'axios';
import {createTest} from '../../api/services/exam';
import mask from '../../images/mask.svg'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import ArrowIcon from '../../images/icons/circle-arrow-icon.svg';
import SuccessPayment from '../../images/success-pay.svg';
import UnSuccessPayment from '../../images/unsuccess-pay.svg';
import Image4 from '../../images/pishkhan/Untitled-4.svg';
import Image5 from '../../images/teacher/get-price.svg';
import {fields} from '../../api/services/tags';
import { toast } from 'react-toastify';
import {getPaymentStatus, payment} from '../../api/services/buy';
import * as qs from "qs";
import { getPriceSc } from '../../api/services/school';

import { getUserTypeStr, toEn, toFA } from '../../utils/Utils';
import { getBalance, getStar } from '../../api/services/user';

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

class RegisterTest extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            fields: [],
            title: '',
            fieldId: 'd',
            gradeId: 'd',
            isSuccess: true,
            selectedFields: [],
            selectedList: [],
            grade: '',
            price: '',
            credit: 0
        };
    }
    componentDidMount() {
        let token = localStorage.getItem('userToken')
        let walletId = this.props.match.params.id;
        let userType = localStorage.getItem('userType')
        let isStudent = userType === 'Student'
        console.error('isStudent', isStudent)
        this.setState({isStudent, userType})
        
        getPaymentStatus(walletId, token).then(res => {
            console.warn({res})
            if (res.isSuccess) {
                this.setState({paymentInfo: res.data, isSuccess: res.data.isPay})
            }
        })
    }

    render() {
        const classes = this.props.classes
        return (
            <>
                {!this.state.paymentInfo ? (
                    <Backdrop style={{zIndex: 1000000, color: '#FFD700'}} open={!this.state.paymentInfo} onClick={() => console.log('clicked')}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : this.state.isSuccess ? (
                    <Grid container item xs={12} style={{padding: '0 10px', marginTop: 40}}>
                        <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                            <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', width: '100%'}}>
                                <img src={SuccessPayment} style={{height: 200}} />
                                <PageTitle style={{justifyContent: 'center', width: 'fit-content', margin: 'auto'}} title="پرداخت موفق" size="h1" color="#555" />
                                <div style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>
                                    مبلغ : {toFA(this.state.paymentInfo.amount.toLocaleString())} تومان
                                </div>
                                <div style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>
                                    بابت : {this.state.paymentInfo.description}
                                </div>
                                <div style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>
                                    تاریخ و ساعت : {toFA(this.state.paymentInfo.createDate.replace(' ', ' - '))}
                                </div>
                                <Grid direction="row" justify="center" style={{margin: '20px 0'}} container spacing={2}>
                                    <Grid item xs={2}>
                                        <Button
                                            onClick={() => this.props.history.push({'pathname': '/dashboard/pishkhan'})}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.createAccountButton}
                                            style={{fontSize: "1rem", textAlign : 'center', fontFamily: "Dana"}}
                                            >
                                            بازگشت به پیشخوان
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container item xs={12} style={{padding: '0 10px', marginTop: 40}}>
                        <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                            <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', width: '100%'}}>
                                
                                <img src={UnSuccessPayment} style={{height: 200}} />
                                <PageTitle style={{justifyContent: 'center', width: 'fit-content', margin: 'auto'}} title="پرداخت ناموفق" size="h1" color="#555" />
                                <div style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>
                                    مبلغ : {toFA(this.state.paymentInfo.amount.toLocaleString())} تومان
                                </div>
                                <div style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>
                                    بابت : {this.state.paymentInfo.description}
                                </div>
                                <div style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>
                                    تاریخ و ساعت : {toFA(this.state.paymentInfo.createDate.replace(' ', ' - '))}
                                </div>
                                <Grid direction="row" justify="center" style={{margin: '20px 0'}} container spacing={2}>
                                    <Grid item xs={2}>
                                        <Button
                                            onClick={() => this.props.history.push({'pathname': `/dashboard/${this.state.isStudent ? 'packages-credit' : 'subscription-credit'}`})}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.createAccountButton}
                                            style={{fontSize: "1rem", textAlign : 'center', fontFamily: "Dana"}}
                                            >
                                            پرداخت دوباره
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </>
        )
    }
};

export default RegisterTest;