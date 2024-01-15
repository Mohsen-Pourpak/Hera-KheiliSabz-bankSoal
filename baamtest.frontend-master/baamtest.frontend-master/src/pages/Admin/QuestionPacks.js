/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Button, Avatar } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon, AddCircle} from '@material-ui/icons'
import { PER_PAGE_TABLES, TABLE_OPTIONS, TABLE_STYLE, toFA } from "../../utils/Utils";
import { addBook, addQuestionPack, deleteBook, deleteQuestionPack, editBook, editQuestionPack, getBook, getQuestionPack, getQuestionPacks } from "../../api/services/admin";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AddDialog } from './AddDialog'
import { toast } from "react-toastify";
import { BASE_URL } from "../../api";
import { TableCustomFooter } from "./TableCustomFooter";

const QuestionPacks = (props) => {

  const defaultData = {BookId: '', ImageFile: '', PdfFile: '', AuthorsName: ''}

  const [page, setPage] = useState(0);
  const [perPageTable, setPerPageTable] = useState(PER_PAGE_TABLES);
  const [count, setCount] = useState(0);
  const [questionPacks, setQuestionPacks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('add')
  const [state, setState] = React.useState(defaultData);

  const handleChange = (field, e) => {
    setState({...state, [field]: e});
  };

  const onEditClick = async item => {
    let token = localStorage.getItem('userToken')
    let res = await getQuestionPack(item.id, token)

    setDialogType('edit')
    setState({id: res.data.id, ImageFile: '', PdfFile: '', AuthorsName: res.data.authorsName ? res.data.authorsName.join('-') : ''})
    setOpenDialog(true)
  };
  const onDeleteClick = item => {
    let token = localStorage.getItem('userToken')
    let foundIndex = -1;
    questionPacks.forEach((itemBook, index) => {
      if(itemBook.id === item.id)
        foundIndex = index;
    });
    deleteQuestionPack(item.id, token).then(res => {
      if (res.isSuccess) {
        toast.success(res.message)
        setQuestionPacks(questionPacks => {
          return [...questionPacks.slice(0, foundIndex), ...questionPacks.slice(foundIndex + 1)];
        })
      }
    })
    
  };

  const transform = (data) => {
    return data.map((item, idx) => {
      let rowId = 1 + (page * perPageTable);
      let image = item.image ? `${BASE_URL}${item.image}` : '';
      return [
        toFA(idx+rowId),
        <Avatar alt="فاقد عکس" src={image} />,
        item.bookName,
        `${toFA(item.price.toLocaleString())}`,
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
    let booksData = await getQuestionPacks(token, (page+1), perPageTable)
    let pagination = JSON.parse(booksData.headers.pagination)
    setCount(pagination.totalItems);
    setQuestionPacks(booksData.data.data);
  }

  const onSubmit = () => {
    let token = localStorage.getItem('userToken')
    if (dialogType === 'add') {
      var formdata = new FormData();
      formdata.append("PdfFile", state.AuthorsName);
      formdata.append("BookId", state.BookId);
      if (state.ImageFile) {
        formdata.append("ImageFile", state.ImageFile, state.ImageFile.name);
      }
      if (state.PdfFile) {
        formdata.append("PdfFile", state.PdfFile, state.PdfFile.name);
      }
      addQuestionPack(formdata, token).then(res => {
        if (res.isSuccess) {
          setOpenDialog(false)
          toast.success(res.message)
          fetchData()
        }
      })
      
    } else {
      var data = new FormData();
      data.append("Id", state.id);
      data.append("AuthorsName", state.AuthorsName);
      if (state.ImageFile) {
        data.append("ImageFile", state.ImageFile, state.ImageFile.name);
      }
      if (state.PdfFile) {
        data.append("PdfFile", state.PdfFile, state.PdfFile.name);
      }
      console.warn({state})
      editQuestionPack(data, token).then(res => {
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
      name: 'کتاب',
      field: 'BookId',
      type: 'select',
      options: props.books
    }, {
      name: 'نام مولفان',
      field: 'AuthorsName',
      type: 'text'
    }, {
      name: 'تصویر',
      field: 'ImageFile',
      type: 'image'
    }, {
      name: 'فایل pdf',
      field: 'PdfFile',
      type: 'pdf'
    }
  ]

  const editForm = form.filter(el => el.field !== 'BookId')

  return (
    <div style={{marginTop: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <PageTitle style={{width: 'fit-content'}} title="پک های سوال" />
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
          افزودن پک سوال
      </Button>
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
              title="پک های سوال"
              data={transform(questionPacks)}
              columns={["ردیف", "تصویر", "نام کتاب", "قیمت", "پایه", "درس", "حذف", "ویرایش"]}
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
      title={`${dialogType === 'edit' ? 'ویرایش' : 'افزودن'} پک سوال`}
      handleChange={handleChange}
      setOpenDialog={() => setOpenDialog(false)}
      onSubmit={onSubmit}
      form={dialogType === 'edit' ? editForm : form}
      type={dialogType}
      data={state}
    />
    </div>
  );
};

export default QuestionPacks;