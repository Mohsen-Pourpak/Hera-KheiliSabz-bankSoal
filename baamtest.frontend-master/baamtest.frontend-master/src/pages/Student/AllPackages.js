import React from 'react';
import { CircularProgress, Grid, Button, Backdrop, Tooltip, MenuItem, IconButton, Icon, Dialog } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import { Description, Print, Edit, PlayArrow, SlowMotionVideo, InsertDriveFile, Share } from '@material-ui/icons';
import axios from 'axios';
import mask from '../../images/mask.svg'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import ArrowIcon from '../../images/icons/circle-arrow-icon.svg';
import bookImage from '../../images/student/default-book.png';
import { topicsConditional, grades, fields, lessons } from '../../api/services/tags';
import { getAll, getHaveReportCard } from '../../api/services/exam'
import { toast } from 'react-toastify';
import { dateTimeToJalali, toFA } from '../../utils/Utils';
import { shareTest } from '../../api/services/shareExam';
import { getAllQuestionPack, getAllQuestionPackv2 } from '../../api/services/student';
import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";
import UncheckRadioIcon from "../../images/icons/uncheck-radio-icon.svg";
import Pagination from "../../components/Form/Pagination";
import { BASE_URL } from '../../api';

const imagem = 'https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg';

const ActionButton = ({ Icon, onClick, title }) => {
    return (
        <Tooltip title={title}>
            <IconButton
                color="inherit"
                aria-controls="profile-menu"
                onClick={onClick}
            >
                <Icon style={{ fill: '#555', fontSize: '80%' }} />
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
    thItem: {
        color: '#3d82a4',
        display: 'flex',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 2.5px',
        padding: '15px 10px 5px'
    }
}

class AllPackages extends React.Component {
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
            selectedGrades: [],
            selectedFields: [],
            f1: [1, 2, 4, 6, 7, 11, 10, 13, 14],    //riazi
            f2: [1, 2, 4, 6, 8, 12, 14, 15, 24],    //tajrobi 
            f3: [1, 2, 3, 5, 6, 20, 9, 23, 16, 19, 21, 22, 18, 17],    //ensani
            progress: true,
            pageCount: 1,
            page: 1,
            perPage: 20, //20
            pageData: [[]],
        };
    }
    componentDidMount() {
        let token = localStorage.getItem('userToken')

        let isStudent = localStorage.getItem('userType') === 'Student'
        console.error('isStudent', isStudent)
        this.setState({ isStudent })

        getAllQuestionPackv2(token).then(res => {
            this.setState({ packages: res.data, newPackages: res.data, progress: false })
        }).then(() => {
            this.handlePagination(this.state.newPackages.length)
        })

        grades().then(res => this.setState({ grades: res.data }))
        fields().then(res => this.setState({ fields: res.data }))
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

    handlePagination = (len) => {
        this.setState({ page: 1 })

        const newPageCount = Math.ceil(len / this.state.perPage)

        this.setState({ pageCount: newPageCount })

        let newPageData = []
        for (let i = 0; i < newPageCount; i++) {
            let from = i * this.state.perPage
            let to = (i + 1) * this.state.perPage
            newPageData.push(this.state.newPackages.slice(from, to))
        }

        this.setState({ pageData: newPageData })
    }

    onFilter = (id1, id2) => {
        const { selectedGrades, selectedFields, packages } = this.state;
        let newList = selectedGrades;
        let newList2 = selectedFields;
        let newFilter = [];
        let newPackages;

        if (id1 === null) {
            if (selectedFields.includes(id2)) {
                newList2 = selectedFields.filter(el => el !== id2);
            } else {
                newList2 = selectedFields;
                newList2.push(id2)
            }

            newList = selectedGrades

            this.setState({ selectedFields: newList2 })
        } else if (id2 === null) {
            if (selectedGrades.includes(id1)) {
                newList = selectedGrades.filter(el => el !== id1);
            } else {
                newList = selectedGrades;
                newList.push(id1)
            }

            newList2 = selectedFields

            this.setState({ selectedGrades: newList })
        }

        if (newList2.includes(1)) {
            newFilter = newFilter.concat(this.state.f1)
        }
        if (newList2.includes(2)) {
            newFilter = newFilter.concat(this.state.f2)
        }
        if (newList2.includes(3)) {
            newFilter = newFilter.concat(this.state.f3)
        }
        newFilter = [...new Set(newFilter)]

        if (newList.length !== 0) {
            newPackages = packages.filter(el => newList.includes(el.gradeId))
        } else {
            newPackages = packages
        }
        if (newFilter.length !== 0) {
            newPackages = newPackages.filter(el => newFilter.includes(el.lessonId))
        }

        this.setState({ newPackages }, () => this.handlePagination(newPackages.length))
    }

    handleChangePage = (_r, page) => {
        // this.setState({ page }, () => this.fetchData());
        this.setState({ page })
    };

    render() {
        const classes = this.props.classes
        return (
            <>
                <Backdrop style={{ zIndex: 1000000, color: '#3d82a4' }} open={this.state.progress} onClick={() => console.log('clicked')}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <PageTitle title="پک های سوال" />
                {!this.state.progress && <Grid container item xs={12} style={{ padding: '0 10px' }}>
                    <Grid direction="row" alignItems="flex-start" spacing={2} justify="flex-start" container style={{ padding: 10, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20 }}>
                        <Grid direction="column" container item xs={3}>
                            <Grid direction="column" item sm={12} spacing={1} alignItems="center" className={`inputContainer filter-box${this.state.filter1 ? ' close' : ''}`}>
                                <div style={{ flexDirection: 'row', display: 'flex', width: '100%', margin: '-15px 0', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ color: '#555', fontSize: 17, padding: '0 17px', textAlign: 'center' }}>انتخاب پایه</div>
                                    <div className="filter-minimize" onClick={() => this.setState({ filter1: !this.state.filter1 })}>{this.state.filter1 ? '+' : '-'}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 10 }}>
                                    {this.state.grades.map(el => {
                                        return (
                                            <div onClick={() => this.onFilter(el.id, null)} style={{ flexDirection: 'row', cursor: 'pointer', display: 'flex', width: '100%', margin: '5px 0px', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <img src={this.state.selectedGrades.includes(el.id) ? CheckRadioIcon : UncheckRadioIcon} style={{ height: 20, margin: '5px 10px' }} />
                                                <div>{el.title}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Grid>
                            {/* Select Field */}
                            <Grid direction="column" item sm={12} spacing={1} alignItems="center" className={`inputContainer filter-box${this.state.filter1 ? ' close' : ''}`}>
                                <div style={{ flexDirection: 'row', display: 'flex', width: '100%', margin: '-15px 0', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ color: '#555', fontSize: 17, padding: '0 17px', textAlign: 'center' }}>انتخاب رشته</div>
                                    <div className="filter-minimize" onClick={() => this.setState({ filter2: !this.state.filter2 })}>{this.state.filter2 ? '+' : '-'}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 10 }}>
                                    {this.state.fields.map(el => {
                                        return (
                                            <div onClick={() => this.onFilter(null, el.id)} style={{ flexDirection: 'row', cursor: 'pointer', display: 'flex', width: '100%', margin: '5px 0px', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <img src={this.state.selectedFields.includes(el.id) ? CheckRadioIcon : UncheckRadioIcon} style={{ height: 20, margin: '5px 10px' }} />
                                                <div>{el.title}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid direction="column" container item xs={9}>
                            <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{ padding: '7.5px', margin: 0, width: '100%' }}>
                                <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '100%', minHeight: 293 }}>
                                    {this.state.newPackages.length === 0 ? (
                                        <div style={{ width: '100%', height: '100%', textAlign: 'center', fontSize: '2rem', opacity: 0.3 }}>
                                            پک سوال وجود ندارد
                                        </div>
                                    ) : this.state.pageData[this.state.page - 1].map(el => {
                                        return (
                                            <div style={{ width: '20%', padding: 20 }}>
                                                <img src={el.image ? `${BASE_URL}${el.image}` : bookImage} width='100%' />
                                                <div style={{ fontSize: 17, textAlign: 'center', fontFamily: "Dana" }}>{el.bookName}</div>
                                                <div style={{ color: '#3d82a4', textAlign: 'center', margin: '10px 0' }}>قیمت : {toFA((el.price).toLocaleString())} تومان</div>
                                                <Button
                                                    onClick={() => this.props.history.push({ pathname: `/dashboard/packages-buy/${el.bookId}` })}
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    className={classes.createAccountButton}
                                                    style={{ fontSize: "1rem", textAlign: 'center', height: 30, fontFamily: "Dana" }}
                                                >
                                                    خرید
                                                </Button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Grid>
                            <Pagination
                                count={this.state.pageCount}
                                page={this.state.page}
                                onChange={this.handleChangePage}
                            />
                        </Grid>
                    </Grid>
                </Grid>}
                {this.state.open && <Dialog maxWidth="xs" onBackdropClick={this.handleClose} onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <div style={{ background: 'rgb(61 130 164 / 20%)', flexDirection: 'column', padding: '0px 30px', width: 400, height: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <Grid direction="column" container spacing={3}>
                            <Grid item sm={12} spacing={1} alignItems="center">
                                <Button
                                    onClick={() => this.shareExam(this.state.selected.id)}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.createAccountButton}
                                    style={{ fontSize: "1rem", textAlign: 'center', height: 55, fontFamily: "Dana" }}
                                >
                                    اشتراک در آزمون اشتراکی
                                </Button>
                            </Grid>
                            <Grid item sm={12} spacing={1} alignItems="center">
                                <Button
                                    onClick={() => {
                                        this.props.history.push({
                                            pathname: `/dashboard/test/add-to-group/${this.state.selected.id}`,
                                        })
                                    }}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.createAccountButton}
                                    style={{ fontSize: "1rem", textAlign: 'center', height: 55, fontFamily: "Dana" }}
                                >
                                    اشتراک در کلاس ها
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>}
            </>
        );
    }
};

export default AllPackages;