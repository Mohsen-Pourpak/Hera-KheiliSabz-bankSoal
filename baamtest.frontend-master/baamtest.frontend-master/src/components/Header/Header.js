import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Fade
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore
} from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "./styles";

// components
import { Typography, } from "../Wrappers/Wrappers";
import mask from '../../images/mask.svg'

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";
import { getUserTypeStr, toFA, txtToPrice } from "../../utils/Utils";

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
}

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  // local
  var [name, setName] = useState('');
  var [star, setStar] = useState('');
  var [starDecimal, setStarDecimal] = useState('');
  var [avatar, setAvatar] = useState('')
  var [balance, setBalance] = useState('');
  var [userTypeStr, setUserTypeStr] = useState(null);
  var [expired, setExpired] = useState('');
  var [profileMenu, setProfileMenu] = useState(null);

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    // let token = localStorage.getItem("userToken");
    let userType = localStorage.getItem("userType");

    let info = props.info

    if (props.info) {
      setUserTypeStr(getUserTypeStr(userType))
      setName(info.name)
      setAvatar(info.avatar)
      setExpired(info.expireTime)
      setBalance(toFA(txtToPrice(parseInt(info.balance))))
      setStar(toFA(parseInt(info.stars)))
      setStarDecimal(toFA(info.stars.toFixed(4)).toString().split('.')[1])
    }
  }

  const Mask = ({ image, size }) => (
    <div style={{ height: size, width: size, maskImage: `url("${mask}")`, WebkitMaskImage: `url("${mask}")`, maskSize: size, WebkitMaskSize: size }}>
      <img src={image} style={{ width: size }} alt="" />
    </div>
  )

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
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
        </IconButton>

        {(
          <Fade enter in={Boolean(balance !== '' && userTypeStr !== '' && star !== '' && name !== '' && avatar !== '')}>
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', flex: 1}}>
              <Typography variant="h6" weight="medium" className={classes.logotype}>
                داشبورد {userTypeStr}  " {name} "
              </Typography>
              <div className={classes.grow} />
              <div style={{ color: "black", marginLeft: 10 }}>
                {`اعتبار: ${balance} تومان`}{' '}|{' '}{`ستاره: ${star}`}<span style={{ fontSize: 10 }}>.{starDecimal}</span>
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
        )}
        <CustomMenu
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse', outline: 'none' }}>
            <div style={{ marginLeft: 20, marginTop: 10 }}>
              <Mask image={avatar} size={75} />
            </div>
            <div className={classes.profileMenuUser} style={{color: "black"}}>
              <Typography variant="h5" weight="medium">
                {name}
              </Typography>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
              >
                {userTypeStr}
              </Typography>
            </div>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography variant="h7" weight="medium" style={{ color: '#888' }}>
              {toFA(expired)} روز باقی مانده از اشتراک شما
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              style={{ color: '#fe5f55' }}
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
