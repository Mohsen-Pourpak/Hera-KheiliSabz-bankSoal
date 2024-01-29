import React from "react";
import { Grid, Select, Input, MenuItem } from "@material-ui/core";
import TextField from "../../components/Form/TextField";
import PageTitle from "../../components/PageTitle/PageTitle";
import { DeleteSweep } from "@material-ui/icons";

// import mask from '../../images/mask.svg'
import "react-modern-calendar-datepicker/lib/DatePicker.css";

// import Image2 from "../../images/test/Untitled-1.jpg";
import { grades, fields } from "../../api/services/tags";
import { toast } from "react-toastify";
import * as qs from "qs";
import { autoCreateTest } from "../../api/services/exam";

import { DateTimePicker } from "@material-ui/pickers";
import { toEn } from "../../utils/Utils";

// const imagem = 'https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg';

// const Mask = ({ image, size }) => (
//     <div className="profile-mask" style={{ height: size, width: size, maskImage: `url("${mask}")`, WebkitMaskImage: `url("${mask}")`, maskSize: '100%', WebkitMaskSize: '100%' }}>
//         <img src={image} style={{ width: size }} alt="mask" />
//     </div>
// )

class RegisterTest extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      title: "",
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      userLessons: [],
      selectedList: [],
      startTime: new Date(),
      endTime: new Date(),
    };
  }
  componentDidMount() {
    let isStudent = localStorage.getItem("userType") === "Student";
    console.error("isStudent", isStudent);
    this.setState({ isStudent });

    let selectedList = localStorage.getItem("selectedList");
    this.setState({ selectedList: JSON.parse(selectedList) });

    let obj = localStorage.getItem("autoCreateObj");
    let newObj = JSON.parse(obj);

    this.setState({
      title: newObj.title,
      fieldId: newObj.fieldId,
      description: newObj.description,
      gradeId: newObj.gradeId,
    });

    grades().then(res => {
      if (res.isSuccess) {
        this.setState({ grades: res.data });
      }
    });
    fields().then(res => {
      if (res.isSuccess) {
        this.setState({ fields: res.data });
      }
    });
  }
  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  create = () => {
    const { gradeId, fieldId, selectedList } = this.state;
    let ownerId = localStorage.getItem("userId");
    let obj = {
      GradeIds: gradeId,
      OwnerId: ownerId,
      FieldIds: fieldId,
      LessonIds: selectedList
        .filter(el => el.type === "lesson")
        .map(item => item.id),
      TopicIds: selectedList
        .filter(el => el.type === "topic")
        .map(item => item.id),
      DifficultyIds: 1,
    };
    var query = qs.stringify(obj, { arrayFormat: "repeat" });
    this.props.history.push({
      pathname: `/dashboard/test/show/${query}`,
    });
  };

  autoCreate = () => {
    const { suggestTime, startTime, endTime } = this.state;
    if (!suggestTime) {
      toast.error("لطفا زمان آزمون را وارد کنید");
    } else if (!startTime) {
      toast.error("لطفا تاریخ و ساعت شروع آزمون را وارد کنید");
    } else if (!endTime) {
      toast.error("لطفا تاریخ و ساعت پایان آزمون را وارد کنید");
    } else {
      let obj = localStorage.getItem("autoCreateObj");
      let newObj = JSON.parse(obj);

      newObj["startTime"] = new Date(startTime).toISOString();
      newObj["endTime"] = new Date(endTime).toISOString();
      newObj["suggestTime"] = parseInt(toEn(suggestTime));
      newObj["endTime"] = new Date(endTime).toISOString();
      newObj["description"] = this.state.description;
      newObj["title"] = this.state.title;
      newObj["gradeId"] = this.state.gradeId;
      newObj["fieldId"] = this.state.fieldId;
      // console.log(newObj, obj);

      localStorage.setItem("finalExamObj", JSON.stringify(newObj));
      this.props.history.push({
        pathname: `/dashboard/test/pay/`,
      });

      // if (this.state.isStudent) {
      //   console.log("===user type===")
      //   console.log(this.state.isStudent)
      //   let token = localStorage.getItem("userToken");
      //   delete newObj["fieldId"];
      //   let new__ = this.state.fields.filter(e => e.id === this.state.fieldId);
      //   newObj["field"] = new__.length === 0 ? "" : new__[0].title;
      //   console.log("===req===")
      //   console.log(newObj)
      //   autoCreateTest(newObj, token).then(res => {
      //     console.log("===bad res===")
      //     console.error(res);
      //     if (res.isSuccess) {
      //       toast.success(res.message);
      //       this.props.history.push({
      //         pathname: `/dashboard/test/`,
      //       });
      //     }
      //   });
      // } else {
      //   localStorage.setItem("finalExamObj", JSON.stringify(newObj));
      //   this.props.history.push({
      //     pathname: `/dashboard/test/pay/`,
      //   });
      // }
    }
  };

  renderSelectedList = items => {
    return items.map(item => {
      return (
        <div
          style={{
            backgroundColor: "#0000006b",
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            borderRadius: 35,
            padding: "10px 15px",
            textAlign: "right",
            marginLeft: 5,
          }}
        >
          <div style={{ color: "#fff", fontSize: 17, textAlign: "right" }}>
            {item.title}
          </div>
          <div
            onClick={() => {
              let selectedList = this.state.selectedList.filter(
                el => el !== item,
              );
              this.setState({ selectedList });
            }}
            style={{
              backgroundColor: "#FF0000",
              cursor: "pointer",
              width: 45,
              borderRadius: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
            }}
          >
            <DeleteSweep style={{ fill: "#fff" }} />
          </div>
        </div>
      );
    });
  };

  toastAlert = () => {
    toast.error("حداکثر زمان انتخابی برای آزمون ۹۰۰۰ دقیقه می باشد");
  };

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    });
  };

  render() {
    // const classes = this.props.classes
    return (
      <>
        <PageTitle title="ساخت آزمون - ثبت آزمون" />
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid
            direction="row"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              padding: 20,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            {!this.state.isStudent && (
              <Grid direction="column" container item md={12} xs={12}>
                <Grid direction="row" container spacing={1}>
                  <Grid item md={3} xs={12}>
                    <div style={{ width: "100%" }}>
                      <div style={{ paddingRight: 20 }}>نام آزمون</div>
                      <Grid
                        item
                        sm={12}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          paddingRight: 10,
                          marginRight: 10,
                          top: -8.5,
                          position: "relative",
                          marginTop: 15,
                          height: 40,
                        }}
                      >
                        <TextField
                          placeholder="نام آزمون را وارد کنید"
                          value={this.state.title}
                          style={{ height: 40, background: "transparent" }}
                          onChange={e => this.changeInput("title", e)}
                        />
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <div style={{ width: "100%" }}>
                      <div style={{ paddingRight: 20 }}>توضیحات آزمون</div>
                      <Grid
                        item
                        sm={12}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          paddingRight: 10,
                          marginRight: 10,
                          top: -8.5,
                          position: "relative",
                          marginTop: 15,
                          height: 40,
                        }}
                      >
                        <TextField
                          placeholder="توضیحات آزمون را وارد کنید"
                          value={this.state.description}
                          style={{ height: 40, background: "transparent" }}
                          onChange={e => this.changeInput("description", e)}
                        />
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          paddingRight: 20,
                          paddingBottom: 5,
                          marginTop: -5,
                        }}
                      >
                        پایه
                      </div>
                      <Grid
                        item
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          paddingRight: 10,
                          marginLeft: 2.5,
                          marginRight: 10,
                          marginBottom: 10,
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
                            value={this.state.gradeId}
                            style={{ width: "100%" }}
                            input={<Input disableUnderline />}
                            onChange={e => this.changeInput("gradeId", e)}
                          >
                            <MenuItem value="d" disabled>
                              پایه
                            </MenuItem>
                            {this.renderMenuItem(this.state.grades)}
                          </Select>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          paddingRight: 20,
                          paddingBottom: 5,
                          marginTop: -5,
                        }}
                      >
                        رشته
                      </div>
                      <Grid
                        item
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          paddingRight: 10,
                          marginLeft: 2.5,
                          marginRight: 10,
                          marginBottom: 10,
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
                            value={this.state.fieldId}
                            style={{ width: "100%" }}
                            input={<Input disableUnderline />}
                            onChange={e => this.changeInput("fieldId", e)}
                          >
                            <MenuItem value="d" disabled>
                              رشته
                            </MenuItem>
                            {this.renderMenuItem(this.state.fields)}
                          </Select>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid direction="column" container item xs={6}>
              <Grid direction="column" container item xs={12}>
                <div
                  style={{
                    background: "#fff",
                    boxShadow: "1px 2px 11px -3px #00000075",
                    borderRadius: 20,
                    margin: "25px 10% 0",
                    height: 500,
                    width: "80%",
                  }}
                >
                  <div
                    style={{
                      padding: "40px 10% 20px",
                      flexDirection: "column",
                      display: "flex",
                      justifyContent: "space-between",
                      flex: 1,
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 45,
                        borderRadius: 50,
                        border: "1px solid #FF0000",
                        width: "100%",
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
                          background: "#FF0000",
                          height: 45,
                        }}
                      >
                        مدت زمان برگزاری آزمون
                      </div>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <TextField
                          placeholder="زمان را به دقیقه وارد کنید"
                          type="number"
                          faNum={true}
                          value={this.state.suggestTime}
                          style={{
                            height: 40,
                            background: "transparent",
                            paddingTop: 0,
                            textAlign: "center",
                          }}
                          onChange={t => {
                            let e = parseInt(t.target.value);
                            this.setState(
                              { suggestTime: t.target.value },
                              () => {
                                if (e) {
                                  let startT = new Date(
                                    this.state.startTime,
                                  ).getTime();
                                  let endT = startT + e * 60000;
                                  console.error({ endT });
                                  this.setState({ endTime: new Date(endT) });
                                }
                              },
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 0.2 }} />
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 45,
                        borderRadius: 50,
                        border: "1px solid #FF0000",
                        width: "100%",
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
                          background: "#FF0000",
                          height: 45,
                          width: '180px',
                          marginLeft: '40px',
                        }}
                      >
                        تاریخ و زمان باز شدن آزمون
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <DateTimePicker
                          okLabel="تأیید"
                          cancelLabel="لغو"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          hideTabs={true}
                          mode="24h"
                          ampm={false}
                          labelFunc={date =>
                            date ? date.format("jYYYY/jMM/jDD HH:mm") : ""
                          }
                          value={this.state.startTime}
                          onChange={e => {
                            this.setState({ startTime: e }, () => {
                              let startT = new Date(e).getTime();
                              let suggestTime = parseInt(
                                this.state.suggestTime,
                              );
                              let endT = startT + suggestTime * 60000;
                              this.setState({ endTime: new Date(endT) });
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 0.2 }} />
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 45,
                        borderRadius: 50,
                        border: "1px solid #FF0000",
                        width: "100%",
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
                          background: "#FF0000",
                          height: 45,
                          width: '180px',
                          marginLeft: '40px',
                        }}
                      >
                        تاریخ و زمان بسته شدن آزمون
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <DateTimePicker
                          okLabel="تأیید"
                          cancelLabel="لغو"
                          InputProps={{
                            disableUnderline: true,
                            style: { textAlign: "center" },
                          }}
                          mode="24h"
                          ampm={false}
                          minDate={this.state.startTime}
                          hideTabs={true}
                          labelFunc={date =>
                            date ? date.format("jYYYY/jMM/jDD HH:mm") : ""
                          }
                          value={this.state.endTime}
                          onChange={e => this.setState({ endTime: e })}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }} />
                    <div
                      onClick={this.autoCreate}
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#FF0000",
                        color: "#fff",
                        height: 45,
                        marginBottom: 20,
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
            </Grid>
            <Grid direction="column" container item xs={6}>
              <Grid
                item
                sm={12}
                spacing={1}
                alignItems="center"
                className="inputContainer"
                style={{
                  padding: "15px 15px",
                  overflow: "scroll",
                  backgroundSize: "cover",
                  // backgroundImage: `url(${Image2})`,
                  marginRight: 10,
                  marginTop: 5,
                  width: "100%",
                  boxShadow: "1px 2px 11px -3px #00000075",

                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    height: 500,
                  }}
                >
                  {this.renderSelectedList(this.state.selectedList)}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default RegisterTest;
