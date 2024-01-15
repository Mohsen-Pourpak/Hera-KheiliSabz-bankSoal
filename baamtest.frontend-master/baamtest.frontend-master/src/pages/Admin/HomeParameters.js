/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Paper, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon, AddCircle} from '@material-ui/icons'
import { HOME_PARAMETERS, ListToObject, ObjectToList, PER_PAGE_TABLES, removeKeys, TABLE_OPTIONS, TABLE_STYLE, toFA } from "../../utils/Utils";
import { addBook, deleteBook, editBook, editHomePageParameters, getBook, getBooks, getHomePageParameters } from "../../api/services/admin";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {AddDialog, Form} from './AddDialog'
import { toast } from "react-toastify";
import { TableCustomFooter } from "./TableCustomFooter";

const Books = (props) => {

  const [homePageParameters, setHomePageParameters] = useState([]);
  const [state, setState] = React.useState({});

  const handleChange = (field, e) => {
    setState({...state, [field]: e});
  };

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    let token = localStorage.getItem('userToken')
    let homePageParametersData = await getHomePageParameters(token)
    setHomePageParameters(homePageParametersData.data);
    setState(ListToObject(homePageParametersData.data))
  }

  const onSubmit = () => {
    let token = localStorage.getItem('userToken')
    editHomePageParameters(ObjectToList(state), token).then(res => {
      if (res.isSuccess) {
        toast.success(res.message)
        fetchData()
      }
    })
  }

  const form = homePageParameters.map(el => {
    return {
      name: HOME_PARAMETERS.filter(item => item.id === el.id)[0].title,
      field: el.id,
      type: 'num'
    }
  })

  return (
    <div style={{marginTop: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <PageTitle style={{width: 'fit-content'}} title="تنظیمات سایت" />
      </div>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper style={{padding: 30, justifyContent: 'center'}} variant="outlined">
            <Form 
              columns={2}
              handleChange={handleChange}
              form={form}
              type={'edit'}
              data={state}
            />
            <Button
                variant="contained"
                onClick={onSubmit}
                color="primary"
                disableElevation
                style={{borderRadius: 5, height: 45, marginTop: 30}}
            >
                ثبت تغییرات
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Books;