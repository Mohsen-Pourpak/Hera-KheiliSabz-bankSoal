import React from "react";
import {
  Container,
  Grid,
  Button,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";
import TextField from "../../components/Form/TextField";
import PageTitle from "../../components/PageTitle/PageTitle";
import {
  Bookmark,
  SubdirectoryArrowLeft,
  School,
  DeleteSweep,
} from "@material-ui/icons";
import axios from "axios";
import { createTest } from "../../api/services/exam";
import mask from "../../images/mask.svg";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import ArrowIcon from "../../images/icons/circle-arrow-icon.svg";
import Image2 from "../../images/test/Untitled-1.jpg";
import Image3 from "../../images/pishkhan/Untitled-3.svg";
import Image4 from "../../images/pishkhan/Untitled-4.svg";
import Image5 from "../../images/teacher/get-price.svg";
import { fields } from "../../api/services/tags";
import { toast } from "react-toastify";
import { payment } from "../../api/services/buy";
import * as qs from "qs";
import { getPriceSc } from "../../api/services/school";

import { addCommas, getUserTypeStr, toEn, toFA } from "../../utils/Utils";
import { getBalance, getStar } from "../../api/services/user";

const style = {
  sortFilter: {
    backgroundColor: "transparent",
    border: "1px solid #8AB668",
    color: "#8AB668",
    width: "fit-content",
    height: 40,
    padding: "0 50px",
    marginLeft: 20,
    flex: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  sortFilterActive: {
    backgroundColor: "#8AB668",
    border: "1px solid #8AB668",
    color: "#fff",
    width: "fit-content",
    padding: "0 50px",
    marginLeft: 20,
    height: 40,
    flex: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

class RegisterTest extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      fields: [],
      title: "",
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      selectedFields: [],
      selectedList: [],
      grade: "",
      price: "",
      credit: 0,
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("userToken");
    let userType = localStorage.getItem("userType");
    let isStudent = userType === "Student";
    console.error("isStudent", isStudent);
    this.setState({ isStudent, userType });

    getBalance(token).then(res => {
      console.warn(res);
      if (res.isSuccess) {
        this.setState({ credit: parseInt(res.data) });
      }
    });

    getStar(token).then(res => {
      console.warn(res);
      if (res.isSuccess) {
        this.setState({ star: res.data });
      }
    });
  }

  changeInput = (field, e) => {
    let value = e.target.value;

    this.setState({
      [field]: value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    });
  };

  gradeOnClick = id => {
    const { selectedFields } = this.state;
    let newList;

    if (selectedFields.includes(id)) {
      newList = selectedFields.filter(el => el !== id);
      this.setState({ selectedFields: newList });
    } else {
      newList = [...this.state.selectedFields, id];
      this.setState({ selectedFields: newList });
    }

    let token = localStorage.getItem("userToken");
    let data = JSON.stringify(newList);

    getPriceSc(data, token).then(res => {
      console.warn(res);
      this.setState({
        price: parseInt(res.data.finalPrice),
      });
    });
  };

  finalActivate = () => {
    let token = localStorage.getItem("userToken");
    this.props.history.push({
      pathname: "/pay-soon",
    });
    // payment(toEn(parseInt(this.state.price.replace(/,/g, ''))), token).then(res => {
    //     console.warn(res)
    //     if (res.isSuccess) {
    //         toast.success(res.Message)
    //         // window.location.href = res.data
    //     }
    // })
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        <PageTitle
          title={`افزایش اعتبار (برای ${getUserTypeStr(this.state.userType)})`}
        />
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid
            direction="column"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              padding: 40,
              margin: 30,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <Grid direction="column" container item xs={12}>
              <div
                style={{ flexDirection: "row", display: "flex", width: "100%" }}
              >
                <div>
                  <div style={{ width: "100%" }}>
                    <PageTitle title="قوانین" size="h2" color="#8AB668" />
                  </div>
                  <div style={{ fontSize: "1rem", padding: "0 15px" }}>
                    برای بهره گیری از کلیه ی خدمات خیلی سبز ،می توانید اعتبار خود
                    را افزایش دهید و از آن در بخش های مختلف استفاده کنید و در
                    ازای آن ستاره دریافت کنید که این ستاره ها در نهایت به هدایای
                    نفیسی از طرف خیلی سبز به شما تبدیل می شود؛ برای اطلاعات بیشتر
                    می‌توانید با بخش پشتیبانی تماس حاصل بفرمایید‌.
                  </div>
                </div>
                {/* <img src={Image5} style={{ height: 200 }} /> */}
              </div>
            </Grid>
          </Grid>
          <Grid
            direction="column"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              padding: 20,
                margin: 30,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  background: "#fff",
                  height: 45,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    padding: "0 15px",
                    borderRadius: 50,
                    background: "#8AB668",
                    height: 45,
                  }}
                >
                  ستاره ها
                </div> */}
                <div style={{ flex: 1, textAlign: "center", minWidth: 200 }}>
                  <span
                    style={{
                      fontSize: 17,
                      minWidth: 200,
                      padding: "0 25px",
                      textAlign: "center",
                    }}
                  >
                    {toFA(this.state.star)}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  background: "#fff",
                  height: 45,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    padding: "0 15px",
                    borderRadius: 50,
                    background: "#8AB668",
                    height: 45,
                  }}
                >
                  اعتبار فعلی
                </div>
                <div style={{ flex: 1, textAlign: "center", width: 200 }}>
                  <span
                    style={{ fontSize: 17, width: 200, textAlign: "center" }}
                  >
                    {toFA(this.state.credit.toLocaleString())} تومان
                  </span>
                </div>
              </div>
              <div style={{ flex: 1 }} />
            </div>
          </Grid>
          <Grid
            direction="column"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              padding: 20,
                margin: 30,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  background: "#fff",
                  height: 45,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    padding: "0 15px",
                    borderRadius: 50,
                    background: "#8AB668",
                    height: 45,
                  }}
                >
                  قیمت
                </div>
                <div style={{ flex: 1, textAlign: "center", width: 300 }}>
                  <span
                    style={{
                      fontSize: 17,
                      width: 300,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 15px",
                    }}
                  >
                    {
                      <TextField
                        placeholder="مبلغ را وارد کنید"
                        value={this.state.price}
                        faNum={true}
                        style={{
                          height: 40,
                          background: "transparent",
                          paddingTop: 0,
                          textAlign: "center",
                        }}
                        onChange={e => this.changeInput("price", e)}
                      />
                    }{" "}
                    تومان
                  </span>
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{}}>
                <div
                  onClick={this.finalActivate}
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#FF0000",
                    color: "#fff",
                    borderRadius: 50,
                    padding: "15px 20px",
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
        </Grid>
      </>
    );
  }
}

export default RegisterTest;
