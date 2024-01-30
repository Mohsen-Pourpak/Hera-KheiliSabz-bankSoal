import React, { useState } from "react";
import { Button, Checkbox, Fade, Grid, Backdrop, CircularProgress, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import TextField from '../../components/Form/TextField.tsx';
// styles
import useStyles from "./styles";

// logo
import logo from "../../images/logo.svg";
import loginsvg from "../../images/login.svg";
import PasswordIcon from "../../images/icons/password-icon.svg";
import UserIcon from "../../images/icons/user-c-icon.svg";
// context
import { loginUser, useUserDispatch } from "../../context/UserContext";
import jMoment from "moment-jalaali";
import { CheckCircle, RadioButtonUnchecked } from '@material-ui/icons';
import { getUserId, getUserRole, login } from '../../api/services/user';

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [rememberMe, setRememberMe] = useState(false);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  // useEffect(() => {
  //   let userLogin = localStorage.getItem('userLogin')
  //   if (userLogin) {
  //     let obj = JSON.parse(userLogin)
  //     setLoginValue(obj.loginValue)
  //     setPasswordValue(obj.passwordValue)
  //     setRememberMe(true)
  //   }
  // });

  const loginClick = () => {
    setIsLoading(true)
    if (rememberMe) {
      localStorage.setItem('userLogin', JSON.stringify({ loginValue, passwordValue }))
    }
    console.error(loginValue, passwordValue)
    login(loginValue, passwordValue).then(res => {
      if (res.isSuccess) {
        let apiToken = res.data.access_token;
        getUserId(apiToken).then(response => {
          getUserRole(apiToken).then(response_ => {
            console.error(response_)
            let userType = response_.data.role.value
            let isAdmin = false
            setIsLoading(false)
            loginUser(
              userDispatch,
              apiToken,
              userType,
              response.data,
              props.history,
              setIsLoading,
              setError,
              isAdmin
            );
          })
        }).catch(e => setIsLoading(false))
      }
    }).catch(err => {
      setIsLoading(false)
    })
  }
  return (
    <Grid container className={classes.container}>
      <Backdrop style={{ zIndex: 1000000, color: '#228b22' }} open={isLoading} onClick={() => console.log('clicked')}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.logotypeContainer}>
        <img src={loginsvg} alt="logo" className={classes.logotypeImage} />
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <div style={{ textAlign: 'center', backgroundColor: '#deeaf4', borderRadius: 20, padding: 20 }}>
              <div style={{ textAlign: 'center', marginTop: -120 }}>
                <img onClick={() => props.history.push({ pathname: '/home' })} style={{ cursor: 'pointer', width: '50%' }} src={logo} alt="logo" />
              </div>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  مشکلی پیش اومده شرمنده
                </Typography>
              </Fade>
              <Grid container spacing={1} alignItems="center" className='inputContainer'>
                <Grid item>
                  <img src={UserIcon} alt="password" style={{ height: 30 }} />
                </Grid>
                <Grid item style={{ padding: 0 }}>
                  <TextField
                    placeholder="نام کاربری"
                    value={loginValue}
                    onChange={e => setLoginValue(e.target.value)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        loginClick()
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" className='inputContainer'>
                <Grid item>
                  <img src={PasswordIcon} alt="password" style={{ height: 35 }} />
                </Grid>
                <Grid item style={{ padding: 0 }}>
                  <TextField
                    placeholder="رمز عبور"
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    type="password"
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        loginClick()
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <button onClick={() => {
                props.history.push({
                  pathname: '/forget-password',
                })
              }} className={classes.transparentButton} style={{ float: 'left', fontSize: 12, marginTop: -10, marginBottom: -10 }}>رمز عبور خود را فراموش کرده اید؟</button>

              <Grid container spacing={1} alignItems="center" style={{ marginBottom: 20 }}>
                <Grid item>
                  <Checkbox
                    checked={rememberMe}
                    color="primary"
                    onChange={e => setRememberMe(!rememberMe)}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />}
                  />
                </Grid>
                <Grid item>
                  <div>مرا به خاطر بسپار</div>
                </Grid>
              </Grid>

              <Grid container direction="row" spacing={5}>
                <Grid item sm={6} xs={12}>
                  <Button
                    onClick={loginClick}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{ fontSize: "1rem", textAlign: 'center', fontFamily: "Dana" }}
                  >
                    ورود
                  </Button>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Button
                    onClick={() => {
                      props.history.push({
                        pathname: '/register',
                      })
                    }
                    }
                    fullWidth
                    variant="contained"
                    size="large"
                    className={classes.createAccountButton}
                    style={{ fontSize: "1rem", textAlign: 'center', fontFamily: "Dana", backgroundColor: '#fff' }}
                  >
                    عضویت
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

export default withRouter(Login);
