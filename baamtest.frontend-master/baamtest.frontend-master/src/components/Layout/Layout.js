import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Backdrop, CircularProgress } from "@material-ui/core";

// styles
import useStyles from "./styles";
import useInputStyles from "../../pages/Auth/styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar";
import TempDrawer from "../Sidebar/TempDrawer";

// context
import { useLayoutState } from "../../context/LayoutContext";
import Invitetion from "../../pages/Teacher/Invitetion";
import "../../themes/admin.css";
import { getInfo } from "../../api/services/user";
import { BASE_URL } from "../../api";

import avatarPlaceholder from "../../images/pishkhan/avatar-placeholder.jpg";

// pages
const Pishkhan = React.lazy(() => import("../../pages/Student/Pishkhan"));
const CreateTest = React.lazy(() => import("../../pages/Student/CreateTest"));
const ManagementTest = React.lazy(() =>
  import("../../pages/Student/ManagementTest"),
);
const RunTest = React.lazy(() => import("../../pages/Student/RunTest"));
const ShowTest = React.lazy(() => import("../../pages/Student/ShowTest"));
const AutoShowTest = React.lazy(() =>
  import("../../pages/Student/AutoShowTest"),
);
const FinalizingTest = React.lazy(() =>
  import("../../pages/Student/FinalizingTest"),
);
const RegisterTest = React.lazy(() =>
  import("../../pages/Student/RegisterTest"),
);
const PayTest = React.lazy(() => import("../../pages/Student/PayTest"));
const Subscription = React.lazy(() =>
  import("../../pages/Teacher/Subscription"),
);
const Group = React.lazy(() => import("../../pages/Teacher/Group"));
const GroupAdd = React.lazy(() => import("../../pages/Teacher/GroupAdd"));
const AddToGroup = React.lazy(() => import("../../pages/Teacher/AddToGroup"));
const EditTest = React.lazy(() => import("../../pages/Teacher/EditTest"));
const PrintTest = React.lazy(() => import("../../pages/Teacher/PrintTest"));
const PrintCreatePdf = React.lazy(() =>
  import("../../pages/Teacher/PrintCreatePdf"),
);
const Credit = React.lazy(() => import("../../pages/Teacher/Credit"));
const GroupBuy = React.lazy(() => import("../../pages/Teacher/GroupBuy"));
const AssignTeachers = React.lazy(() =>
  import("../../pages/Teacher/AssignTeachers"),
);
const AssignAdvisors = React.lazy(() =>
  import("../../pages/Teacher/AssignAdvisors"),
);
const AssignStudents = React.lazy(() =>
  import("../../pages/Teacher/AssignStudents"),
);
const EditAndRunTest = React.lazy(() =>
  import("../../pages/Teacher/EditAndRunTest"),
);
const TestAnswerSheet = React.lazy(() =>
  import("../../pages/Teacher/TestAnswerSheet"),
);
const SharedExam = React.lazy(() => import("../../pages/Teacher/SharedExam"));
const CreateReportCard = React.lazy(() =>
  import("../../pages/Teacher/CreateReportCard"),
);
const GetReportCard = React.lazy(() =>
  import("../../pages/Teacher/GetReportCard"),
);
const GroupEdit = React.lazy(() => import("../../pages/Teacher/GroupEdit"));
const NotAcceptedTest = React.lazy(() =>
  import("../../pages/Teacher/NotAcceptedTest"),
);
const EditProfile = React.lazy(() => import("../../pages/Student/EditProfile"));
const AllPackages = React.lazy(() => import("../../pages/Student/AllPackages"));
const BuyPackage = React.lazy(() => import("../../pages/Student/BuyPackage"));
const Payment = React.lazy(() => import("../../pages/Student/Payment"));
const PurchaseInvoices = React.lazy(() =>
  import("../../pages/Student/PurchaseInvoices"),
);
const AllWallet = React.lazy(() => import("../../pages/Student/AllWallet"));
const SharedExamBuy = React.lazy(() =>
  import("../../pages/Student/SharedExamBuy"),
);
const ResultTest = React.lazy(() => import("../../pages/Student/ResultTest"));
const QuestionProblemReports = React.lazy(() =>
  import("../../pages/Student/QuestionProblemReports"),
);

const SamplePage = React.lazy(() => import("../../pages/Sample"));

function Layout(props) {
  var classes = useStyles();
  var inputClasses = useInputStyles();
  const [info, setInfo] = useState(null);

  // global
  var layoutState = useLayoutState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let token = localStorage.getItem("userToken");
    let res = await getInfo(token);
    setInfo({
      ...res.data,
      avatar: !res.data.avatar ? avatarPlaceholder : BASE_URL + res.data.avatar,
    });
  };

  const renderPage = Component => {
    return (
      <div
        className={classnames(classes.mainComp, "main-comp", {
          [classes.mainCompShift]: layoutState.isSidebarOpened,
        })}
      >
        {Component}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <>
        {info ? (
          <>
            <Header info={info} history={props.history} />
            {/* <TempDrawer/> */}
            <div
              className={classnames(classes.content, {
                [classes.contentShift]: layoutState.isSidebarOpened,
              })}
            >
              <div className={classes.fakeToolbar} />
              <Suspense fallback={<div>loading...</div>}>
                <Switch>
                  <Route
                    path="/dashboard/pishkhan"
                    component={props => {
                      return (
                        <div
                          className={classnames(classes.mainComp, "main-comp", {
                            [classes.mainCompShift]:
                              layoutState.isSidebarOpened,
                          })}
                        >
                          <Pishkhan
                            info={info}
                            layoutState={layoutState}
                            mainClasses={classes}
                            {...props}
                            classes={inputClasses}
                          />
                        </div>
                      );
                    }}
                  />

                  <Route
                    path="/dashboard/sample"
                    component={props =>
                      renderPage(
                        <SamplePage {...props} classes={inputClasses} />,
                      )
                    }
                  />

                  <Route
                    path="/dashboard/edit-profile"
                    component={props =>
                      renderPage(
                        <EditProfile {...props} classes={inputClasses} />,
                      )
                    }
                  />

                  <Route
                    path="/dashboard/test/finalizing"
                    component={props =>
                      renderPage(
                        <FinalizingTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/create"
                    component={props =>
                      renderPage(
                        <CreateTest {...props} classes={inputClasses} />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/shared-test"
                    component={props =>
                      renderPage(
                        <SharedExam
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/shared-test-buy"
                    component={props =>
                      renderPage(
                        <SharedExamBuy
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/management"
                    component={props =>
                      renderPage(
                        <ManagementTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/not-accepted"
                    component={props =>
                      renderPage(
                        <NotAcceptedTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/add-to-group/:id"
                    component={props =>
                      renderPage(
                        <AddToGroup
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/run/:id"
                    component={props =>
                      renderPage(
                        <RunTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/result/:id"
                    component={props =>
                      renderPage(
                        <ResultTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/edit/:id"
                    component={props =>
                      renderPage(
                        <EditTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/edit-and-run/:id"
                    component={props =>
                      renderPage(
                        <EditAndRunTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/print/:id"
                    component={props =>
                      renderPage(
                        <PrintTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/print-create-pdf/:id"
                    component={props =>
                      renderPage(
                        <PrintCreatePdf
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/test-answer-sheet/:id"
                    component={props =>
                      renderPage(
                        <TestAnswerSheet
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/create-report-card/:id"
                    component={props =>
                      renderPage(
                        <CreateReportCard
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/get-report-card/:id"
                    component={props =>
                      renderPage(
                        <GetReportCard
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/show/"
                    component={props =>
                      renderPage(
                        <ShowTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/auto/show/"
                    component={props =>
                      renderPage(
                        <AutoShowTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/pay/"
                    component={props =>
                      renderPage(
                        <PayTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/register-test"
                    component={props =>
                      renderPage(
                        <RegisterTest
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/test/question-problem-reports"
                    component={props =>
                      renderPage(
                        <QuestionProblemReports
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />

                  <Route
                    path="/dashboard/group"
                    component={props =>
                      renderPage(
                        <Group
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/group-buy"
                    component={props =>
                      renderPage(
                        <GroupBuy
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/group-add"
                    component={props =>
                      renderPage(
                        <GroupAdd
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/group-edit/:id"
                    component={props =>
                      renderPage(
                        <GroupEdit
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/group-management-teachers"
                    component={props =>
                      renderPage(
                        <AssignTeachers
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/group-management-advisors"
                    component={props =>
                      renderPage(
                        <AssignAdvisors
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/group-management-students"
                    component={props =>
                      renderPage(
                        <AssignStudents
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />

                  <Route
                    path="/dashboard/test"
                    component={props =>
                      renderPage(
                        <CreateTest {...props} classes={inputClasses} />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/packages"
                    component={props =>
                      renderPage(
                        <AllPackages
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/packages-buy/:id"
                    component={props =>
                      renderPage(
                        <BuyPackage
                          {...props}
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/packages-credit"
                    component={props =>
                      renderPage(<Credit {...props} classes={inputClasses} />)
                    }
                  />
                  <Route
                    path="/dashboard/packages-purchase-invoices"
                    component={props =>
                      renderPage(
                        <PurchaseInvoices {...props} classes={inputClasses} />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/packages-all-wallet"
                    component={props =>
                      renderPage(
                        <AllWallet {...props} classes={inputClasses} />,
                      )
                    }
                  />

                  <Route
                    path="/dashboard/subscription"
                    component={props =>
                      renderPage(
                        <Subscription
                          {...props}
                          info={info}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/subscription-credit"
                    component={props =>
                      renderPage(<Credit {...props} classes={inputClasses} />)
                    }
                  />
                  <Route
                    path="/dashboard/subscription-purchase-invoices"
                    component={props =>
                      renderPage(
                        <PurchaseInvoices {...props} classes={inputClasses} />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/subscription-all-wallet"
                    component={props =>
                      renderPage(
                        <AllWallet {...props} classes={inputClasses} />,
                      )
                    }
                  />

                  <Route
                    path="/dashboard/payment/:id"
                    component={props =>
                      renderPage(<Payment {...props} classes={inputClasses} />)
                    }
                  />

                  <Route
                    path="/dashboard/assessment"
                    component={props => renderPage(Pishkhan)}
                  />
                  <Route
                    path="/dashboard/invitation"
                    component={props =>
                      renderPage(
                        <Invitetion {...props} classes={inputClasses} />,
                      )
                    }
                  />
                  <Route
                    path="/dashboard/questions-report"
                    component={props =>
                      renderPage(
                        <QuestionProblemReports
                          layoutState={layoutState}
                          mainClasses={classes}
                          {...props}
                          classes={inputClasses}
                        />,
                      )
                    }
                  />
                </Switch>
              </Suspense>
            </div>
          </>
        ) : (
          <div
            style={{ background: "#3d82a4", height: "100vh", width: "100vw" }}
          >
            <Backdrop
              style={{ zIndex: 1000000, color: "#228b22" }}
              open={!info}
            >
              <CircularProgress
                classes={{ colorPrimary: classes.colorPrimary }}
              />
            </Backdrop>
          </div>
        )}
      </>
    </div>
  );
}

export default withRouter(Layout);
