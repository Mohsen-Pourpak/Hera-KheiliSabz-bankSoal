import React, { useState } from "react";
import { Button, Input, MenuItem, Select } from "@material-ui/core";

import FilterBox from "../../components/FilterBox";
import { FilterBoxTextField } from "../../components/Form/TextField";

export default function HeaderBox({
  questions,
  onSubmit,
}: {
  questions: any[];
  onSubmit: (a: {
    questionNumber: string;
    name: string;
    middleBox?: string;
    time?: string;
  }) => void;
}) {
  const [questionNumber, setQuestionNumber] = useState();
  const [middleBox, setMiddleBox] = useState();
  const [time, setTime] = useState();
  const [name, setName] = useState();

  const renderMenuItem = (items: any[]) =>
    items.map((_, i) => <MenuItem value={i + 1}>{i + 1}</MenuItem>);

  const handleSubmit = () => {
    if (questionNumber && name) {
      onSubmit({ questionNumber, name, middleBox, time });
    }
  };

  return (
    <FilterBox title="افزودن سربرگ">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled
        >
          افزودن
        </Button>
        <div>
          <p>سوال شماره</p>
          <Select
            style={{ marginTop: "auto" }}
            className="inputContainer"
            input={<Input disableUnderline />}
            value={questionNumber}
            fullWidth
            onChange={(e: any) => setQuestionNumber(e.target.value)}
          >
            {renderMenuItem(questions)}
          </Select>
        </div>
        <FilterBoxTextField
          title="نام درس"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <FilterBoxTextField
          title="باکس وسط"
          value={middleBox}
          onChange={(e: any) => setMiddleBox(e.target.value)}
        />
        <FilterBoxTextField
          title="زمان"
          value={time}
          onChange={(e: any) => setTime(e.target.value)}
        />
      </div>
    </FilterBox>
  );
}
