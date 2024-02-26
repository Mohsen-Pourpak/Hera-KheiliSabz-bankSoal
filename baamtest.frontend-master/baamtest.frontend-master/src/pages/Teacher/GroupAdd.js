import React from 'react';
import {Container, Grid, Button, Select, Input, MenuItem, Divider} from '@material-ui/core';
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
import * as qs from "qs";
import { getStudent, createGroup, getAllStudent } from '../../api/services/group';

const imagem = 'https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg';

const Mask = ({ image, size }) => (
    <div className="profile-mask" style={{height: size, width: size, maskImage: `url("${mask}")`, WebkitMaskImage: `url("${mask}")`, maskSize: '100%', WebkitMaskSize: '100%'}}>
      <img src={image} style={{width: size}} />
    </div>
)

class GroupAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            grades: [],
            fields: [],
            username: '',
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
        let token = localStorage.getItem('userToken')
        let query = ''
        grades().then(res => {
            if (res.isSuccess) {
                this.setState({grades: res.data})
            }
        })
        fields().then(res => {
            if (res.isSuccess) {
                this.setState({fields: res.data})
            }
        })
        this.getStudents(token, query)
    }

    getStudents = (token, query) => {
        getAllStudent(token, query).then(res => {
            if (res.isSuccess) {
                this.setState({userLessons: res.data})
            }
        })
    }
    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
        })
    }

    searchStudent = () => {
        let token = localStorage.getItem('userToken')
        const {username} = this.state;
        let query = `username=${username}`
        getStudent(token, query).then(res => {
            if (res.data) {
                this.setState({userLessons: [res.data]})
            }
        })
    }

    addGroup = () => {
        let token = localStorage.getItem('userToken')
        const {title, description, selectedList, gradeId} = this.state;
        let usersIds = selectedList.map(el => el.id)
        let obj = {title, description, usersIds, gradeId: parseInt(gradeId)}
        createGroup(token, obj).then(res => {
            if (res.isSuccess) {
                toast.success(res.message)
                this.props.history.push({
                    pathname: `/dashboard/group`,
                })
            }
        })
    }

    renderMenuItem = items => {
        return items.map(item => {
            return <MenuItem value={item.id}>{item.title}</MenuItem>
        })
    }

    renderUserLessons = items => {
        const classes = this.props.classes
        return items.map(item => {
            let isSelected = !Boolean(this.state.selectedList.filter(it => (it === item.id)).length === 0)
            return (
                <>
                    <Grid item sm={12} spacing={1} justify='space-between' alignItems="center" className='inputContainer' style={{padding: '10px 5px', width: 'calc(100% - 10px)', marginTop: 5, marginRight: 5}}>
                        <Grid item style={{marginRight: 20}}>
                            <SubdirectoryArrowLeft style={{fill: '#FF0000'}} />
                        </Grid>
                        <Grid item style={{padding: 0, flex: 1}}>
                            <div style={{color: '#000', fontWeight: 'bold', fontSize: 18, padding: '0 17px', textAlign: 'center'}}>{item.fullName}</div>
                        </Grid>
                        <Grid item>
                            <div onClick={() => {
                                if(!isSelected) {
                                    this.setState({
                                        selectedList: [
                                            ...this.state.selectedList,
                                            {
                                                fullName: item.fullName,
                                                id: item.id
                                            }
                                        ]
                                    })
                                } else {
                                    let selectedList = this.state.selectedList.filter(it => (it !== item.id))
                                    this.setState({selectedList})
                                }
                            }} style={{backgroundColor: isSelected ? '#FF0000' : '#228B22', borderRadius: 30, cursor: 'pointer', padding: '5px 15px', textAlign: 'center', marginLeft: 5}}>
                                <div style={{color: '#fff', fontSize: 13, textAlign: 'center'}}>{isSelected ? '- حذف' : '+ افزودن'}</div>
                            </div>
                        </Grid>
                    </Grid>
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
                    <div style={{color: '#fff', fontSize: 17, textAlign: 'right'}}>{item.fullName}</div>
                    <div onClick={() => {
                        let selectedList = this.state.selectedList.filter(el => el !== item)
                        this.setState({selectedList})
                    }} style={{backgroundColor: '#FF0000', cursor: 'pointer', width: 45, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 30}}>
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
                <PageTitle title="ساخت کلاس جدید" />
                <Divider/>
                <Grid container item xs={12} style={{padding: '0 10px'}}>
                    <Grid direction="row" alignItems="flex-start" spacing={3} justify="flex-start" container style={{margin: "30px", padding: 67, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <Grid direction="column" container item xs={6}>
                        {/* <Grid direction="row" container spacing={3}>
                            <Grid item xs={7}>
                                <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: 0, paddingRight: 10, marginRight: 10, marginTop: 0, height: 45}}>
                                        <TextField
                                        placeholder="نام کاربری را وارد کنید"
                                        style={{height: 40, background: 'transparent'}}
                                        onChange={e => this.changeInput('username', e)}
                                        />
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid item sm={12} spacing={1} alignItems="center" style={{padding: 0, paddingRight: 10, marginRight: 10, marginTop: -20, height: 40}}>
                                    <Button
                                        disabled={Boolean(this.state.username.length < 10)}
                                        onClick={this.searchStudent}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.createAccountButton}
                                        style={{fontSize: "1rem", textAlign : 'center', fontFamily: "Dana"}}
                                        >
                                        جست و جو
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid> */}
                        <Grid direction="row" container spacing={3}>
                            <Grid item xs={6}>
                                <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: 0, paddingRight: 10, marginRight: 10, marginTop: 0, height: 45}}>
                                        <TextField
                                        placeholder="نام گروه را وارد کنید"
                                        style={{height: 40, background: 'transparent'}}
                                        onChange={e => this.changeInput('title', e)}
                                        />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                            <Grid item spacing={1} alignItems="center" className='inputContainer' style={{padding: 0, paddingRight: 10, marginLeft: 2.5, marginRight: 10, marginBottom: 10, width: '100%'}}>
                                    <Grid item style={{paddingTop: 5, paddingBottom: 5, width: '82.5%', marginRight: 10}}>    
                                        <Select
                                            id="demo-simple-select"
                                            value={this.state.gradeId}
                                            style={{width: '100%'}}
                                            input={<Input disableUnderline />}
                                            onChange={e => this.changeInput('gradeId', e)}
                                        >
                                            <MenuItem value="d" disabled>پایه</MenuItem>
                                            {this.renderMenuItem(this.state.grades)}
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid direction="row" container spacing={3}>
                            <Grid item xs={12}>
                                <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: 0, paddingRight: 10, marginRight: 10, marginTop: 0, height: 45}}>
                                        <TextField
                                        placeholder="توضیحات"
                                        style={{height: 40, background: 'transparent'}}
                                        onChange={e => this.changeInput('description', e)}
                                        />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid direction="column" container item xs={12}>
                        
                            {this.renderUserLessons(this.state.userLessons)}
                            
                        </Grid>
                    </Grid>
                    <Grid direction="column" container item xs={6}>
                        
                        <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: '15px 15px', overflow: 'scroll', backgroundSize: 'cover', marginRight: 10, marginTop: 5, width: '100%', boxShadow: "1px 2px 11px -3px #00000075",}}>
                            <div style={{flexDirection: 'column', display: 'flex', width: '100%', alignItems: 'center', height: 400}}>
                                {this.renderSelectedList(this.state.selectedList)}
                            </div>
                            
                        </Grid>
                        <Grid direction="row" justify="center" container spacing={2}>
                                <Grid item xs={4}>
                                    <Button
                                        onClick={this.addGroup}
                                        disabled={this.state.gradeId === 'd' || !this.state.title || !this.state.description || this.state.selectedList.length === 0}
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

export default GroupAdd;