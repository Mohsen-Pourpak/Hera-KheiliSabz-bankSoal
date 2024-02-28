import React, { useState } from "react";
import { Button } from "@material-ui/core";

import TextField from "../../components/Form/TextField";
import FilterBox from "../../components/FilterBox";
import { mmToPx } from "../../utils/convertors";

export default function EachQuestionSpace({
  eachQuestionSpace,
  startQuestionNumber,
  goToRegisterExam,
  setState,
}: {
  startQuestionNumber?: string;
  eachQuestionSpace?: string;
  goToRegisterExam: () => any;
  setState: (newState: any) => void;
}) {
  const [qSpaceState, setQSpaceState] = useState(eachQuestionSpace);
  const [startQNum, setStartQNum] = useState(startQuestionNumber);

  const handleSubmit = () => {
    setState({
      startQuestionNumber: startQNum,
      // eachQuestionSpace: mmToPx(Number(qSpaceState)) / 2,
      eachQuestionSpace: Number(qSpaceState),
    });

    setTimeout(() => goToRegisterExam(), 250);
  };

  return (
    <FilterBox title="سوالات">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: 210,
          width: "100%",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            marginTop: 20,
            background: "#fff",
            minHeight: 45,
            borderRadius: 25,
            alignItems: "normal",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              color: "#fff",
              alignItems: "center",
              padding: "0 15px",
              borderRadius: 25,
              justifyContent: "center",
            }}
          >
            فاصله (mm)
          </div>
          <div
            style={{
              flex: 1,
              alignItems: "center",
              width: "100%",
              backgroundColor: "#CBF2CF",
            }}
          >
            <TextField
              placeholder="فاصله"
              value={qSpaceState}
              faNum={true}
              style={{
                height: 40,
                background: "transparent",
                paddingTop: 0,
                textAlign: "center",
              }}
              onChange={(e: any) => setQSpaceState(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            marginTop: 20,
            background: "#fff",
            minHeight: 45,
            borderRadius: 25,
            alignItems: "normal",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              color: "#fff",
              alignItems: "center",
              padding: "0 15px",
              borderRadius: 25,
              justifyContent: "center",
              backgroundColor: "#CBF2CF",
            }}
          >
            شماره شروع
          </div>
          <div style={{ flex: 1, alignItems: "center", width: "100%" }}>
            <TextField
              placeholder="شماره شروع سوالات"
              value={startQNum}
              faNum={true}
              style={{
                height: 40,
                background: "transparent",
                paddingTop: 0,
                textAlign: "center",
              }}
              onChange={(e: any) => setStartQNum(e.target.value)}
            />
          </div>
        </div>

        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#228B22",
            color: "#000",
            marginTop: "auto",
            borderRadius: 50,
            height: 40,
            boxShadow: "none",
          }}
        >
          اعمال
        </Button>
      </div>
    </FilterBox>
  );
}
