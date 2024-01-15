import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './themes/base.css'


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function MainApp(props) {

  // console.log = function(){};
  // console.error = function(){};
  // console.warn = function(){};

  return (
    <StylesProvider jss={jss}>
      <LayoutProvider>
        <UserProvider>
          <ToastContainer position='bottom-right' />

          <ThemeProvider theme={Themes.default}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </UserProvider>
      </LayoutProvider>
    </StylesProvider>
  )
}

ReactDOM.render(
  <MainApp />,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
