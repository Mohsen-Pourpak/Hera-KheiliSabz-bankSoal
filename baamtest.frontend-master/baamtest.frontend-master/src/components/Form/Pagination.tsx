import React from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { toFA } from "../../utils/Utils";
import { ArrowBackIos, ArrowForwardIos, MoreHoriz } from "@material-ui/icons";

const useStyles = makeStyles({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    alignItems: "center",
    gridGap: 5,
    display: "flex",
    fontFamily: "'Dana' !important",
  },
  pageButton: {
    border: "none",
    minWidth: 35,
    paddingTop: 5,
    height: 35,
    fontSize: 16,
    borderRadius: 30,
    outline: "none",
    cursor: "pointer",
    fontFamily: "'Dana' !important",
  },
  nextButton: {
    border: "none",
    height: 35,
    fontSize: 16,
    padding: "0 20px",
    borderRadius: 30,
    outline: "none",
    color: "#3d82a4",
    fontFamily: "'Dana' !important",
  },
});

interface PaginationProps {
  count?: number;
  page?: number;
  bgColor?: string;
  onChange: (e: any, p: number) => void;
}

export default function Pagination({
  count,
  onChange,
  page,
  bgColor,
}: PaginationProps) {
  const classes = useStyles();
  const { items } = usePagination({ count, onChange, page });
  let color = bgColor ? bgColor : "#f4faff";

  return (
    <nav style={{ margin: "10px 0" }}>
      <ul className={classes.ul}>
        {items.map(({ page, type, selected, disabled, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = (
              <div
                className={classes.pageButton}
                style={{
                  color: "#3d82a4",
                  cursor: "auto",
                  background: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                {...item}
              >
                <MoreHoriz
                  style={{
                    fill: "#3d82a4",
                    fontSize: 13,
                    position: "relative",
                    top: -1,
                  }}
                />
              </div>
            );
          } else if (type === "page") {
            children = (
              <button
                type="button"
                className={classes.pageButton}
                style={{
                  color: selected ? "#fff" : "#000",
                  background: selected ? "#119C04" : color,
                }}
                {...item}
              >
                {toFA(page)}
              </button>
            );
          } else if (type === "next") {
            children = (
              <button
                disabled={disabled}
                className={classes.nextButton}
                style={{
                  color: "#000",
                  background: color,
                  cursor: disabled ? "auto" : "pointer",
                  opacity: disabled ? 0.5 : 1,
                }}
                type="button"
                {...item}
              >
                بعدی{" "}
                <ArrowBackIos
                  style={{
                    fill: "#000",
                    fontSize: 12,
                    position: "relative",
                    top: 2,
                  }}
                />
              </button>
            );
          } else if (type === "previous") {
            children = (
              <button
                disabled={disabled}
                className={classes.nextButton}
                style={{
                  color: "#000",
                  background: color,
                  cursor: disabled ? "auto" : "pointer",
                  opacity: disabled ? 0.5 : 1,
                }}
                type="button"
                {...item}
              >
                <ArrowForwardIos
                  style={{
                    fill: "#000",
                    fontSize: 12,
                    position: "relative",
                    top: 2,
                  }}
                />{" "}
                قبلی
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}
