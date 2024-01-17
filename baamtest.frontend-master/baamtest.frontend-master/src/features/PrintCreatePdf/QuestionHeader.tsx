import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  Input,
  Switch
} from "@material-ui/core";

import FilterBox from "../../components/FilterBox";
import { NormalInput } from "../../components/Form/TextField";
import { questionNormal } from "../../api/services/question";

export default function QuestionHeader({
  disabled,
  onSubmit,
  questions,
  questionHeaders,
}: {
  disabled?: boolean;
  onSubmit: (
    questionId: number,
    data: { right: string; center: string; left: string, nextPage: boolean },
  ) => void;
  questions: any[];
  questionHeaders: any[];
}) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>();
  const [questionId, setQuestionId] = useState<number>();
  const [error, setError] = useState<string>();

  const [titleRight, setTitleRight] = useState<string>("");
  const [titleCenter, setTitleCenter] = useState<string>("");
  const [titleLeft, setTitleLeft] = useState<string>("");
  const [toNextPage, setToNextPage] = useState<boolean>(false);

  useEffect(() => {
    const cur = !questionId ? {} : (questionHeaders || {})[questionId] || {};
    setTitleRight(cur.right ? cur.right : "");
    setTitleCenter(cur.center ? cur.center : "");
    setTitleLeft(cur.left ? cur.left : "");
    setToNextPage(cur.nextPage === true);
  }, [questionId]);

  const hasHeader = !!questionId && !!(questionHeaders || {})[questionId] &&
    (!!questionHeaders[questionId].right || !!questionHeaders[questionId].center || !!questionHeaders[questionId].left);

  const handleSubmit = () => {
    if (questionId && !isNaN(Number(questionId)))
      onSubmit(questionId, {
        right: titleRight.trim(),
        center: titleCenter.trim(),
        left: titleLeft.trim(),
        nextPage: toNextPage
      });
  };

  const handleClear = () => {
    if (questionId && !isNaN(Number(questionId)))
      onSubmit(questionId, {
        right: "",
        center: "",
        left: "",
        nextPage: false
      });
  };

  return (
    <FilterBox title="افزودن ریز سربرگ">
      <Box display="flex" flexDirection="column" width="100%" mb="10px">
        {error && <Typography>{error}</Typography>}
        <div>
          <p>قبل کدام شماره سوال اضافه شود؟</p>
          <Select
            style={{ marginTop: "auto" }}
            className="inputContainer"
            input={<Input disableUnderline />}
            value={selectedQuestion}
            fullWidth
            onChange={(e: any) => {
              setQuestionId(questions[Number(e.target.value) - 1].data.id);
              setSelectedQuestion(e.target.value);
            }}
            disabled={disabled}
          >
            {questions.map((q, i) => (
              <MenuItem key={q.data.id} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <p>قسمت راست ریزسربرگ</p>
          <NormalInput
            inputProps={{ style: { textAlign: "center" } }}
            id="mini-header-right"
            value={titleRight}
            onChange={e => setTitleRight(e.target.value)}
            fullWidth
            style={{ flex: 1, marginBottom: "1.5rem" }}
            disabled={!questionId || disabled}
          />
        </div>
        <div>
          <p>قسمت وسط ریزسربرگ</p>
          <NormalInput
            inputProps={{ style: { textAlign: "center" } }}
            id="mini-header-center"
            value={titleCenter}
            onChange={e => setTitleCenter(e.target.value)}
            fullWidth
            style={{ flex: 1, marginBottom: "1.5rem" }}
            disabled={!questionId || disabled}
          />
        </div>
        <div>
          <p>قسمت چپ ریزسربرگ</p>
          <NormalInput
            inputProps={{ style: { textAlign: "center" } }}
            id="mini-header-left"
            value={titleLeft}
            onChange={e => setTitleLeft(e.target.value)}
            fullWidth
            style={{ flex: 1, marginBottom: "1rem" }}
            disabled={!questionId || disabled}
          />
        </div>
        <div style={{ textAlign: "right", marginBottom: "0.5rem" }}>
          <Switch 
            disabled={!questionId || disabled} 
            style={{ marginLeft: "1rem" }} 
            checked={toNextPage}
            onChange={(e) => setToNextPage(e.target.checked)}
          />
          انتقال به ابتدای صفحه بعد
        </div>
        <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
          <Button
            disabled={!selectedQuestion || disabled}
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
          <Button
            disabled={!hasHeader || disabled}
            variant="contained"
            onClick={handleClear}
            style={{
              backgroundColor: "#4F8EC6",
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
