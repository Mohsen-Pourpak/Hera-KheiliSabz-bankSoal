import React from 'react';
import {Container, Grid, CircularProgress, Backdrop, Tooltip, MenuItem, IconButton, Icon, Dialog} from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import {Beenhere} from '@material-ui/icons';
import {topicsConditional, grades, fields, lessons} from '../../api/services/tags';
import {acceptTest, getAll, getHaveReportCard, getNotAccepted} from '../../api/services/exam'
import { toast } from 'react-toastify';
import { dateTimeToJalali, getDateTime, toFA } from '../../utils/Utils';
import { shareTest } from '../../api/services/shareExam';
import Pagination from "../../components/Form/Pagination";

const ActionButton = ({Icon, onClick, title}) => {
    return (
        <Tooltip title={title}>
            <IconButton
                color="inherit"
                aria-controls="profile-menu"
                onClick={onClick}
            >
                <Icon style={{fill: '#555', fontSize: '80%'}} />
            </IconButton>
        </Tooltip>
    )
}

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
            grades: [],
            fields: [],
            fieldId: 'd',
            gradeId: 'd',
            level: 'Hard',
            userExams: [],
            selectedList: [],
            progress: true,
            pageCount: 1,
            page: 1
        };
    }
    componentDidMount() {

        let isStudent = localStorage.getItem('userType') === 'Student'
        console.error('isStudent', isStudent)
        this.setState({isStudent})
        this.fetchData()
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

    handleClose = () => {
        this.setState({open: false})
    }

    fetchData = () => {
        let token = localStorage.getItem('userToken')
        getNotAccepted(token, this.state.page).then(res_ => {
            let res = res_.data
            let pagination = JSON.parse(res_.headers.pagination)
            let pageCount = pagination.totalPages
            this.setState({userExams: res.data, progress: false, pageCount})
        })
    }

    handleChangePage = (_r, page) => {
        this.setState({page}, () => this.fetchData())
    }

    renderExams = () => {
        return this.state.userExams.length === 0 ? (
            <div style={{width: '100%', height: 200, alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '2rem', opacity: 0.3}}>
                آزمون در انتظار تایید وجود ندارد
            </div>
        ) : this.state.userExams.map(item => {
            
            return (
                <div
                style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}
                >
                    <div style={{...styles.trItem, width: 50}}>{toFA(item.id)}</div>
                    <div style={{...styles.trItem, flex: 1}}>{item.title}</div>
                    <div style={{...styles.trItem, width: 40}}>{toFA(item.numberOfQuestions)}</div>
                    <div style={{...styles.trItem, flex: 0.5}}>{getDateTime(item.creationTime)}</div>
                    <div style={{...styles.trItem, width: 120}}>{item.ownerName}</div>
                    <div style={{...styles.trItem, width: 120}}>{item.headName}</div>
                    <div style={{...styles.trItem, flex: 0.5}}>{getDateTime(item.startTime)}</div>
                    <div style={{backgroundColor: '#f4faff', justifyContent: 'center', color: '#3d82a4', display: 'flex', fontSize: 15, alignItems: 'center', textAlign: 'center', margin: '0 2.5px', padding: '0', width: 60}}>
                        <ActionButton
                            Icon={Beenhere}
                            onClick={() => {
                                let token = localStorage.getItem('userToken')
                                acceptTest(item.id, token).then(res => {
                                    if (res.isSuccess) {
                                        toast.success(res.message)
                                        this.fetchData()
                                    }
                                })
                            }}
                            title='تایید آزمون'
                        />
                    </div>

                </div>
            )
        })
    }

    render() {
        const classes = this.props.classes
        return (
            <>  
                <Backdrop style={{zIndex: 1000000, color: '#228b22'}} open={this.state.progress} onClick={() => console.log('clicked')}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <PageTitle title="آزمون های در انتظار تایید" />
                {!this.state.progress && <Grid container item xs={12} style={{padding: '0 10px'}}>
                    <Grid direction="row" alignItems="flex-start" spacing={2} justify="flex-start" container style={{padding: 10, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <Grid direction="column" container item xs={12}>
                        <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: '7.5px', margin: 0, width: '100%'}}>
                            <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center', width: '100%'}}>
                                <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                    <div style={{...styles.thItem, width: 50}}>شناسه</div>
                                    <div style={{...styles.thItem, flex: 1}}>نام</div>
                                    <div style={{...styles.thItem, width: 40}}>سوال</div>
                                    <div style={{...styles.thItem, flex: 0.5}}>ساخت</div>
                                    <div style={{...styles.thItem, width: 120}}>سازنده</div>
                                    <div style={{...styles.thItem, width: 120}}>برگزارکننده</div>
                                    <div style={{...styles.thItem, flex: 0.5}}>اجرای پیش رو</div>
                                    <div style={{...styles.thItem, width: 60}}>
                                        تایید
                                    </div>

                                </div>
                                {this.renderExams()}
                                <div>
                                    <Pagination
                                        count={this.state.pageCount}
                                        page={this.state.page}
                                        onChange={this.handleChangePage}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>}
            </>
        );
    }
};

export default CreateTest;