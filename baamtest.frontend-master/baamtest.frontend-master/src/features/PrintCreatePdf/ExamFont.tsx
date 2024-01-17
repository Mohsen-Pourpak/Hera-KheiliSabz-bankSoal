import React, { useState } from "react";
import { Button, Box, MenuItem } from "@material-ui/core";

import FilterBox from "../../components/FilterBox";
import CustomSelect from "../../components/Form/Select";
import { CustomTextField } from "../../components/Form/TextField";

import { PRINT_FONTS, SIZE_FONTS } from "../../utils/Utils";

const renderMenuItem = (items: typeof PRINT_FONTS) =>
  items.map(item => <MenuItem value={item.value}>{item.title}</MenuItem>);

export default function ExamFont({
  state,
  setState,
  goToRegisterExam,
  hasQuestionHeader,
  questionHeaderCount,
}: {
  state: any;
  setState: (newState: any) => void;
  goToRegisterExam: () => any;
  hasQuestionHeader?: boolean;
  questionHeaderCount?: number;
}) {
  const [questionFont, setQuestionFont] = useState(state.font);
  const [questionSize, setQuestionSize] = useState(state.size);
  const [questionSpace, setQuestionSpace] = useState(state.eachQuestionSpace);
  const [questionStartNumber, setQuestionStartNumber] = useState(
    state.startQuestionNumber,
  );

  const [headerFont, setHeaderFont] = useState(state.headerFont);
  const [headerSize, setHeaderSize] = useState(state.headerSize);
  const [headerLineSpace, setHeaderLineSpace] = useState(state.headerLineSpace);
  const [headerColumnSpace, setHeaderColumnSpace] = useState(
    state.headerColumnSpace,
  );

  const [miniHeaderFont, setMiniHeaderFont] = useState(state.miniHeaderFont);
  const [miniHeaderSize, setMiniHeaderSize] = useState(state.miniHeaderSize);

  const handleSubmit = () => {
    setState({
      font: questionFont,
      size: questionSize,
      eachQuestionSpace: questionSpace,
      startQuestionNumber: questionStartNumber,
      headerFont,
      headerSize,
      headerLineSpace,
      headerColumnSpace,
      miniHeaderFont,
      miniHeaderSize,
    });

    setTimeout(() => goToRegisterExam(), 250);
  };

  return (
    <FilterBox title="مشخصات ظاهری سوالات">
      <Box display="flex" flexDirection="column" width="100%" mb="10px">
        <CustomSelect
          label="فونت سوال و پاسخ"
          value={questionFont}
          onChange={v => setQuestionFont(v)}
        >
          {renderMenuItem(PRINT_FONTS)}
        </CustomSelect>
        <CustomSelect
          label="سایز سوال و پاسخ"
          value={questionSize}
          onChange={v => setQuestionSize(v)}
        >
          {renderMenuItem(SIZE_FONTS)}
        </CustomSelect>
        <CustomSelect
          label="فونت سربرگ"
          value={headerFont}
          onChange={v => setHeaderFont(v)}
        >
          {renderMenuItem(PRINT_FONTS)}
        </CustomSelect>
        <CustomSelect
          label="سایز سربرگ"
          value={headerSize}
          onChange={v => setHeaderSize(v)}
        >
          {renderMenuItem(SIZE_FONTS)}
        </CustomSelect>
        <CustomTextField
          label="فاصله سوال ها از هم(mm)"
          value={questionSpace}
          onChange={v => setQuestionSpace(v)}
        />
        {/* <CustomTextField
          label="فاصله خطوط سربرگ"
          value={headerLineSpace}
          onChange={v => setHeaderLineSpace(v)}
        />
        <CustomTextField
          label="فاصله ستون های سربرگ"
          value={headerColumnSpace}
          onChange={v => setHeaderColumnSpace(v)}
        /> */}
        <CustomTextField
          label="شماره شروع سوالات"
          value={questionStartNumber}
          onChange={v => setQuestionStartNumber(v)}
        />
        <CustomSelect
          disabled={!hasQuestionHeader || (Number(questionHeaderCount || "0") === 0)}
          label="فونت ریز سربرگ ها"
          value={miniHeaderFont}
          onChange={v => setMiniHeaderFont(v)}
        >
          {renderMenuItem(PRINT_FONTS)}
        </CustomSelect>
        <CustomSelect
          disabled={!hasQuestionHeader || (Number(questionHeaderCount || "0") === 0)}
          label="سایز ریز سربرگ ها"
          value={miniHeaderSize}
          onChange={v => setMiniHeaderSize(v)}
        >
          {renderMenuItem(SIZE_FONTS)}
        </CustomSelect>
        <Button
          variant="contained"

          onClick={handleSubmit}
          style={{
            backgroundColor: "#4F8EC6",
            color: "#000",
            marginTop: "auto",
            borderRadius: 50,
            height: 40,
            boxShadow: "none",
          }}
        >
          اعمال
        </Button>
      </Box>
    </FilterBox>
  );
}
