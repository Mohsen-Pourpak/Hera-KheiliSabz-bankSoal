import React from "react";
import { Grid } from "@material-ui/core";

import Image2 from "../../images/test/Untitled-1.jpg";
import { DeleteSweep } from "@material-ui/icons";

export default function SelectedList({
  selectedList,
  onChange,
}: {
  selectedList: any[];
  onChange: (arg: any[]) => void;
}) {
  return (
    <Grid
      item
      sm={12}
      spacing={1}
      alignItems="center"
      className="inputContainer"
      style={{
        padding: "15px 15px",
        overflow: "scroll",
        backgroundSize: "cover",
        backgroundImage: `url(${Image2})`,
        marginRight: 10,
        marginTop: 5,
        width: "100%",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          width: "100%",
          alignItems: "center",
          height: 400,
        }}
      >
        {selectedList &&
          selectedList.map(item => (
            <div
              style={{
                backgroundColor: "#0000006b",
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                borderRadius: 35,
                padding: "10px 15px",
                textAlign: "right",
                marginLeft: 5,
              }}
            >
              <div style={{ color: "#fff", fontSize: 17, textAlign: "right" }}>
                {item.title}
              </div>
              <div
                onClick={() => {
                  let selectedListFiltered = selectedList.filter(
                    (el: any) => el.id !== item.id,
                  );
                  // setState({ selectedList:selectedListFiltered });
                  onChange(selectedListFiltered);
                }}
                style={{
                  backgroundColor: "#fe5f55",
                  cursor: "pointer",
                  width: 45,
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                }}
              >
                <DeleteSweep style={{ fill: "#fff" }} />
              </div>
            </div>
          ))}
      </div>
    </Grid>
  );
}
