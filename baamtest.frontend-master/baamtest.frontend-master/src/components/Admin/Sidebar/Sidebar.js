import React, { useEffect, useState } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {ArrowBack as ArrowBackIcon, AccountBalance,
  Home, RecordVoiceOver, PeopleAlt, Person, PersonAdd,
  Receipt, SupervisorAccount, CardGiftcard, Settings,
  Slideshow, MenuBook, Dns, ErrorOutline,School
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// context
import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../../context/LayoutContext";

const structure = [
  { id: 0, label: "پیشخوان", link: "/admin/pishkhan", icon: <Home/> },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "مدیریت کاربران" },
  { id: 7, label: "مدارس", link: "/admin/schools", icon: <AccountBalance/> },
  { id: 8, label: "مشاوران", link: "/admin/advisors", icon: <RecordVoiceOver/> },
  { id: 9, label: "دبیران", link: "/admin/teachers", icon: <Person/> },
  { id: 10, label: "دانش آموزان", link: "/admin/students", icon: <PeopleAlt/> },
  { id: 11, type: "divider" },
  { id: 12, type: "title", label: "مدیریت سایت" },
  { id: 13, label: "تنظیمات سایت", link: "/admin/home-page-parameters", icon: <Settings/> },
  { id: 14, label: "دبیران بام تست", link: "/admin/bam-test-teachers", icon: <PersonAdd/> },
  { id: 14, label: "مدارس  بام تست", link: "/admin/bam-test-schools", icon: <School/> },
  { id: 15, label: "همکاران", link: "/admin/colleagues", icon: <SupervisorAccount/> },
  { id: 16, label: "تخفیف ها", link: "/admin/discounts", icon: <CardGiftcard/> },
  { id: 17, label: "رسید های پرداخت", link: "/admin/purchase-invoices", icon: <Receipt/> },
  { id: 18, label: "پک های سوال", link: "/admin/question-packs", icon: <Dns/> },
  { id: 19, label: "کتاب ها", link: "/admin/books", icon: <MenuBook/> },
  { id: 20, label: "اسلایدر ها", link: "/admin/sliders", icon: <Slideshow/> },
  { id: 21, label: "گزارش خطای سوالات", link: "/admin/question-problem-reports", icon: <ErrorOutline/> },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar}/>
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
