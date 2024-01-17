import React, { useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

import { FilterBoxTextField } from "../../components/Form/TextField";
import FilterBox from "../../components/FilterBox";

import logoPlaceholder from "../../images/test/log-placeholder.jpg";

export default function ExamHeading({
  examTitle,
  suggestTime,
  headingBoxs,
  selectedLogo,
  onSelectLogoClicked,
  setState,
  handleDeleteBaamtestLogo,
  withoutBaamtestLogo,
  handleOpenChangeBgModal,
}: {
  examTitle?: string;
  suggestTime?: string;
  headingBoxs: string[];
  selectedLogo?: any;
  onSelectLogoClicked: () => void;
  setState: (newState: any) => void;
  handleDeleteBaamtestLogo: () => void;
  withoutBaamtestLogo: boolean;
  handleOpenChangeBgModal: () => void;
}) {
  const [examTitleState, setExamTitleState] = useState(examTitle);
  const [suggestTimeState, setSuggestTimeState] = useState(suggestTime);
  const [headingBoxsState, setHeadingBoxsState] = useState(headingBoxs);

  const handleSubmit = () => {
    setState({
      title: examTitleState,
      suggestTime: suggestTimeState,
      headingBoxs: headingBoxsState,
    });
  };

  const handleChangeBox = (e: any, number: number) => {
    // console.log(e.target.value);
    const val = e.target.value;

    setHeadingBoxsState(prev => {
      const res = prev ? prev.slice() : ["", "", "", ""];
      res[number] = val;
      // console.log(res);

      return res;
    });
  };

  return (
    <FilterBox title="سربرگ آزمون">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onSelectLogoClicked}
          startIcon={<CloudUpload />}
          style={{
            backgroundColor: "#DEF6FF",
            color: "#000",
            borderRadius: 50,
            height: 40,
            boxShadow: "none",
          }}
        >
          {selectedLogo && selectedLogo !== logoPlaceholder
            ? "تغییر لوگو"
            : "انتخاب لوگو"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenChangeBgModal}
          style={{
            backgroundColor: "#DEF6FF",
            color: "#000",
            marginTop: 10,
            borderRadius: 50,
            height: 40,
            boxShadow: "none",
          }}
        >
          تفییر پس زمینه
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeleteBaamtestLogo}
          style={{
            backgroundColor: "#DEF6FF",
            color: "#000",
            marginTop: 10,
            borderRadius: 50,
            height: 40,
            boxShadow: "none",
          }}
        >
          {withoutBaamtestLogo ? "ایجاد نوشته بام تست" : "حذف نوشته بام تست"}
        </Button>
        <FilterBoxTextField
          title="عنوان آزمون"
          value={examTitleState}
          onChange={(e: any) => setExamTitleState(e.target.value)}
        />
        <FilterBoxTextField
          title="باکس 1"
          value={suggestTimeState}
          onChange={(e: any) => setSuggestTimeState(e.target.value)}
        />
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
          <FilterBoxTextField
            title="باکس 2"
            value={headingBoxsState[0]}
            onChange={(e: any) => handleChangeBox(e, 0)}
          />
          <FilterBoxTextField
            title="باکس 3"
            value={headingBoxsState[1]}
            onChange={(e: any) => handleChangeBox(e, 1)}
          />
          <FilterBoxTextField
            title="باکس 4"
            value={headingBoxsState[2]}
            onChange={(e: any) => handleChangeBox(e, 2)}
          />
          <FilterBoxTextField
            title="باکس 5"
            value={headingBoxsState[3]}
            onChange={(e: any) => handleChangeBox(e, 3)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
            borderRadius: 50,
            height: 40,
            boxShadow: "none",
            marginTop: 10,
          }}
        >
          اعمال
        </Button>
      </div>
    </FilterBox>
  );
}
