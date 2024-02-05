import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: '#66A4E2',
    },
    "&:focus": {
      backgroundColor: '#328BE5',
    },
    backgroundColor: "#A0B4C8",
    borderRadius: '30px 30px 30px 30px',
    padding: '19px 0px',
    left: 0,
    height: "40px",
    width: '15%',
    zIndex: 200,
    marginLeft: "30px"
  },
  childrenLink: {
    textDecoration: "none",
    backgroundColor: "#75F256",
    "&:hover": {
      backgroundColor: '#FFD700',
    },
    "&:focus": {
      backgroundColor: '#119C04',
    },
    borderRadius: '30px 30px 30px 30px',
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
    left: 20,
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
    color: "#fff",
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
    paddingRight: theme.spacing(2) + 30,
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
