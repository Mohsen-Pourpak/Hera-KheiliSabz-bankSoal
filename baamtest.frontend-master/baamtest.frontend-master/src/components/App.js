import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import JalaliUtils from "@date-io/jalaali";
// import MathJax from "mathjax3-react";

// components
import Layout from "./Layout";
import AdminLayout from "./Admin/Layout";

// context
import { useUserState } from "../context/UserContext";

// pages
// import Home from "../pages/home/Home";
const Login = React.lazy(() => import("../pages/Auth/Login"));
const AdminLogin = React.lazy(() => import("../pages/Admin/Login"));
const ForgetPassword = React.lazy(() => import("../pages/Auth/ForgetPassword"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const Home = React.lazy(() => import("../pages/Home"));
const Soon = React.lazy(() => import("../pages/Soon"));
const PaySoon = React.lazy(() => import("../pages/PaySoon"));
const BaamTeachers = React.lazy(() => import("../pages/BaamTeachers"));

export default function App() {
  // global
  const { isAuthenticated, isAdmin } = useUserState();
  const mainRoot = isAdmin ? "admin" : "dashboard";
  console.log({ isAdmin });

  return (
    // <MathJax.Provider
    //   url="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
    //   options={{
    //     tex: {
    //       inlineMath: [
    //         ["$", "$"],
    //         ["\\(", "\\)"],
    //       ],
    //     },
    //   }}
    // >
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path="/home" render={() => <Redirect to="/" />} />
            <Route
              exact
              path={`/${mainRoot}`}
              render={() => <Redirect to={`/${mainRoot}/pishkhan`} />}
            />
            {isAdmin ? (
              <PrivateRoute path="/admin" component={AdminLayout} />
            ) : (
              <PrivateRoute path="/dashboard" component={Layout} />
            )}

            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/admin-login" component={AdminLogin} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/forget-password" component={ForgetPassword} />

            <Route path="/contact-us" component={Soon} />
            <Route path="/baam-teachers" component={BaamTeachers} />
            <Route path="/about-us" component={Soon} />
            <Route path="/normal-questions" component={Soon} />
            <Route path="/students" component={Soon} />
            <Route path="/teachers" component={Soon} />
            <Route path="/schools" component={Soon} />
            <Route path="/pay-soon" component={PaySoon} />
            <Route path="/" component={Home} />

            <Route component={Error} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
    // </MathJax.Provider>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: `/${mainRoot}/pishkhan`,
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

  // function MainRoute({ component, ...rest }) {
  //   return (
  //     <Route
  //       {...rest}
  //       render={props =>
  //         React.createElement(component, props)
  //       }
  //     />
  //   );
  // }
}
