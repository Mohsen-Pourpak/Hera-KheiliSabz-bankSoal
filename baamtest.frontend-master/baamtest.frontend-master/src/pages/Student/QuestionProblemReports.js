import React from 'react';
import {Container, Grid, CircularProgress, Backdrop, Tooltip, MenuItem, IconButton, Icon, Dialog} from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import { Cancel, CheckCircle, Visibility } from '@material-ui/icons';
import { dateTimeToJalali, getDateTime, PER_PAGE_TABLES, toFA } from '../../utils/Utils';
import { shareTest } from '../../api/services/shareExam';
import Pagination from "../../components/Form/Pagination";
import { getQuestionProblemReports } from '../../api/services/question';

const styles = {
    trItem: {
        backgroundColor: '#f4faff',
        color: '#000',
        display: 'flex',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 2.5px',
        padding: '15px 10px'
    },
    thItem : {
        color: '#000',
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
        this.setState({open: false, resultMessage: null})
    }

    fetchData = () => {
        let token = localStorage.getItem('userToken')
        getQuestionProblemReports(token, this.state.page).then(res_ => {
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
                گزارش خطایی وجود ندارد
            </div>
        ) : this.state.userExams.map((item, idx) => {
            let rowId = 1 + ((this.state.page-1) * PER_PAGE_TABLES);
            return (
                <div
                style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}
                >
                    <div style={{...styles.trItem, width: 50}}>{toFA(idx+rowId)}</div>
                    <div style={{...styles.trItem, width: 100}}>{item.reportId}</div>
                    <div style={{...styles.trItem, flex: 1}}>{item.message}</div>
                    <div style={{...styles.trItem, width: 150}}>{item.status}</div>
                    <div style={{...styles.trItem, width: 90}}>{toFA(item.starBonus)}</div>
                    <div style={{...styles.trItem, width: 150}}>{getDateTime(item.getReportTime)}</div>
                    <div style={{...styles.trItem, width: 150}}>{getDateTime(item.giveResultTime)}</div>
                    <div onClick={() => {if (item.resultMessage) {this.setState({open: true, resultMessage: item.resultMessage})}}} style={{...styles.trItem, width: 120, backgroundColor: item.resultMessage ? '#deffd5' : '#ffebe4', cursor: item.resultMessage ? 'pointer' : 'auto'}}>
                        {item.resultMessage ? <Visibility style={{fill: '#329455', fontSize: '100%', marginLeft: 5}} /> : <Cancel style={{fill: '#ec6058', fontSize: '100%', marginLeft: 5}} />}
                    </div>
                </div>
            )
        })
    }

    render() {
        const classes = this.props.classes
        return (
            <>  
                <Backdrop style={{zIndex: 1000000, color: '#FFD700'}} open={this.state.progress} onClick={() => console.log('clicked')}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <PageTitle title="گزارش های خطای سوال" />
                {!this.state.progress && <Grid container item xs={12} style={{padding: '0 10px'}}>
                    <Grid direction="row" alignItems="flex-start" spacing={2} justify="flex-start" container style={{padding: 10, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <Grid direction="column" container item xs={12}>
                        <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: '7.5px', margin: 0, width: '100%'}}>
                            <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center', width: '100%'}}>
                                <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                    <div style={{...styles.thItem, width: 50}}>ردیف</div>
                                    <div style={{...styles.thItem, width: 100}}>کد گزارش</div>
                                    <div style={{...styles.thItem, flex: 1}}>متن گزارش</div>
                                    <div style={{...styles.thItem, width: 150}}>وضعیت</div>
                                    <div style={{...styles.thItem, width: 90}}>جایزه ستاره</div>
                                    <div style={{...styles.thItem, width: 150}}>تاریخ ثبت گزارش</div>
                                    <div style={{...styles.thItem, width: 150}}>تاریخ ثبت نتیجه</div>
                                    <div style={{...styles.thItem, width: 120}}>مشاهده نتیجه</div>
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
                {this.state.open && <Dialog maxWidth="md" style={{overflowX: 'hidden'}} onBackdropClick={this.handleClose} onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                        <div id="invoice" style={{flexDirection: 'column', alignItems: 'center', width: '100%', padding: 30, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>                        
                            <div style={{width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', borderBottom: '1px dashed #888', paddingBottom: 20, marginBottom: 30}}>
                                <div style={{fontSize: 25, fontWeight: 'bold'}}> 
                                    نتیجه رسیدگی
                                </div>
                            </div>
                            <div style={{fontSize: 18}}> 
                                {this.state.resultMessage}
                            </div>
                        </div>
                    </Dialog>}
            </>
        );
    }
};

export default CreateTest;