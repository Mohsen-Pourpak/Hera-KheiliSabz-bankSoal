import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "200vw",
    overflowX: "hidden",
    backgroundColor: '#CBF2CF',
  },
  content: {
    flexGrow: 1,
    padding: 0,
    width: `calc(100vw - 100px)`,
    minHeight: "100vh",
  },
  contentShift: {
    width: `calc(100vw - ${200 + theme.spacing(2)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mainComp: {
    width: '100vw',
  },
  mainCompShift: {
    width: `100%`,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  mainRoot: {
    backgroundColor: '#000',
    opacity: 0.1
  }
}));
