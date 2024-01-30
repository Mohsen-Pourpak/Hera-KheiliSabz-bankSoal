import React from 'react';
import {CircularProgress, Grid, Backdrop, Button, Dialog, DialogTitle, IconButton, Tooltip} from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import { getStudent } from '../../api/services/group';
import { getShared } from '../../api/services/shareExam';
import { getAllPayments, getAllPurchaseInvoices, getPurchaseInvoices } from '../../api/services/buy';
import { dateTimeToJalaliWithTime, getDateTime, PER_PAGE_TABLES, PRODUCT_TYPES, toFA, WALLET_TYPES } from '../../utils/Utils';
import {Cancel, CheckCircle, Print} from '@material-ui/icons';
import Barcode from 'react-barcode';
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

class PurchaseInvoices extends React.Component {
    constructor() {
        super();
        this.state = {
            teachersList: [],
            grades: {},
            fields: [],
            fieldId: 'd',
            gradeId: 'd',
            level: 'Hard',
            userExams: [],
            selectedList: [],
            isLoading: true,
            subAdvisors: [],
            username: '',
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

    fetchData = () => {
        let token = localStorage.getItem('userToken')
        getAllPurchaseInvoices(token, this.state.page).then(res_ => {
            let res = res_.data
            let pagination = JSON.parse(res_.headers.pagination)
            let pageCount = pagination.totalPages
            this.setState({purchases: res.data, isLoading: false, pageCount})
        })
    }

    handleChangePage = (_r, page) => {
        this.setState({page}, () => this.fetchData())
    }

    changeInput = (field, e) => {
        let value = e.target.value;
        this.setState({
            [field]: value,
        })
    }


    renderSubAdvisors = () => {
        return this.state.purchases.length === 0 ? (
            <div style={{width: '100%', height: 200, alignItems: 'center', display: 'flex', justifyContent: 'center', fontSize: '2rem', opacity: 0.3}}>
                رسید پرداختی وجود ندارد
            </div>
        ) : this.state.purchases.map((item, idx) => {
            let rowId = 1 + ((this.state.page-1) * PER_PAGE_TABLES);
            return (
                <div
                    onClick={() => this.setState({selectedOpacity: item})}
                    style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}
                >
                    <div style={{...styles.trItem, width: 60}}>{toFA(idx+rowId)}</div>
                    <div style={{...styles.trItem, width: '40%'}}>{item.title}</div>
                    <div style={{...styles.trItem, width: 60}}>{toFA(item.count)}</div>
                    <div style={{...styles.trItem, width: 150}}>{toFA(item.totalAmount.toLocaleString())} تومان</div>
                    <div style={{...styles.trItem, width: 210}}>{PRODUCT_TYPES.filter(el => el.value === item.productType)[0].title}</div>
                    <div style={{...styles.trItem, width: 100, backgroundColor: item.isFinaly ? '#deffd5' : '#ffebe4', color: item.isFinaly ? '#329455' : '#ec6058'}}>{item.isFinaly ? <CheckCircle style={{fill: '#329455', fontSize: '90%', marginLeft: 5}} /> : <Cancel style={{fill: '#ec6058', fontSize: '90%', marginLeft: 5}} />}{item.isFinaly ? 'تمام شده' : 'تمام نشده'}</div>
                    <div style={{backgroundColor: '#f4faff', justifyContent: 'space-between', color: '#3d82a4', display: 'flex', fontSize: 15, alignItems: 'center', textAlign: 'center', margin: '0 2.5px', padding: '0 20px', width: 90}}>
                        <ActionButton
                            Icon={Print}
                            onClick={async () => {
                                let token = localStorage.getItem('userToken') 
                                let res = await getPurchaseInvoices(item.id, token)
                                console.error({res})
                                this.setState({open: true, selectedInvoice: res.data})
                            }}
                            title='چاپ رسید پرداخت'
                        />
                    </div>
                </div>
            )
        })
    }

    handleClose = () => {
        this.setState({open: false})
    }

    searchStudent = () => {
        let token = localStorage.getItem('userToken')
        let query = `username=${this.state.username}`
        getStudent(token, query).then(res => {
            if (res.data) {
                this.setState({userSearched: res.data})
            }
        })
    }

    render() {
        const classes = this.props.classes
        const {selectedInvoice} = this.state
        return (
            <>  
                <PageTitle title="لیست رسیدهای پرداخت" />
                {this.state.isLoading ? (
                    <Backdrop style={{zIndex: 1000000, color: '#228b22'}} open={this.state.isLoading} onClick={() => console.log('clicked')}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : (
                    <>
                    <Grid container item xs={12} style={{padding: '0 10px'}}>
                        <Grid direction="row" alignItems="flex-start" spacing={2} justify="flex-start" container style={{padding: 10, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                            <Grid direction="column" container item xs={12}>
                                <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: '7.5px', margin: 0, width: '100%'}}>
                                    <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center', width: '100%'}}>
                                        <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                            <div style={{...styles.thItem, width: 60}}>ردیف</div>
                                            <div style={{...styles.thItem, width: '40%'}}>عنوان</div>
                                            <div style={{...styles.thItem, width: 60}}>تعداد</div>
                                            <div style={{...styles.thItem, width: 150}}>مبلغ</div>
                                            <div style={{...styles.thItem, width: 210}}>نوع محصول</div>
                                            <div style={{...styles.thItem, width: 100}}>وضعیت</div>
                                            <div style={{...styles.thItem, width: 90}}>چاپ</div>
                                        </div>
                                        <div style={{width: '100%'}}>
                                            {this.renderSubAdvisors()}
                                        </div>
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
                    </Grid>
                    {this.state.open && <Dialog maxWidth="md" style={{overflowX: 'hidden'}} onBackdropClick={this.handleClose} onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                        <div id="invoice" style={{flexDirection: 'column', alignItems: 'center', width: '100%', padding: 30, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>                        
                            <div style={{width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #888', paddingBottom: 20, marginBottom: 30}}>
                                <div style={{marginLeft: 200}}>
                                    <div style={{fontSize: 30, fontWeight: 'bold'}}> 
                                    رسید پرداخت
                                    </div>
                                    <div style={{fontSize: 20}}> 
                                    {selectedInvoice.title}
                                    </div>
                                </div>
                                <div>
                                    <div>تاریخ ایجاد: {getDateTime(selectedInvoice.createTime)}</div>
                                    <div>تاریخ نهایی سازی: {getDateTime(selectedInvoice.submittedTime)}</div>
                                </div>
                            </div>

                            <div style={{width: '100%', alignItems: 'center', display: 'flex', background: '#eee', height: 50, justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                                <div style={{fontSize: 16, flex: 1, textAlign: 'center'}}>ردیف</div>
                                <div style={{fontSize: 16, flex: 8, textAlign: 'center'}}>توضیحات</div>
                                <div style={{fontSize: 16, flex: 1, textAlign: 'center'}}>تعداد</div>
                                <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>مبلغ</div>
                                <div style={{fontSize: 16, flex: 2, textAlign: 'center'}}>وضعیت</div>
                            </div>
                            <div style={{width: '100%', alignItems: 'center', display: 'flex', padding: '10px 0', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                                <div style={{fontSize: 16, flex: 1, textAlign: 'center'}}>۱</div>
                                <div style={{fontSize: 16, flex: 8, textAlign: 'center'}}>{selectedInvoice.description}</div>
                                <div style={{fontSize: 16, flex: 1, textAlign: 'center'}}>{toFA(selectedInvoice.count)}</div>
                                <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>{toFA(selectedInvoice.amount.toLocaleString())} تومان</div>
                                <div style={{fontSize: 16, flex: 2, textAlign: 'center'}}>{selectedInvoice.isFinaly ? 'تمام شده' : 'تمام نشده'}</div>
                            </div>
                            <div style={{width: '100%', display: 'flex'}}>
                                <div style={{flex: 9}} />
                                <div style={{flex: 6, alignItems: 'center', display: 'flex', padding: '10px 0', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                                    <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>مالیات: </div>
                                    <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>{toFA(selectedInvoice.tax.toLocaleString())} تومان</div>
                                </div>
                            </div>
                            <div style={{width: '100%', display: 'flex'}}>
                                <div style={{flex: 9}} />
                                <div style={{flex: 6, alignItems: 'center', display: 'flex', padding: '10px 0', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                                    <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>تخفیف: </div>
                                    <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>{toFA(selectedInvoice.discountAmount.toLocaleString())} تومان</div>
                                </div>
                            </div>
                            <div style={{width: '100%', display: 'flex'}}>
                                <div style={{flex: 9}} />
                                <div style={{flex: 6, alignItems: 'center', display: 'flex', padding: '10px 0', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                                    <div style={{fontSize: 16, flex: 3, textAlign: 'center', fontWeight: 'bold'}}>مبلغ کل: </div>
                                    <div style={{fontSize: 16, flex: 3, textAlign: 'center', fontWeight: 'bold'}}>{toFA(selectedInvoice.totalAmount.toLocaleString())} تومان</div>
                                </div>
                            </div>

                            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 30}}>
                                <Barcode value={selectedInvoice.id} displayValue={false} width={1} height={50} fontSize={10} />
                            </div>
                        </div>
                        <div>
                        <Grid direction="row" justify="center" style={{marginTop: 10, margin: 0, marginBottom: 20}} container>
                            <Grid item xs={2}>
                                <Button
                                    onClick={() => {
                                        var winPrint = window.open('', '',)
                                        var element = document.getElementById('invoice').innerHTML
                                        winPrint.document.write(`<html><head><title></title></head><body><style>
                                        * {
                                            font-family: 'Dana' !important;
                                            margin: 0;
                                            direction: rtl;
                                        }
                                        
                                        @media print {
                                            @page { padding: 2cm; }
                                            
                                        }
                                        </style>${element}</body></html>`)
                                        winPrint.document.close()
                                        winPrint.focus()
                                        winPrint.print()
                                        winPrint.close()
                                    }}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.createAccountButton}
                                    style={{fontSize: "1rem", textAlign : 'center', fontFamily: "Dana"}}
                                    >
                                    پرینت
                                </Button>
                            </Grid>
                        </Grid>
                        </div>
                    </Dialog>}
                    </>
                )}
            </>
        );
    }
};

export default PurchaseInvoices;