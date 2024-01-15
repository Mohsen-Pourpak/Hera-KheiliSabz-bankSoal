/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Button, Avatar } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon, FilterList, Lock, AccountBalanceWallet, Cancel, AddCircle} from '@material-ui/icons'
import { filterObject, INTRODUCTION_METHODS, jalaliToISO, PER_PAGE_TABLES, removeKeys, TABLE_OPTIONS, TABLE_STYLE, toFA, USER_GENDERS, USER_TYPES } from "../../utils/Utils";
import { addTeacher, deleteBook, deleteTeacher, editBook, editTeacher, getBook, getTeacher, getAllTeachers, chargeUserBalance, changeUserPassword } from "../../api/services/admin";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AddDialog } from './AddDialog'
import { toast } from "react-toastify";
import { BASE_URL } from "../../api";
import { TableCustomFooter } from "./TableCustomFooter";

const Teachers = (props) => {

  const defaultData = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: "Male",
    nationalCode: '',
    password: '',
    phoneNumber: '',
    identifierCode: '',
    introductionMethod: "None",
    gradesId: [],
    fieldsId: [],
    lessonsId: [],
  }

  const defaultFilters = {
    username: '',
    gradeIds: [],
    fieldIds: [],
    genderType: '',
    usersThatHaveNotSubscription: false,
    usersWithLessThanOneMonthLeftSubscription: false
  }

  const defaultEdit = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }
  
  const [page, setPage] = useState(0);
  const [perPageTable, setPerPageTable] = useState(PER_PAGE_TABLES);
  const [count, setCount] = useState(0);
  const [sliders, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [useFilter, setUseFilter] = useState(false);
  const [dialogType, setDialogType] = useState('add')
  const [state, setState] = useState(defaultData);
  const [filters, setFilters] = useState(defaultFilters);

  const handleChange = (field, e) => {
    setState({...state, [field]: e});
  };

  const filterHandleChange = (field, e) => {
    setFilters({...filters, [field]: e});
  };

  const onEditClick = async item => {
    let token = localStorage.getItem('userToken')
    let res = await getTeacher(item.id, token)
    let data = filterObject(res.data, defaultEdit);
    setDialogType('edit')
    setState({...data, id: item.id})
    setOpenDialog(true)
  };
  const onDeleteClick = item => {
    let token = localStorage.getItem('userToken')
    let foundIndex = -1;
    sliders.forEach((itemBook, index) => {
      if(itemBook.id === item.id)
        foundIndex = index;
    });
    deleteTeacher(item.id, token).then(res => {
      if (res.isSuccess) {
        toast.success(res.message)
        setStudents(sliders => {
          return [...sliders.slice(0, foundIndex), ...sliders.slice(foundIndex + 1)];
        })
      }
    })
  };

  const onChangePasswordClick = async item => {
    let token = localStorage.getItem('userToken')
    let res = await getTeacher(item.id, token)
    let data = res.data;
    setDialogType('changePassword')
    setState({...data, description: '', password: ''})
    setOpenDialog(true)
  };

  const onChangeBalanceClick = async item => {
    let token = localStorage.getItem('userToken')
    let res = await getTeacher(item.id, token)
    let data = res.data;
    setDialogType('chargeBalance')
    setState({...data, description: '', price: ''})
    setOpenDialog(true)
  };

  const transform = (data) => {
    return data.map((item, idx) => {
      let rowId = 1 + (page * perPageTable);
      let image = item.avatar ? `${BASE_URL}${item.avatar}` : '';
      return [
        toFA(idx+rowId),
        <Avatar alt="فاقد عکس" src={image} />,
        item.firstName,
        item.lastName,
        toFA(item.phoneNumber),
        <IconButton onClick={()=>onDeleteClick(item)}>
          <DeleteIcon style={{fill: 'indianred'}}/>
        </IconButton>,
        <IconButton onClick={()=>onEditClick(item)}>
          <EditIcon style={{fill: 'cadetblue'}}/>
        </IconButton>,
        <IconButton onClick={()=>onChangePasswordClick(item)}>
          <Lock style={{fill: 'darkgoldenrod'}}/>
        </IconButton>,
        <IconButton onClick={()=>onChangeBalanceClick(item)}>
          <AccountBalanceWallet style={{fill: 'cornflowerblue'}}/>
        </IconButton>,
      ];
    });
  };
  
  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    setOpenFilter(false)
    let token = localStorage.getItem('userToken')
    let studentsData = await getAllTeachers(filters, token, (page+1), perPageTable)
    let pagination = JSON.parse(studentsData.headers.pagination)
    setCount(pagination.totalItems);
    setStudents(studentsData.data.data);
  }

  const onSubmit = () => {
    let token = localStorage.getItem('userToken')
    let userId = state.id
    console.table(state)
    if (dialogType === 'chargeBalance') {
      chargeUserBalance(userId, state.userName, state.description, state.price, token).then(res => {
        if (res.isSuccess) {
          setOpenDialog(false)
          setState(defaultData)
          toast.success(res.message)
          fetchData()
        }
      })
    } else if (dialogType === 'changePassword') {
      changeUserPassword(userId, state.userName, state.description, state.password, token).then(res => {
        if (res.isSuccess) {
          setOpenDialog(false)
          setState(defaultData)
          toast.success(res.message)
          fetchData()
        }
      })
    } else if (dialogType === 'add') {
      addTeacher(state, token).then(res => {
        if (res.isSuccess) {
          setOpenDialog(false)
          toast.success(res.message)
          fetchData()
        }
      })
    } else {
      editTeacher(removeKeys(state, ['id']), userId, token).then(res => {
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
        name: 'نام',
        field: 'firstName',
        type: 'text'
    }, {
        name: 'نام خانوادگی',
        field: 'lastName',
        type: 'text'
    }, {
        name: 'کد ملی',
        field: 'nationalCode',
        type: 'text'
    }, {
        name: 'نام کاربری',
        field: 'userName',
        type: 'text'
    }, {
        name: 'جنسیت',
        field: 'gender',
        type: 'select',
        options: USER_GENDERS
    }, {
        name: 'پایه',
        field: 'gradesId',
        type: 'multi-select',
        options: props.grades
    }, {
        name: 'رشته',
        field: 'fieldsId',
        type: 'multi-select',
        options: props.fields
    }, {
        name: 'درس',
        field: 'lessonsId',
        type: 'multi-select',
        options: props.lessons
    }, {
        name: 'کد معرف',
        field: 'identifierCode',
        type: 'text'
    }, {
        name: 'نحوه آشنایی',
        field: 'introductionMethod',
        type: 'select',
        options: INTRODUCTION_METHODS
    }, {
        name: 'تلفن همراه',
        field: 'phoneNumber',
        type: 'text'
        
    }, {
        name: 'رمز عبور',
        field: 'password',
        type: 'text'
    },
  ]

  const editForm = [
    {
      name: 'نام',
      field: 'firstName',
      type: 'text'
    }, {
      name: 'نام خانوادگی',
      field: 'lastName',
      type: 'text'
    }, {
      name: 'ایمیل',
      field: 'email',
      type: 'text'
    }, {
      name: 'تلفن همراه',
      field: 'phoneNumber',
      type: 'text'
    },
  ]

  const passwordForm = [
    {
      name: 'توضیحات',
      field: 'description',
      type: 'text'
    }, {
      name: 'رمزعبور جدید',
      field: 'password',
      type: 'text'
    },
  ]

  const balanceForm = [
    {
      name: 'توضیحات',
      field: 'description',
      type: 'text'
    }, {
      name: 'قیمت',
      field: 'price',
      type: 'text'
    },
  ]

  const filterForm = [
    {
      name: 'نام کاربری',
      field: 'username',
      type: 'text',
    }, {
      name: 'پایه',
      field: 'gradeIds',
      type: 'multi-select',
      options: props.grades
    }, {
      name: 'رشته',
      field: 'fieldIds',
      type: 'multi-select',
      options: props.fields
    }, {
      name: 'جنسیت',
      field: 'genderType',
      type: 'select',
      options: USER_GENDERS
    }, {
      name: 'فقط کاربرانی که اشتراک ندارند',
      field: 'usersThatHaveNotSubscription',
      type: 'boolean'
    }, {
      name: 'کاربران با اشتراک کمتر از یک ماه مانده',
      field: 'usersWithLessThanOneMonthLeftSubscription',
      type: 'boolean'
    }
  ]

  return (
    <div style={{marginTop: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <PageTitle style={{width: 'fit-content'}} title="دبیران" />
      <div style={{flex: 1}} />
      <Button
          variant="outlined"
          onClick={() => {
            setDialogType('add')
            setOpenFilter(true)
          }}
          disableElevation
          color="primary"
          startIcon={<FilterList />}
          style={{borderRadius: 5, marginLeft: 20, height: 45}}
      >
          فیلتر
      </Button>
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
          افزودن دبیر
      </Button>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
              title="دبیران"
              data={transform(sliders)}
              columns={["ردیف", "تصویر", "نام", "نام خانوادگی", "شماره تلفن", "حذف", "ویرایش", "تغییر رمزعبور", "شارژ اعتبار",]}
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
      title={
        dialogType === 'chargeBalance' ?
        'شارژ اعتبار' : dialogType === 'changePassword' ?
        'تغییر رمزعبور' : `${dialogType === 'edit' ? 'ویرایش' : 'افزودن'} دبیر`
      }
      handleChange={handleChange}
      setOpenDialog={() => {
        setOpenDialog(false)
        setState(defaultData)
      }}
      onSubmit={onSubmit}
      form={
        dialogType === 'chargeBalance' ?
        balanceForm : dialogType === 'changePassword' ?
        passwordForm : dialogType === 'edit' ?
        editForm : form
      }
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

export default Teachers;