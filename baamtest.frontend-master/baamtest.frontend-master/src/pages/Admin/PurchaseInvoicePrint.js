import React, { useEffect, useState } from "react";
import { Dialog, Button, Grid} from "@material-ui/core";
import { getDateTime, getUserTypeStr, PRODUCT_TYPES, toFA } from "../../utils/Utils";
import Barcode from 'react-barcode';

const PurchaseInvoicePrint = (props) => {
  return (
      <>
        {props.openDialog && <Dialog maxWidth="lg" onBackdropClick={props.setOpenDialog} onClose={props.setOpenDialog} aria-labelledby="simple-dialog-title" open={props.openDialog}>
        <div id="invoice" style={{flexDirection: 'column', alignItems: 'center', width: '100%', padding: 30, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>                        
            <div style={{width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #888', paddingBottom: 20, marginBottom: 30}}>
                <div style={{marginLeft: 200}}>
                    <div style={{fontSize: 30, fontWeight: 'bold'}}> 
                    رسید پرداخت
                    </div>
                    <div style={{fontSize: 20}}> 
                    {props.selectedInvoice.title}
                    </div>
                    <div style={{fontSize: 17}}> 
                    {props.selectedInvoice.description}
                    </div>
                </div>
                <div>
                    <div>تاریخ ایجاد: {getDateTime(props.selectedInvoice.createTime)}</div>
                    <div>تاریخ نهایی سازی: {getDateTime(props.selectedInvoice.submittedTime)}</div>
                </div>
            </div>

            <div style={{width: '100%', alignItems: 'center', display: 'flex', background: '#eee', height: 50, justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                <div style={{fontSize: 16, flex: 1, textAlign: 'center'}}>ردیف</div>
                <div style={{fontSize: 16, flex: 8, textAlign: 'center'}}>توضیحات</div>
                <div style={{fontSize: 16, flex: 1, textAlign: 'center'}}>تعداد</div>
                <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>مبلغ</div>
                <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>نوع</div>
                <div style={{fontSize: 16, flex: 2, textAlign: 'center'}}>وضعیت</div>
            </div>
            <div style={{width: '100%', alignItems: 'center', display: 'flex', padding: '10px 0', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                <div style={{fontSize: 16, flex: 1, textAlign: 'center'}}>۱</div>
                <div style={{fontSize: 16, flex: 8, textAlign: 'center'}}>{props.selectedInvoice.description}</div>
                <div style={{fontSize: 16, flex: 1, textAlign: 'center'}}>{toFA(props.selectedInvoice.count)}</div>
                <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>{toFA(props.selectedInvoice.amount.toLocaleString())} تومان</div>
                <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>{PRODUCT_TYPES.filter(el => el.value === props.selectedInvoice.productType)[0].title}</div>
                <div style={{fontSize: 16, flex: 2, textAlign: 'center'}}>{props.selectedInvoice.isFinaly ? 'تمام شده' : 'تمام نشده'}</div>
            </div>
            <div style={{width: '100%', display: 'flex'}}>
                <div style={{flex: 9}} />
                <div style={{flex: 6, alignItems: 'center', display: 'flex', padding: '10px 0', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                    <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>مالیات: </div>
                    <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>{toFA(props.selectedInvoice.tax.toLocaleString())} تومان</div>
                </div>
            </div>
            <div style={{width: '100%', display: 'flex'}}>
                <div style={{flex: 9}} />
                <div style={{flex: 6, alignItems: 'center', display: 'flex', padding: '10px 0', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                    <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>تخفیف: </div>
                    <div style={{fontSize: 16, flex: 3, textAlign: 'center'}}>{toFA(props.selectedInvoice.discountAmount.toLocaleString())} تومان</div>
                </div>
            </div>
            <div style={{width: '100%', display: 'flex'}}>
                <div style={{flex: 9}} />
                <div style={{flex: 6, alignItems: 'center', display: 'flex', padding: '10px 0', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                    <div style={{fontSize: 16, flex: 3, textAlign: 'center', fontWeight: 'bold'}}>مبلغ کل: </div>
                    <div style={{fontSize: 16, flex: 3, textAlign: 'center', fontWeight: 'bold'}}>{toFA(props.selectedInvoice.totalAmount.toLocaleString())} تومان</div>
                </div>
            </div>

            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 30}}>
                <div>
                    {props.selectedInvoice.discountPercent !== 0 && <><div style={{fontSize: 20, fontWeight: 'bold'}}> 
                        اطلاعات تخفیف
                    </div>
                    <div style={{fontSize: 17}}> 
                        عنوان تخفیف : {props.selectedInvoice.discountTitle}
                    </div>
                    <div style={{fontSize: 17}}> 
                        درصد تخفیف : {toFA(props.selectedInvoice.discountPercent)}٪
                    </div></>}
                    <div style={{fontSize: 20, fontWeight: 'bold'}}> 
                        اطلاعات کاربر
                    </div>
                    <div style={{fontSize: 17}}> 
                        نام : {props.selectedInvoice.userFullName}
                    </div>
                    <div style={{fontSize: 17}}> 
                        کدملی : {toFA(props.selectedInvoice.userUserName)}
                    </div>
                    <div style={{fontSize: 17}}> 
                        ایمیل : {toFA(props.selectedInvoice.userEmail)}
                    </div>
                    <div style={{fontSize: 17}}> 
                        شماره تلفن : {toFA(props.selectedInvoice.userPhoneNumber)}
                    </div>
                    <div style={{fontSize: 17}}> 
                        نوع اکانت : {getUserTypeStr(props.selectedInvoice.userType)}
                    </div>
                </div>
                <Barcode value={props.selectedInvoice.id} displayValue={false} width={1} height={50} fontSize={10} />
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
                    style={{fontSize: "1rem", textAlign : 'center', fontFamily: "Dana"}}
                    >
                    پرینت
                </Button>
            </Grid>
        </Grid>
        </div>
        </Dialog>}
    </>
  );
};

export default PurchaseInvoicePrint;