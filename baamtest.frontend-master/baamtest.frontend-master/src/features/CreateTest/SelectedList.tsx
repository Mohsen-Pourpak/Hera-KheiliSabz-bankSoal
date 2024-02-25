import React from "react";
import { Grid, Container } from "@material-ui/core";

import Image2 from "../../images/test/girl-student-book-on-algebra-600nw-2316142433.webp";
import { DeleteSweep } from "@material-ui/icons";

import CreateTest from "../../pages/Student/CreateTest";

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
      style={{
        backgroundColor: "#F1ECCF",
        width: "100%",
        padding: "30px",
        borderRadius: "20px",
        marginBottom: "40px",
      }}
    >
      <Grid
        item
        sm={12}
        spacing={1}
        alignItems="center"
        className="inputContainer"
        style={{
          padding: "15px 15px",
          overflow: "scroll",
          marginRight: 30,
          marginTop: 5,
          backgroundColor: "#FFE4B5",
          width: "100%",
        }}
      >
        <div
          style={{
            flexDirection: "column",
            flexWrap: "wrap",
            display: "flex",
            width: "50%",
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
                  borderRadius: 0,
                  padding: "10px 15px",
                  textAlign: "right",
                  marginLeft: 5,
                }}
              >
                <div
                  style={{ color: "#fff", fontSize: 17, textAlign: "right" }}
                >
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
                    backgroundColor: "#FF0000",
                    cursor: "pointer",
                    width: 50,
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                  }}
                >
                  <DeleteSweep style={{ fill: "#fff" }} />
                </div>
              </div>
            ))}
        </div>
      </Grid>
    </Grid>
  );
}
