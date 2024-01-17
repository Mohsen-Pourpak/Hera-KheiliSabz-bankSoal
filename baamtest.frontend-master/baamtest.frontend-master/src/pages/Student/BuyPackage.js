import React from "react";
import {
  CircularProgress,
  Grid,
  Button,
  Backdrop,
  MenuItem,
  Dialog,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import bookImage from "../../images/student/default-book.png";
import {
  PACKAGE_CREDIT_PERIOD,
  PACKAGE_QUESTIONS_COUNT,
  toFA,
} from "../../utils/Utils";
import {
  buyPack,
  getPackPrice,
  getQuestionPack,
} from "../../api/services/student";
import TextField from "../../components/Form/TextField";
import { BASE_URL } from "../../api";
import { toast } from "react-toastify";

const style = {
  sortFilter: {
    backgroundColor: "transparent",
    border: "1px solid #3d82a4",
    color: "#3d82a4",
    width: "fit-content",
    padding: "4px 8px 2px",
    fontSize: 11,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  sortFilterActive: {
    backgroundColor: "#3d82a4",
    border: "1px solid #3d82a4",
    color: "#fff",
    width: "fit-content",
    padding: "4px 8px 2px",
    fontSize: 11,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

class AllPackages extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      userExams: [],
      selectedList: [],
      package: null,
      progress: true,
      countInPack: PACKAGE_QUESTIONS_COUNT[0].value,
      packPeriod: PACKAGE_CREDIT_PERIOD[0].value,
      discount: "",
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("userToken");
    let bookId = parseInt(this.props.match.params.id);

    getQuestionPack(bookId, token).then(res => {
      console.error({ res });
      this.setState({ package: res.data, progress: false });
    });
    this.calculatePrice(bookId);
  }

  // FLAG
  calculatePrice = () => {
    let token = localStorage.getItem("userToken");
    let bookId = parseInt(this.props.match.params.id);
    const { packPeriod, countInPack, discount } = this.state;
    getPackPrice(bookId, packPeriod, countInPack, discount, token).then(res => {
      console.error({ res, packPeriod, countInPack, discount });
      this.setState({ price: res.data.finalPrice, isLoading: false });
    });
  };

  changeInput = (field, e) => {
    if (field === "discount") {
      let value = e.target.value;
      this.setState({ [field]: value });
    } else {
      let value = e;
      this.setState({ [field]: value, isLoading: true }, () =>
        this.calculatePrice(),
      );
    }
  };

  // FLAG
  finalBuyPackage = () => {
    let token = localStorage.getItem("userToken");
    let userId = localStorage.getItem("userId");
    let bookId = parseInt(this.props.match.params.id);
    const { packPeriod, countInPack, discount } = this.state;
    buyPack(
      discount,
      JSON.stringify({ userId, bookId, packPeriod, countInPack }),
      token,
    ).then(res => {
      toast.success(res.message);
      this.props.history.push({pathname: '/dashboard/packages'})
    });
  };

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    });
  };

  render() {
    const classes = this.props.classes;
    let pack = this.state.package;
    return (
      <>
        <Backdrop
          style={{ zIndex: 1000000, color: "#FFD700" }}
          open={this.state.progress}
          onClick={() => console.log("clicked")}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Backdrop
          style={{ zIndex: 1000000, color: "#FFD700" }}
          open={this.state.isLoading}
          onClick={() => console.log("clicked")}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <PageTitle title="خرید پک سوال" />
        {!this.state.progress && (
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
            <div
              style={{ width: "100%", flexDirection: "row", display: "flex" }}
            >
              <div style={{ padding: 10, flex: 3.5 }}>
                <img
                  src={BASE_URL + pack.image || bookImage}
                  width="100%"
                  alt=""
                />
              </div>
              <div style={{ width: 20 }} />
              <div
                style={{
                  padding: 20,
                  flex: 3.5,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgb(255 255 255 / 40%)",
                  borderRadius: 20,
                }}
              >
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
                      width: 150,
                    }}
                  >
                    تعداد سوال
                  </div>
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {PACKAGE_QUESTIONS_COUNT.map(item => {
                      return (
                        <div
                          onClick={() =>
                            this.changeInput("countInPack", item.value)
                          }
                          style={
                            this.state.countInPack === item.value
                              ? style.sortFilterActive
                              : style.sortFilter
                          }
                        >
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ height: 10 }} />
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
                      width: 150,
                    }}
                  >
                    اعتبار
                  </div>
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {PACKAGE_CREDIT_PERIOD.map(item => {
                      return (
                        <div
                          onClick={() =>
                            this.changeInput("packPeriod", item.value)
                          }
                          style={
                            this.state.packPeriod === item.value
                              ? style.sortFilterActive
                              : style.sortFilter
                          }
                        >
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ height: 10 }} />
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    flex: 1,
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
                      width: 150,
                    }}
                  >
                    مولفان
                  </div>
                  <div
                    style={{
                      flex: 1,
                      maxHeight: "14.5vw",
                      overflow: "scroll",
                      textAlign: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "column",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {this.state.package.authorsName
                      ? this.state.package.authorsName.map(item => {
                          return (
                            <div style={{ textAlign: "right" }}>{item}</div>
                          );
                        })
                      : null}
                  </div>
                </div>

                <div style={{ height: 10 }} />
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
                      width: 150,
                    }}
                  >
                    قیمت
                  </div>
                  <div
                    style={{
                      flex: 1,
                      alignItems: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: 10,
                    }}
                  >
                    {this.state.price &&
                      `${toFA(this.state.price.toLocaleString())} تومان`}
                  </div>
                </div>
              </div>
              <div style={{ width: 20 }} />
              <div
                style={{
                  padding: 20,
                  flex: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgb(255 255 255 / 40%)",
                  borderRadius: 20,
                }}
              >
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
                <div
                  onClick={this.calculatePrice}
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fe5f55",
                    color: "#fff",
                    height: 45,
                    marginTop: 20,
                    marginBottom: 40,
                    borderRadius: 50,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  محاسبه قیمت
                </div>
                <div style={{ height: 10 }} />
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
                      width: 150,
                    }}
                  >
                    قیمت
                  </div>
                  <div
                    style={{
                      flex: 1,
                      alignItems: "center",
                      textAlign: "center",
                      gridGap: 8,
                      width: "100%",
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      margin: 10,
                    }}
                  >
                    {this.state.price &&
                      `${toFA(this.state.price.toLocaleString())} تومان`}
                  </div>
                </div>
                <div style={{ flex: 1 }} />
                <div
                  onClick={this.finalBuyPackage}
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fe5f55",
                    color: "#fff",
                    height: 45,
                    marginBottom: 0,
                    borderRadius: 50,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  ثبت نهایی
                </div>
              </div>
            </div>
          </Grid>
        )}
        {this.state.open && (
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
        )}
      </>
    );
  }
}

export default AllPackages;
