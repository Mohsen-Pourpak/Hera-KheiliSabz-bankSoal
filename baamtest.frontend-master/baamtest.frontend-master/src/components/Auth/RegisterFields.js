import React from "react";
import {
  Button,
  Checkbox,
  Grid,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";
import TextField from "../../components/Form/TextField.tsx";
import { withStyles } from "@material-ui/core/styles";
import { Brightness1 } from "@material-ui/icons";
import { toast } from "react-toastify";

import MobileIcon from "../../images/icons/mobile-icon.svg";

import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";
import logo from "../../images/logo.svg";
import AccountIcon from "../../images/icons/user-s-icon.svg";
import ArchiveIcon from "../../images/icons/archive-icon.svg";
import NationalCardIcon from "../../images/icons/national-card-icon.svg";
import ManIcon from "../../images/icons/man-icon.svg";
import WomanIcon from "../../images/icons/woman-icon.svg";
import UserIcon from "../../images/icons/user-icon.svg";

import KeyIcon from "../../images/icons/key-icon.svg";
import { lessons, grades, fields } from "../../api/services/tags";
import {
  studentRegister,
  schoolRegister,
  teacherRegister,
  advisorRegister,
} from "../../api/services/user";
import { INTRODUCTION_METHODS } from "../../utils/Utils";

class RegisterFields extends React.Component {
  constructor() {
    super();
    this.state = {
      userType: 1,
      gender: "Male",
      schoolType: "Boyish",
      lessons: [],
      grades: [],
      fields: [],
      lessonId: "d",
      fieldId: "d",
      gradeId: "d",
      introductionMethod: "None",
      identifierCode: "",
      lastName: "",
      email: "test@gmail.com",
    };
  }
  componentDidMount() {
    lessons().then(res => {
      if (res.isSuccess) {
        this.setState({ lessons: res.data });
      }
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
    let value;
    if (e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    this.setState({
      [field]: value,
    });
  };

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    });
  };

  registerClick() {
    if (this.state.password !== this.state.confirmPassword) {
      toast.error("رمزعبور وارده شده با تکرار آن مطابقت ندارد");
    } else if (this.state.userType === 1) {
      let onk = (({
        userName,
        email,
        firstName,
        lastName,
        gender,
        nationalCode,
        password,
        confirmPassword,
        phoneNumber,
        identifierCode,
        introductionMethod,
        gradeId,
        fieldId,
      }) => ({
        userName,
        email,
        firstName,
        lastName,
        gender,
        nationalCode,
        password,
        confirmPassword,
        phoneNumber,
        identifierCode,
        introductionMethod,
        gradeId,
        fieldId,
      }))(this.state);
      console.error(onk);
      studentRegister(onk).then(res => {
        console.error(res);
        if (res.isSuccess) {
          toast.success("ثبت نام با موفقیت انجام شد");
          this.props.history.push({
            pathname: "/login",
          });
        } else {
          toast.error(res.message);
        }
      });
    } else if (this.state.userType === 2 || this.state.userType === 4) {
      const {
        userName,
        email,
        firstName,
        lastName,
        gender,
        nationalCode,
        password,
        confirmPassword,
        phoneNumber,
        identifierCode,
        introductionMethod,
        // gradeId,
        // fieldId,
        // lessonId,
        fields,
        grades,
        lessons,
      } = this.state;
      let onk = {
        userName,
        email,
        firstName,
        lastName,
        gender,
        nationalCode,
        password,
        confirmPassword,
        phoneNumber,
        identifierCode,
        introductionMethod,
        gradesId: [grades[0].id],
        fieldsId: [fields[0].id],
        lessonsId: [lessons[0].id],
      };
      console.error(onk);
      if (this.state.userType === 2) {
        teacherRegister(onk).then(res => {
          console.error(res);
          if (res.isSuccess) {
            toast.success("ثبت نام با موفقیت انجام شد");
            this.props.history.push({
              pathname: "/login",
            });
          } else {
            toast.error(res.message);
          }
        });
      } else {
        advisorRegister(onk).then(res => {
          console.error(res);
          if (res.isSuccess) {
            toast.success("ثبت نام با موفقیت انجام شد");
            this.props.history.push({
              pathname: "/login",
            });
          } else {
            toast.error(res.message);
          }
        });
      }
    } else if (3) {
      const {
        userName,
        email,
        password,
        confirmPassword,
        identifierCode,
        schoolName,
        schoolType,
        managerName,
        schoolPhone,
        introductionMethod,
        // firstName,
        // fieldId,
      } = this.state;
      let onk = {
        userName,
        email,
        name: schoolName,
        schoolPhone,
        code: identifierCode,
        postalCode: "1234567890",
        password,
        confirmPassword,
        fieldIds: [1],
        schoolType,
        managerName,
        introductionMethod,
      };
      console.error(onk);
      schoolRegister(onk).then(res => {
        console.error(res);
        if (res.isSuccess) {
          toast.success("ثبت نام با موفقیت انجام شد");
          this.props.history.push({
            pathname: "/login",
          });
        } else {
          toast.error(res.message);
        }
      });
    }
  }

  render() {
    const {
      userType,
      gender,
      schoolType,
      //   lessonId,
      fieldId,
      gradeId,
      introductionMethod,
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.formContainer}>
          <div className="RegisterFields" style={{ width: 600 }}>
            <React.Fragment>
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "#deeaf4",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <div style={{ textAlign: "center", marginTop: -120 }}>
                  <img
                    onClick={() =>
                      this.props.history.push({ pathname: "/home" })
                    }
                    style={{ cursor: "pointer", width: "30%" }}
                    src={logo}
                    alt="logo"
                  />
                </div>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={2}
                  direction="row"
                >
                  <Grid
                    item
                    sm={5}
                    spacing={1}
                    alignItems="center"
                    className="inputContainer"
                    style={{ padding: 0, paddingRight: 10 }}
                  >
                    <Grid item>
                      <img
                        src={ArchiveIcon}
                        style={{ height: 25, marginRight: 7.5 }}
                        alt=""
                      />
                    </Grid>
                    <Grid
                      item
                      style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        width: "82.5%",
                      }}
                    >
                      <Select
                        id="demo-simple-select"
                        value={userType}
                        input={<Input disableUnderline />}
                        onChange={e => this.changeInput("userType", e)}
                        fullWidth
                      >
                        <MenuItem value={1}>دانش آموز</MenuItem>
                        <MenuItem value={2}>دبیر</MenuItem>
                        <MenuItem value={3}>مدرسه / آموزشگاه</MenuItem>
                        <MenuItem value={4}>مشاور</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                {userType === 3 ? (
                  <div
                    style={{
                      backgroundColor: "#e5eef6",
                      borderRadius: 20,
                      padding: 10,
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justify="space-between"
                    >
                      <Grid
                        item
                        sm={5.7}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: "7.5px 10px 7.5px 0",
                          paddingRight: 10,
                          marginRight: 10,
                          marginTop: 10,
                          height: 40,
                        }}
                      >
                        <Grid item>
                          <img
                            src={AccountIcon}
                            style={{ height: 30 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            placeholder="نام مدرسه"
                            onChange={e => this.changeInput("schoolName", e)}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        sm={5.7}
                        spacing={2}
                        alignItems="stretch"
                        justify="space-between"
                        style={{ marginLeft: 10 }}
                      >
                        <div>جنسیت : </div>
                        <Checkbox
                          color="primary"
                          name="gender"
                          value={"Boyish"}
                          checked={Boolean(schoolType === "Boyish")}
                          onChange={e => this.changeInput("schoolType", e)}
                          icon={<Brightness1 style={{ fill: "#eff5fa" }} />}
                          checkedIcon={
                            <img
                              src={CheckRadioIcon}
                              style={{ height: 25 }}
                              alt=""
                            />
                          }
                        />
                        <img
                          src={ManIcon}
                          style={{ height: 20, marginLeft: 5 }}
                          alt=""
                        />
                        <div>پسرانه</div>
                        <Checkbox
                          color="primary"
                          name="gender"
                          value={"Girly"}
                          checked={Boolean(schoolType === "Girly")}
                          onChange={e => this.changeInput("schoolType", e)}
                          icon={<Brightness1 style={{ fill: "#eff5fa" }} />}
                          checkedIcon={
                            <img
                              src={CheckRadioIcon}
                              style={{ height: 25 }}
                              alt=""
                            />
                          }
                        />
                        <img
                          src={WomanIcon}
                          style={{ height: 20, marginLeft: 5 }}
                          alt=""
                        />
                        <div>دخترانه</div>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      justify="space-between"
                      direction="row"
                    >
                      <Grid
                        item
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: "7.5px 10px 7.5px 0",
                          paddingRight: 10,
                          marginLeft: 2.5,
                          marginRight: 10,
                          marginBottom: 10,
                          width: "31%",
                        }}
                      >
                        <Grid item>
                          <img
                            src={NationalCardIcon}
                            style={{ height: 25 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="filled-error-helper-text"
                            placeholder="نام مدیر"
                            className={classes.inputItem}
                            onChange={e => this.changeInput("managerName", e)}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            fullWidth
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          marginLeft: 2.5,
                          marginBottom: 10,
                          width: "31%",
                        }}
                      >
                        <Grid item>
                          <img
                            src={MobileIcon}
                            style={{ height: 25, marginRight: 10 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="filled-error-helper-text"
                            placeholder="شماره ثابت"
                            maxLength={11}
                            className={classes.inputItem}
                            onChange={e => this.changeInput("schoolPhone", e)}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            fullWidth
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          marginLeft: 10,
                          marginRight: 2.5,
                          marginBottom: 10,
                          width: "31%",
                        }}
                      >
                        <Grid item>
                          <img
                            src={MobileIcon}
                            style={{ height: 25, marginRight: 10 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="filled-error-helper-text"
                            placeholder="شماره همراه"
                            maxLength={11}
                            className={classes.inputItem}
                            onChange={e => this.changeInput("sPhone", e)}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            fullWidth
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: "#e5eef6",
                      borderRadius: 20,
                      padding: 10,
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justify="space-between"
                    >
                      <Grid
                        item
                        sm={5.7}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: "7.5px 10px 7.5px 0",
                          paddingRight: 10,
                          marginRight: 10,
                          marginTop: 10,
                        }}
                      >
                        <Grid item>
                          <img
                            src={AccountIcon}
                            style={{ height: 30 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="filled-error-helper-text"
                            placeholder="نام و نام خانوادگی"
                            className={classes.inputItem}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            onChange={e => this.changeInput("firstName", e)}
                            fullWidth
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        sm={5.7}
                        spacing={2}
                        alignItems="stretch"
                        justify="space-between"
                        style={{ marginLeft: 10 }}
                      >
                        <div>جنسیت : </div>
                        <Checkbox
                          color="primary"
                          name="gender"
                          value={"Male"}
                          checked={Boolean(gender === "Male")}
                          onChange={e => this.changeInput("gender", e)}
                          icon={<Brightness1 style={{ fill: "#eff5fa" }} />}
                          checkedIcon={
                            <img
                              src={CheckRadioIcon}
                              style={{ height: 25 }}
                              alt=""
                            />
                          }
                        />
                        <img
                          src={ManIcon}
                          style={{ height: 20, marginLeft: 5 }}
                          alt=""
                        />
                        <div>آقا</div>
                        <Checkbox
                          color="primary"
                          name="gender"
                          value={"Female"}
                          checked={Boolean(gender === "Female")}
                          onChange={e => this.changeInput("gender", e)}
                          icon={<Brightness1 style={{ fill: "#eff5fa" }} />}
                          checkedIcon={
                            <img
                              src={CheckRadioIcon}
                              style={{ height: 25 }}
                              alt=""
                            />
                          }
                        />
                        <img
                          src={WomanIcon}
                          style={{ height: 20, marginLeft: 5 }}
                          alt=""
                        />
                        <div>خانم</div>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      justify="space-between"
                      direction="row"
                    >
                      <Grid
                        item
                        sm={5.7}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: "7.5px 10px 7.5px 0",
                          paddingRight: 10,
                          marginLeft: 10,
                          marginRight: 10,
                          marginBottom: 10,
                        }}
                      >
                        <Grid item>
                          <img
                            src={NationalCardIcon}
                            style={{ height: 25 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="filled-error-helper-text"
                            placeholder="کد ملی (نام کاربری)"
                            className={classes.inputItem}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            onChange={e => {
                              this.changeInput("userName", e);
                              this.changeInput(
                                "email",
                                `email${e.target.value}@gmail.com`,
                              );
                              this.changeInput("nationalCode", e);
                            }}
                            fullWidth
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        sm={5.7}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: "7.5px 10px 7.5px 0",
                          paddingRight: 10,
                          marginLeft: 10,
                          marginBottom: 10,
                        }}
                      >
                        <Grid item>
                          <img
                            src={MobileIcon}
                            style={{ height: 25, marginRight: 10 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="filled-error-helper-text"
                            placeholder="شماره همراه"
                            maxLength={11}
                            className={classes.inputItem}
                            onChange={e => this.changeInput("phoneNumber", e)}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            fullWidth
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                )}
                {userType === 1 && (
                  <div
                    style={{
                      backgroundColor: "#e5eef6",
                      borderRadius: 20,
                      padding: 10,
                      marginTop: 10,
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justify="space-between"
                    >
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
                          marginTop: 10,
                          width:
                            userType === 2 || userType === 4 ? "31%" : "42%",
                        }}
                      >
                        <Grid
                          item
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            width: "82.5%",
                          }}
                        >
                          <Select
                            id="demo-simple-select"
                            value={fieldId}
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
                      <Grid
                        item
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          paddingRight: 10,
                          marginLeft:
                            userType === 2 || userType === 4 ? 2.5 : 10,
                          marginRight: 2.5,
                          marginBottom: 10,
                          marginTop: 10,
                          width:
                            userType === 2 || userType === 4 ? "31%" : "42%",
                        }}
                      >
                        <Grid
                          item
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            width: "82.5%",
                          }}
                        >
                          <Select
                            id="demo-simple-select"
                            value={gradeId}
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
                      {/* <Grid item spacing={1} alignItems="center" className='inputContainer' style={{padding: 0, paddingRight: 10, marginLeft: 10, marginRight: 2.5, marginBottom: 10, marginTop: 10, display: (userType === 2 || userType === 4) ? 'block' : 'none', width: '31%'}}>
                                    <Grid item style={{paddingTop: 5, paddingBottom: 5, width: '82.5%'}}>    
                                        <Select
                                            id="demo-simple-select"
                                            value={lessonId}
                                            style={{width: '100%'}}
                                            input={<Input disableUnderline />}
                                            onChange={e => this.changeInput('lessonId', e)}
                                        >
                                            <MenuItem value="d" disabled>زبان</MenuItem>
                                            {this.renderMenuItem(this.state.lessons)}
                                        </Select>
                                    </Grid>
                                </Grid> */}
                    </Grid>
                  </div>
                )}

                <div
                  style={{
                    backgroundColor: "#e5eef6",
                    borderRadius: 20,
                    padding: 10,
                    marginTop: 10,
                  }}
                >
                  {userType === 3 && (
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justify="space-between"
                      style={{ marginTop: 0 }}
                    >
                      <Grid
                        item
                        sm={5.7}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: "7.5px 10px 7.5px 0",
                          paddingRight: 10,
                          marginRight: 10,
                          marginTop: 5,
                          marginBottom: 15,
                        }}
                      >
                        <Grid item>
                          <img
                            src={UserIcon}
                            style={{ height: 20, marginRight: 10 }}
                            alt=""
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="filled-error-helper-text"
                            placeholder="نام کاربری"
                            className={classes.inputItem}
                            onChange={e => {
                              this.changeInput("userName", e);
                              this.changeInput(
                                "email",
                                `email${e.target.value}@gmail.com`,
                              );
                            }}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                              },
                            }}
                            fullWidth
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  <div style={{ margin: "5px 0 10px", fontSize: 10 }}>
                    حداقل ۶ کاراکتر شامل حرف و عدد الزامی است
                  </div>
                  <Grid
                    container
                    spacing={2}
                    justify="space-between"
                    direction="row"
                    style={{ marginTop: 5 }}
                  >
                    <Grid
                      item
                      sm={5.7}
                      spacing={1}
                      alignItems="center"
                      className="inputContainer"
                      style={{
                        padding: "7.5px 10px 7.5px 0",
                        paddingRight: 10,
                        marginLeft: 10,
                        marginRight: 5,
                        marginBottom: 10,
                      }}
                    >
                      <Grid item>
                        <img
                          src={KeyIcon}
                          style={{ width: 28, marginRight: 10 }}
                          alt=""
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="filled-error-helper-text"
                          placeholder="رمز عبور"
                          type="password"
                          className={classes.inputItem}
                          onChange={e => this.changeInput("password", e)}
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          fullWidth
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sm={5.7}
                      spacing={1}
                      alignItems="center"
                      className="inputContainer"
                      style={{
                        padding: "7.5px 10px 7.5px 0",
                        paddingRight: 10,
                        marginLeft: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Grid item>
                        <img
                          src={KeyIcon}
                          style={{ width: 28, marginRight: 10 }}
                          alt=""
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="filled-error-helper-text"
                          placeholder="تکراررمز عبور"
                          type="password"
                          className={classes.inputItem}
                          onChange={e => this.changeInput("confirmPassword", e)}
                          InputProps={{
                            classes: {
                              underline: classes.textFieldUnderline,
                              input: classes.textField,
                            },
                          }}
                          fullWidth
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    justify="center"
                    direction="row"
                    style={{ marginTop: 10 }}
                  >
                    <Grid
                      item
                      sm={5.7}
                      spacing={1}
                      alignItems="center"
                      className="inputContainer"
                      style={{
                        padding: 0,
                        paddingRight: 10,
                        height: 42,
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 10,
                        width: "45%",
                      }}
                    >
                      <div style={{ width: "82.5%" }}>
                        <Select
                          id="demo-simple-select"
                          value={introductionMethod}
                          style={{ width: "100%" }}
                          input={<Input disableUnderline />}
                          onChange={e =>
                            this.changeInput("introductionMethod", e)
                          }
                        >
                          <MenuItem value="None" disabled>
                            نحوه آشنایی
                          </MenuItem>
                          {this.renderMenuItem(INTRODUCTION_METHODS)}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <Grid
                  container
                  spacing={2}
                  justify="center"
                  direction="row"
                  style={{ marginTop: 30 }}
                >
                  <Button
                    onClick={() => {
                      this.registerClick();
                    }}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      fontFamily: "Dana",
                      height: 45,
                      borderRadius: 20,
                      marginTop: -20,
                    }}
                  >
                    ثبت
                  </Button>
                </Grid>
              </div>
            </React.Fragment>
          </div>
        </div>
      </>
    );
  }
}

// Teachers.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles()(RegisterFields);
