import React from "react";
import {
  CircularProgress,
  Grid,
  Button,
  Select,
  Input,
  Backdrop,
  Tooltip,
  MenuItem,
  IconButton,
  Dialog,
} from "@material-ui/core";
import {
  Description,
  Print,
  Edit,
  PlayArrow,
  SlowMotionVideo,
  Assignment,
  InsertDriveFile,
  Share,
  ClearRounded,
  SearchRounded,
} from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import { toast } from "react-toastify";

import "react-modern-calendar-datepicker/lib/DatePicker.css";

import {
  getAllFilter,
  getExamPercentResult,
  getHaveReportCard,
} from "../../api/services/exam";
import { getHeads } from "../../api/services/user";
import { getDateTime, toFA, toEn } from "../../utils/Utils";
import { shareTest } from "../../api/services/shareExam";

import PageTitle from "../../components/PageTitle/PageTitle";
import Pagination from "../../components/Form/Pagination";
import TextField from "../../components/Form/TextField";

const ActionButton = ({ Icon, onClick, title }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        color="primary"
        aria-controls="profile-menu"
        onClick={onClick}
      >
        <Icon style={{ fill: "#555", fontSize: "80%" }} />
      </IconButton>
    </Tooltip>
  );
};

const styles = {
  trItem: {
    backgroundColor: "#f4faff",
    color: "#000",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px",
  },
  thItem: {
    color: "#228B22",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px 5px",
  },
};

class ManagementTest extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      heads: [],
      userExams: [],
      selectedList: [],
      progress: true,
      pageCount: 1,
      page: 1,
      headId: "none",
      nameFilter: "",
      startTime: null,
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("userToken");
    let isStudent = localStorage.getItem("userType") === "Student";
    console.error("isStudent", isStudent);
    this.setState({ isStudent });
    getHeads(token).then(res => {
      if (res.isSuccess) {
        console.error({ res });
        let heads = res.data
          .filter((x, i, a) => a.indexOf(x) === i)
          .map(el => {
            return { id: el.id, title: el.fullName };
          });
        this.setState({ heads });
      }
    });
    this.fetchData();
  }

  fetchData = () => {
    let token = localStorage.getItem("userToken");
    // let req = {
    //   examName: this.state.nameFilter,
    //   fromDate: this.state.startTime
    //     ? toEn(this.state.startTime._d.toISOString()).slice(0, 11) + "00:00:00" + toEn(this.state.startTime._d.toISOString()).slice(19)
    //     : "",
    //   toDate: this.state.startTime
    //     ? toEn(this.state.startTime._d.toISOString()).slice(0, 11) + "23:59:59" + toEn(this.state.startTime._d.toISOString()).slice(19)
    //     : "",
    // };
    let req = {
      examName: this.state.nameFilter,
      fromDate: this.state.startTime
        ? toEn(this.state.startTime._d.toISOString())
        : "",
      toDate: this.state.startTime
        ? toEn(this.state.startTime.format("YYYY-MM-DDT23:59:59"))
        : "",
    };
    getAllFilter(req, token, this.state.headId, this.state.page).then(res_ => {
      let res = res_.data;
      let pagination = JSON.parse(res_.headers.pagination);

      let pageCount = pagination.totalPages;
      this.setState({ userExams: res.data, progress: false, pageCount });
    });
  };

  handleChangePage = (_r, page) => {
    this.setState({ page }, () => this.fetchData());
  };

  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState(
      {
        [field]: value,
      },
      () => this.fetchData(),
    );
  };

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>آزمون های {item.title}</MenuItem>;
    });
  };

  renderLevels(title, value, color) {
    const { level } = this.state;
    let isActive = level === value;
    return (
      <div
        style={{
          border: `1px solid ${color}`,
          backgroundColor: isActive ? color : "#fff",
          cursor: "pointer",
          borderRadius: 30,
          marginLeft: 20,
          padding: "5px 15px",
          textAlign: "center",
        }}
        onClick={() => this.setState({ level: value })}
      >
        <div
          style={{
            color: isActive ? "#fff" : color,
            fontSize: 13,
            textAlign: "center",
          }}
        >
          {title}
        </div>
      </div>
    );
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClosePercent = () => {
    this.setState({ openPercent: false });
  };

  shareExam = id => {
    let token = localStorage.getItem("userToken");
    shareTest(id, token).then(res => {
      if (res.isSuccess) {
        toast.success(res.message);
        this.handleClose();
      }
    });
  };

  renderExams = () => {
    return this.state.userExams.length === 0 ? (
      <div
        style={{
          width: "100%",
          height: 200,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          fontSize: "2rem",
          opacity: 0.3,
        }}
      >
        آزمونی وجود ندارد
      </div>
    ) : (
      this.state.userExams.map(item => {
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ ...styles.trItem, width: 60 }}>{toFA(item.id)}</div>
            <div
              style={{
                ...styles.trItem,
                textAlign: "right !important",
                flex: 1,
              }}
            >
              {item.title}
            </div>
            <div style={{ ...styles.trItem, width: 60 }}>
              {toFA(item.numberOfQuestions)}
            </div>
            <div style={{ ...styles.trItem, width: 150 }}>
              {getDateTime(item.creationTime)}
            </div>
            <div style={{ ...styles.trItem, width: 150 }}>{item.ownerName}</div>
            <div style={{ ...styles.trItem, width: 150 }}>
              {getDateTime(item.startTime)}
            </div>
            <div
              style={{
                backgroundColor: "#f4faff",
                justifyContent: "space-between",
                color: "#3d82a4",
                display: "flex",
                fontSize: 15,
                alignItems: "center",
                textAlign: "center",
                margin: "0 2.5px",
                padding: "0 20px",
                width: 310,
              }}
            >
              <ActionButton
                Icon={Edit}
                onClick={() => {
                  this.props.history.push({
                    pathname: `/dashboard/test/edit/${item.id}`,
                  });
                }}
                title="ویرایش"
              />
              {/* آیکون آزمون اشتراکی  */}
              {/* <ActionButton
                Icon={Share}
                onClick={() => {
                  this.setState({ open: true, selected: item });
                }}
                title="اشتراک"
              /> */}
              <ActionButton
                Icon={Print}
                onClick={() => {
                  this.props.history.push({
                    pathname: `/dashboard/test/print/${item.id}`,
                  });
                }}
                title="پرینت"
              />
              <ActionButton
                Icon={SlowMotionVideo}
                onClick={() => {
                  this.props.history.push({
                    pathname: `/dashboard/test/edit-and-run/${item.id}`,
                  });
                }}
                title="اجرا"
              />
              {/* آیکون پاسخ برگ  */}
              {/* <ActionButton
                Icon={InsertDriveFile}
                onClick={() => {
                  this.props.history.push({
                    pathname: `/dashboard/test/test-answer-sheet/${item.id}`,
                  });
                }}
                title="پاسخ برگ"
              /> */}
              <ActionButton
                Icon={Description}
                onClick={async () => {
                  let token = localStorage.getItem("userToken");
                  let haveReportCard = await getHaveReportCard(item.id, token);
                  if (haveReportCard.data) {
                    this.props.history.push({
                      pathname: `/dashboard/test/get-report-card/${item.id}`,
                    });
                  } else {
                    this.props.history.push({
                      pathname: `/dashboard/test/create-report-card/${item.id}`,
                    });
                  }
                }}
                title="کارنامه"
              />
            </div>
          </div>
        );
      })
    );
  };

  renderStudentExams = () => {
    return this.state.userExams.length === 0 ? (
      <div
        style={{
          width: "100%",
          height: 200,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          fontSize: "2rem",
          opacity: 0.3,
        }}
      >
        آزمونی وجود ندارد
      </div>
    ) : (
      this.state.userExams.map(item => {
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ ...styles.trItem, width: 60 }}>{toFA(item.id)}</div>
            <div
              style={{
                ...styles.trItem,
                textAlign: "right !important",
                flex: 1,
              }}
            >
              {item.title}
            </div>
            <div style={{ ...styles.trItem, width: 60 }}>
              {toFA(item.numberOfQuestions)}
            </div>
            <div style={{ ...styles.trItem, width: 180 }}>
              {getDateTime(item.creationTime)}
            </div>
            <div style={{ ...styles.trItem, width: 180 }}>{item.ownerName}</div>
            <div style={{ ...styles.trItem, width: 180 }}>
              {getDateTime(item.startTime)}
            </div>
            <div
              style={{
                backgroundColor: "#f4faff",
                justifyContent: "center",
                color: "#3d82a4",
                display: "flex",
                fontSize: 15,
                alignItems: "center",
                textAlign: "center",
                margin: "0 2.5px",
                padding: "0 20px",
                width: 300,
              }}
            >
              {!item.hasAlreadyTaken ? (
                <ActionButton
                  Icon={PlayArrow}
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/dashboard/test/run/${item.id}`,
                    });
                  }}
                  title="اجرا"
                />
              ) : (
                <>
                  <ActionButton
                    Icon={Description}
                    onClick={async () => {
                      let token = localStorage.getItem("userToken");
                      let reportCard = await getExamPercentResult(
                        item.id,
                        token,
                      );
                      let data = reportCard.data;
                      this.setState({
                        selectedExam: { ...item, ...data },
                        openPercent: true,
                      });
                    }}
                    title="کارنامه"
                  />
                  <ActionButton
                    Icon={Assignment}
                    onClick={() => {
                      this.props.history.push({
                        pathname: `/dashboard/test/result/${item.id}`,
                      });
                    }}
                    title="نتیحه آزمون"
                  />
                </>
              )}
            </div>
          </div>
        );
      })
    );
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.setState({ page: 1 }, () => this.fetchData());
    }
  };

  render() {
    const classes = this.props.classes;
    const { isStudent, selectedExam } = this.state;
    let actionThStyle = isStudent ? { width: 300 } : { width: 310 };
    return (
      <>
        <Backdrop
          style={{ zIndex: 1000000, color: "#FFD700" }}
          open={this.state.progress}
          onClick={() => console.log("clicked")}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <PageTitle style={{ width: "fit-content" }} title="مدیریت آزمون" />
        </div>
        {!this.state.progress && (
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
            <Grid
              direction="row"
              alignItems="flex-start"
              spacing={2}
              justify="flex-start"
              container
              style={{
                padding: 10,
                backgroundColor: "#E0DBC0",
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  width: 1000,
                  marginBottom: -20,
                  display: "flex",
                  gap: "12px",
                }}
              >
                <Grid
                  item
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: 0,
                    paddingRight: 10,
                    margin: "0px !important",
                    width: "100%",
                  }}
                >
                  <Grid
                    item
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      width: "82.5%",
                      marginRight: 10,
                    }}
                  >
                    <Select
                      id="demo-simple-select"
                      value={this.state.headId}
                      style={{ width: "100%" }}
                      input={<Input disableUnderline />}
                      onChange={e => this.changeInput("headId", e)}
                    >
                      <MenuItem value="none">آزمون های من</MenuItem>
                      {this.renderMenuItem(this.state.heads)}
                    </Select>
                  </Grid>
                </Grid>

                {/* Filter by name */}
                <Grid
                  item
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: 0,
                    paddingRight: 10,
                    margin: "0px !important",
                    width: "100%",
                  }}
                >
                  <Grid
                    item
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      width: "82.5%",
                      marginRight: 10,
                    }}
                  >
                    <TextField
                      placeholder="فیلتر با نام آزمون"
                      value={this.state.nameFilter}
                      style={{ height: 40, background: "transparent" }}
                      onChange={e => {
                        this.setState({ nameFilter: e.target.value });
                      }}
                      onKeyPress={e => {
                        this.handleKeyPress(e);
                      }}
                    />
                  </Grid>
                  <IconButton
                    aria-label="filter"
                    size="small"
                    onClick={() => {
                      this.setState({ page: 1 }, () => this.fetchData());
                    }}
                  >
                    <SearchRounded color="muted" size="small" />
                  </IconButton>
                  <IconButton
                    aria-label="clear"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      this.setState({ nameFilter: "", page: 1 }, () =>
                        this.fetchData(),
                      );
                    }}
                  >
                    <ClearRounded color="warning" size="small" />
                  </IconButton>
                </Grid>
                {/* Date picker */}
                <Grid
                  item
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: 0,
                    paddingRight: 10,
                    margin: "0px !important",
                    width: "100%",
                  }}
                >
                  <Grid
                    item
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      width: "82.5%",
                      marginRight: 10,
                    }}
                  >
                    <div
                      style={{
                        ...styles.randomFilter,
                        padding: 5,
                        marginRight: 10,
                        marginTop: 4,
                      }}
                    >
                      <DatePicker
                        placeholder="تاریخ اجرای پیش رو"
                        okLabel="تأیید"
                        cancelLabel="لغو"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        hideTabs={true}
                        mode="24h"
                        ampm={false}
                        labelFunc={date =>
                          date ? date.format("jYYYY/jMM/jDD") : ""
                        }
                        value={this.state.startTime}
                        onChange={e => {
                          this.setState({ startTime: e, page: 1 }, () =>
                            this.fetchData(),
                          );
                        }}
                      />
                    </div>
                  </Grid>
                  <IconButton
                    aria-label="clear"
                    size="small"
                    onClick={() => {
                      this.setState({ startTime: null, page: 1 }, () =>
                        this.fetchData(),
                      );
                    }}
                  >
                    <ClearRounded color="warning" size="small" />
                  </IconButton>
                </Grid>
                {/* --------------- */}
              </div>
              <Grid direction="column" container item xs={12}>
                <Grid
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{ padding: "7.5px", margin: 0, width: "100%" }}
                >
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ ...styles.thItem, width: 60 }}>شناسه</div>
                      <div
                        style={{
                          ...styles.thItem,
                          textAlign: "right !important",
                          flex: 1,
                        }}
                      >
                        نام
                      </div>
                      <div style={{ ...styles.thItem, width: 60 }}>سوال</div>
                      <div
                        style={{
                          ...styles.thItem,
                          width: isStudent ? 180 : 150,
                        }}
                      >
                        ساخت
                      </div>
                      <div
                        style={{
                          ...styles.thItem,
                          width: isStudent ? 180 : 150,
                        }}
                      >
                        سازنده
                      </div>
                      <div
                        style={{
                          ...styles.thItem,
                          width: isStudent ? 180 : 150,
                        }}
                      >
                        اجرای پیش رو
                      </div>
                      <div style={{ ...styles.thItem, ...actionThStyle }}>
                        عملیات
                      </div>
                    </div>
                    {isStudent ? this.renderStudentExams() : this.renderExams()}
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
        )}
        {/* عملکرد آزمون اشتراکی  */}
        {/* {this.state.open && (
          <Dialog
            maxWidth="xs"
            onBackdropClick={this.handleClose}
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title"
            open={this.state.open}
          >
            <div
              style={{
                background: "rgb(61 130 164 / 20%)",
                flexDirection: "column",
                padding: "0px 30px",
                width: 400,
                height: 200,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Grid direction="column" container spacing={3}>
                <Grid item sm={12} spacing={1} alignItems="center">
                  <Button
                    onClick={() => this.shareExam(this.state.selected.id)}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      height: 55,
                      fontFamily: "Dana",
                    }}
                  >
                    اشتراک در آزمون اشتراکی
                  </Button>
                </Grid>
                <Grid item sm={12} spacing={1} alignItems="center">
                  <Button
                    onClick={() => {
                      this.props.history.push({
                        pathname: `/dashboard/test/add-to-group/${this.state.selected.id}`,
                      });
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      height: 55,
                      fontFamily: "Dana",
                    }}
                  >
                    اشتراک در کلاس ها
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Dialog>
        )} */}

        {this.state.openPercent && (
          <Dialog
            maxWidth="md"
            style={{ overflowX: "hidden" }}
            onBackdropClick={this.handleClosePercent}
            onClose={this.handleClosePercent}
            aria-labelledby="simple-dialog-title"
            open={this.state.openPercent}
          >
            <div
              id="invoice"
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                padding: 30,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "100%",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px dashed #888",
                  paddingBottom: 20,
                  marginBottom: 30,
                }}
              >
                <div style={{ marginLeft: 200 }}>
                  <div style={{ fontSize: 30, fontWeight: "bold" }}>
                    کارنامه آزمون
                  </div>
                  <div style={{ fontSize: 20 }}>{selectedExam.title}</div>
                </div>
                <div>
                  <div>تاریخ آزمون: {getDateTime(selectedExam.startTime)}</div>
                  <div>
                    تعداد سوالات: {toFA(selectedExam.numberOfQuestions)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  alignItems: "center",
                  display: "flex",
                  background: "#eee",
                  height: 50,
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <div style={{ fontSize: 16, flex: 8, textAlign: "center" }}>
                  درس
                </div>
                <div style={{ fontSize: 16, flex: 1, textAlign: "center" }}>
                  تعداد
                </div>
                <div style={{ fontSize: 16, flex: 3, textAlign: "center" }}>
                  درصد
                </div>
                <div style={{ fontSize: 16, flex: 6, textAlign: "center" }}>
                  درصد بدون نمره منفی
                </div>
              </div>
              <div
                style={{
                  width: "calc(100% + 10px)",
                  marginLeft: -10,
                  overflow: "scroll",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    alignItems: "center",
                    display: "flex",
                    padding: "10px 0",
                    color: "#3d82a4",
                    background: "#f4faff",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div style={{ fontSize: 16, flex: 8, textAlign: "center" }}>
                    کل
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      flex: 1,
                      textAlign: "center",
                      direction: "ltr",
                    }}
                  >
                    {toFA(selectedExam.count)}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      flex: 3,
                      textAlign: "center",
                      direction: "ltr",
                    }}
                  >
                    {toFA(selectedExam.totalPercent)}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      flex: 6,
                      textAlign: "center",
                      direction: "ltr",
                    }}
                  >
                    {toFA(selectedExam.totalPercentNoNegativePoint)}
                  </div>
                </div>
                {selectedExam.lessonPercents.map((item, idx) => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        alignItems: "center",
                        display: "flex",
                        background: idx % 2 !== 0 ? "#f8f8f8" : "#fff",
                        padding: "10px 0",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{ fontSize: 16, flex: 8, textAlign: "center" }}
                      >
                        {item.lessonTitle}
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          flex: 1,
                          textAlign: "center",
                          direction: "ltr",
                        }}
                      >
                        {toFA(item.count)}
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          flex: 3,
                          textAlign: "center",
                          direction: "ltr",
                        }}
                      >
                        {toFA(item.percent)}
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          flex: 6,
                          textAlign: "center",
                          direction: "ltr",
                        }}
                      >
                        {toFA(item.percentNoNegativePoint)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <Grid
                direction="row"
                justify="center"
                style={{ marginTop: 10, margin: 0, marginBottom: 20 }}
                container
              >
                <Grid item xs={2}>
                  <Button
                    onClick={() => {
                      var winPrint = window.open("", "");
                      var element = document.getElementById("invoice")
                        .innerHTML;
                      winPrint.document
                        .write(`<html><head><title></title></head><body><style>
                                    * {
                                        font-family: 'Dana' !important;
                                        margin: 0;
                                        direction: rtl;
                                    }
                                    
                                    @media print {
                                        @page { padding: 2cm; }
                                        
                                    }
                                    </style>${element}</body></html>`);
                      winPrint.document.close();
                      winPrint.focus();
                      winPrint.print();
                      winPrint.close();
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      fontFamily: "Dana",
                    }}
                  >
                    پرینت
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Dialog>
        )}
      </>
    );
  }
}

export default ManagementTest;
