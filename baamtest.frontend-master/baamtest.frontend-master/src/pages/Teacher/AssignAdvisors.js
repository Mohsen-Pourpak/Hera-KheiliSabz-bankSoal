import React from "react";
import { CircularProgress, Grid, Backdrop, Button } from "@material-ui/core";
import { Description, CloudUpload, Attachment } from "@material-ui/icons";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import PageTitle from "../../components/PageTitle/PageTitle";

import { grades } from "../../api/services/tags";
import {
  subAdvisors,
  getAdvisor,
  uploadUsersExcel,
} from "../../api/services/user";
import { freeAdvisorsSc, assignAdvisorSc } from "../../api/services/school";

import { toFA } from "../../utils/Utils";

import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";
import UncheckRadioIcon from "../../images/icons/uncheck-radio-icon.svg";

import MySample from "./excel-samples/AdvisorSample.xlsx";
import AssignModal from "../../features/Modals/AssignModal";

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
    color: "#000",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px 5px",
  },
};

class CreateTest extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: {},
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      userExams: [],
      selectedList: [],
      isLoading: true,
      subAdvisors: [],
      username: "",
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("userToken");

    let isStudent = localStorage.getItem("userType") === "Student";
    console.error("isStudent", isStudent);
    this.setState({ isStudent });

    grades(token).then(res => {
      console.error(res);
      res.data.map(el => {
        return this.setState({
          grades: {
            ...this.state.grades,
            [`id_${el.id}`]: el.title,
          },
        });
      });
      this.getFreeAdvisor();
    });
  }
  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  getFreeAdvisor = () => {
    let token = localStorage.getItem("userToken");
    freeAdvisorsSc(token).then(res => {
      console.error(res);
      this.getSubAdvisors();
      this.setState({
        freeAdvisorsSc: res.data,
        isLoading: false,
        selectedOpacity: res.data[0],
      });
    });
  };

  getSubAdvisors = () => {
    let token = localStorage.getItem("userToken");
    subAdvisors(token).then(res => {
      console.error("res_", res);
      this.setState({ subAdvisors: res.data });
    });
  };

  assignOpacity = () => {
    let token = localStorage.getItem("userToken");
    let data = {
      userId: this.state.userSearched.id,
      gradeId: this.state.selectedOpacity.gradeId,
      id: this.state.selectedOpacity.id,
    };
    assignAdvisorSc(data, token).then(res => {
      console.error(res);
      this.setState({ open: false, isLoading: true });
      this.getFreeAdvisor();
    });
  };

  renderOpacities = () => {
    return this.state.freeAdvisorsSc.map(item => {
      return (
        <div
          onClick={() => this.setState({ selectedOpacity: item })}
          style={{
            display: "flex",
            width: "100%",
            cursor: "pointer",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ ...styles.trItem, flex: 0.5 }}>
            <img
              src={
                this.state.selectedOpacity === item
                  ? CheckRadioIcon
                  : UncheckRadioIcon
              }
              style={{ height: 20, marginRight: 10 }}
              alt=""
            />
          </div>
          <div style={{ ...styles.trItem, flex: 1 }}>
            {toFA(item.id.split("-")[0])}
          </div>
          <div style={{ ...styles.trItem, flex: 1 }}>
            {this.state.grades[`id_${item.gradeId}`]}
          </div>
          <div style={{ ...styles.trItem, flex: 1 }}>----</div>
        </div>
      );
    });
  };

  renderSubAdvisors = () => {
    return this.state.subAdvisors.map(item => {
      return (
        <div
          onClick={() => this.setState({ selectedOpacity: item })}
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ ...styles.trItem, flex: 1 }}>{item.id}</div>
          <div style={{ ...styles.trItem, flex: 1 }}>
            {item.subUserFullName}
          </div>
          <div style={{ ...styles.trItem, flex: 1 }}>
            {item.headUserFullName}
          </div>
          <div style={{ ...styles.trItem, flex: 1 }}>{item.gradeTitle}</div>
        </div>
      );
    });
  };

  searchStudent = username => {
    let token = localStorage.getItem("userToken");
    let query = `username=${username}`;
    getAdvisor(token, query).then(res => {
      if (res.data) {
        this.setState({ userSearched: res.data });
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onUploadClick = () => {
    this.setState({ progress: true });
    let token = localStorage.getItem("userToken");
    uploadUsersExcel(token, "2", this.state.file, `${this.state.rowsCount}`)
      .then(res => {
        console.error({ res });
        this.setState({ progress: false });
        if (res.isSuccess) {
          toast.success(res.message);
        }
      })
      .catch(() => this.setState({ progress: false }));
  };

  onFileChange = e => {
    e.preventDefault();

    var files = e.target.files,
      f = files[0];
    console.error({ f });
    if (f.size / 1000 > 3000) {
      toast.error("حداکثر حجم مجاز برای فایل اکسل ۳ مگابایت می باشد");
    } else {
      var reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        var data = e.target.result;
        let table = XLSX.read(data, { type: "binary" });
        const sheet = table.Sheets[table.SheetNames[0]];
        const range = XLSX.utils.decode_range(sheet["!ref"]);
        const totalRows = range.e.r - range.s.r + 1;
        console.log({ totalRows });
        that.setState({ file: f, rowsCount: totalRows });
      };
      reader.readAsBinaryString(f);
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        <PageTitle title="مدیریت مشاورها" />
        {this.state.progress && (
          <Backdrop
            style={{ zIndex: 1000000, color: "#228b22" }}
            open={this.state.progress}
            onClick={() => console.log("clicked")}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {this.state.isLoading ? (
          <Backdrop
            style={{ zIndex: 1000000, color: "#228b22" }}
            open={this.state.isLoading}
            onClick={() => console.log("clicked")}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
            <Grid
              direction="row"
              alignItems="flex-start"
              spacing={2}
              justify="flex-start"
              container
              style={{
                padding: 10,
                backgroundColor: "rgb(255 255 255 / 40%)",
                borderRadius: 20,
              }}
            >
              <Grid direction="column" container item xs={6}>
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
                      <div style={{ ...styles.thItem, flex: 0.5 }}></div>
                      <div style={{ ...styles.thItem, flex: 1 }}>شناسه</div>
                      <div style={{ ...styles.thItem, flex: 1 }}>پایه</div>
                      <div style={{ ...styles.thItem, flex: 1 }}>توضیحات</div>
                    </div>
                    <div
                      style={{ height: 300, overflow: "scroll", width: "100%" }}
                    >
                      {this.renderOpacities()}
                    </div>
                  </div>
                </Grid>
                <Grid
                  direction="row"
                  justify="center"
                  style={{ marginTop: 30 }}
                  container
                  spacing={2}
                >
                  <Grid item xs={2}>
                    <Button
                      onClick={() => this.setState({ open: true })}
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
                      ثبت
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid direction="column" container item xs={6}>
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
                      <div style={{ ...styles.thItem, flex: 1 }}>شناسه</div>
                      <div style={{ ...styles.thItem, flex: 1 }}>
                        نام و نام خانوادگی
                      </div>
                      <div style={{ ...styles.thItem, flex: 1 }}>نام مدرسه</div>
                      <div style={{ ...styles.thItem, flex: 1 }}>پایه</div>
                    </div>
                    <div
                      style={{ height: 300, overflow: "scroll", width: "100%" }}
                    >
                      {this.renderSubAdvisors()}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <PageTitle
                style={{ marginTop: 10 }}
                size="h1"
                title="بارگذاری اکسل"
              />
              <div style={{ flex: 1 }} />
              <input
                accept=".xlsx, .xls"
                className={classes.input}
                id="contained-button-file"
                hidden
                multiple={false}
                onChange={this.onFileChange}
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="secondary"
                  component="span"
                  startIcon={<Attachment />}
                  style={{
                    borderRadius: 50,
                    height: 40,
                    marginLeft: 10,
                    background: "#4caf50",
                    boxShadow: "none",
                  }}
                  classes={{ root: classes.cropButton }}
                >
                  انتخاب فایل
                </Button>
              </label>
              {this.state.file && this.state.rowsCount && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onUploadClick}
                  startIcon={<CloudUpload />}
                  style={{
                    borderRadius: 50,
                    height: 40,
                    marginLeft: 10,
                    boxShadow: "none",
                  }}
                >
                  آپلود اکسل
                </Button>
              )}
              <a href={MySample} download="AdvisorSample.xlsx">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Description />}
                  style={{ borderRadius: 50, height: 40, boxShadow: "none" }}
                >
                  دانلود نمونه اکسل
                </Button>
              </a>
            </div>
            <div style={{ width: "100%" }}>
              <PageTitle
                title="لطفا قبل از بارگذاری اکسل به نکات زیر توجه فرمایید :"
                size="h2"
                color="#FF0000"
              />
            </div>
            <div style={{ fontSize: "1rem", padding: "0 15px" }}>
              ۱- مقادیر ستون جنسیت باید یکی از مقادیر زیر باشد : مرد ، زن
              <br />
              ۲- نوع داده ای ستون های کد ملی، شماره همراه و رمز باید از نوع Text
              باشد
              <br />
              ۳- مقادیر ستون رمز باید مطابق قوانین رمز سامانه بام تست باشد
              (حداقل ۶ کاراکتر شامل حرف و عدد الزامی است)
              <br />
              ۴- اگر کاربر ثبت شده در فایل وجود داشته باشد صرفا به زیرمجموعه شما
              اضافه میشود در غیر این صورت بر اساس اطلاعات وارد شده شما اکانت
              برای ایشان ایجاد و به زیر گروه شما اضافه می شود.
            </div>
          </Grid>
        )}
        <AssignModal
          open={this.state.open}
          onClose={this.handleClose}
          userSearched={this.state.userSearched}
          onAssign={this.assignOpacity}
          onSearch={username => this.searchStudent(username)}
        />
      </>
    );
  }
}

export default CreateTest;
