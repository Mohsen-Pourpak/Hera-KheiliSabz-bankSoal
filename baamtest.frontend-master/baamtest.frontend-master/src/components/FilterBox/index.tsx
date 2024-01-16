import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import { Collapse } from "@material-ui/core";

export default function FilterBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Box className={clsx("inputContainer", "filter-box")}>
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
                color: "#555",
                fontSize: 17,
                padding: "0 17px",
                textAlign: "center",
              }}
            >
              {title}
            </div>
            <div className="filter-minimize" onClick={() => setOpen(!open)}>
              {!open ? "+" : "-"}
            </div>
          </Box>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
