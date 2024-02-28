import React, { useState } from "react";
import { Button, Box, MenuItem } from "@material-ui/core";

import FilterBox from "../../components/FilterBox";
import { CustomTextField } from "../../components/Form/TextField";
import CustomSelect from "../../components/Form/Select";
import { PRINT_FONTS, SIZE_FONTS } from "../../utils/Utils";
// import { mmToPx } from "../../utils/convertors";
// import { FilterBoxTextField } from "../../components/Form/TextField";

export default function QuestionProperty({
  questions,
  onSubmit,
  onClearOne,
  defaultFont,
  defaultSize,
}: {
  questions: any[];
  onSubmit: (
    id: number,
    props: { column: number; font: string; size: string; space: number },
  ) => void;
  onClearOne: (id: number) => void;
  defaultFont: string;
  defaultSize: string;
}) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>();
  const [column, setColumn] = useState<3 | 6 | 12>(3);
  const [space, setSpace] = useState<number>(0);
  const [font, setFont] = useState<string>(defaultFont);
  const [size, setSize] = useState<string>(defaultSize);

  const renderMenuItem = (items: any[]) =>
    items.map((_, i) => <MenuItem value={i + 1}>{i + 1}</MenuItem>);

  const handleSubmit = () => {
    if (selectedQuestion) {
      onSubmit(questions[selectedQuestion - 1].data.id, {
        column,
        // space: mmToPx(space) / 2,
        space,
        font,
        size,
      });
    }
  };

  const handleClear = () => {
    if (selectedQuestion) {
      onClearOne(questions[selectedQuestion - 1].data.id);
    }
  };

  return (
    <FilterBox title="شخصی سازی و تغییرات ظاهری">
      <Box display="flex" flexDirection="column" width="100%" mb="10px">
        <CustomSelect
          label="شماره سوال انتخابی"
          value={selectedQuestion}
          onChange={v => setSelectedQuestion(v)}
        >
          {renderMenuItem(questions)}
        </CustomSelect>
        <CustomSelect
          label="حالت گزینه های سوال"
          value={column}
          onChange={v => setColumn(v)}
          disabled={!selectedQuestion}
        >
          <MenuItem value={12}>تک ستون</MenuItem>
          <MenuItem value={6}>دو ستون</MenuItem>
          <MenuItem value={3}>چهار ستون</MenuItem>
        </CustomSelect>
        <CustomSelect
          label="فونت سوال و پاسخ"
          value={font}
          onChange={v => setFont(v)}
          disabled={!selectedQuestion}
        >
          {PRINT_FONTS.map(f => (
            <MenuItem value={f.value}>{f.title}</MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          label="سایز سوال و پاسخ"
          value={size}
          onChange={v => setSize(v)}
          disabled={!selectedQuestion}
        >
          {SIZE_FONTS.map(s => (
            <MenuItem value={s.value}>{s.title}</MenuItem>
          ))}
        </CustomSelect>
        <CustomTextField
          label="فاصله از سوال بعد(mm)"
          value={space ? String(space) : ""}
          onChange={v => setSpace(v)}
          disabled={!selectedQuestion}
        />
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
          <Button
            disabled={!selectedQuestion}
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
          <Button
            disabled={!selectedQuestion}
            variant="contained"
            onClick={handleClear}
            style={{
              backgroundColor: "#FF0000",
              color: "#000",
              marginTop: "auto",
              borderRadius: 50,
              height: 40,
              boxShadow: "none",
            }}
          >
            پاک کردن
          </Button>
        </Box>
      </Box>
    </FilterBox>
  );
}
