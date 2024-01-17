import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import ReactToPrint from "react-to-print";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#228B22",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    "& :hover": {
      color: "#fe5f55",
    },
  },
});

export default function PrintBtn({
  content,
}: {
  content: () => React.ReactInstance;
}) {
  const classes = useStyles();

  return (
    <ReactToPrint
      trigger={() => <Button className={classes.root}>پرینت آزمون</Button>}
      content={content}
    />
  );
}
