import React from "react";
import {
  CircularProgress,
  Grid,
  Backdrop,
  Button,
  Dialog,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { buyShared, getAllShared } from "../../api/services/shareExam";
import Pagination from "../../components/Form/Pagination";
import { getLevelDisplay, PER_PAGE_QUESTIONS, toFA } from "../../utils/Utils";
import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";
import UncheckRadioIcon from "../../images/icons/uncheck-radio-icon.svg";
import { toast } from "react-toastify";
import TextField from "../../components/Form/TextField";

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

class SharedExamBuy extends React.Component {
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
      discount: "",
      pageCount: 1,
      page: 1,
    };
  }
  componentDidMount() {
    let isStudent = localStorage.getItem("userType") === "Student";
    console.error("isStudent", isStudent);
    this.setState({ isStudent });
    this.fetchData();
  }

  fetchData = () => {
    let token = localStorage.getItem("userToken");
    getAllShared(token, this.state.page).then(res_ => {
      let res = res_.data;
      let pagination = JSON.parse(res_.headers.pagination);
      let pageCount = pagination.totalPages;
      this.setState({ exams: res.data, isLoading: false, pageCount });
    });
  };

  handleChangePage = (_r, page) => {
    this.setState({ page }, () => this.fetchData());
  };

  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  renderExams = () => {
    return this.state.exams.length === 0 ? (
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
        تراکنشی وجود ندارد
      </div>
    ) : (
      this.state.exams.map((item, idx) => {
        let rowId = 1 + (this.state.page - 1) * PER_PAGE_QUESTIONS;
        return (
          <div
            onClick={() => this.setState({ selectedExam: item })}
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              cursor: "pointer",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ ...styles.trItem, width: 60 }}>
              <img
                src={
                  this.state.selectedExam === item
                    ? CheckRadioIcon
                    : UncheckRadioIcon
                }
                style={{ height: 20 }}
                alt=""
              />
            </div>
            <div style={{ ...styles.trItem, width: 60 }}>
              {toFA(idx + rowId)}
            </div>
            <div style={{ ...styles.trItem, flex: 1 }}>{item.name}</div>
            <div style={{ ...styles.trItem, width: 150 }}>
              {toFA(item.numberOfQuestions)}
            </div>
            <div style={{ ...styles.trItem, width: 150 }}>{item.ownerName}</div>
            <div style={{ ...styles.trItem, width: 150 }}>
              {getLevelDisplay(item.level)}
            </div>
            <div style={{ ...styles.trItem, width: 150 }}>
              {toFA(item.price.toLocaleString())} تومان
            </div>
          </div>
        );
      })
    );
  };

  buyExam = () => {
    let token = localStorage.getItem("userToken");
    buyShared(this.state.selectedExam.id, this.state.discount, token).then(
      res => {
        if (res.isSuccess) {
          toast.success(res.message);
          this.props.history.push({
            pathname: `/dashboard/test/shared-test`,
          });
        }
      },
    );
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props.classes;
    const { selectedExam } = this.state;
    return (
      <>
        <PageTitle title="لیست آزمون های اشتراکی" />
        {this.state.isLoading ? (
          <Backdrop
            style={{ zIndex: 1000000, color: "#3d82a4" }}
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
                      <div style={{ ...styles.thItem, width: 60 }}>انتخاب</div>
                      <div style={{ ...styles.thItem, width: 60 }}>ردیف</div>
                      <div style={{ ...styles.thItem, flex: 1 }}>نام آزمون</div>
                      <div style={{ ...styles.thItem, width: 150 }}>
                        تعداد سوال
                      </div>
                      <div style={{ ...styles.thItem, width: 150 }}>سازنده</div>
                      <div style={{ ...styles.thItem, width: 150 }}>سطح</div>
                      <div style={{ ...styles.thItem, width: 150 }}>قیمت</div>
                    </div>
                    <div style={{ width: "100%" }}>{this.renderExams()}</div>
                    <div>
                      <Pagination
                        count={this.state.pageCount}
                        page={this.state.page}
                        onChange={this.handleChangePage}
                      />
                    </div>
                  </div>
                </Grid>
                <div style={{ marginTop: -20 }} />
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                width: "100%",
                marginTop: 30,
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  this.setState({ open: true });
                }}
                variant="contained"
                color="primary"
                size="large"
                className={classes.createAccountButton}
                style={{
                  fontSize: "1.1rem",
                  textAlign: "center",
                  backgroundColor: "#fe5f55",
                  fontFamily: "Dana",
                  height: 45,
                  borderRadius: 20,
                }}
              >
                مرحله بعد
              </Button>
            </div>
          </Grid>
        )}
        {this.state.open && (
          <Dialog
            maxWidth="md"
            style={{ boxShadow: "none !important" }}
            onBackdropClick={this.handleClose}
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title"
            open={this.state.open}
          >
            <div
              style={{
                background: "rgb(61 130 164 / 10%)",
                flexDirection: "column",
                padding: "0px 30px",
                width: 600,
                height: 350,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <PageTitle
                style={{ marginBottom: 10, marginTop: 0 }}
                title="مشخصات آزمون"
                size="h3"
              />
              <div style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    minHeight: 45,
                    borderRadius: 25,
                    alignItems: "normal",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      color: "#fff",
                      alignItems: "center",
                      padding: "0 15px",
                      borderRadius: 25,
                      justifyContent: "center",
                      background: "#3d82a4",
                    }}
                  >
                    نام آزمون
                  </div>
                  <div
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {selectedExam.name}
                  </div>
                </div>
                <div style={{ width: 20 }} />
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    minHeight: 45,
                    borderRadius: 25,
                    alignItems: "normal",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      color: "#fff",
                      alignItems: "center",
                      padding: "0 15px",
                      borderRadius: 25,
                      justifyContent: "center",
                      background: "#3d82a4",
                    }}
                  >
                    نام سازنده
                  </div>
                  <div
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {selectedExam.ownerName}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%", marginTop: 25 }}>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    minHeight: 45,
                    borderRadius: 25,
                    alignItems: "normal",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      color: "#fff",
                      alignItems: "center",
                      padding: "0 15px",
                      borderRadius: 25,
                      justifyContent: "center",
                      background: "#3d82a4",
                    }}
                  >
                    سطح
                  </div>
                  <div
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {getLevelDisplay(selectedExam.level)}
                  </div>
                </div>
                <div style={{ width: 20 }} />
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    minHeight: 45,
                    borderRadius: 25,
                    alignItems: "normal",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      color: "#fff",
                      alignItems: "center",
                      padding: "0 15px",
                      borderRadius: 25,
                      justifyContent: "center",
                      background: "#3d82a4",
                    }}
                  >
                    تعداد سوالات
                  </div>
                  <div
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {toFA(selectedExam.numberOfQuestions)}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%", marginTop: 25 }}>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    minHeight: 45,
                    borderRadius: 25,
                    alignItems: "normal",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      color: "#fff",
                      alignItems: "center",
                      padding: "0 15px",
                      borderRadius: 25,
                      justifyContent: "center",
                      background: "#3d82a4",
                    }}
                  >
                    قیمت
                  </div>
                  <div
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {toFA(selectedExam.price.toLocaleString())} تومان
                  </div>
                </div>
                <div style={{ width: 20 }} />
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    minHeight: 45,
                    borderRadius: 25,
                    alignItems: "normal",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      color: "#fff",
                      alignItems: "center",
                      padding: "0 15px",
                      borderRadius: 25,
                      justifyContent: "center",
                      background: "#3d82a4",
                    }}
                  >
                    کد تخفیف
                  </div>
                  <div style={{ flex: 1, alignItems: "center", width: "100%" }}>
                    <TextField
                      placeholder="کد تخفیف را وارد کنید"
                      value={this.state.discount}
                      style={{
                        height: 40,
                        background: "transparent",
                        paddingTop: 0,
                        textAlign: "center",
                      }}
                      onChange={e => this.changeInput("discount", e)}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: 40,
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={this.buyExam}
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.createAccountButton}
                  style={{
                    fontSize: "1.1rem",
                    textAlign: "center",
                    backgroundColor: "#fe5f55",
                    fontFamily: "Dana",
                    height: 50,
                    padding: "10px 30px",
                    borderRadius: 20,
                  }}
                >
                  خرید
                </Button>
              </div>
            </div>
          </Dialog>
        )}
      </>
    );
  }
}

export default SharedExamBuy;
