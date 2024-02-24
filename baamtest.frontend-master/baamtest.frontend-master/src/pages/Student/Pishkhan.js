import React from "react";
import {
  Dialog,
  DialogTitle,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  IconButton,
  Box,
  Divider,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Bookmark, LocationOn, School, Edit, Add } from "@material-ui/icons";

import mask from "../../images/mask.svg";
import "../../components/datePicker/DatePicker.css";
import "../../themes/piskhan.css";
import { Calendar } from "../../components/datePicker/Calendar";
import Image1 from "../../images/pishkhan/Untitled-1.svg";
import Image2 from "../../images/pishkhan/Untitled-2.svg";
import Image3 from "../../images/pishkhan/Untitled-3.svg";
import Image4 from "../../images/pishkhan/Untitled-4.svg";
import Image5 from "../../images/pishkhan/Untitled-5.svg";
import { addEvent, getEvent } from "../../api/services/calender";
import jMoment from "moment-jalaali";
import { getUserTypeStr, toEn, toFA, txtToPrice } from "../../utils/Utils";
import { NormalInput } from "../../components/Form/TextField";
import { v4 as uuidv4 } from "uuid";
import { getProfileParameter } from "../../api/services/user";
import GetDaysOff from "../../utils/calendar";
import { TimePicker } from "@material-ui/pickers";

const Mask = ({ image, size }) => (
  <div
    className="profile-mask"
    style={{
      height: size,
      width: size,
      maskImage: `url("${mask}")`,
      WebkitMaskImage: `url("${mask}")`,
      maskSize: "100%",
      WebkitMaskSize: "100%",
    }}
  >
    <img src={image} style={{ width: size }} alt="mask" />
  </div>
);

const ActionButton = ({ Icon, onClick }) => {
  return (
    <IconButton
      color="inherit"
      aria-controls="profile-menu"
      onClick={onClick}
      style={{ float: "left", marginBottom: -45, marginTop: 5, marginLeft: 5 }}
    >
      <Icon style={{ fill: "#000", fontSize: 20 }} />
    </IconButton>
  );
};
class Pishkhan extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      selectedDayPlan: [],
      daysOff: [],
      crop: {
        unit: "px", // default, can be 'px' or '%'
        x: 130,
        y: 50,
        width: 200,
        height: 200,
      },
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      const isReloaded = localStorage.getItem("isReloaded") === "true";
      if (!isReloaded) {
        localStorage.setItem("isReloaded", "true");
        window.location.reload();
      }
    }, 200);
    this.getDaysOffCalendar();
    let userType = localStorage.getItem("userType");
    let token = localStorage.getItem("userToken");

    // let isStudent = userType === 'Student'
    // let isTeacher = userType === 'Teacher'
    // let isAdvisor = userType === 'Advisor'
    // let isSchool = userType === 'School'
    this.setState({ userType });

    let profileP = await getProfileParameter(token);

    this.setState({
      questionCount: toFA(profileP.data.questionCount),
      examCount: toFA(profileP.data.examCount),
    });
  }

  getDaysOffCalendar = async () => {
    let year = parseInt(
      toEn(
        jMoment(new Date())
          .format("jYYYY/jM/jD")
          .split("/")[0],
      ),
    );
    let list_1 = await GetDaysOff(year);
    let list_2 = await GetDaysOff(year + 1);

    this.setState({ daysOff: [...list_1, ...list_2] });

    console.error([...list_1, ...list_2]);
  };

  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getEvents = day => {
    let date = jMoment(
      `${day.year}/${day.month}/${day.day}`,
      "jYYYY/jM/jD",
    ).format("YYYY-M-D");
    let newDate = new Date(toEn(date)).toISOString();
    let token = localStorage.getItem("userToken");
    getEvent(newDate, token).then(res => {
      console.warn("res", res);
      if (res.isSuccess) {
        this.setState({ selectedDay: day, selectedDayPlan: res.data });
      }
    });
  };

  addEventAndClose = () => {
    let day = this.state.selectedDay;
    let date = jMoment(
      `${day.year}/${day.month}/${day.day} ${toEn(this.state.time)}`,
      "jYYYY/jM/jD HH:mm",
    ).format("YYYY-M-D HH:mm");

    let newDate = new Date(toEn(date)).toISOString();
    let token = localStorage.getItem("userToken");
    let obj = {
      title: this.state.title,
      description: this.state.description,
      dateTime: newDate,
      id: `${uuidv4()}`,
    };

    addEvent(obj, token).then(res => {
      if (res.isSuccess) {
        getEvent(newDate, token).then(res_ => {
          if (res.isSuccess) {
            this.setState({ selectedDayPlan: res_.data, open: false });
          }
        });
      }
    });
  };

  render() {
    const classes = this.props.classes;
    const { selectedDay } = this.state;
    return (
      <>
        <PageTitle title="پیشخوان" style={{fontSize: "30px", textAlign: "center"}} />
        <Divider/>
        {this.props.info ? (
          <>
            <Grid direction="row" container spacing={3} style={{padding: "142px"}}>
              <Grid item md={6} xs={6} direction="column" alignItems="center"> 
                <div className="profile-box" style={{ boxShadow: "2px 25px 5px ", height: "200px", width: "500px"}}>
                  <div className="profile-image" style={{marginTop: "-67px"}}>
                    <Mask image={this.props.info.avatar} size={200} />
                  </div>
                  <div className="profile-details">
                    <div className="item bookmark">
                      <Bookmark />
                      <PageTitle
                        title={this.props.info.name}
                        size="h2"
                        color="#3d82a4"
                      />
                    </div>
                    <div className="item school">
                      <School />
                      <PageTitle
                        title={getUserTypeStr(this.state.userType)}
                        size="h2"
                        color="#3d82a4"
                      />
                    </div>
                    <div className="item map">
                      <LocationOn />
                      <PageTitle title="تهران" size="h3" color="#3d82a4" />
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      this.props.history.push({
                        pathname: "/dashboard/edit-profile",
                      });
                    }}
                    fullWidth
                    variant="contained"
                    size="large"
                    className="button"
                    style={{fontSize:"0.4rem", color: "#000", backgroundColor: "#F1ECCF"}}
                  >
                    <Edit style={{ fontSize: "0.9rem", marginLeft: 5, color: "#000" }} />{" "}
                    ویرایش
                  </Button>
                </div>
              </Grid>
              <Grid item md={6} xs={6}>
                <div
                  className="calendar-1"
                  style={{ width: "100%", marginTop: -50, boxShadow: "2px 2px 5px", borderRadius:"0.5rem"}}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Calendar
                      value={this.state.selectedDay}
                      onChange={this.getEvents}
                      disabledDays={this.state.daysOff}
                      colorPrimary="#fe5f55"
                      shouldHighlightWeekends
                      locale="fa" // add this
                    />
                  </div>
                  <div className="add-button">
                    <ActionButton
                      Icon={Add}
                      onClick={() => {
                        this.setState({ open: true });
                      }}
                    />
                  </div>
                  <div className="events" style={{backgroundColor: "#F1ECCF", borderRadius: "0.5rem"}}>
                    {this.state.selectedDayPlan.length === 0 ? (
                      <div
                        style={{
                          color: "#000",
                          width: "100%",
                          textAlign: "center",
                          height: 150,
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        برنامه ای موجود نیست
                      </div>
                    ) : (
                      this.state.selectedDayPlan.map((item, idx) => {
                        let date = new Date(item.dateTime);
                        let time = `${toFA(date.getMinutes())} : ${toFA(
                          date.getHours(),
                        )}`;
                        return (
                          <div
                            style={{
                              borderTopWidth: idx !== 0 ? 1 : 0,
                              borderTopColor: "#000",
                              margin: "0 15px",
                              padding: "10px 0",
                              borderTopStyle: "solid",
                              alignItems: "center",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div
                              style={{
                                color: "#fe5f55",
                                margin: "0 10px 0 40px",
                              }}
                            >
                              {time}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  color: "#000",
                                  fontFamily: "Dana",
                                  marginBottom: 10,
                                }}
                              >
                                {item.title}
                              </div>
                              <div
                                style={{ color: "#000", fontFamily: "Dana" }}
                              >
                                {item.description}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
            {selectedDay && (
              <Dialog
                maxWidth="xs"
                onBackdropClick={this.handleClose}
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.state.open}
              >
                <div
                  style={{
                    background: "#FFFF00",
                    flexDirection: "column",
                    padding: "0px 30px",
                    width: 400,
                    height: 400,
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <DialogTitle
                    id="simple-dialog-title"
                    style={{ marginBottom: 15, backgroundColor: "#ADFF2F" }}
                  >{`${toFA(selectedDay.year)}/${toFA(
                    selectedDay.month,
                  )}/${toFA(selectedDay.day)}`}</DialogTitle>

                  <Box display="flex" flexDirection="column">
                    <NormalInput
                      placeholder="نام رویداد"
                      value={this.state.title}
                      onChange={e => this.changeInput("title", e)}
                    />
                    <NormalInput
                      placeholder="توضیحات"
                      value={this.state.description}
                      onChange={e => this.changeInput("description", e)}
                      style={{ marginTop: 4 }}
                    />
                    <TimePicker
                      style={{
                        backgroundColor: "white",
                        padding: "0 1em",
                        margin: "4px 0",
                      }}
                      okLabel="تأیید"
                      cancelLabel="لغو"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      hideTabs={true}
                      mode="24h"
                      ampm={false}
                      labelFunc={date =>
                        this.state.eventTime
                          ? date.format("HH:mm")
                          : "انتخاب زمان"
                      }
                      value={this.state.eventTime}
                      onChange={e =>
                        this.setState({
                          eventTime: e,
                          time: e.format("HH:mm"),
                        })
                      }
                    />
                  </Box>
                  <Button
                    onClick={this.addEventAndClose}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{
                      color: "#000",
                      borderRadius: 0,
                      fontSize: "1rem",
                      textAlign: "center",
                      fontFamily: "Dana",
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    ثبت رویداد
                  </Button>
                </div>
              </Dialog>
            )}
          </>
        ) : (
          <Backdrop
            style={{ zIndex: 1000000, color: "#228b22" }}
            open={this.state.isLoading}
            onClick={() => console.log("clicked")}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </>
    );
  }
}

export default Pishkhan;
