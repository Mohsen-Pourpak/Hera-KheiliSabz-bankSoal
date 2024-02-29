import React from "react";
import {
  CircularProgress,
  Grid,
  Backdrop,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Icon,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { getStudent } from "../../api/services/group";
import { getShared } from "../../api/services/shareExam";
import { getAllPayments } from "../../api/services/buy";
import {
  dateTimeToJalaliWithTime,
  getDateTime,
  PER_PAGE_TABLES,
  toFA,
  WALLET_TYPES,
} from "../../utils/Utils";
import { Cancel, CheckCircle } from "@material-ui/icons";
import Pagination from "../../components/Form/Pagination";

const styles = {
  trItem: {
    backgroundColor: "#FF0000",
    color: "#8AB668",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px",
  },
  thItem: {
    color: "#8AB668",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px 5px",
  },
};

class AllWallet extends React.Component {
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
    getAllPayments(token, this.state.page).then(res_ => {
      let res = res_.data;
      let pagination = JSON.parse(res_.headers.pagination);
      let pageCount = pagination.totalPages;
      this.setState({ payments: res.data, isLoading: false, pageCount });
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

  renderSubAdvisors = () => {
    return this.state.payments.length === 0 ? (
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
      this.state.payments.map((item, idx) => {
        let rowId = 1 + (this.state.page - 1) * PER_PAGE_TABLES;
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
            <div style={{ ...styles.trItem, width: 60 }}>
              {toFA(idx + rowId)}
            </div>
            <div style={{ ...styles.trItem, width: "50%" }}>
              {item.description}
            </div>
            <div style={{ ...styles.trItem, width: 150 }}>
              {toFA(item.amount.toLocaleString())} تومان
            </div>
            <div style={{ ...styles.trItem, width: 100 }}>
              {WALLET_TYPES.filter(el => el.value === item.walletType)[0].title}
            </div>
            <div style={{ ...styles.trItem, width: 150 }}>
              {getDateTime(item.createDate)}
            </div>
            <div
              style={{
                ...styles.trItem,
                width: 100,
                backgroundColor: item.isPay ? "#deffd5" : "#ffebe4",
                color: item.isPay ? "#329455" : "#ec6058",
              }}
            >
              {item.isPay ? (
                <CheckCircle
                  style={{ fill: "#329455", fontSize: "90%", marginLeft: 5 }}
                />
              ) : (
                <Cancel
                  style={{ fill: "#ec6058", fontSize: "90%", marginLeft: 5 }}
                />
              )}
              {item.isPay ? "موفق" : "ناموفق"}
            </div>
          </div>
        );
      })
    );
  };

  searchStudent = () => {
    let token = localStorage.getItem("userToken");
    let query = `username=${this.state.username}`;
    getStudent(token, query).then(res => {
      if (res.data) {
        this.setState({ userSearched: res.data });
      }
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        <PageTitle title="لیست تراکنش ها" />
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
                      <div style={{ ...styles.thItem, width: 60 }}>ردیف</div>
                      <div style={{ ...styles.thItem, width: "50%" }}>
                        توضیحات
                      </div>
                      <div style={{ ...styles.thItem, width: 150 }}>مبلغ</div>
                      <div style={{ ...styles.thItem, width: 100 }}>
                        نوع تراکنش
                      </div>
                      <div style={{ ...styles.thItem, width: 150 }}>
                        تاریخ و ساعت
                      </div>
                      <div style={{ ...styles.thItem, width: 100 }}>وضعیت</div>
                    </div>
                    <div style={{ width: "100%" }}>
                      {this.renderSubAdvisors()}
                    </div>
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
      </>
    );
  }
}

export default AllWallet;
