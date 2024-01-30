import React from 'react';
import {Container, Grid, Backdrop, CircularProgress, Button, Select, Input, MenuItem} from '@material-ui/core';
import TextField from '../../components/Form/TextField'
import PageTitle from "../../components/PageTitle/PageTitle";
import {Bookmark, SubdirectoryArrowLeft, School, DeleteSweep} from '@material-ui/icons';
import axios from 'axios';
import {EXAM_TYPES, SUBGROUPS_TYPE, toFA} from '../../utils/Utils';
import mask from '../../images/mask.svg'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import ArrowIcon from '../../images/icons/circle-arrow-icon.svg';
import Image2 from '../../images/test/Untitled-1.jpg';
import Image3 from '../../images/pishkhan/Untitled-3.svg';
import Image4 from '../../images/pishkhan/Untitled-4.svg';
import Image5 from '../../images/pishkhan/Untitled-5.svg';
import {topicsConditional, grades, fields, lessons} from '../../api/services/tags';
import { toast } from 'react-toastify';
import {addToGroup, createReportCard, editTest, getLessonInExam, getTest} from '../../api/services/exam'
import { getAllGroups } from '../../api/services/group';

const style = {
    sortFilter1: {
        width: 'max-content',
        height: 40,
        marginLeft: 20,
        borderRadius: 50,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    sortFilter: {
        backgroundColor: 'transparent',
        border: '1px solid #3d82a4',
        color: '#3d82a4',
        width: 'max-content',
        height: 40,
        flex: 1,
        marginLeft: 20,
        borderRadius: 50,
        maxWidth: '16%',
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
        flex: 1,
        marginLeft: 20,
        height: 40,
        maxWidth: '16%',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    
}

class AddToGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            grades: [],
            lessons: [],
            title: '',
            fieldId: 'd',
            gradeId: 'd',
            level: 'Hard',
            userLessons: [],
            selectedList: [],
            progress: true,
            type: 'sub_0'
        };
    }

    getTopics = (allData, currentId) => {
        let mainList = []
        allData.map(item => {
            if (!item.parentId || item.parentId === []) {
                mainList.push(item)
            }
            
        })
    }
    componentDidMount() {

        let isStudent = localStorage.getItem('userType') === 'Student'
        console.error('isStudent', isStudent)
        this.setState({isStudent})
        let token = localStorage.getItem('userToken')

        getAllGroups(token).then(res => {
            this.setState({userLessons: res.data})
        })
        this.setState({
            progress: true
        })
        let examId = parseInt(this.props.match.params.id);
        
        getLessonInExam(examId, token).then(res_ => {
            console.error({res_})
            let res = res_.data.map(el => {return {id: el.lessonId, title: el.lessonTitle}}).sort((a, b) => {return a.title.length - b.title.length})
            let coefficients = {}
            res.map((el) => {
                coefficients[`lesson_${el.id}`] = 0
            })
            this.setState({
                lessons: res,
                progress: false,
                coefficients
            })
        })
    }
    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            coefficients: {
                ...this.state.coefficients,
                [field]: value,
            }
        })
    }
    autoCreate = () => {
        let token = localStorage.getItem('userToken')
        let examId = parseInt(this.props.match.params.id); 
        let obj = {
            examId: examId,
            negativePointEffective: true,
            lessonCoefficients: this.state.lessons.map(el => {
                return {
                    lessonId: el.id,
                    coefficient: this.state.coefficients[`lesson_${el.id}`]
                }
            })
        }
        createReportCard(obj, token).then(res => {
            if (res.isSuccess) {
                toast.success(res.message)
                this.props.history.push({
                    pathname: '/dashboard/test/management'
                })
            }
        })
    }

    renderMenuItem = items => {
        return items.map(item => {
            return <MenuItem value={item.id}>{item.title}</MenuItem>
        })
    }

    renderTopic = list => {
        const classes = this.props.classes
        return list.map(item_ => {
            return (
                <div style={{width: 'calc(100% - 50px)', marginRight: 45}}>
                
                <Grid item sm={12} spacing={1} justify='space-between' alignItems="center" className='inputContainer' style={{padding: '10px 5px', marginTop: -5}}>
                    <Grid item style={{marginRight: 20}}>
                        <SubdirectoryArrowLeft style={{fill: '#fe5f55'}} />
                    </Grid>
                    <Grid item style={{padding: 0, flex: 1}}>
                        <div style={{color: '#3d82a4', fontWeight: 'bold', fontSize: 18, padding: '0 17px', textAlign: 'center'}}>{item_.fullName}</div>
                    </Grid>
                </Grid>
                </div>
            )
        })
    }

    renderUserLessons = items => {
        const classes = this.props.classes
        return items.map(item => {
            let isSelected = !Boolean(this.state.selectedList.filter(it => (it.id === item.id) && (it.title === item.title)).length === 0)
            return (
                <>
                    <Grid item sm={12} spacing={1} justify='space-between' alignItems="center" className='inputContainer' style={{padding: '10px 5px', width: 'calc(100% - 10px)', marginTop: 5, marginRight: 5}}>
                        <Grid item>
                            <img src={ArrowIcon} alt="password" style={{height: 25, marginRight: 10, cursor: 'pointer', transform: this.state[`isShow__${item.id}`] ? 'rotate(-90deg)' : 'rotate(0deg)', opacity: this.state[`isShow__${item.id}`] ? 0.5 : 1}} onClick={() => {
                                this.setState({[`isShow__${item.id}`]: !this.state[`isShow__${item.id}`]})
                            }} />
                        </Grid>
                        <Grid item style={{padding: 0, flex: 1}}>
                            <div style={{color: '#3d82a4', fontWeight: 'bold', fontSize: 18, padding: '0 17px', textAlign: 'center'}}>{item.title}</div>
                        </Grid>
                        <Grid item>
                            <div onClick={() => {
                                let element = {
                                    id: item.id,
                                    title: item.title,
                                    numberOfEasyQuestions: 0,
                                    numberOfMediumQuestions: 0,
                                    numberOfHardQuestions: 0,
                                    type: 'lesson'
                                }
                                if(!isSelected) {
                                    this.setState({
                                        selectedList: [
                                            ...this.state.selectedList,
                                            element
                                        ]
                                    })
                                } else {
                                    console.error(this.state.selectedList)
                                    let selectedList = this.state.selectedList.filter(it => (it.id !== item.id) && (it.title !== item.title))
                                    this.setState({selectedList})
                                }
                            }} style={{backgroundColor: isSelected ? '#fe5f55' : '#3d82a4', borderRadius: 30, cursor: 'pointer', padding: '5px 15px', textAlign: 'center', marginLeft: 5}}>
                                <div style={{color: '#fff', fontSize: 13, textAlign: 'center'}}>{isSelected ? '- حذف' : '+ افزودن'}</div>
                            </div>
                        </Grid>
                    </Grid>
                    {this.state[`isShow__${item.id}`] && this.renderTopic(item.users)}
                </>
            )
        })
    }

    renderLevels(title, value, color) {
        const {level} = this.state;
        let isActive = level === value;
        return (
            <div
                style={{border: `1px solid ${color}`, backgroundColor: isActive ? color : '#fff', cursor: 'pointer', borderRadius: 30, marginLeft: 20, padding: '5px 15px', textAlign: 'center', marginLeft: 5}}
                onClick={() => this.setState({level: value})}>
                <div style={{color: isActive ? '#fff' : color, fontSize: 13, textAlign: 'center'}}>{title}</div>
            </div>
        )
    }

    renderSelectedList = items => {
        return items.map(item => {
            return (
                <div
                style={{backgroundColor: '#0000006b', display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderRadius: 35, padding: '10px 15px', textAlign: 'right', marginLeft: 5}}
                >
                    <div style={{color: '#fff', fontSize: 17, textAlign: 'right'}}>{item.title}</div>
                    <div onClick={() => {
                        let selectedList = this.state.selectedList.filter(el => el !== item)
                        this.setState({selectedList})
                    }} style={{backgroundColor: '#fe5f55', cursor: 'pointer', width: 45, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30}}>
                        <DeleteSweep style={{fill: '#fff'}} />
                    </div>
                </div>
            )
        })
    }

    typeOnClick = type => {
        this.setState({type})
    }

    renderLevels(title, value, color) {
        const {level} = this.state;
        let isActive = level === value;
        return (
            <div
                style={{...style.sortFilter1, border: `1px solid ${color}`, backgroundColor: isActive ? `${color}` : '#fff'}}
                onClick={() => this.setState({level: value})}>
                <div style={{color: isActive ? '#fff' : color, fontSize: 13, textAlign: 'center'}}>{title}</div>
            </div>
        )
    }
    
    render() {
        const classes = this.props.classes
        return (
            <>
                <Backdrop style={{zIndex: 1000000, color: '#228b22'}} open={this.state.progress} onClick={() => console.log('clicked')}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <PageTitle title="مدیریت آزمون - شخصی سازی آزمون" />
                {!this.state.progress && <Grid container item xs={12} style={{padding: '0 10px'}}>
                <Grid direction="column" alignItems="flex-start" spacing={1} justify="flex-start" container style={{padding: 20, marginTop: 0, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <div style={{padding: '0 15px 20px', flex: 1, background: '#fff', borderRadius: 20}}>
                            <div style={{width: '100%', marginBottom: -20, marginTop: 20}}>
                                <PageTitle title="انتخاب زیرگروه" size="h3" color="#000" />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',}}>
                                {SUBGROUPS_TYPE.map(item => {
                                    return (
                                        <div onClick={() => this.typeOnClick(item.value)} style={this.state.type === item.value ? style.sortFilterActive : style.sortFilter}>
                                            {item.title}
                                        </div>
                                    )
                                })}
                                <div style={{marginRight: -15}} />
                            </div>
                        </div>
                    </div>
                    <div style={{height: 20}} />
                    <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <div style={{padding: '0 15px 20px', flex: 2, background: '#fff', borderRadius: 20}}>
                            <div style={{width: '100%', marginBottom: -20, marginTop: 20}}>
                                <PageTitle title="ضرایب دروس" size="h4" color="#000" />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', gridGap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start',}}>
                                {this.state.lessons.map(item => {
                                    return (
                                        <div style={{flexDirection: 'row', flex: '1 1 18%', display: 'flex', background: '#eff5fa', height: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                                            <div style={{flexDirection: 'row', display: 'flex', width: 'max-content', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 50}}>
                                                {item.title}
                                            </div>
                                            <div style={{textAlign: 'center', flex: 1}}>
                                                <span style={{fontSize: 17, flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', padding: '0 15px'}}>{
                                                    <TextField
                                                        value={toFA((this.state.coefficients[`lesson_${item.id}`]).toLocaleString())}
                                                        style={{height: 40, flex: 1, background: 'transparent', paddingTop: 0, textAlign: 'center'}}
                                                        onChange={e => this.changeInput(`lesson_${item.id}`, e)}
                                                    />
                                                    
                                                }</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <Grid direction="row" justify="center" style={{marginTop: 20}} container spacing={2}>
                        <Grid item xs={2}>
                            <Button
                                onClick={this.autoCreate}
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.createAccountButton}
                                style={{fontSize: "1rem", textAlign : 'center', fontFamily: "Dana"}}
                                >
                                ثبت نهایی
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                
                </Grid>}
            </>
        );
    }
};

export default AddToGroup;