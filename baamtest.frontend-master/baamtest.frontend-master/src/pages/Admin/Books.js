/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon, AddCircle} from '@material-ui/icons'
import { PER_PAGE_TABLES, removeKeys, TABLE_OPTIONS, TABLE_STYLE, toFA } from "../../utils/Utils";
import { addBook, deleteBook, editBook, getBook, getBooks } from "../../api/services/admin";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AddDialog } from './AddDialog'
import { toast } from "react-toastify";
import { TableCustomFooter } from "./TableCustomFooter";

const Books = (props) => {

  const defaultData = {name: '', description: '', gradeId: '', lessonId: '', basicSchoolPrice: '', studentTestPrice: ''}

  const [page, setPage] = useState(0);
  const [perPageTable, setPerPageTable] = useState(PER_PAGE_TABLES);
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add')
  const [state, setState] = React.useState(defaultData);

  const handleChange = (field, e) => {
    setState({...state, [field]: e});
  };

  const onEditClick = async item => {
    let token = localStorage.getItem('userToken')
    let res = await getBook(item.id, token)
    let data = removeKeys(res.data, ['gradeTitle', 'lessonTitle'])
    
    setDialogType('edit')
    setState(data)
    setOpenDialog(true)
  };
  const onDeleteClick = item => {
    let token = localStorage.getItem('userToken')
    let foundIndex = -1;
    books.forEach((itemBook, index) => {
      if(itemBook.id === item.id)
        foundIndex = index;
    });
    deleteBook(item.id, token).then(res => {
      if (res.isSuccess) {
        toast.success(res.message)
        setBooks(books => {
          return [...books.slice(0, foundIndex), ...books.slice(foundIndex + 1)];
        })
      }
    })
    
  };

  const transform = (data) => {
    let rowId = 1 + (page * perPageTable);
    return data.map((item, idx) => {
      return [
        toFA(idx+rowId),
        item.name,
        `${toFA(item.studentTestPrice.toLocaleString())}`,
        `${toFA(item.basicSchoolPrice.toLocaleString())}`,
        item.gradeTitle,
        item.lessonTitle,
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
    let booksData = await getBooks(token, (page+1), perPageTable)
    let pagination = JSON.parse(booksData.headers.pagination)
    setCount(pagination.totalItems);
    setBooks(booksData.data.data);
  }

  const onSubmit = () => {
    let token = localStorage.getItem('userToken')
    if (dialogType === 'add') {
      addBook(state, token).then(res => {
        if (res.isSuccess) {
          setOpenDialog(false)
          toast.success(res.message)
          fetchData()
        }
      })
    } else {
      editBook(state, token).then(res => {
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
      name: 'نام کتاب',
      field: 'name',
      type: 'text'
    }, {
      name: 'توضیحات کتاب',
      field: 'description',
      type: 'text'
    }, {
      name: 'پایه',
      field: 'gradeId',
      type: 'select',
      options: props.grades
    }, {
      name: 'درس',
      field: 'lessonId',
      type: 'select',
      options: props.lessons
    }, {
      name: 'قیمت برای مدرسه',
      field: 'basicSchoolPrice',
      type: 'num'
    }, {
      name: 'قیمت برای دانش آموز',
      field: 'studentTestPrice',
      type: 'num'
    }
  ]

  return (
    <div style={{marginTop: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <PageTitle style={{width: 'fit-content'}} title="کتاب ها" />
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
          افزودن کتاب
      </Button>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
              title="کتاب ها"
              data={transform(books)}
              columns={["ردیف", "نام کتاب", "قیمت برای دانش آموز", "قیمت برای مدرسه", "پایه", "درس", "حذف", "ویرایش"]}
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
      title={`${dialogType === 'edit' ? 'ویرایش' : 'افزودن'} کتاب`}
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

export default Books;