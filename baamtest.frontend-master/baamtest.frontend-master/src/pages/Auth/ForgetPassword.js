import React, { useState } from "react";
import { Button, Fade, Grid, TextField, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";
// logo
import logo from "../../images/logo.svg";
import login from "../../images/login.svg";
import MobileIcon from "../../images/icons/mobile-icon.svg";
import PasswordIcon from "../../images/icons/password-icon.svg";
import CodeIcon from "../../images/icons/email-icon.svg";
import UserIcon from "../../images/icons/user-c-icon.svg";
// context
// import { useUserDispatch } from "../../context/UserContext";
import jMoment from "moment-jalaali";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function ForgetPassword(props) {
  var classes = useStyles();

  // global
  // var userDispatch = useUserDispatch();

  // local
  // var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  // var [activeTabId, setActiveTabId] = useState(0);
  // var [loginValue, setLoginValue] = useState("");
  // var [passwordValue, setPasswordValue] = useState("");

  // var [nameValue, setNameValue] = useState("");
  // var [selectedDate, handleDateChange] = useState(null);
  // var [birthDateValue, setBirthDateValue] = useState("");
  // var [familyValue, setFamilyValue] = useState("");
  // var [melliValue, setMelliValue] = useState("");
  // var [mobileValue, setMobileValue] = useState("");
  // var [emailValue, setEmailValue] = useState("");

  const loginClick = () => {
    // var requestOptions = {
    //   method: 'POST',
    //   redirect: 'follow'
    // };
    // fetch(LOGIN_URL + `?melli=${loginValue}&password=${passwordValue}`, requestOptions)
    //   .then(response => response.json())
    //   .then(res => {
    //     if (res.data) {
    //       let api_token = res.data.api_token;
    //       let user_type = res.data.type;
    //       loginUser(
    //         userDispatch,
    //         api_token,
    //         user_type,
    //         props.history,
    //         setIsLoading,
    //         setError,
    //       );
    //     }
    //   })
    //   .catch(error => console.log('error', error));
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={login} alt="logo" className={classes.logotypeImage} />
      </div>
      <div className={classes.formContainer}>
        <div style={{ width: 600 }}>
          <React.Fragment>
            <div style={{ textAlign: 'center', backgroundColor: '#deeaf4', borderRadius: 20, padding: 20 }}>
              <div style={{ textAlign: 'center', marginTop: -120 }}>
                <img onClick={() => props.history.push({ pathname: '/home' })} style={{ cursor: 'pointer' }} src={logo} alt="logo" style={{ width: '30%' }} />
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  مشکلی پیش اومده شرمنده
                </Typography>
              </Fade>
              <Grid container spacing={2} direction="row">
                <Grid item sm={4} spacing={1} alignItems="center" className='inputContainer' style={{ padding: 0, paddingRight: 10, marginLeft: 10 }}>
                  <Grid item>
                    <img src={UserIcon} alt="password" style={{ height: 30 }} />
                  </Grid>
                  <Grid item style={{ padding: 0 }}>
                    <TextField
                      id="filled-error-helper-text"
                      label="کد ملی یا نام کاربری"
                      className={classes.inputItem}
                      InputLabelProps={{ style: { fontSize: 14 } }}
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
                <Grid item sm={4} spacing={1} alignItems="center" className='inputContainer' style={{ padding: 0, paddingRight: 10, marginLeft: 10 }}>
                  <Grid item>
                    <img src={MobileIcon} alt="password" style={{ height: 30 }} />
                  </Grid>
                  <Grid item style={{ padding: 0 }}>
                    <TextField
                      id="filled-error-helper-text"
                      label="شماره همراه"
                      className={classes.inputItem}
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
                <Grid item sm={3}>
                  <Button
                    onClick={() => {
                      loginClick()
                    }
                    }
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{ fontSize: "1rem", textAlign: 'center', fontFamily: "Dana", height: 45, borderRadius: 20, marginTop: -20 }}
                  >
                    ارسال کد
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={2} direction="row">
                <Grid item sm={4} spacing={1} alignItems="center" className='inputContainer' style={{ padding: 0, paddingRight: 10, marginLeft: 10 }}>
                  <Grid item>
                    <img src={CodeIcon} alt="password" style={{ height: 25 }} />
                  </Grid>
                  <Grid item style={{ padding: 0 }}>
                    <TextField
                      id="filled-error-helper-text"
                      label="کد دریافتی"
                      className={classes.inputItem}
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
                <Grid item sm={3}>
                  <Button
                    onClick={() => {
                      loginClick()
                    }
                    }
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{ fontSize: "1rem", textAlign: 'center', fontFamily: "Dana", height: 45, borderRadius: 20, marginTop: -20 }}
                  >
                    ثبت کد
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" style={{ marginBottom: 20, borderBottom: '1px solid #3d82a4' }}>

              </Grid>

              <Grid container spacing={2} direction="row">
                <Grid item sm={4} spacing={1} alignItems="center" className='inputContainer' style={{ padding: 0, paddingRight: 10, marginLeft: 10 }}>
                  <Grid item>
                    <img src={PasswordIcon} alt="password" style={{ height: 30 }} />
                  </Grid>
                  <Grid item style={{ padding: 0 }}>
                    <TextField
                      id="filled-error-helper-text"
                      label="رمز عبور جدید"
                      className={classes.inputItem}
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      fullWidth
                      type="password"
                      variant="filled"
                    />
                  </Grid>
                </Grid>
                <Grid item sm={4} spacing={1} alignItems="center" className='inputContainer' style={{ padding: 0, paddingRight: 10, marginLeft: 10 }}>
                  <Grid item>
                    <img src={PasswordIcon} alt="password" style={{ height: 30 }} />
                  </Grid>
                  <Grid item style={{ padding: 0 }}>
                    <TextField
                      id="filled-error-helper-text"
                      label="تکرار رمز عبور"
                      className={classes.inputItem}
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      fullWidth
                      type="password"
                      variant="filled"
                    />
                  </Grid>
                </Grid>
                <Grid item sm={3}>
                  <Button
                    onClick={() => {
                      loginClick()
                    }
                    }
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{ fontSize: "1rem", textAlign: 'center', fontFamily: "Dana", height: 45, borderRadius: 20, marginTop: -20 }}
                  >
                    ثبت
                  </Button>
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(ForgetPassword);
