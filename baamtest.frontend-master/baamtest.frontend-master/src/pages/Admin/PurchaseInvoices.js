/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Button, Avatar } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon, FilterList, Cancel, AddCircle, CheckCircle, Print} from '@material-ui/icons'
import { getDateTime, PER_PAGE_TABLES, PRODUCT_TYPES, returnNotNull, TABLE_OPTIONS, TABLE_STYLE, toFA, USER_GENDERS, USER_TYPES } from "../../utils/Utils";
import { getAllPurchaseInvoices, getPurchaseInvoice } from "../../api/services/admin";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AddDialog } from './AddDialog'
import { toast } from "react-toastify";
import { BASE_URL } from "../../api";
import { TableCustomFooter } from "./TableCustomFooter";
import PurchaseInvoicePrint from "./PurchaseInvoicePrint";

const PurchaseInvoices = (props) => {

  const defaultFilters = {
    minPrice: '',
    maxPrice: '',
    productTypes: [],
    startTime: '',
    endTime: '',
    onlyDiscountedPurchases: false,
    onlyInCompletePurchases: false
  }
  
  const [page, setPage] = useState(0);
  const [perPageTable, setPerPageTable] = useState(PER_PAGE_TABLES);
  const [count, setCount] = useState(0);
  const [sliders, setStudents] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [useFilter, setUseFilter] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  const filterHandleChange = (field, e) => {
    setFilters({...filters, [field]: e});
  };

  const onPrintClick = async (item) => {
    let token = localStorage.getItem('userToken')
    let res = await getPurchaseInvoice(item.id, token)
    setSelectedInvoice(res.data);
    setOpenPrint(true)
  };

  const transform = (data) => {
    return data.map((item, idx) => {
      let rowId = 1 + (page * perPageTable);
      let ActiveIcon = item.isFinaly ? CheckCircle : Cancel;
      let iconColor = item.isFinaly ? '#329455' : '#ec6058';
      let productType = PRODUCT_TYPES.filter(el => el.value === item.productType)[0].title;
      return [
        toFA(idx+rowId),
        item.title,
        toFA(item.count),
        toFA(item.amount.toFixed(2)),
        toFA(item.tax.toFixed(2)),
        toFA(item.discountAmount.toFixed(2)),
        toFA(item.totalAmount.toFixed(2)),
        productType,
        <ActiveIcon style={{fill: iconColor, fontSize: '120%'}} />,
        getDateTime(item.createTime),
        getDateTime(item.submittedTime),
        item.userFullName,
        <IconButton onClick={()=>onPrintClick(item)}>
          <Print />
        </IconButton>,
      ];
    });
  };
  
  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    setOpenFilter(false)
    console.error({filters: returnNotNull(filters)})
    let token = localStorage.getItem('userToken')
    let studentsData = await getAllPurchaseInvoices(returnNotNull(filters), token, (page+1), perPageTable)
    let pagination = JSON.parse(studentsData.headers.pagination)
    console.error({pagination})
    setCount(pagination.totalItems);
    setStudents(studentsData.data.data);
  }

  const getMuiTheme = () => createMuiTheme(TABLE_STYLE);

  const filterForm = [
    {
      name: 'حداقل قیمت',
      field: 'minPrice',
      type: 'num',
    }, {
      name: 'حداکثر قیمت',
      field: 'maxPrice',
      type: 'num',
    }, {
      name: 'نوع',
      field: 'productTypes',
      type: 'multi-select',
      options: PRODUCT_TYPES.map(el=>{return{...el, id: el.value}})
    }, {
      name: 'زمان از',
      field: 'startTime',
      type: 'date-time',
    }, {
      name: 'زمان تا',
      field: 'endTime',
      type: 'date-time',
    }, {
      name: 'فقط رسیدهای پرداخت تخفیف دار',
      field: 'onlyDiscountedPurchases',
      type: 'boolean'
    }, {
      name: 'فقط رسیدهای پرداخت کامل شده',
      field: 'onlyInCompletePurchases',
      type: 'boolean'
    }
  ]

  return (
    <div style={{marginTop: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <PageTitle style={{width: 'fit-content'}} title="رسیدهای پرداخت" />
      <div style={{flex: 1}} />
      <Button
          variant="outlined"
          onClick={() => {
            setOpenFilter(true)
          }}
          disableElevation
          color="primary"
          startIcon={<FilterList />}
          style={{borderRadius: 5, height: 45}}
      >
          فیلتر
      </Button>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
              title="رسیدهای پرداخت"
              data={transform(sliders)}
              columns={["ردیف", "عنوان", "تعداد", "مبلغ", "مالیات", "تخفیف", "مبلغ کل", "نوع", "تمام شده", "تاریخ ایجاد", "تاریخ اتمام", "نام کاربر", "چاپ"]}
              options={{
                ...TABLE_OPTIONS,
                serverSide: true,
                page,
                count,
                onTableChange: (action, tableState) => {
                  console.error(action, tableState);
                  switch (action) {
                    case "changePage":
                      setPage(tableState.page);
                      fetchData()
                      break;
                    case "changeRowsPerPage":
                      setPerPageTable(tableState.rowsPerPage);
                      fetchData()
                      break;
                  }
                },
                customFooter: (count_, page, rowsPerPage, changeRowsPerPage, changePage) => 
                <TableCustomFooter
                  count={count_}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  changeRowsPerPage={changeRowsPerPage}
                  changePage={changePage}
                  setPage={setPage}
                  setPerPageTable={setPerPageTable}
                />
              }}
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>
      <AddDialog
        openDialog={openFilter}
        columns={1}
        title="فیلتر"
        handleChange={filterHandleChange}
        setOpenDialog={() => setOpenFilter(false)}
        onSubmit={fetchData}
        form={filterForm}
        type={'edit'}
        data={filters}
      />
      <PurchaseInvoicePrint
        openDialog={openPrint}
        setOpenDialog={() => setOpenPrint(false)}
        selectedInvoice={selectedInvoice}
      />
    </div>
  );
};

export default PurchaseInvoices;