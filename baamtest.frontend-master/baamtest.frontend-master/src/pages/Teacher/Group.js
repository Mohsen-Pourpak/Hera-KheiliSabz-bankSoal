import React from 'react';
import {Container, Grid, Button, Select, Input, MenuItem} from '@material-ui/core';
import TextField from '../../components/Form/TextField'
import PageTitle from "../../components/PageTitle/PageTitle";
import {Bookmark, SubdirectoryArrowLeft, School, DeleteSweep, Edit} from '@material-ui/icons';
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
import {questionNormal} from '../../api/services/question'
import * as qs from "qs";
import { getAllGroups, deleteGroup } from '../../api/services/group';

const imagem = 'https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg';

const Mask = ({ image, size }) => (
    <div className="profile-mask" style={{height: size, width: size, maskImage: `url("${mask}")`, WebkitMaskImage: `url("${mask}")`, maskSize: '100%', WebkitMaskSize: '100%'}}>
      <img src={image} style={{width: size}} />
    </div>
)

class Group extends React.Component {
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

        let isStudent = localStorage.getItem('userType') === 'Student'
        console.error('isStudent', isStudent)
        this.setState({isStudent})

        let token = localStorage.getItem('userToken')
        getAllGroups(token).then(res => {
            if (res.isSuccess) {
                this.setState({selectedList: res.data})
            }
        })
    }
    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
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
            let isSelected = !Boolean(this.state.selectedList.filter(it => (it.id === item_.id) && (it.title === item_.title)).length === 0)
            return (
                <div style={{width: 'calc(100% - 50px)', marginRight: 45}}>
                
                <Grid item sm={12} spacing={1} justify='space-between' alignItems="center" className='inputContainer' style={{padding: '10px 5px', marginTop: -5}}>
                    
                    {!item_.subTopics || item_.subTopics.length === 0 ? (
                        <Grid item style={{marginRight: 20}}>
                            <SubdirectoryArrowLeft style={{fill: '#FF0000'}} />
                        </Grid>
                    ) : (
                        <Grid item>
                            <img src={ArrowIcon} alt="password" style={{height: 25, marginRight: 10, cursor: 'pointer', transform: this.state[`isShow__${item_.id}`] ? 'rotate(-90deg)' : 'rotate(0deg)', opacity: this.state[`isShow__${item_.id}`] ? 0.5 : 1}} onClick={() => {
                                this.setState({[`isShow__${item_.id}`]: !this.state[`isShow__${item_.id}`]})
                            }} />
                        </Grid>
                    )}
                    <Grid item style={{padding: 0, flex: 1}}>
                        <div style={{color: '#000', fontWeight: 'bold', fontSize: 18, padding: '0 17px', textAlign: 'center'}}>{item_.title}</div>
                    </Grid>
                    <Grid item>
                        <div onClick={() => {
                            let element_ = {
                                id: item_.id,
                                title: item_.title,
                                numberOfEasyQuestions: 0,
                                numberOfMediumQuestions: 0,
                                numberOfHardQuestions: 0,
                                type: 'topic'
                            }
                            if(!isSelected) {
                                this.setState({
                                    selectedList: [
                                        ...this.state.selectedList,
                                        element_
                                    ]
                                })
                            } else {
                                console.error(this.state.selectedList)
                                let selectedList = this.state.selectedList.filter(it => (it.id !== item_.id) && (it.title !== item_.title))
                                this.setState({selectedList})
                            }
                        }} style={{backgroundColor: isSelected ? '#FF0000' : '#228B22', borderRadius: 30, cursor: 'pointer', padding: '5px 15px', textAlign: 'center', marginLeft: 5}}>
                            <div style={{color: '#fff', fontSize: 13, textAlign: 'center'}}>{isSelected ? '- حذف' : '+ افزودن'}</div>
                        </div>
                    </Grid>
                    
                </Grid>
                {this.state[`isShow__${item_.id}`] && this.renderTopic(item_.subTopics)}
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
                            }} style={{backgroundColor: isSelected ? '#FF0000' : '#228B22', borderRadius: 30, cursor: 'pointer', padding: '5px 15px', textAlign: 'center', marginLeft: 5}}>
                                <div style={{color: '#fff', fontSize: 13, textAlign: 'center'}}>{isSelected ? '- حذف' : '+ افزودن'}</div>
                            </div>
                        </Grid>
                    </Grid>
                    {this.state[`isShow__${item.id}`] && this.renderTopic(item.topics)}
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

    removeGroup = (item) => {
        let selectedList = this.state.selectedList.filter(el => el !== item)
        let token = localStorage.getItem('userToken')
        deleteGroup(token, item.id).then(res => {
            if (res.isSuccess) {
                toast.success(res.message)
                this.setState({selectedList})
            }
        })
        
    }

    renderSelectedList = items => {
        return items.map(item => {
            return (
                <div style={{backgroundColor: '#0000006b', display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderRadius: 35, padding: '10px 15px', textAlign: 'right', marginLeft: 5}}>
                    <div style={{color: '#fff', fontSize: 17, textAlign: 'right'}}>{item.title}</div>
                    <div style={{flex: 1}} />
                    <div onClick={() => this.props.history.push({ pathname: `/dashboard/group-edit/${item.id}` })} style={{backgroundColor: '#228B22', cursor: 'pointer', width: 45, marginLeft: 10, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30}}>
                        <Edit style={{fill: '#fff'}} />
                    </div>
                    <div onClick={() => this.removeGroup(item)} style={{backgroundColor: '#FF0000', cursor: 'pointer', width: 45, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30}}>
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
                <PageTitle title="مدیریت کلاس ها" />
                <Grid container item xs={12} style={{padding: '0 10px'}}>
                    <Grid direction="row" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <Grid direction="column" container item xs={5}>
                        <Grid direction="row" container spacing={3}>
                            <Grid item xs={5}>
                                    <Button
                                        onClick={() => {
                                            this.props.history.push({
                                                pathname: `/dashboard/group-add`,
                                            })
                                        }}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.createAccountButton}
                                        style={{fontSize: "1.2vw", textAlign : 'center', width: 'fit-content', fontFamily: "Dana", height: '3.5vw', borderRadius: 20}}
                                        >
                                        ایجاد کلاس جدید
                                    </Button>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    <Grid direction="column" container item xs={7}>
                        <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: '15px 15px', overflow: 'scroll', marginRight: 10, backgroundColor: 'rgb(255 218 185 / 80%)', marginTop: 5, width: '100%'}}>
                            <div style={{flexDirection: 'column', display: 'flex', width: '100%', alignItems: 'center', height: 400, justifyContent: this.state.selectedList.length !== 0 ? 'flex-start' : 'center'}}>
                                {this.state.selectedList.length === 0 ? <div style={{color: 'rgb(0 0 0 / 50%)', fontSize: '2rem'}}>شما هنوز کلاس ایجاد نکرده اید</div> : this.renderSelectedList(this.state.selectedList)}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </>
        );
    }
};

export default Group;