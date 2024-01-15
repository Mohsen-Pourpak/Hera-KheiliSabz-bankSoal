import React, { useState } from "react";
import { Button } from "@material-ui/core";

import FilterBox from "../../components/FilterBox";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  sortFilter: {
    backgroundColor: "transparent",
    border: "1px solid #3d82a4",
    color: "#3d82a4",
    width: "100%",
    textAlign: "center",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  sortFilterActive: {
    backgroundColor: "#3d82a4",
    border: "1px solid #3d82a4",
    color: "#fff",
    width: "100%",
    borderRadius: 20,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});

export default function ColumnBox({
  sortFilter,
  selectedFilter,
  goToRegisterExam,
}: {
  sortFilter: (v: number) => void;
  selectedFilter: number;
  goToRegisterExam: () => any;
}) {
  const [selectedColumn, setSelectedColumn] = useState(selectedFilter);
  const classes = useStyles();

  const handleSubmit = () => {
    sortFilter(selectedColumn);
    setTimeout(() => goToRegisterExam(), 250);
  };

  return (
    <FilterBox title="حالت گزینه های سوال">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <div
          onClick={() => setSelectedColumn(3)}
          className={
            selectedColumn === 3 ? classes.sortFilterActive : classes.sortFilter
          }
        >
          <div>چهار ستونه</div>
          <div style={{ marginTop: 10, fontSize: "1vw" }}>
            ⦁ ── ⦁ ── ⦁ ── ⦁ ──
          </div>
        </div>
        <div style={{ height: 5 }} />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1.5 }}>
            <div
              onClick={() => setSelectedColumn(6)}
              className={
                selectedColumn === 6
                  ? classes.sortFilterActive
                  : classes.sortFilter
              }
            >
              <div>دو ستونه</div>
              <div style={{ marginTop: 10, fontSize: "1vw" }}>
                ⦁ ── ⦁ ── <br />⦁ ── ⦁ ──
              </div>
            </div>
          </div>
          <div style={{ width: 5 }} />
          <div style={{ flex: 1 }}>
            <div
              onClick={() => setSelectedColumn(12)}
              className={
                selectedColumn === 12
                  ? classes.sortFilterActive
                  : classes.sortFilter
              }
            >
              <div>تک ستونه</div>
              <div style={{ marginTop: 10, fontSize: "1vw" }}>
                ⦁ ── <br />
                ⦁ ── <br />
                ⦁ ── <br />⦁ ──
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
            borderRadius: 50,
            height: 40,
            marginTop: 5,
            boxShadow: "none",
            flexShrink: 0,
          }}
        >
          اعمال
        </Button>
      </div>
    </FilterBox>
  );
}
