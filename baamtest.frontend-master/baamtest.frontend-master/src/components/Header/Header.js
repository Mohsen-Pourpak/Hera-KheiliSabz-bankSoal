import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";

import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore,
} from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";
import mask from "../../images/mask.svg";
import logo from "../../images/لوگو-خیلی-سبز.png";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";
import { getUserTypeStr, toFA, txtToPrice } from "../../utils/Utils";

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

const BaseIcon = icon => {
  return <img src={icon} style={{ width: 18 }} />;
};

const schoolMenus = [
  {
    id: 0,
    label: "پیشخوان",
    link: "/dashboard/pishkhan",
    icon: BaseIcon(Pishkhan),
    activeIcon: BaseIcon(ActivePishkhan),
  },
  {
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
      },
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
      },
    ],
  },
  {
    id: 5,
    label: "گزارش خطای سوال",
    link: "/dashboard/questions-report",
    icon: BaseIcon(Questions),
    activeIcon: BaseIcon(ActiveQuestions),
  },
  // {
  //   id: 6,
  //   label: "دعوت از دوستان",
  //   link: "/dashboard/invitation",
  //   icon: BaseIcon(Friends),
  //   activeIcon: BaseIcon(ActiveFriends)
  // }
];

const advisorsMenus = [
  {
    id: 0,
    label: "پیشخوان",
    link: "/dashboard/pishkhan",
    icon: BaseIcon(Pishkhan),
    activeIcon: BaseIcon(ActivePishkhan),
  },
  {
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
      },
      // {
      //   label: "آزمون اشتراکی",
      //   link: "/dashboard/test/shared-test",
      // }
    ],
  },
  {
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
      },
    ],
  },
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
        label: "مدیریت دانش آموزان",
        link: "/dashboard/group-management-students",
      },
    ],
  },
  {
    id: 5,
    label: "گزارش خطای سوال",
    link: "/dashboard/questions-report",
    icon: BaseIcon(Questions),
    activeIcon: BaseIcon(ActiveQuestions),
  },
  {
    id: 6,
    label: "دعوت از دوستان",
    link: "/dashboard/invitation",
    icon: BaseIcon(Friends),
    activeIcon: BaseIcon(ActiveFriends),
  },
];

const teacherMenus = [
  {
    id: 0,
    label: "پیشخوان",
    link: "/dashboard/pishkhan",
    icon: BaseIcon(Pishkhan),
    activeIcon: BaseIcon(ActivePishkhan),
  },
  {
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
      // {
      //   label: "آزمون اشتراکی",
      //   link: "/dashboard/test/shared-test",
      // }
    ],
  },
  {
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
      },
    ],
  },
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
        label: "مدیریت دانش آموزان",
        link: "/dashboard/group-management-students",
      },
    ],
  },
  {
    id: 5,
    label: "گزارش خطای سوال",
    link: "/dashboard/questions-report",
    icon: BaseIcon(Questions),
    activeIcon: BaseIcon(ActiveQuestions),
  },
  {
    id: 6,
    label: "دعوت از دوستان",
    link: "/dashboard/invitation",
    icon: BaseIcon(Friends),
    activeIcon: BaseIcon(ActiveFriends),
  },
];

const studentMenus = [
  {
    id: 0,
    label: "پیشخوان",
    link: "/dashboard/pishkhan",
    icon: BaseIcon(Pishkhan),
    activeIcon: BaseIcon(ActivePishkhan),
  },
  {
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
      // {
      //   label: "آزمون اشتراکی",
      //   link: "/dashboard/test/shared-test",
      // },
    ],
  },
  {
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
      },
    ],
  },
  {
    id: 4,
    label: "دعوت از دوستان",
    link: "/dashboard/invitation",
    icon: BaseIcon(Friends),
    activeIcon: BaseIcon(ActiveFriends),
  },
];

// function Sidebar({ location, history }) {
//   var classes = useStyles();
//   var theme = useTheme();

//   const [currentStorage, SyncWithLocalStorage] = useState(localStorage || {});

//   window.addEventListener("storage", e => {
//     SyncWithLocalStorage(localStorage);
//   });

//   var user_type = currentStorage.getItem('userType')
//   var structure = user_type === 'School' ? schoolMenus : user_type === 'Teacher' ? teacherMenus : user_type === 'Advisor' ? advisorsMenus : studentMenus

//   // local
//   var [isPermanent, setPermanent] = useState(true);

//   useEffect(function() {
//     window.addEventListener("resize", handleWindowWidthChange);
//     handleWindowWidthChange();
//     return function cleanup() {
//       window.removeEventListener("resize", handleWindowWidthChange);
//     };
//   });
// }

export const CustomMenu = ({ open, anchorEl, onClose, children }) => {
  const classes = useStyles();

  return (
    <Menu
      id="profile-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      className={classes.headerMenu}
      classes={{ paper: classes.profileMenu }}
      disableAutoFocusItem
    >
      {children}
    </Menu>
  );
};

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  // local
  var [name, setName] = useState("");
  var [star, setStar] = useState("");
  var [starDecimal, setStarDecimal] = useState("");
  var [avatar, setAvatar] = useState("");
  var [balance, setBalance] = useState("");
  var [userTypeStr, setUserTypeStr] = useState(null);
  var [expired, setExpired] = useState("");
  var [profileMenu, setProfileMenu] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  const [currentStorage, SyncWithLocalStorage] = useState(localStorage || {});

  window.addEventListener("storage", e => {
    SyncWithLocalStorage(localStorage);
  });

  var user_type = currentStorage.getItem("userType");
  var structure =
    user_type === "School"
      ? schoolMenus
      : user_type === "Teacher"
      ? teacherMenus
      : user_type === "Advisor"
      ? advisorsMenus
      : studentMenus;

  const getUserInfo = async () => {
    // let token = localStorage.getItem("userToken");
    let userType = localStorage.getItem("userType");

    let info = props.info;

    if (props.info) {
      setUserTypeStr(getUserTypeStr(userType));
      setName(info.name);
      setAvatar(info.avatar);
      setExpired(info.expireTime);
      setBalance(toFA(txtToPrice(parseInt(info.balance))));
      setStar(toFA(parseInt(info.stars)));
      setStarDecimal(
        toFA(info.stars.toFixed(4))
          .toString()
          .split(".")[1],
      );
    }
  };

  const Mask = ({ image, size }) => (
    <div
      style={{
        height: size,
        width: size,
        maskImage: `url("${mask}")`,
        WebkitMaskImage: `url("${mask}")`,
        maskSize: size,
        WebkitMaskSize: size,
      }}
    >
      <img src={image} style={{ width: size }} alt="" />
    </div>
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/* <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton> */}
        {
          <Fade
            enter
            in={Boolean(
              balance !== "" &&
                userTypeStr !== "" &&
                star !== "" &&
                name !== "" &&
                avatar !== "",
            )}
          >
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <img
                // onClick={() => push({ pathname: "/home" })}
                style={{ width: "50px", height: "40px" }}
                src={logo}
                alt="logo"
              />
              <Typography
                variant="h6"
                weight="medium"
                className={classes.logotype}
              >
                داشبورد {userTypeStr} " {name} "
              </Typography>

              <List>
                <ListItem button>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="آزمون ها" style={{ color: "#000" }} />
                </ListItem>
              </List>

              <div className={classes.grow} />
              {/* <div style={{ color: "black", marginLeft: 10 }}>
                {`کیف پول شما: ${balance} تومان`}{' '}|{' '}{`ستاره: ${star}`}<span style={{ fontSize: 10 }}>.{starDecimal}</span>
              </div> */}
              <div style={{ color: "black", marginLeft: 10 }}>
                {`کیف پول شما: ${balance} تومان`}
              </div>

              <Mask image={avatar} size={55} />

              {/* <IconButton
                aria-haspopup="true"
                color="inherit"
                className={classes.headerMenuButton}
                aria-controls="profile-menu"
                onClick={e => setProfileMenu(e.currentTarget)}
              >
                <ExpandMore classes={{ root: classes.headerIcon }} />
                <Typography variant="h6" weight="medium" style={{ marginRight: 10 }}>
                  {name}
                </Typography>
              </IconButton> */}
            </div>
          </Fade>
        }
        <CustomMenu
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              outline: "none",
            }}
          >
            <div style={{ marginLeft: 20, marginTop: 10 }}>
              <Mask image={avatar} size={75} />
            </div>
            <div className={classes.profileMenuUser} style={{ color: "black" }}>
              <Typography variant="h5" weight="medium">
                {name}
              </Typography>
              <Typography className={classes.profileMenuLink} color="primary">
                {userTypeStr}
              </Typography>
            </div>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography variant="h7" weight="medium" style={{ color: "#888" }}>
              {toFA(expired)} روز باقی مانده از اشتراک شما
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              style={{ color: "#fe5f55" }}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              خروج
            </Typography>
          </div>
        </CustomMenu>
      </Toolbar>
    </AppBar>
  );
}
