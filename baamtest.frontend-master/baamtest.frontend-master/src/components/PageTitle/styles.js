import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  typo: {
    color: theme.palette.text.hint,
  },
  button: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
}));
