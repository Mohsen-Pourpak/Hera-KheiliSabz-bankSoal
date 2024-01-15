import React from "react";
import { makeStyles } from "@material-ui/core";

import { toFA } from "../../utils/Utils";

import logo from "../../images/logo-p.png";

const useStyles = makeStyles({
  header: ({ fontFamily, fontSize, rowGap, columnGap }: any) => ({
    rowGap: rowGap + "mm",
    columnGap: columnGap + "mm",
    "& *": {
      fontFamily,
      fontSize,
    },
  }),
});

const Heading = React.forwardRef(
  (
    {
      customLogo,
      title,
      headingBoxs,
      suggestTime,
      isPrintMode,
      fontFamily,
      fontSize,
      rowGap,
      columnGap,
      showHeaderLine,
    }: {
      customLogo?: string;
      title?: string;
      suggestTime?: number;
      headingBoxs: string[];
      isPrintMode?: boolean;
      fontFamily: string;
      fontSize: number;
      rowGap: number;
      columnGap: number;
      showHeaderLine: boolean;
    },
    ref?: React.LegacyRef<HTMLDivElement>,
  ) => {
    const classes = useStyles({
      fontFamily,
      fontSize,
      rowGap,
      columnGap,
    });

    return (
      <div
        ref={ref}
        id={`t_1${isPrintMode ? "_p" : ""}`}
        style={{
          borderBottom: showHeaderLine ? "1px solid #000" : "none",
          //height: 100,
          width: "100%",
          margin: "2px 0",
          display: "flex",
          justifyContent: "space-between",
          letterSpacing: "normal",
          flex: "0 0 auto",
        }}
      >
        <div
          className={classes.header}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr",
            width: "100%",
            paddingRight: 10,
          }}
        >
          <div style={{ fontWeight: "bold" }}>{title}</div>
          <div>{toFA(suggestTime)} </div>
          {headingBoxs.map(text => (
            <div>{text}</div>
          ))}
        </div>
        <img src={customLogo || logo} alt="logo" style={{ height: "86px" }} />
      </div>
    );
  },
);

export default Heading;
