import React from 'react';
import {Container, Grid, Button, Select, Input, MenuItem} from '@material-ui/core';
import TextField from '../../components/Form/TextField'
import PageTitle from "../../components/PageTitle/PageTitle";
import {Bookmark, SubdirectoryArrowLeft, School, DeleteSweep} from '@material-ui/icons';
import axios from 'axios';

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
import {addToGroup, allGroupInExam} from '../../api/services/exam'
import { getAllGroups } from '../../api/services/group';

class AddToGroup extends React.Component {
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
            selectedList: []
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
        let examId = this.props.match.params.id;
        let isStudent = localStorage.getItem('userType') === 'Student'
        console.error('isStudent', isStudent)
        this.setState({isStudent})
        let token = localStorage.getItem('userToken')

        getAllGroups(token).then(res => {
            this.setState({userLessons: res.data})
        })
        allGroupInExam(examId, token).then(res => {
            this.setState({selectedList: res.data})
        })
    }
    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
        })
    }
    autoCreate = () => {
        const {selectedList} = this.state;
        let token = localStorage.getItem('userToken')
        let examId = this.props.match.params.id;
        let obj = {
            examId,
            groupsIds: selectedList.map(el => el.id)
        }
        
        addToGroup(obj, token).then(res => {
            console.error(res)
            if (res.isSuccess) {
                toast.success(res.message)
                this.props.history.push({
                    pathname: `/dashboard/test/management/`,
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

    render() {
        const classes = this.props.classes
        return (
            <>
                <PageTitle title="مدیریت آزمون - اشتراک برای کلاس ها" />
                <Grid container item xs={12} style={{padding: '0 10px'}}>
                    <Grid direction="row" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <Grid direction="column" container item xs={6}>
                        <Grid direction="column" container item xs={12}>
                            {this.renderUserLessons(this.state.userLessons)}
                        </Grid>
                    </Grid>
                    <Grid direction="column" container item xs={6}>
                        <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: '15px 15px', overflow: 'scroll', backgroundSize: 'cover', backgroundImage: `url(${Image2})`, marginRight: 10, marginTop: 5, width: '100%'}}>
                            <div style={{flexDirection: 'column', display: 'flex', width: '100%', alignItems: 'center', height: 400}}>
                                {this.renderSelectedList(this.state.selectedList)}
                            </div>
                        </Grid>
                        <Grid direction="row" justify="center" container spacing={2}>
                                <Grid item xs={4}>
                                    <Button
                                        onClick={() => {
                                            if (this.state.selectedList.length === 0) {
                                                toast.error('لطفا حداقل یک گروه برای اشتراک این آزمون انتخاب کنید')
                                            } else {
                                                this.autoCreate()
                                            }
                                        }}
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
                </Grid>
                </Grid>
            </>
        );
    }
};

export default AddToGroup;