/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Button, Avatar } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon, CheckCircle, Cancel, AddCircle} from '@material-ui/icons'
import { capitalizeFirstLetter, capitalizeKeys, BAAMTEACHERS_TYPES, getDateTime, jalaliToISO, PER_PAGE_TABLES, removeKeys, TABLE_OPTIONS, TABLE_STYLE, toFA } from "../../utils/Utils";
import { addBamTeacher, deleteBook, deleteBamTeacher, editBook, editBamTeacher, getBook, getBamTeacher, getAllBamTeachers } from "../../api/services/admin";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AddDialog } from './AddDialog'
import { toast } from "react-toastify";
import { BASE_URL } from "../../api";
import { TableCustomFooter } from "./TableCustomFooter";

const BamTeachers = (props) => {

  const defaultData = {
    FirstName: '',
    LastName: '',
    Lesson: '',
    Priority: '',
    Type: BAAMTEACHERS_TYPES[0].id,
    Active: true,
  }

  const [page, setPage] = useState(0);
  const [perPageTable, setPerPageTable] = useState(PER_PAGE_TABLES);
  const [count, setCount] = useState(0);
  const [colleagues, setBamTeachers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add')
  const [state, setState] = React.useState(defaultData);

  const handleChange = (field, e) => {
    setState({...state, [field]: e});
  };

  const onEditClick = async item => {
    let token = localStorage.getItem('userToken')
    let res = await getBamTeacher(item.id, token)

    let data = capitalizeKeys(removeKeys(res.data, ['pictureLink', 'creationTime']));    

    data.ShowDateTime = jalaliToISO(data.ShowDateTime)
    data.Time = jalaliToISO(data.Time)

    setDialogType('edit')
    setState(data)
    setOpenDialog(true)
  };
  const onDeleteClick = item => {
    let token = localStorage.getItem('userToken')
    let foundIndex = -1;
    colleagues.forEach((itemBook, index) => {
      if(itemBook.id === item.id)
        foundIndex = index;
    });
    deleteBamTeacher(item.id, token).then(res => {
      if (res.isSuccess) {
        toast.success(res.message)
        setBamTeachers(colleagues => {
          return [...colleagues.slice(0, foundIndex), ...colleagues.slice(foundIndex + 1)];
        })
      }
    })
    
  };

  const transform = (data) => {
    return data.map((item, idx) => {
      let rowId = 1 + (page * perPageTable);
      let ActiveIcon = item.active ? CheckCircle : Cancel;
      let iconColor = item.active ? '#329455' : '#ec6058';
      let image = item.pictureLink ? `${BASE_URL}${item.pictureLink}` : '';
      return [
        toFA(idx+rowId),
        <Avatar alt="فاقد عکس" src={image} />,
        item.firstName,
        item.lastName,
        item.lesson,
        <ActiveIcon style={{fill: iconColor, fontSize: '120%'}} />,
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
    let bamTeachersData = await getAllBamTeachers(token, (page+1), perPageTable)
    let pagination = JSON.parse(bamTeachersData.headers.pagination)
    setCount(pagination.totalItems);
    setBamTeachers(bamTeachersData.data.data)
  }

  const onSubmit = () => {
    let token = localStorage.getItem('userToken')
    var formdata = new FormData();
    form.map(item => {
      if (item.type === 'image' || item.type === 'pdf') {
        if (state[item.field]) {
          formdata.append(item.field, state[item.field], state[item.field].name);
        }
      } else if (item.type === 'boolean') {
        formdata.append(item.field, Boolean(state[item.field]));
      } else {
        formdata.append(item.field, state[item.field]);
      }
    });
    if (dialogType === 'add') {
      addBamTeacher(formdata, token).then(res => {
        if (res.isSuccess) {
          setOpenDialog(false)
          toast.success(res.message)
          fetchData()
        }
      })
    } else {
      console.warn({state})
      formdata.append('Id', state.Id);
      editBamTeacher(formdata, token).then(res => {
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
      field: 'FirstName',
      type: 'text'
    }, {
      name: 'نام خانوادگی',
      field: 'LastName',
      type: 'text'
    }, {
      name: 'اولویت',
      field: 'Priority',
      type: 'num'
    }, {
      name: 'نوع دبیر',
      field: 'Type',
      type: 'select',
      options: BAAMTEACHERS_TYPES
    }, {
      name: 'درس',
      field: 'Lesson',
      type: 'text'
    }, {
      name: 'فعال',
      field: 'Active',
      type: 'boolean'
    }, {
      name: 'تصویر',
      field: 'ImageFile',
      type: 'image'
    }
  ]

  return (
    <div style={{marginTop: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <PageTitle style={{width: 'fit-content'}} title="دبیران بام تست" />
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
          افزودن دبیر بام تست
      </Button>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
              title="دبیران بام تست"
              data={transform(colleagues)}
              columns={["ردیف", "تصویر", "نام", "نام خانوادگی", "درس", "فعال بودن", "حذف", "ویرایش"]}
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
      columns={1}
      title={`${dialogType === 'edit' ? 'ویرایش' : 'افزودن'} دبیر بام تست`}
      handleChange={handleChange}
      setOpenDialog={() => setOpenDialog(false)}
      onSubmit={onSubmit}
      form={form}
      type={dialogType}
      data={state}
    />
    </div>
  );
};

export default BamTeachers;