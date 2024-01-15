import React from "react";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import useStyles from "./styles";

import register from "../../images/register.svg";

import RegisterFields from "../../components/Auth/RegisterFields";

function ForgetPassword(props) {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <RegisterFields history={props.history} classes={classes} />
      <div className={classes.logotypeContainer}>
        <img src={register} alt="logo" className={classes.logotypeImage} />
      </div>
    </Grid>
  );
}

export default withRouter(ForgetPassword);
