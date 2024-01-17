import React from "react";
import { CircularProgress, Grid, Button, Backdrop } from "@material-ui/core";
import {
  Description,
  FormatListBulleted,
  CloudUpload,
  Attachment,
} from "@material-ui/icons";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import PageTitle from "../../components/PageTitle/PageTitle";
import AssignModal from "../../features/Modals/AssignModal";

import { books } from "../../api/services/tags";
import {
  subTeachers,
  getTeacher,
  uploadUsersExcel,
} from "../../api/services/user";
import { freeTeachersSc, assignTeacherSc } from "../../api/services/school";

import { toFA } from "../../utils/Utils";

import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";
import UncheckRadioIcon from "../../images/icons/uncheck-radio-icon.svg";

import MySample from "./excel-samples/TeacherSample.xlsx";
import GuideFile from "./excel-samples/TeachersUploadGuide.pdf";

const styles = {
  trItem: {
    backgroundColor: "#f4faff",
    color: "#3d82a4",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px",
  },
  thItem: {
    color: "#3d82a4",
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
      books: {},
      fields: [],
      fieldId: "d",
      bookId: "d",
      level: "Hard",
      userExams: [],
      selectedList: [],
      isLoading: true,
      subTeachers: [],
      username: "",
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("userToken");

    let isStudent = localStorage.getItem("userType") === "Student";
    console.error("isStudent", isStudent);
    this.setState({ isStudent });

    books(token).then(res => {
      console.error(res);
      res.data.map(el => {
        return this.setState({
          books: {
            ...this.state.books,
            [`id_${el.id}`]: el.name,
          },
        });
      });
      this.getFreeTeachers();
    });
  }
  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  getFreeTeachers = () => {
    let token = localStorage.getItem("userToken");
    freeTeachersSc(token).then(res => {
      console.error(res);
      this.getSubTeachers();
      this.setState({
        freeTeachersSc: res.data,
        isLoading: false,
        selectedOpacity: res.data[0],
      });
    });
  };

  getSubTeachers = () => {
    let token = localStorage.getItem("userToken");
    subTeachers(token).then(res => {
      console.error("res_", res);
      this.setState({ subTeachers: res.data });
    });
  };

  assignOpacity = () => {
    let token = localStorage.getItem("userToken");
    let data = {
      userId: this.state.userSearched.id,
      bookId: this.state.selectedOpacity.bookId,
      id: this.state.selectedOpacity.id,
    };
    console.error("eeeeeeeeee;;", data);
    assignTeacherSc(data, token).then(res => {
      console.error(";;;;;;", res);
      this.setState({ open: false, isLoading: true });
      this.getFreeTeachers();
    });
  };

  renderOpacities = () => {
    return this.state.freeTeachersSc.map(item => {
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
            {this.state.books[`id_${item.bookId}`]}
          </div>
          <div style={{ ...styles.trItem, flex: 1 }}>----</div>
        </div>
      );
    });
  };

  renderSubTeachers = () => {
    return this.state.subTeachers.map(item => {
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
          <div style={{ ...styles.trItem, flex: 1 }}>{item.bookName}</div>
        </div>
      );
    });
  };

  searchStudent = username => {
    let token = localStorage.getItem("userToken");
    let query = `username=${username}`;
    getTeacher(token, query).then(res => {
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
    uploadUsersExcel(token, "3", this.state.file, `${this.state.rowsCount}`)
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
        <PageTitle title="مدیریت دبیرها" />
        {this.state.isLoading ? (
          <Backdrop
            style={{ zIndex: 1000000, color: "#FFD700" }}
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
                      <div style={{ ...styles.thItem, flex: 1 }}>کتاب</div>
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
                      <div style={{ ...styles.thItem, flex: 1 }}>کتاب</div>
                    </div>
                    <div
                      style={{ height: 300, overflow: "scroll", width: "100%" }}
                    >
                      {this.renderSubTeachers()}
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
              <a href={MySample} download="TeacherSample.xlsx">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Description />}
                  style={{
                    borderRadius: 50,
                    height: 40,
                    marginLeft: 10,
                    boxShadow: "none",
                  }}
                >
                  دانلود نمونه اکسل
                </Button>
              </a>
              <a href={GuideFile} download="TeachersUploadGuide.pdf">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FormatListBulleted />}
                  style={{ borderRadius: 50, height: 40, boxShadow: "none" }}
                >
                  دانلود راهنمای دروس
                </Button>
              </a>
            </div>
            <div style={{ width: "100%" }}>
              <PageTitle
                title="لطفا قبل از بارگذاری اکسل به نکات زیر توجه فرمایید :"
                size="h2"
                color="#3d82a4"
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
        {this.state.open && (
          <AssignModal
            open={this.state.open}
            onClose={this.handleClose}
            userSearched={this.state.userSearched}
            onAssign={this.assignOpacity}
            onSearch={username => this.searchStudent(username)}
          />
          //   <Dialog
          //     maxWidth="xs"
          //     onBackdropClick={this.handleClose}
          //     onClose={this.handleClose}
          //     aria-labelledby="simple-dialog-title"
          //     open={this.state.open}
          //   >
          //     <Box
          //       display="grid"
          //       gridTemplateRows="auto 1fr"
          //       p={2}
          //       width={400}
          //       height={400}
          //       style={{
          //         background: "rgb(61 130 164 / 30%)",
          //       }}
          //     >
          //       <Box display="flex">
          //         <NormalInput
          //           placeholder="نام کاربری را وارد کنید"
          //           onChange={e => this.changeInput("username", e)}
          //           style={{ flexGrow: 1, marginLeft: 10 }}
          //         />
          //         <Button
          //           disabled={Boolean(this.state.username.length < 10)}
          //           onClick={this.searchStudent}
          //           variant="contained"
          //           color="primary"
          //           className={classes.createAccountButton}
          //         >
          //           جست و جو
          //         </Button>
          //       </Box>
          //       {this.state.userSearched && (
          //         <>
          //           <Grid
          //             item
          //             sm={12}
          //             spacing={1}
          //             justify="space-between"
          //             alignItems="center"
          //             className="inputContainer"
          //             style={{
          //               padding: "10px 5px",
          //               width: "calc(100% - 10px)",
          //               marginTop: 5,
          //               marginRight: 5,
          //             }}
          //           >
          //             <Grid item style={{ marginRight: 20 }}>
          //               <SubdirectoryArrowLeft style={{ fill: "#fe5f55" }} />
          //             </Grid>
          //             <Grid item style={{ padding: 0, flex: 1 }}>
          //               <div
          //                 style={{
          //                   color: "#3d82a4",
          //                   fontWeight: "bold",
          //                   fontSize: 18,
          //                   padding: "0 17px",
          //                   textAlign: "center",
          //                 }}
          //               >
          //                 {this.state.userSearched.fullName}
          //               </div>
          //             </Grid>
          //           </Grid>
          //           <Grid item sm={12} spacing={1} alignItems="center">
          //             <Button
          //               disabled={Boolean(this.state.username.length < 10)}
          //               onClick={this.assignOpacity}
          //               fullWidth
          //               variant="contained"
          //               color="primary"
          //               size="large"
          //               className={classes.createAccountButton}
          //               style={{
          //                 fontSize: "1rem",
          //                 textAlign: "center",
          //                 background: "#fe5f55",
          //                 fontFamily: "Dana",
          //               }}
          //             >
          //               ثبت نهایی
          //             </Button>
          //           </Grid>
          //         </>
          //       )}
          //     </Box>
          //   </Dialog>
        )}
      </>
    );
  }
}

export default CreateTest;
