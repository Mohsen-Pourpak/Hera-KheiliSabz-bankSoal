import React, { useEffect, useState } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon,
  PeopleAlt as TeachersIcon,
  Language as LanguageIcon,
  ImportContacts as BookIcon,
  LocalLibrary as LessonIcon,
  CastForEducation as CoursesIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  NotificationsNone as NotificationsIcon,
  QuestionAnswer as SupportIcon,
  Book,
  ViewList,
  Movie as MovieIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
// context
import logo from "../../images/لوگو-خیلی-سبز.png";
import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../context/LayoutContext";
import ActivePishkhan from "../../images/sidbar-icons/piskhan-icon.svg";
import Pishkhan from "../../images/sidbar-icons/piskhan-w-icon.svg";
import ActiveTests from "../../images/sidbar-icons/tests-icon.svg";
import Tests from "../../images/sidbar-icons/tests-w-icon.svg";
import ActivePack from "../../images/sidbar-icons/pack-icon.svg";
import Pack from "../../images/sidbar-icons/pack-w-icon.svg";
import ActiveCup from "../../images/sidbar-icons/cup-icon.svg";
import Cup from "../../images/sidbar-icons/cup-w-icon.svg";
import ActiveFriends from "../../images/sidbar-icons/friends-icon.svg";
import Friends from "../../images/sidbar-icons/friends-w-icon.svg";
import ActiveGroup from "../../images/sidbar-icons/group-icon.svg";
import Group from "../../images/sidbar-icons/group-w-icon.svg";
import ActiveQuestions from "../../images/sidbar-icons/questions-icon.svg";
import Questions from "../../images/sidbar-icons/questions-w-icon.svg";

const BaseIcon = (icon) => {
  return <img src={icon} style={{width: 18}} />
}

const schoolMenus = [{
  id: 0,
  label: "پیشخوان",
  link: "/dashboard/pishkhan",
  icon: BaseIcon(Pishkhan),
  activeIcon: BaseIcon(ActivePishkhan)
}, {
  id: 1,
  label: "آزمون ها",
  link: "/dashboard/test",
  icon: BaseIcon(Tests),
  activeIcon: BaseIcon(ActiveTests),
  children: [
    {
      label: "ساخت آزمون",
      link: "/dashboard/test/create",
    },
    {
      label: "مدیریت آزمون",
      link: "/dashboard/test/management",
    },
    {
      label: "آزمون درانتظارتایید",
      link: "/dashboard/test/not-accepted",
    }
    // {
    //   label: "آزمون اشتراکی",
    //   link: "/dashboard/test/shared-test",
    // }
  ],
},
//  {
//   id: 2,
//   label: "اشتراک",
//   link: "/dashboard/subscription",
//   icon: BaseIcon(Pack),
//   activeIcon: BaseIcon(ActivePack),
//   children: [
//     // {
//     //   label: "اشتراک",
//     //   link: "/dashboard/subscription",
//     // },
//     {
//       label: "افزایش اعتبار",
//       link: "/dashboard/subscription-credit",
//     },
//     {
//       label: "رسید پرداخت",
//       link: "/dashboard/subscription-purchase-invoices",
//     },
//     {
//       label: "تراکنش ها",
//       link: "/dashboard/subscription-all-wallet",
//     }
//   ],
// }, 
{
  id: 3,
  label: "زیرگروه",
  link: "/dashboard/group",
  icon: BaseIcon(Group),
  activeIcon: BaseIcon(ActiveGroup),
  children: [
    {
      label: "مدیریت کلاس ها",
      link: "/dashboard/group",
    },
    {
      label: "خرید زیرگروه",
      link: "/dashboard/group-buy",
    },
    {
      label: "مدیریت دبیرها",
      link: "/dashboard/group-management-teachers",
    },
    {
      label: "مدیریت مشاورها",
      link: "/dashboard/group-management-advisors",
    },
    {
      label: "مدیریت دانش آموزان",
      link: "/dashboard/group-management-students",
    }
  ],
}, {
  id: 5,
  label: "گزارش خطای سوال",
  link: "/dashboard/questions-report",
  icon: BaseIcon(Questions),
  activeIcon: BaseIcon(ActiveQuestions)
}, 
// {
//   id: 6,
//   label: "دعوت از دوستان",
//   link: "/dashboard/invitation",
//   icon: BaseIcon(Friends),
//   activeIcon: BaseIcon(ActiveFriends)
// }
];

const advisorsMenus = [{
  id: 0,
  label: "پیشخوان",
  link: "/dashboard/pishkhan",
  icon: BaseIcon(Pishkhan),
  activeIcon: BaseIcon(ActivePishkhan)
}, {
  id: 1,
  label: "آزمون ها",
  link: "/dashboard/test",
  icon: BaseIcon(Tests),
  activeIcon: BaseIcon(ActiveTests),
  children: [
    {
      label: "ساخت آزمون",
      link: "/dashboard/test/create",
    },
    {
      label: "مدیریت آزمون",
      link: "/dashboard/test/management",
    },
    {
      label: "آزمون درانتظارتایید",
      link: "/dashboard/test/not-accepted",
    }
    // {
    //   label: "آزمون اشتراکی",
    //   link: "/dashboard/test/shared-test",
    // }
  ],
}, {
  id: 2,
  label: "اشتراک",
  link: "/dashboard/subscription",
  icon: BaseIcon(Pack),
  activeIcon: BaseIcon(ActivePack),
  children: [
    // {
    //   label: "اشتراک",
    //   link: "/dashboard/subscription",
    // },
    {
      label: "افزایش اعتبار",
      link: "/dashboard/subscription-credit",
    },
    {
      label: "رسید پرداخت",
      link: "/dashboard/subscription-purchase-invoices",
    },
    {
      label: "تراکنش ها",
      link: "/dashboard/subscription-all-wallet",
    }
  ],
}, {
  id: 3,
  label: "زیرگروه",
  link: "/dashboard/group",
  icon: BaseIcon(Group),
  activeIcon: BaseIcon(ActiveGroup),
  children: [
    {
      label: "مدیریت کلاس ها",
      link: "/dashboard/group",
    },
    {
      label: "خرید زیرگروه",
      link: "/dashboard/group-buy",
    },
    {
      label: "مدیریت دبیرها",
      link: "/dashboard/group-management-teachers",
    },
    {
      label: "مدیریت دانش آموزان",
      link: "/dashboard/group-management-students",
    }
  ],
}, {
  id: 5,
  label: "گزارش خطای سوال",
  link: "/dashboard/questions-report",
  icon: BaseIcon(Questions),
  activeIcon: BaseIcon(ActiveQuestions)
}, {
  id: 6,
  label: "دعوت از دوستان",
  link: "/dashboard/invitation",
  icon: BaseIcon(Friends),
  activeIcon: BaseIcon(ActiveFriends)
}
];

const teacherMenus = [{
  id: 0,
  label: "پیشخوان",
  link: "/dashboard/pishkhan",
  icon: BaseIcon(Pishkhan),
  activeIcon: BaseIcon(ActivePishkhan)
}, {
  id: 1,
  label: "آزمون ها",
  link: "/dashboard/test",
  icon: BaseIcon(Tests),
  activeIcon: BaseIcon(ActiveTests),
  children: [
    {
      label: "ساخت آزمون",
      link: "/dashboard/test/create",
    },
    {
      label: "مدیریت آزمون",
      link: "/dashboard/test/management",
    }
    // {
    //   label: "آزمون اشتراکی",
    //   link: "/dashboard/test/shared-test",
    // }
  ],
}, {
  id: 2,
  label: "اشتراک",
  link: "/dashboard/subscription",
  icon: BaseIcon(Pack),
  activeIcon: BaseIcon(ActivePack),
  children: [
    // {
    //   label: "اشتراک",
    //   link: "/dashboard/subscription",
    // },
    {
      label: "افزایش اعتبار",
      link: "/dashboard/subscription-credit",
    },
    {
      label: "رسید پرداخت",
      link: "/dashboard/subscription-purchase-invoices",
    },
    {
      label: "تراکنش ها",
      link: "/dashboard/subscription-all-wallet",
    }
  ],
}, {
  id: 3,
  label: "زیرگروه",
  link: "/dashboard/group",
  icon: BaseIcon(Group),
  activeIcon: BaseIcon(ActiveGroup),
  children: [
    {
      label: "مدیریت کلاس ها",
      link: "/dashboard/group",
    },
    {
      label: "خرید زیرگروه",
      link: "/dashboard/group-buy",
    },
    {
      label: "مدیریت دانش آموزان",
      link: "/dashboard/group-management-students",
    }
  ],
}, {
  id: 5,
  label: "گزارش خطای سوال",
  link: "/dashboard/questions-report",
  icon: BaseIcon(Questions),
  activeIcon: BaseIcon(ActiveQuestions)
}, {
  id: 6,
  label: "دعوت از دوستان",
  link: "/dashboard/invitation",
  icon: BaseIcon(Friends),
  activeIcon: BaseIcon(ActiveFriends)
}
];

const studentMenus = [{
  id: 0,
  label: "پیشخوان",
  link: "/dashboard/pishkhan",
  icon: BaseIcon(Pishkhan),
  activeIcon: BaseIcon(ActivePishkhan)
}, {
  id: 1,
  label: "آزمون ها",
  link: "/dashboard/test",
  icon: BaseIcon(Tests),
  activeIcon: BaseIcon(ActiveTests),
  children: [
    {
      label: "ساخت آزمون",
      link: "/dashboard/test/create",
    },
    {
      label: "مدیریت آزمون",
      link: "/dashboard/test/management",
    }
    // {
    //   label: "آزمون اشتراکی",
    //   link: "/dashboard/test/shared-test",
    // },
  ],
}, {
  id: 2,
  label: "خرید پک سوال",
  link: "/dashboard/packages",
  icon: BaseIcon(Pack),
  activeIcon: BaseIcon(ActivePack),
  children: [
    {
      label: "خرید پک سوال",
      link: "/dashboard/packages",
    },
    {
      label: "افزایش اعتبار",
      link: "/dashboard/packages-credit",
    },
    {
      label: "رسید پرداخت",
      link: "/dashboard/packages-purchase-invoices",
    },
    {
      label: "تراکنش ها",
      link: "/dashboard/packages-all-wallet",
    }
  ],
}, {
  id: 4,
  label: "دعوت از دوستان",
  link: "/dashboard/invitation",
  icon: BaseIcon(Friends),
  activeIcon: BaseIcon(ActiveFriends)
}
];

function Sidebar({ location, history }) {
  var classes = useStyles();
  var theme = useTheme();

  const [currentStorage, SyncWithLocalStorage] = useState(localStorage || {});

  window.addEventListener("storage", e => {
    SyncWithLocalStorage(localStorage);
  });

  var user_type = currentStorage.getItem('userType')
  var structure = user_type === 'School' ? schoolMenus : user_type === 'Teacher' ? teacherMenus : user_type === 'Advisor' ? advisorsMenus : studentMenus

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
        <img onClick={() => history.push({ pathname: '/home' })} style={{cursor: 'pointer'}} src={logo} alt="logo" className={classNames(classes.drawer, {
          [classes.logoOpen]: isSidebarOpened,
          [classes.logoClose]: !isSidebarOpened,
        })} />
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
