import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../../pages/Admin/dashboard/Dashboard";
// import Pishkhan from "../../../pages/Admin/Pishkhan";
import Books from "../../../pages/Admin/Books";
import QuestionPacks from "../../../pages/Admin/QuestionPacks";
import Discounts from "../../../pages/Admin/Discounts";
import Colleagues from "../../../pages/Admin/Colleagues";
import Sliders from "../../../pages/Admin/Sliders";
import PurchaseInvoices from "../../../pages/Admin/PurchaseInvoices";
import BamSchools from "../../../pages/Admin/BamSchools";

import QuestionProblemReports from "../../../pages/Admin/QuestionProblemReports";
import BamTeachers from "../../../pages/Admin/BamTeachers";
import HomeParameters from "../../../pages/Admin/HomeParameters";

import Students from "../../../pages/Admin/Students";
import Teachers from "../../../pages/Admin/Teachers";
import Advisors from "../../../pages/Admin/Advisors";
import Schools from "../../../pages/Admin/Schools";

// context
import { useLayoutState } from "../../../context/LayoutContext";
import { grades, lessons, books, fields } from "../../../api/services/tags";

function Layout(props) {
  var classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [gradesList, setGrades] = useState([]);
  const [lessonsList, setLessons] = useState([]);
  const [booksList, setBooks] = useState([]);
  const [fieldsList, setFields] = useState([]);

  // global
  var layoutState = useLayoutState();

  useEffect(() => {
    const asyncFetchDailyData = async () => {
      let gradesData = await grades();
      let fieldsData = await fields();
      let lessonsData = await lessons();
      let booksData = await books();

      setGrades(gradesData.data);
      setFields(fieldsData.data);
      setLessons(lessonsData.data);
      setBooks(
        booksData.data.map(el => {
          return { title: el.name, ...el };
        }),
      );
    };
    asyncFetchDailyData().then(() => setLoading(false));
  }, []);


  const WithProps = Component => {
    return (
      <Component
        grades={gradesList}
        books={booksList}
        fields={fieldsList}
        lessons={lessonsList}
      />
    );
  };

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          {!loading && (
            <Switch>
              <Route
                path="/admin/pishkhan"
                component={() => WithProps(Dashboard)}
              />
              <Route path="/admin/books" component={() => WithProps(Books)} />
              <Route
                path="/admin/question-packs"
                component={() => WithProps(QuestionPacks)}
              />
              <Route
                path="/admin/discounts"
                component={() => WithProps(Discounts)}
              />
              <Route
                path="/admin/bam-test-teachers"
                component={() => WithProps(BamTeachers)}
              />
               <Route
                path="/admin/bam-test-schools"
                component={() => WithProps(BamSchools)}
              />
              <Route
                path="/admin/colleagues"
                component={() => WithProps(Colleagues)}
              />
              <Route
                path="/admin/sliders"
                component={() => WithProps(Sliders)}
              />
              <Route
                path="/admin/purchase-invoices"
                component={() => WithProps(PurchaseInvoices)}
              />
              <Route
                path="/admin/question-problem-reports"
                component={() => WithProps(QuestionProblemReports)}
              />
              <Route
                path="/admin/home-page-parameters"
                component={() => WithProps(HomeParameters)}
              />

              <Route
                path="/admin/students"
                component={() => WithProps(Students)}
              />
              <Route
                path="/admin/teachers"
                component={() => WithProps(Teachers)}
              />
              <Route
                path="/admin/advisors"
                component={() => WithProps(Advisors)}
              />
              <Route
                path="/admin/schools"
                component={() => WithProps(Schools)}
              />
            </Switch>
          )}
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
