import { makeStyles } from "@material-ui/styles";

const drawerWidth = 230;

export default makeStyles(theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  // leftElement: {
  //   height: 'calc(100% - 60px)',
  //   backgroundColor: '#119C04',
  //   width: 100,
  //   position: 'absolute',
  //   right: -85,
  //   top: 60,
  //   borderTopLeftRadius: 100,
  //   filter: 'blur(5px)'
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: 'none',
    backgroundColor: '#CBF2CF',
    overflowX: "hidden",
  },
  logoOpen: {
    width: '70%',
    opacity: 1,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: 'relative',
    marginRight: '15%',
    marginLeft: '15%',
    marginTop: 20,
    marginBottom: 20
  },
  logoClose: {
    width: '70%',
    opacity: 0,
    transition: theme.transitions.create("opacity", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: 'relative',
    marginRight: '15%',
    marginLeft: '15%',
    marginTop: 0,
    marginBottom: 20
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(0),
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    },
    border: 'none',
    backgroundColor: '#FFFF00',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidebarList: {
    paddingBottom: 30
  },
  mobileBackButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(0.625),
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
