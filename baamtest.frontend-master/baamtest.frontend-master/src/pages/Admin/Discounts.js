/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Button, Avatar } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon, CheckCircle, Cancel, AddCircle} from '@material-ui/icons'
import { DISCOUNT_TYPES, getDateTime, jalaliToISO, PER_PAGE_TABLES, TABLE_OPTIONS, TABLE_STYLE, toFA } from "../../utils/Utils";
import { addDiscount, deleteBook, deleteDiscount, editBook, editDiscount, getBook, getDiscount, getAllDiscounts } from "../../api/services/admin";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AddDialog } from './AddDialog'
import { toast } from "react-toastify";
import { BASE_URL } from "../../api";
import { TableCustomFooter } from "./TableCustomFooter";

const Discounts = (props) => {

  const defaultData = {
    title: '',
    discountPercent: '',
    minPrice: '',
    maxDiscount: '',
    discountCode: '',
    startTime: '',
    endTime: '',
    isActive: true,
    usableCount: '',
    availableCount: '',
    reuseLimiterAmount: '',
    discountType: '',
    numberOfStarsForOwner: '',
    numberOfStarsForUser: '',
    ownerUserName: '',
    userNameOfUser: ''
  }

  const defaultFilters = {
    isActive: null
  }

  const [page, setPage] = useState(0);
  const [perPageTable, setPerPageTable] = useState(PER_PAGE_TABLES);
  const [count, setCount] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add')
  const [state, setState] = React.useState(defaultData);
  const [openFilter, setOpenFilter] = useState(false);
  const [useFilter, setUseFilter] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  const handleChange = (field, e) => {
    setState({...state, [field]: e});
  };

  const filterHandleChange = (field, e) => {
    setFilters({...filters, [field]: e});
  };

  const onEditClick = async item => {
    let token = localStorage.getItem('userToken')
    let res = await getDiscount(item.id, token)
    res.data.startTime = jalaliToISO(res.data.startTime)
    res.data.endTime = jalaliToISO(res.data.endTime)
    setDialogType('edit')
    setState(res.data)
    setOpenDialog(true)
  };
  const onDeleteClick = item => {
    let token = localStorage.getItem('userToken')
    let foundIndex = -1;
    discounts.forEach((itemBook, index) => {
      if(itemBook.id === item.id)
        foundIndex = index;
    });
    deleteDiscount(item.id, token).then(res => {
      if (res.isSuccess) {
        toast.success(res.message)
        setDiscounts(discounts => {
          return [...discounts.slice(0, foundIndex), ...discounts.slice(foundIndex + 1)];
        })
      }
    })
  };

  const transform = (data) => {
    return data.map((item, idx) => {
      let ActiveIcon = item.isActive ? CheckCircle : Cancel;
      let iconColor = item.isActive ? '#329455' : '#ec6058';
      return [
        toFA(idx+1),
        item.title,
        `${toFA(item.discountPercent)} ٪`,
        item.discountCode,
        getDateTime(item.startTime),
        getDateTime(item.endTime),
        <ActiveIcon style={{fill: iconColor, fontSize: '120%'}} />,
        item.creatorName,
        <IconButton onClick={()=>onDeleteClick(item)}>
          <DeleteIcon style={{fill: 'indianred'}}/>
        </IconButton>,
        <IconButton onClick={()=>onEditClick(item)}>
          <EditIcon style={{fill: 'cadetblue'}}/>
        </IconButton>,
      ];
    });
  };
  
  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    let token = localStorage.getItem('userToken')
    let discountsData = await getAllDiscounts(filters.isActive, token, (page+1), perPageTable)
    let pagination = JSON.parse(discountsData.headers.pagination)
    setCount(pagination.totalItems);
    setDiscounts(discountsData.data.data)
  }

  const onSubmit = () => {
    let token = localStorage.getItem('userToken')
    let userId = localStorage.getItem('userId')
    if (dialogType === 'add') {
      let newState = state
      newState['ownerId'] = userId
      addDiscount(newState, token).then(res => {
        if (res.isSuccess) {
          setOpenDialog(false)
          toast.success(res.message)
          fetchData()
        }
      })
      
    } else {
      editDiscount(state, token).then(res => {
        if (res.isSuccess) {
          setOpenDialog(false)
          toast.success(res.message)
          fetchData()
          setState(defaultData)
        }
      })
    }
  }

  const getMuiTheme = () => createMuiTheme(TABLE_STYLE);

  const form = [
    {
      name: 'عنوان',
      field: 'title',
      type: 'text'
    }, {
      name: 'درصد تخفیف',
      field: 'discountPercent',
      type: 'num'
    }, {
      name: 'حداقل قیمت',
      field: 'minPrice',
      type: 'num'
    }, {
      name: 'حداکثر تخفیف',
      field: 'maxDiscount',
      type: 'num'
    }, {
      name: 'کد تخفیف',
      field: 'discountCode',
      type: 'text'
    }, {
      name: 'زمان شروع',
      field: 'startTime',
      type: 'date-time'
    }, {
      name: 'زمان پایان',
      field: 'endTime',
      type: 'date-time'
    }, {
      name: 'فعال',
      field: 'isActive',
      type: 'boolean'
    }, {
      name: 'تعداد قابل استفاده',
      field: 'usableCount',
      type: 'num'
    }, {
      name: 'تعداد موجود',
      field: 'availableCount',
      type: 'num'
    }, {
      name: 'مقدار محدودکننده استفاده مجدد',
      field: 'reuseLimiterAmount',
      type: 'num'
    }, {
      name: 'نوع تخفیف',
      field: 'discountType',
      type: 'select',
      options: DISCOUNT_TYPES
    }, {
      name: 'تعداد ستاره برای سازنده',
      field: 'numberOfStarsForOwner',
      type: 'num'
    }, {
      name: 'تعداد ستاره برای کاربر',
      field: 'numberOfStarsForUser',
      type: 'num'
    }, {
      name: 'نام کاربری سازنده',
      field: 'ownerUserName',
      type: 'text'
    }, {
      name: 'نام کاربری استفاده کننده',
      field: 'userNameOfUser',
      type: 'text'
    },
  ]

  const filterForm = [
    {
      name: 'فقط فعال',
      field: 'isActive',
      type: 'boolean',
    }
  ]

  return (
    <div style={{marginTop: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <PageTitle style={{width: 'fit-content'}} title="تخفیف ها" />
      <Button
          variant="contained"
          onClick={() => {
            setDialogType('add')
            setOpenDialog(true)
          }}
          color="secondary"
          disableElevation
          startIcon={<AddCircle />}
          style={{borderRadius: 5, height: 45}}
      >
          افزودن تخفیف
      </Button>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
              title="تخفیف ها"
              data={transform(discounts)}
              columns={["ردیف", "عنوان", "درصد تخفیف", "کد تخفیف", "زمان شروع", "زمان پایان", "فعال بودن", "سازنده", "حذف", "ویرایش"]}
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
      openDialog={openDialog}
      columns={2}
      title={`${dialogType === 'edit' ? 'ویرایش' : 'افزودن'} تخفیف`}
      handleChange={handleChange}
      setOpenDialog={() => setOpenDialog(false)}
      onSubmit={onSubmit}
      form={form}
      type={dialogType}
      data={state}
    />
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
    </div>
  );
};

export default Discounts;