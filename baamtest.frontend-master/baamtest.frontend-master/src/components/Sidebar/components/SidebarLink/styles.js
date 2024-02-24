import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: '#A3BC57',
    },
    "&:focus": {
      backgroundColor: '#A3BC57',
    },
    // backgroundColor: "#A0B4C8",
    borderRadius: '10px 10px 10px 10px',
    padding: '19px 0px',
    left: 0,
    height: "40px",
    width: '15%',
    zIndex: 200,
    marginLeft: "30px"
  },
  childrenLink: {
    textDecoration: "none",
    backgroundColor: "#C6CFC3",
    "&:hover": {
      backgroundColor: '#A3BC57',
    },
    "&:focus": {
      backgroundColor: '#A3BC57',
    },

    marginTop: "5px",
    padding: '5px 0px',
    left: 0,
    width: '100%',
    zIndex: 200
  },
  linkActive: {
    backgroundColor: '#119C04',
    "&:hover, &:focus": {
      backgroundColor: '#119C04',
    },
    height: "40px",
    // marginLeft: "50px",
    width: '15%',
    zIndex: 200
  },
  linkNested: {
    paddingRight: 0,
    "&:hover, &:focus": {
      backgroundColor: "#FFFFFF",
    },
  },
  linkIcon: {
    marginLeft: theme.spacing(0.2),
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
    zIndex: 200
  },
  linkIconActive: {
    color: theme.palette.primary.main,
    zIndex: 200
  },
  linkText: {
    padding: 0,
    color: '#000',
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 14,
  },
  childernLinkText: {
    color: "#000",
    paddingLeft: "10px"
  },
  linkTextActive: {
    opacity: 1,
    color: '#000',
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingRight: theme.spacing(2) + 30
  },
  sectionTitle: {
    marginRight: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
