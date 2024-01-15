/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Button, Avatar } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import {Delete as DeleteIcon, Edit as EditIcon, FilterList, Cancel, Visibility} from '@material-ui/icons'
import { capitalizeFirstLetter, capitalizeKeys, DISCOUNT_TYPES, getDateTime, jalaliToISO, PER_PAGE_TABLES, QUESTION_PROBLEM_REPORT_STATUS, removeKeys, TABLE_OPTIONS, TABLE_STYLE, toFA } from "../../utils/Utils";
import { addColleague, deleteBook, deleteColleague, editBook, editColleague, getBook, getColleague, getAllQuestionProblemReports, editQuestionProblemReport, getQuestionProblemReport } from "../../api/services/admin";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AddDialog } from './AddDialog'
import { toast } from "react-toastify";
import { BASE_URL } from "../../api";
import { TableCustomFooter } from "./TableCustomFooter";
import QuestionProblemReportShow from "./QuestionProblemReportShow";

const QuestionProblemReports = (props) => {

  const defaultFilters = {
    status: []
  }

  const [page, setPage] = useState(0);
  const [perPageTable, setPerPageTable] = useState(PER_PAGE_TABLES);
  const [count, setCount] = useState(0);
  const [colleagues, setColleagues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [state, setState] = React.useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
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
    let res = await getQuestionProblemReport(item.id, token)
    let data = {
      reportId: item.id,
      resultMessage: res.data.resultMessage,
      status: item.status,
      starBonus: item.starBonus,
      questionBonus: item.questionBonus,
      reportTag: item.reportTag
    }
    setState(data)
    setOpenDialog(true)
  };
  const onShowClick = async item => {
    let token = localStorage.getItem('userToken')
    let res = await getQuestionProblemReport(item.id, token)
    setSelectedReport(res.data)
    setOpenShow(true)
  };

  const transform = (data) => {
    return data.map((item, idx) => {
      let status = QUESTION_PROBLEM_REPORT_STATUS.filter(el => el.id === item.status)[0].title;
      let rowId = 1 + (page * perPageTable);
      return [
        toFA(idx+rowId),
        (item.reportTag || '---'),
        status,
        toFA(item.starBonus),
        item.reportId,
        toFA(item.userNationalCode),
        getDateTime(item.getReportTime),
        getDateTime(item.giveResultTime),
        <IconButton onClick={()=>onShowClick(item)}>
          <Visibility/>
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
    let questionProblemReports = await getAllQuestionProblemReports(filters.status, token, (page+1), perPageTable)
    console.error({questionProblemReports}, filters.status)
    let pagination = JSON.parse(questionProblemReports.headers.pagination)
    setCount(pagination.totalItems);
    setColleagues(questionProblemReports.data.data)
  }

  const onSubmit = () => {
    let token = localStorage.getItem('userToken')
    editQuestionProblemReport(state, token).then(res => {
      if (res.isSuccess) {
        setOpenDialog(false)
        toast.success(res.message)
        fetchData()
        setState({})
      }
    })
  }

  const getMuiTheme = () => createMuiTheme(TABLE_STYLE);
  
  const form = [
    {
      name: 'وضعیت گزارش',
      field: 'status',
      type: 'select',
      options: QUESTION_PROBLEM_REPORT_STATUS
    }, {
      name: 'متن نتیجه',
      field: 'resultMessage',
      type: 'text'
    }, {
      name: 'ستاره جایزه',
      field: 'starBonus',
      type: 'num'
    }, {
      name: 'میزان شارژ بعنوان جایزه',
      field: 'questionBonus',
      type: 'num'
    }, {
      name: 'برچسب گزارش',
      field: 'reportTag',
      type: 'text'
    }
  ]

  const filterForm = [
    {
      name: 'وضعیت',
      field: 'status',
      type: 'multi-select',
      options: QUESTION_PROBLEM_REPORT_STATUS
    }
  ]

  return (
    <div style={{marginTop: 10}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <PageTitle style={{width: 'fit-content'}} title="گزارش های خطای سوال" />
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
              title="گزارش های خطای سوال"
              data={transform(colleagues)}
              columns={["ردیف", "برچسب", "وضعیت", "ستاره", "کد گزارش", "کد ملی کاربر", "تاریخ ثبت گزارش", "تاریخ ثبت نتیجه", "مشاهده", "ویرایش"]}
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
      title={`رسیدگی به گزارش`}
      handleChange={handleChange}
      setOpenDialog={() => setOpenDialog(false)}
      onSubmit={onSubmit}
      form={form}
      type={'edit'}
      data={state}
    />
    <AddDialog
      openDialog={openFilter}
      columns={1}
      title="فیلتر"
      handleChange={filterHandleChange}
      setOpenDialog={() => setOpenFilter(false)}
      onSubmit={() => {
        fetchData()
        setOpenFilter(false)
      }}
      form={filterForm}
      type={'edit'}
      data={filters}
    />
    <QuestionProblemReportShow
      openDialog={openShow}
      setOpenDialog={() => setOpenShow(false)}
      selectedReport={selectedReport}
    />
    </div>
  );
};

export default QuestionProblemReports;