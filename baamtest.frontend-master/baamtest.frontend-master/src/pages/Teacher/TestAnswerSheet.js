import React from 'react';
import {Backdrop, Grid, CircularProgress, Select, Checkbox, Button, Input, LinearProgress, MenuItem} from '@material-ui/core';
import { CloudUpload, RadioButtonUnchecked, CheckCircle } from '@material-ui/icons';
import PageTitle from "../../components/PageTitle/PageTitle";
import {allGroupInExam, getAnswerSheet, getTest} from '../../api/services/exam';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import SheetA4 from '../../images/test/A4.jpg';
import SheetA5 from '../../images/test/A5.jpg';
import SheetA6 from '../../images/test/A6.jpg';
import { getPriceSc } from '../../api/services/school';
import jsPDF from 'jspdf';
import { toSvg } from 'html-to-image';
import QRCode from 'qrcode.react';
import { toFA, EXAM_ANSWER_SHEETS } from '../../utils/Utils';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { getAllGroups } from '../../api/services/group';

class RegisterTest extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            fields: [],
            title: '',
            fieldId: 'd',
            gradeId: 'd',
            level: 'Hard',
            testtt: [],
            selectedFields: [],
            selectedList: [],
            students: [],
            grade: '',
            sheetType: 'a4',
            sheetType_: 'a4',
            price: 0,
            progress: true,
            upload: 0,
            buffer: 5,
            files: [],
            replace: false
        };
    }
    componentDidMount() {
        let token = localStorage.getItem('userToken')
        let examId = this.props.match.params.id;
        let isStudent = localStorage.getItem('userType') === 'Student'
        console.error('isStudent', isStudent)
        this.setState({isStudent})
        getTest(examId, token).then(res => {
            if (res.isSuccess) {
                this.setState({questionCount: res.data.numberOfQuestions})
            }
        })
        getAnswerSheet(examId, token).then(res => {
            if (res.isSuccess) {
                this.setState({exam: res.data, students: res.data.students, progress: false})
            }
        })
    }


    gradeOnClick = (id) => {
        const {selectedFields} = this.state
        let newList;

        if (selectedFields.includes(id)) {
            newList = selectedFields.filter(el => el !== id)
            this.setState({selectedFields: newList})
        } else {
            newList = [...this.state.selectedFields, id]
            this.setState({selectedFields: newList})
        }

        let token = localStorage.getItem('userToken')
        let data = JSON.stringify(newList);

        getPriceSc(data, token).then(res => {
            console.warn(res)
            this.setState({
                price: parseInt(res.data.finalPrice),
            })
        })
    }

    finalActivate = async () => {
        this.setState({progress: true})
        let token = localStorage.getItem('userToken')
        let examId = this.props.match.params.id;
        let res = await allGroupInExam(examId, token)
        if (res.data.length === 0) {
            this.setState({progress: false})
            toast.error('حداقل باید این آزمون را برای یک گروه به اشتراک گذارید')
            setTimeout(() => {
                this.props.history.push({
                    pathname: `/dashboard/test/add-to-group/${examId}`,
                })
            }, 500);
        } else {
            const pdf = new jsPDF("p", "mm", this.state.sheetType);
            let list_ = await Promise.all(this.state.students.map(async (item, idx) => {
                let sheetType = this.state.sheetType
                let width = sheetType === 'a4' ? 2480 : sheetType === 'a5' ? 1748 : 1240;
                let height = sheetType === 'a4' ? 3508 : sheetType === 'a5' ? 2480 : 1748;
                let dataUrl = await toSvg(document.getElementById(`student_${idx}`), { width, height })
                return {
                    link: dataUrl,
                }
            }))
            this.setState({testtt: list_})
    
            let list = await Promise.all(this.state.students.map(async (item, idx) => {
                let sheetType = this.state.sheetType
                let width = sheetType === 'a4' ? 2480 : sheetType === 'a5' ? 1748 : 1240;
                let height = sheetType === 'a4' ? 3508 : sheetType === 'a5' ? 2480 : 1748;
                let canvas = await html2canvas(document.getElementById(`student2_${idx}`), {width, height})
                const imgData = canvas.toDataURL('image/jpeg', 0.8);
                return {
                    link: imgData,
                }
            }))
    
            this.setState({testtt: list})
            list.map((el, idx) => {
                let sheetType = this.state.sheetType
                let width = sheetType === 'a4' ? 210 : sheetType === 'a5' ? 148 : 105;
                let height = sheetType === 'a4' ? 297 : sheetType === 'a5' ? 210 : 148;
                if (idx !== 0) {
                    pdf.addPage();
                }
                pdf.addImage(el.link, 'png', 0, 0, width, height);
            })
            this.setState({progress: false})
            pdf.save(`Answer-Sheet_${this.state.sheetType.toUpperCase()}__${this.state.exam.examDate}.pdf`);     
        }
    }

    renderMenuItem = items => {
        return items.map(item => {
            return <MenuItem value={item.value}>{item.title}</MenuItem>
        })
    }

    renderc = items => {
        let sheetType = this.state.sheetType
        let width = sheetType === 'a4' ? 2480 : sheetType === 'a5' ? 1748 : 1240;
        let height = sheetType === 'a4' ? 3508 : sheetType === 'a5' ? 2480 : 1748;
        return items.map((item, idx) => {
            return <div id={`student2_${idx}`} style={{width, height}}><img style={{width: '100%'}} src={item.link} /></div>
        })
    }

    renderA4 = item => {
        return (
            <>
                <div style={{display: 'flex', marginLeft: 80, marginRight: 165, flexDirection: 'column', flex: 1, fontSize: 40}}>
                    <div style={{display: 'flex', height: 55, marginTop: 110, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 370}}>
                            {item.studentFullName}
                        </div>
                        <div style={{flex: 1, paddingRight: 90}}>
                            {this.state.exam.examName}
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 45, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 520}}>
                            
                        </div>
                        <div style={{flex: 1, paddingRight: 520}}>
                            
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 45, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 520}}>
                            
                        </div>
                        <div style={{flex: 1, paddingRight: 520}}>
                           
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 45, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 290}}>
                            {item.studentGroupName}
                        </div>
                        <div style={{flex: 1, paddingRight: 430}}>
                            {toFA(this.state.exam.examTime)} دقیقه
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 40, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 290}}>
                            پایه {this.state.exam.gradeTitle}
                        </div>
                        <div style={{flex: 1, paddingRight: 560}}>
                            {toFA(this.state.exam.examDate)}
                        </div>
                    </div>
                </div>
                <div style={{width: 395, paddingTop: 480}}>
                    <QRCode size={225} value={item.testSheetQrCode} />
                </div>
            </>
        )
    }

    renderA5 = item => {
        return (
            <>
                <div style={{display: 'flex', marginLeft: 75, marginRight: 106, flexDirection: 'column', flex: 1, fontSize: 35}}>
                    <div style={{display: 'flex', height: 55, marginTop: 102, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 310}}>
                            {item.studentFullName}
                        </div>
                        <div style={{flex: 1, paddingRight: 90}}>
                            
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 50, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 520}}>
                            
                        </div>
                        <div style={{flex: 1, paddingRight: 520}}>
                           
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 50, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 200}}>
                            {this.state.exam.examName}
                        </div>
                        <div style={{flex: 1, paddingRight: 270}}>
                            {item.studentGroupName}
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 45, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 360}}>
                            {toFA(this.state.exam.examDate)}
                        </div>
                        <div style={{flex: 1, paddingRight: 230}}>
                            
                            {toFA(this.state.exam.examTime)} دقیقه
                        </div>
                    </div>
                </div>
                <div style={{width: 300, paddingTop: 437}}>
                    <QRCode size={170} value={item.testSheetQrCode} />
                </div>
            </>
        )
    }

    renderA6 = item => {
        return (
            <>
                <div style={{display: 'flex', marginLeft: 80, marginRight: 132, flexDirection: 'column', flex: 1, fontSize: 35}}>
                    <div style={{display: 'flex', height: 55, marginTop: 125, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 220}}>
                            {item.studentFullName}
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 55, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 100}}>
                            
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 55, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 140}}>
                            {this.state.exam.examName}
                        </div>
                    </div>
                    <div style={{display: 'flex', height: 55, marginTop: 60, position: 'relative'}}>
                        <div style={{flex: 1, paddingRight: 100}}>
                            {toFA(this.state.exam.examDate)}
                        </div>
                    </div>
                </div>
                <div style={{width: 293, paddingTop: 368}}>
                    <QRCode size={160} value={item.testSheetQrCode} />
                </div>
            </>
        )
    }

    renderSheets = items => {
        let sheetType = this.state.sheetType
        let sheet = sheetType === 'a4' ? SheetA4 : sheetType === 'a5' ? SheetA5 : SheetA6;
        let width = sheetType === 'a4' ? 2480 : sheetType === 'a5' ? 1748 : 1240;
        let height = sheetType === 'a4' ? 3508 : sheetType === 'a5' ? 2480 : 1748;
        return items.map((item, idx) => {
            return <div id={`student_${idx}`} style={{backgroundImage: `url('${sheet}')`, wordBreak: 'keep-all', textAlign: 'right', direction: 'rtl', backgroundSize: '100%', width, height}}>
                <div style={{display: 'flex'}}>
                    {sheetType === 'a4' ? this.renderA4(item) : sheetType === 'a5' ? this.renderA5(item) : this.renderA6(item)}
                </div>
            </div>
        })
    }

    onFileChange = e => {
        const files = e.target.files
        this.setState({files})
    }

    uploadAnswerSheets = () => {
        if (this.state.files.length === 0) {
            return toast.error('حداقل یک پاسخ برگ برای آپلود انتخاب کنید')
        }
        let formdata = new FormData();
        Array.from(this.state.files).forEach(el => {
            formdata.append("files", el, el.name);
        })
        formdata.append("examId", this.props.match.params.id);
        formdata.append("size", this.state.sheetType_);
        formdata.append("replace", this.state.replace);
        formdata.append("questionCount", this.state.questionCount);

        Axios.post('https://baamtest-omr.iran.liara.run/api/omr-front/', formdata, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': "true"
            },
            onUploadProgress: progress => {
                console.error({progress})
            }
        })
    }

    render() {
        const classes = this.props.classes
        return (
            <>
                <PageTitle title="مدیریت آزمون - چاپ پاسخبرگ" />
                {this.state.exam ? (
                    <>
                    <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, marginTop: 40, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                        <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between',}}>
                            <div style={{flexDirection: 'row', display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                                <div style={{flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 45}}>
                                    نام آزمون
                                </div>
                                <div style={{flex: 1, textAlign: 'center', width: 200}}>
                                    <span style={{fontSize: 17, width: 200, textAlign: 'center'}}>{this.state.exam.examName}</span>
                                </div>
                            </div>
                            <div style={{flex: 0.2}} />
                            <div style={{flexDirection: 'row', display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                                <div style={{flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 45}}>
                                    تاریخ آزمون
                                </div>
                                <div style={{flex: 1, textAlign: 'center', width: 200}}>
                                    <span style={{fontSize: 17, width: 200, textAlign: 'center'}}>{toFA((this.state.exam.examDate))}</span>
                                </div>
                            </div>
                            <div style={{flex: 0.2}} />
                            <div style={{flexDirection: 'row', display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                                <div style={{flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 45}}>
                                    نوع برگه
                                </div>
                                <div style={{flex: 1, textAlign: 'center', width: 220}}>
                                    <Grid item style={{paddingTop: 5, paddingBottom: 5, width: '82.5%', marginRight: 10}}>    
                                        <Select
                                            value={this.state.sheetType}
                                            style={{width: '100%'}}
                                            input={<Input disableUnderline />}
                                            onChange={e => this.setState({sheetType: e.target.value})}
                                        >
                                            {this.renderMenuItem(EXAM_ANSWER_SHEETS)}
                                        </Select>
                                    </Grid>
                                </div>
                            </div>
                            <div style={{flex: 1}} />
                            <div style={{}}>
                                <div onClick={this.finalActivate} style={{flexDirection: 'row', display: 'flex', background: '#fe5f55', color: '#fff', borderRadius: 50, padding: '15px 20px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                                    دانلود PDF
                                </div>
                            </div>
                        </div>
                </Grid>

                <PageTitle style={{marginTop: 40}} title="مدیریت آزمون - آپلود پاسخبرگ" />
                <Grid direction="column" alignItems="flex-start" spacing={3} justify="flex-start" container style={{padding: 20, marginTop: 40, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between',}}>
                        <div>
                            <div style={{flexDirection: 'row', display: 'flex'}}>
                                <div style={{flexDirection: 'row', display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                                    <input
                                        accept="image/*"
                                        multiple
                                        id="contained-button-file"
                                        hidden
                                        onChange={this.onFileChange}
                                        type="file"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="span"
                                            startIcon={<CloudUpload />}
                                            style={{borderRadius: 50, height: 45, boxShadow: 'none', padding: '0 ​25px'}}
                                            classes={{ root: classes.cropButton }}
                                        >
                                    انتخاب پاسخبرگ ها
                                    </Button>
                                    </label>
                                </div>
                                <div style={{flex: 0.2}} />
                                <div style={{flexDirection: 'row', display: 'flex', background: '#fff', height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div style={{flexDirection: 'row', display: 'flex', color: '#fff', alignItems: 'center', padding: '0 15px', borderRadius: 50, background: '#3d82a4', height: 45}}>
                                        نوع برگه
                                    </div>
                                    <div style={{flex: 1, textAlign: 'center', width: 220}}>
                                        <Grid item style={{paddingTop: 5, paddingBottom: 5, width: '82.5%', marginRight: 10}}>    
                                            <Select
                                                value={this.state.sheetType_}
                                                style={{width: '100%'}}
                                                input={<Input disableUnderline />}
                                                onChange={e => this.setState({sheetType_: e.target.value})}
                                            >
                                                {this.renderMenuItem(EXAM_ANSWER_SHEETS)}
                                            </Select>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                            <Grid container spacing={1} alignItems="center" style={{marginTop: 20}}>
                                <Grid item>
                                    <Checkbox
                                        checked={this.state.replace}
                                        color="primary"
                                        onChange={e => this.setState({replace: !this.state.replace})}
                                        icon={<RadioButtonUnchecked />}
                                        checkedIcon={<CheckCircle />}
                                    />
                                </Grid>
                                <Grid item>
                                <div>آپلود مجدد (اگر قبلا پاسخبرگ های این آزمون را آپلود کرده اید این گزینه را انتخاب کنید)</div>
                                </Grid>
                            </Grid>
                        </div>
                        <div style={{flex: 0.2}} />
                        
                        <div style={{flex: 1}} />
                        <div style={{}}>
                            <div onClick={this.uploadAnswerSheets} style={{flexDirection: 'row', display: 'flex', background: '#fe5f55', color: '#fff', borderRadius: 50, padding: '15px 20px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                                آپلود تصاویر
                            </div>
                        </div>
                    </div>
                </Grid>
                {this.state.upload !==0 && <LinearProgress variant="buffer" value={this.state.upload} valueBuffer={this.state.buffer} />}

                <div style={{height: 0, overflow: 'hidden'}}>
                    {this.renderSheets(this.state.students)}
                    {this.renderc(this.state.testtt || [])}
                </div>
                <Backdrop style={{zIndex: 1000000, color: '#228b22'}} open={this.state.progress} onClick={() => console.log('clicked')}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                </>
                ) : (
                    <Backdrop style={{zIndex: 1000000, color: '#FFD700'}} open={this.state.progress} onClick={() => console.log('clicked')}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
            </>
        );
    }
};

export default RegisterTest;