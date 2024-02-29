import React, { useState } from "react";
import {
  ClickAwayListener,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
// import { Inbox as InboxIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

// import ActiveLink from "../../../../images/sidbar-icons/active-link.svg";

// styles
import useStyles from "./styles";

// components
import Dot from "../Dot";

export default function SidebarLink({
  link,
  icon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type,
  activeIcon,
}) {
  var classes = useStyles();

  console.log(type);

  // local
  var [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  const headerLinkOnClickHandler = () => {
    setOpen(!open);
  };
  const headerLinksClickAwayHandler = () => {
    setOpen(!open);
  };

  if (type === "title")
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;

  if (!children)
    return (
      <ListItem
        // onClick={headerLinksOnClickHandler}
        button
        component={link && Link}
        to={link}
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {nested ? (
            <Dot color={"#000" && "#000"} />
          ) : isLinkActive ? (
            activeIcon
          ) : (
            icon
          )}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
        {/* {isLinkActive && <img src={ActiveLink} style={{height: 124, position: 'absolute', left: 0, marginTop: -7}} />} */}
      </ListItem>
    );

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setOpen(false);
        }}
      >
        <ListItem
          button
          component={link && Link}
          onClick={headerLinkOnClickHandler}
          to={link}
          className={classes.link}
          classes={{
            root: classnames(classes.linkRoot, {
              [classes.linkActive]: isLinkActive && !nested,
              [classes.linkNested]: nested,
            }),
          }}
        >
          <ListItemIcon
            className={classnames(classes.linkIcon, {
              [classes.linkIconActive]: isLinkActive,
            })}
          >
            {nested ? (
              <Dot color={isLinkActive && "primary"} />
            ) : isLinkActive ? (
              activeIcon
            ) : (
              icon
            )}
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classnames(classes.linkText, {
                [classes.linkTextActive]: isLinkActive,
                [classes.linkTextHidden]: !isSidebarOpened,
              }),
            }}
            primary={label}
          ></ListItemText>

          {open ? (
            <ExpandLess color="secondary" />
          ) : (
            <ExpandMore color="secondary" />
          )}

          {/* {isLinkActive && <img src={ActiveLink} style={{height: 124, position: 'absolute', left: 0, marginTop: -7}} />} */}
        </ListItem>
      </ClickAwayListener>
      {children && (
        <Collapse
          in={open && isLinkActive}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List
            component="div"
            style={{
              position: "absolute",
              marginRight: "-150px",
              backgroundColor: "#FFFFFF",
              zIndex: 200,
              marginTop: "1.3rem",
              borderRadius: "0.4rem"
              // paddingLeft: "10px",
              // paddingRight: "10px",
            }}
          >
            {children.map(childrenLink => (
              <ListItem
                button
                component={link && Link}
                to={childrenLink.link}
                className={classes.childrenLink}
                onClick={headerLinkOnClickHandler}
                classes={{
                  root: classnames(classes.linkRoot, {
                    [classes.linkRoot]: isLinkActive && !nested,
                    [classes.linkNested]: nested,
                  }),
                }}
              >
                <ListItemText
                  style={{
                    textAlign: "center",
                    color: "#000",
                    paddingRight: "15px",
                    paddingLeft: "15px",
                  }}
                  classes={{
                    primary: classnames(classes.linkText, {
                      [classes.childernLinkText]: isLinkActive,
                      [classes.linkTextHidden]: !isSidebarOpened,
                    }),
                  }}
                  primary={childrenLink.label}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

  // ###########################################################

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
