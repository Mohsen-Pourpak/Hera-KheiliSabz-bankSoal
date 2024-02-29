import React from "react";
import {
  Container,
  Grid,
  Modal,
  Fade,
  Backdrop,
  Tooltip,
  IconButton,
  Button,
  Divider,
} from "@material-ui/core";
import TextField from "../../components/Form/TextField";
import PageTitle from "../../components/PageTitle/PageTitle";
import {
  Edit,
  SubdirectoryArrowLeft,
  School,
  DeleteSweep,
  LeakAddTwoTone,
} from "@material-ui/icons";
import axios from "axios";
import { createTest } from "../../api/services/exam";
import mask from "../../images/circulMask.svg";
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
import {
  getPriceSc,
  activateAccountSc,
  getProfileSc,
  editProfileSc,
} from "../../api/services/school";
import ImageCropper from "../../components/Form/ImageCropper";
import { toEn, toFA } from "../../utils/Utils";
import { editProfileAd, getProfileAd } from "../../api/services/advisor";
import { editProfileTe, getProfileTe } from "../../api/services/teacher";
import { editProfileSt, getProfileSt } from "../../api/services/student";
import { BASE_URL } from "../../api";
import avatarPlaceholder from "../../images/pishkhan/avatar-placeholder.jpg";

const Mask = ({ image, size }) => (
  <div
    className="profile-mask"
    style={{
      height: size,
      width: '200px',
      maskImage: `url("${mask}")`,
      maskRepeat: "no-repeat",
      WebkitMaskImage: `url("${mask}")`,
      maskSize: "100%",
      WebkitMaskSize: "100%",
    }}
  >
    <img src={image} style={{ width: size }} />
  </div>
);

const Input = ({ name, value, onChange, isPassword }) => (
  <div
    style={{
      flexDirection: "row",
      flex: "1 1 20%",
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
        width: "max-content",
        color: "#fff",
        alignItems: "center",
        padding: "0 15px",
        borderRadius: 50,
        background: "#FF0000",
        height: 45,
      }}
    >
      {name}
    </div>
    <div style={{ textAlign: "center", flex: 1 }}>
      <span
        style={{
          fontSize: 17,
          flex: 1,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
        }}
      >
        {
          <TextField
            value={value}
            type={isPassword ? "password" : "normal"}
            style={{
              height: 35,
              flex: 1,
              background: "transparent",
              paddingTop: 0,
              textAlign: "center",
            }}
            onChange={onChange}
          />
        }
      </span>
    </div>
  </div>
);

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

const ActionButton = ({ Icon, onClick, title }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        aria-controls="profile-menu"
        onClick={onClick}
      >
        <Icon style={{ fill: "#555", fontSize: "80%" }} />
      </IconButton>
    </Tooltip>
  );
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
      price: 0,
      openDialog: false,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let userType = localStorage.getItem("userType");
    let token = localStorage.getItem("userToken");

    let isStudent = userType === "Student";
    let isTeacher = userType === "Teacher";
    let isAdvisor = userType === "Advisor";
    let isSchool = userType === "School";

    let userData;

    if (isSchool) {
      userData = await getProfileSc(token);
    } else if (isAdvisor) {
      userData = await getProfileAd(token);
    } else if (isTeacher) {
      userData = await getProfileTe(token);
    } else if (isStudent) {
      userData = await getProfileSt(token);
    }

    let avatar = !userData.data.avatar
      ? avatarPlaceholder
      : BASE_URL + userData.data.avatar;

    const {
      name,
      schoolPhone,
      code,
      postalCode,
      schoolType,
      managerName,
      email,
      emailConfirmed,
      phoneNumber,
      phoneNumberConfirmed,
      gradeTitle,
      fieldTitle,
      firstName,
      lastName,
      gender,
      nationalCode,
      fullName,
    } = userData.data;

    console.error("userData", { userData });
    this.setState({
      isStudent,
      isAdvisor,
      isSchool,
      isTeacher,
      userType,
      avatar,
      name,
      schoolPhone,
      code,
      postalCode,
      schoolType,
      managerName,
      email,
      emailConfirmed,
      phoneNumber,
      phoneNumberConfirmed,
      gradeTitle,
      fieldTitle,
      firstName,
      lastName,
      gender,
      nationalCode,
      fullName,
    });
  };

  updatePassword = () => {
    const { oldPassword, newPassword, confirmNewPassword } = this.state;
    let token = localStorage.getItem("userToken");
    editProfileSt(
      JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
      token,
    ).then(res => {
      if (res.isSuccess) {
        console.warn({ res });
        toast.success(res.message);
        this.setState({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    });
  };

  updateUser = async () => {
    let token = localStorage.getItem("userToken");
    const {
      isStudent,
      isAdvisor,
      isSchool,
      isTeacher,
      userType,
      avatar,
      name,
      schoolPhone,
      code,
      postalCode,
      schoolType,
      managerName,
      email,
      emailConfirmed,
      phoneNumber,
      phoneNumberConfirmed,
      gradeTitle,
      fieldTitle,
      address,
      firstName,
      lastName,
      gender,
      nationalCode,
      fullName,
    } = this.state;

    let res;

    if (isSchool) {
      let data = {
        managerName,
        postalCode,
        schoolPhone,
        phoneNumber,
        email,
        code,
        name,
      };
      console.warn({ data });
      res = await editProfileSc(data, token);
    } else if (isAdvisor) {
      let data = { firstName, lastName, phoneNumber, email, nationalCode };
      console.warn({ data });
      res = await editProfileAd(data, token);
    } else if (isTeacher) {
      let data = { firstName, lastName, phoneNumber, email, nationalCode };
      console.warn({ data });
      res = await editProfileTe(data, token);
    } else if (isStudent) {
      let data = { firstName, lastName, phoneNumber, email, nationalCode };
      console.warn({ data });
      res = await editProfileSt(data, token);
    }

    console.error({ res });

    if (res.isSuccess) {
      toast.success(res.message);
      const {
        name,
        schoolPhone,
        code,
        postalCode,
        schoolType,
        managerName,
        email,
        emailConfirmed,
        phoneNumber,
        phoneNumberConfirmed,
        gradeTitle,
        fieldTitle,
        firstName,
        lastName,
        gender,
        nationalCode,
        fullName,
      } = res.data;
      this.setState({
        isStudent,
        isAdvisor,
        isSchool,
        isTeacher,
        userType,
        avatar,
        name,
        schoolPhone,
        code,
        postalCode,
        schoolType,
        managerName,
        email,
        emailConfirmed,
        phoneNumber,
        phoneNumberConfirmed,
        gradeTitle,
        fieldTitle,
        firstName,
        lastName,
        gender,
        nationalCode,
        fullName,
      });
    }
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: toEn(value),
    });
  };

  render() {
    const classes = this.props.classes;
    const {
      isStudent,
      isAdvisor,
      isSchool,
      isTeacher,
      userType,
      avatar,
      name,
      schoolPhone,
      code,
      postalCode,
      schoolType,
      managerName,
      email,
      emailConfirmed,
      phoneNumber,
      phoneNumberConfirmed,
      gradeTitle,
      fieldTitle,
      address,
      firstName,
      lastName,
      gender,
      nationalCode,
      fullName,
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = this.state;
    return (
      <>
        <PageTitle title="ویرایش پروفایل" />
        <Divider/>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid
            direction="column"
            alignItems="center"
            spacing={3}
            justify="flex-start"
            container
            style={{
                textAlign: "center",
                margin: 60,
              padding: 50,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <div className="profile-image">
              <Mask image={this.state.avatar} size={132} />
              <div
                style={{
                  position: "absolute",
                  marginTop: -42,
                  marginLeft: -150,
                }}
              >
                <ActionButton
                  Icon={Edit}
                  onClick={() => this.setState({ openDialog: true })}
                  title="ویرایش تصویر"
                />
              </div>
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
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 20,
                  }}
                >
                  <PageTitle
                    style={{
                      justifyContent: "center",
                      width: "fit-content",
                      margin: "auto",
                    }}
                    title={isSchool ? name : fullName}
                    size="h2"
                    color="#8AB668"
                  />
                  {!isSchool && nationalCode && (
                    <PageTitle
                      style={{
                        justifyContent: "center",
                        width: "fit-content",
                        margin: "auto",
                      }}
                      title={`کد ملی : ${toFA(nationalCode)}`}
                      size="h2"
                      color="#8AB668"
                    />
                  )}
                  {isStudent && (
                    <>
                      <PageTitle
                        style={{
                          justifyContent: "center",
                          width: "fit-content",
                          margin: "auto",
                        }}
                        title={`رشته : ${fieldTitle}`}
                        size="h2"
                        color="#8AB668"
                      />
                      <PageTitle
                        style={{
                          justifyContent: "center",
                          width: "fit-content",
                          margin: "auto",
                        }}
                        title={`پایه : ${gradeTitle}`}
                        size="h2"
                        color="#8AB668"
                      />
                    </>
                  )}
                  {isSchool ? (
                    <PageTitle
                      style={{
                        justifyContent: "center",
                        width: "fit-content",
                        margin: "auto",
                      }}
                      title={`نوع : ${schoolType}`}
                      size="h2"
                      color="#8AB668"
                    />
                  ) : (
                    <PageTitle
                      style={{
                        justifyContent: "center",
                        width: "fit-content",
                        margin: "auto",
                      }}
                      title={`جنسیت : ${gender}`}
                      size="h2"
                      color="#8AB668"
                    />
                  )}
                </div>
              </Grid>
            </Grid>
            {!isSchool && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "60%",
                  margin: "20px auto",
                }}
              >
                <Input
                  name="نام"
                  onChange={e => this.changeInput("firstName", e)}
                  value={firstName}
                />
                <div style={{ flex: 0.2 }} />
                <Input
                  name="نام خانوادگی"
                  onChange={e => this.changeInput("lastName", e)}
                  value={lastName}
                />
              </div>
            )}
            {isSchool && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "60%",
                    margin: "20px auto",
                  }}
                >
                  <Input
                    name="نام مدرسه"
                    onChange={e => this.changeInput("name", e)}
                    value={name}
                  />
                  <div style={{ flex: 0.2 }} />
                  <Input
                    name="نام مدیر"
                    onChange={e => this.changeInput("managerName", e)}
                    value={managerName}
                  />
                  <div style={{ flex: 0.2 }} />
                  <Input
                    name="کد ثبت"
                    onChange={e => this.changeInput("code", e)}
                    value={code}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "60%",
                    margin: "20px auto",
                  }}
                >
                  <Input
                    name="تلفن مدرسه"
                    onChange={e => this.changeInput("schoolPhone", e)}
                    value={toFA(schoolPhone)}
                  />
                  <div style={{ flex: 0.2 }} />
                  <Input
                    name="کد پستی"
                    onChange={e => this.changeInput("postalCode", e)}
                    value={postalCode}
                  />
                </div>
              </>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "60%",
                margin: "20px auto",
              }}
            >
              <Input
                name="تلفن همراه"
                onChange={e => this.changeInput("phoneNumber", e)}
                value={toFA(phoneNumber)}
              />
              <div style={{ flex: 0.2 }} />
              <Input
                name="ایمیل"
                onChange={e => this.changeInput("email", e)}
                value={email}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "60%",
                margin: "20px auto",
              }}
            >
              <Input
                name="آدرس"
                onChange={e => this.changeInput("address", e)}
                value={address}
              />
            </div>
            <Grid
              direction="row"
              justify="center"
              style={{ margin: "20px 0" }}
              container
              spacing={2}
            >
              <Grid item xs={2}>
                <Button
                  onClick={this.updateUser}
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
                  ثبت تغییرات
                </Button>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                marginTop: 40,
                justifyContent: "center",
                width: "80%",
                margin: "20px auto",
              }}
            >
              <Input
                name="رمزعبور قبلی"
                isPassword={true}
                onChange={e => this.changeInput("oldPassword", e)}
                value={toFA(oldPassword)}
              />
              <div style={{ flex: 0.2 }} />
              <Input
                name="رمزعبور جدید"
                isPassword={true}
                onChange={e => this.changeInput("newPassword", e)}
                value={toFA(newPassword)}
              />
              <div style={{ flex: 0.2 }} />
              <Input
                name="تکرار رمزعبور جدید"
                isPassword={true}
                onChange={e => this.changeInput("confirmNewPassword", e)}
                value={toFA(confirmNewPassword)}
              />
            </div>
            <Grid
              direction="row"
              justify="center"
              style={{ marginTop: 10 }}
              container
              spacing={2}
            >
              <Grid item xs={2}>
                <Button
                  onClick={this.updatePassword}
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
                  تغییر رمز عبور
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.openDialog && (
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={this.state.openDialog}
            onClose={this.handleClose}
            style={{ backgroundColor: "rgb(0 0 0 / 26%)" }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.openDialog}>
              <ImageCropper
                isUpload={true}
                image={this.state.avatar}
                onChangeImage={avatar => this.setState({ avatar })}
                onCloseModal={() => this.setState({ openDialog: false })}
              />
            </Fade>
          </Modal>
        )}
      </>
    );
  }
}

export default RegisterTest;
