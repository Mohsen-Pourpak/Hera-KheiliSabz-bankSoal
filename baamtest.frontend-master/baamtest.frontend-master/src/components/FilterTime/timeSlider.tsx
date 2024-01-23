import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import { Collapse } from "@material-ui/core";

export default function FilterTime({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      className={clsx("inputContainer")}
      style={{
        backgroundColor: "#CBF2CF",
        borderRadius: "50px",
        padding: "5px 15px 7.5px",
        margin: "0px 0px 20px",
        width: "100%",
        height: "auto",
        transition: "all 0.3s",
      }}
    >
      <Collapse in={open} collapsedHeight={45}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            my="-15px"
          >
            <div
              style={{
                color: "#000",
                fontSize: 17,
                padding: "0 17px",
                textAlign: "center",
              }}
            >
              {title}
            </div>
            <div
              className="filter-minimize"
              onClick={() => setOpen(!open)}
              style={{ color: "#FF0000"}}
            >
              {!open ? "+" : "-"}
            </div>
          </Box>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
