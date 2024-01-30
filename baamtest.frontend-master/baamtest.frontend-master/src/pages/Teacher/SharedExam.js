import React from 'react';
import {CircularProgress, Grid, Backdrop, Button, Dialog, DialogTitle, IconButton, Icon} from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import { getStudent } from '../../api/services/group';
import { getBoughtShared, getShared } from '../../api/services/shareExam';
import { getLevelDisplay, toFA } from '../../utils/Utils';
import Pagination from "../../components/Form/Pagination";

const styles = {
    trItem: {
        backgroundColor: '#f4faff',
        color: '#3d82a4',
        display: 'flex',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 2.5px',
        padding: '15px 10px'
    },
    thItem : {
        color: '#3d82a4',
        display: 'flex',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 2.5px',
        padding: '15px 10px 5px'
    }
}

class CreateTest extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            grades: {},
            fields: [],
            fieldId: 'd',
            gradeId: 'd',
            level: 'Hard',
            boughtExams: [],
            exams: [],
            selectedList: [],
            isLoading: true,
            subAdvisors: [],
            username: '',
            pageCount1: 1,
            page1: 1,
            pageCount2: 1,
            page2: 1
        };
    }
    componentDidMount() {
        let isStudent = localStorage.getItem('userType') === 'Student'
        this.setState({isStudent})
        this.fetchData1()
        if (!isStudent) {
            this.fetchData2()
        }
    }

    fetchData1 = () => {
        let token = localStorage.getItem('userToken')
        getBoughtShared(token, this.state.page1).then(res_ => {
            let res = res_.data
            let pagination = JSON.parse(res_.headers.pagination)
            let pageCount1 = pagination.totalPages
            this.setState({boughtExams: res.data, isLoading: false, pageCount1})
        })
    }

    fetchData2 = () => {
        let token = localStorage.getItem('userToken')
        getShared(token, this.state.page2).then(res_ => {
            let res = res_.data
            let pagination = JSON.parse(res_.headers.pagination)
            let pageCount2 = pagination.totalPages
            this.setState({exams: res.data, isLoading: false, pageCount2})
        })
    }

    handleChangePage1 = (_r, page1) => {
        this.setState({page1}, () => this.fetchData1())
    }

    handleChangePage2 = (_r, page2) => {
        this.setState({page2}, () => this.fetchData2())
    }

    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
        })
    }


    renderSubAdvisors = () => {
        return this.state.exams.length === 0 ? (
            <div style={{width: '100%', height: 200, alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '2rem', opacity: 0.3}}>
                آزمون اشتراکی وجود ندارد
            </div>
        ) : this.state.exams.map(item => {
            
            return (
                <div
                    onClick={() => this.setState({selectedOpacity: item})}
                    style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}
                >
                    <div style={{...styles.trItem, width: 60}}>{toFA(item.id)}</div>
                    <div style={{...styles.trItem, flex: 1}}>{item.name}</div>
                    <div style={{...styles.trItem, width: 80}}>{getLevelDisplay(item.level)}</div>
                    <div style={{...styles.trItem, width: 100}}>{toFA(item.numberOfQuestions)}</div>
                    <div style={{...styles.trItem, width: 120}}>{item.ownerName}</div>
                </div>
            )
        })
    }

    renderBoughtExams = () => {
        return this.state.boughtExams.length === 0 ? (
            <div style={{width: '100%', height: 200, alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '2rem', opacity: 0.3}}>
                آزمون اشتراکی خریداری شده وجود ندارد
            </div>
        ) : this.state.boughtExams.map(item => {
            
            return (
                <div
                    onClick={() => this.setState({selectedOpacity: item})}
                    style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}
                >
                    <div style={{...styles.trItem, width: 60}}>{toFA(item.id)}</div>
                    <div style={{...styles.trItem, flex: 1}}>{item.name}</div>
                    <div style={{...styles.trItem, width: 80}}>{getLevelDisplay(item.level)}</div>
                    <div style={{...styles.trItem, width: 100}}>{toFA(item.numberOfQuestions)}</div>
                    <div style={{...styles.trItem, width: 120}}>{item.ownerName}</div>
                </div>
            )
        })
    }
    

    render() {
        const classes = this.props.classes
        return (
            <>  
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <PageTitle style={{width: 'fit-content'}} title="آزمون های اشتراکی" />
                        <Button
                            onClick={() => {
                                this.props.history.push({
                                    pathname: `/dashboard/test/shared-test-buy`,
                                })
                            }}
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.createAccountButton}
                            style={{fontSize: "1.1rem", textAlign : 'center', fontFamily: "Dana", height: 45, borderRadius: 20}}
                            >
                            خرید آزمون اشتراکی
                        </Button>
                </div>
                {this.state.isLoading ? (
                    <Backdrop style={{zIndex: 1000000, color: '#228b22'}} open={this.state.isLoading} onClick={() => console.log('clicked')}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : (
                    <Grid container item xs={12} style={{padding: '0 10px'}}>
                        <Grid direction="row" alignItems="flex-start" spacing={2} justify="flex-start" container style={{padding: 10, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                            <div style={{display: 'flex', width: '100%', marginBottom: -20}}>
                                {!this.state.isStudent && <div style={{flex:1, marginLeft: 20}}>
                                    <PageTitle style={{marginBottom: 10, marginTop: 5, paddingRight: 10, marginRight: 0, justifyContent: 'flex-start', width: '100%'}} title="آزمون های به اشتراک گذاشته شده" size="h2" color="#3d82a4" />
                                    <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: '7.5px', margin: 0, width: '100%'}}>
                                        <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center', width: '100%'}}>
                                            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                                <div style={{...styles.thItem, width: 60}}>شناسه</div>
                                                <div style={{...styles.thItem, flex: 1}}>نام آزمون</div>
                                                <div style={{...styles.thItem, width: 80}}>سطح</div>
                                                <div style={{...styles.thItem, width: 100}}>تعداد سوالات</div>
                                                <div style={{...styles.thItem, width: 120}}>نام سازنده</div>
                                            </div>
                                            <div style={{width: '100%'}}>
                                                {this.renderSubAdvisors()}
                                            </div>
                                            <div>
                                                <Pagination
                                                    count={this.state.pageCount2}
                                                    page={this.state.page2}
                                                    onChange={this.handleChangePage2}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                </div>}
                                
                                <div style={{flex:1}}>
                                    <PageTitle style={{marginBottom: 10, marginTop: 5, paddingRight: 10, marginRight: 0, justifyContent: 'flex-start', width: '100%'}} title="آزمون های خریداری شده" size="h2" color="#3d82a4" />
                                    <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: '7.5px', margin: 0, width: '100%'}}>
                                        <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center', width: '100%'}}>
                                            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                                <div style={{...styles.thItem, width: 60}}>شناسه</div>
                                                <div style={{...styles.thItem, flex: 1}}>نام آزمون</div>
                                                <div style={{...styles.thItem, width: 80}}>سطح</div>
                                                <div style={{...styles.thItem, width: 100}}>تعداد سوالات</div>
                                                <div style={{...styles.thItem, width: 120}}>نام سازنده</div>
                                            </div>
                                            <div style={{width: '100%'}}>
                                                {this.renderBoughtExams()}
                                            </div>
                                            <div>
                                                <Pagination
                                                    count={this.state.pageCount1}
                                                    page={this.state.pageCount1}
                                                    onChange={this.handleChangePage1}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </>
        );
    }
};

export default CreateTest;