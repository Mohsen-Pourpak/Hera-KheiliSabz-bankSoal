import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { GridSize } from "@material-ui/core/Grid";

import { toFA } from "../../utils/Utils";
import CorrectOption from "./CorrectOption";
import styled from "styled-components";

const useStyles = makeStyles({
  optionNum: {
    // border: "1px solid #495867",
    // borderRadius: 60,
    // height: 25,
    // width: 25,
    // fontSize: 17,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: "none",
    paddingTop: 3,
    color: "black",
    position: "relative",
    marginLeft: 10,
    marginRight: 10,
  },
  optionNumActive: {
    // border: "1px solid #495867",
    // borderRadius: 60,
    // height: 25,
    // width: 25,
    // fontSize: 17,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: "none",
    paddingTop: 3,
    color: "black",
    position: "relative",
    marginLeft: 10,
    marginRight: 10,
  },
  correctOption: {
    backgroundColor: "#006400",
    color: "#fff",
    width: "fit-content",
    borderRadius: 50,
    padding: "6px 10px",
  },
  Dana: ({ fontSize }: any) => ({
    "& p, div": {
      fontFamily: "'Dana' !important",
      fontSize: fontSize + " !important",
    },
  }),
  "B-Nazanin": ({ fontSize }: any) => ({
    "& p, div": {
      fontFamily: "'B-Nazanin' !important",
      fontSize: fontSize + " !important",
    },
  }),
  bkoodak: ({ fontSize }: any) => ({
    "& p, div": {
      fontFamily: "'bkoodak' !important",
      fontSize: fontSize + " !important",
    },
  }),
  Lotus: ({ fontSize }: any) => ({
    "& p, div": {
      fontFamily: "'Lotus' !important",
      fontSize: fontSize + " !important",
    },
  }),
  "B-Zar": ({ fontSize }: any) => ({
    "& p, div": {
      fontFamily: "'B-Zar' !important",
      fontSize: fontSize + " !important",
    },
  }),
  Yagut: ({ fontSize }: any) => ({
    "& p, div": {
      fontFamily: "'Yagut' !important",
      fontSize: fontSize + " !important",
    },
  }),
  "B-Yekan": ({ fontSize }: any) => ({
    "& p, div": {
      fontFamily: "'B-Yekan' !important",
      fontSize: fontSize + " !important",
    },
  }),
  Traffic: ({ fontSize }: any) => ({
    "& p, div": {
      fontFamily: "'Traffic' !important",
      fontSize: fontSize + " !important",
    },
  }),
});

interface QuestionNumberProps {
  isEnglish: boolean;
}
const QuestionNumber = styled.span<QuestionNumberProps>`
  font-family: ${({ isEnglish }) =>
    isEnglish ? "sans-serif !important" : "inherit"};
  margin-top: ${({ isEnglish }) => (isEnglish ? "-5px" : "unset")};
  font-size: 14px;
  direction: ${({ isEnglish }) => (isEnglish ? `ltr` : "rtl")};
`;

interface IQuestionProps {
  changeAnswer: (a: any, b: any) => void;
  eachQuestionSpace: string;
  startQuestionNumber: string;
  sortFilter: any;
  size: any;
  font:
    | "Dana"
    | "B-Nazanin"
    | "Lotus"
    | "B-Zar"
    | "Yagut"
    | "B-Yekan"
    | "Traffic"
    | "bkoodak";
  question: any;
  number: number;
  questionType: "question" | "answer";
  header: any;
  isMore: boolean;
  isEnglish: boolean;
  isQuestion: boolean;
  isAparte: boolean;
  isKey: boolean;
  idx: number;
  rawHtml: string;

  conditionIsQuestion: boolean;
  conditionIsAnswer: boolean;
  isPrintMode?: boolean;
  printType?: string;
  keyColumnsCount?: number;

  headerSize: any;
  headerFont:
    | "Dana"
    | "B-Nazanin"
    | "Lotus"
    | "B-Zar"
    | "Yagut"
    | "B-Yekan"
    | "Traffic"
    | "bkoodak";
}

const Question: React.FC<IQuestionProps> = React.forwardRef(
  (
    {
      changeAnswer,
      eachQuestionSpace,
      startQuestionNumber,
      sortFilter,
      size,
      question,
      number,
      header,
      isMore,
      isEnglish,
      isAparte,
      isKey,
      isQuestion,
      rawHtml,

      font,
      conditionIsAnswer,
      conditionIsQuestion,
      isPrintMode,
      printType,

      headerSize,
      headerFont,
    },
    ref?: React.LegacyRef<HTMLDivElement>,
  ) => {
    const style = useStyles({ fontSize: size });

    const hasHeader = Object.keys(header || {}).length > 0;
    const keyOnly = printType === "ak";

    if (rawHtml) {
      return (
        <div
          id={`q_${question.id}_wrapper${isPrintMode ? "_p" : ""}`}
          ref={ref}
          className={"question_wrapper " + (!font || isKey ? "" : style[font])}
          style={{
            position: "relative",
            flex: "none",
            letterSpacing: "normal",
            paddingBottom: (isKey ? 0 : Number(eachQuestionSpace)) + "mm",
            width: "100%",
          }}
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        ></div>
      );
    }

    return (
      <div
        id={`q_${question.id}_wrapper${isPrintMode ? "_p" : ""}`}
        ref={ref}
        className={"question_wrapper " + (!font || isKey ? "" : style[font])}
        style={{
          position: "relative",
          flex: "none",
          letterSpacing: "normal",
          paddingBottom: (isKey ? 0 : Number(eachQuestionSpace)) + "mm",
          width: "100%",
        }}
      >
        <Grid
          item
          sm={12}
          direction="column"
          style={{
            padding: 0,
            width: "100%",
            borderRadius: 20,
            alignItems: keyOnly ? "center" : "flex-start",
          }}
        >
          {/* {question.isQuestion && ( */}
          {conditionIsQuestion && (
            <Grid
              id={`q_${question.id + (isPrintMode ? "_p" : "")}`}
              item
              direction="column"
              sm={12}
              spacing={1}
              alignItems="center"
              style={{
                padding: "0 5px 0",
                width: "100%",
                marginBottom: "0px !important",
                borderRadius: 20,
                borderTopRightRadius: 150,
                borderBottomLeftRadius: isMore ? 0 : 20,
                borderBottomRightRadius: isMore ? 0 : 20,
                borderBottom: isMore ? "1px solid #3d82a4" : "none",
              }}
            >
              {hasHeader && (
                <QuestionHeader
                  header={header}
                  font={style[headerFont || font]}
                  size={headerSize || size}
                  type="q"
                />
              )}
              <Grid
                direction="row"
                alignItems="flex-start"
                spacing={3}
                justify="flex-start"
                container
                style={{
                  padding: "0 10px 0 20px",
                  margin: 0,
                  letterSpacing: "normal !important",
                  justifyContent: isEnglish ? "flex-end" : "flex-start",
                }}
              >
                <RawHTML
                  value={`<div style="display: flex;align-items:baseline;">
                    ${
                      !isEnglish
                        ? `<div class='qNum' style="font-size: 12px !important">${toFA(
                            number + Number(startQuestionNumber) - 1,
                          )}</div>`
                        : ""
                    }
                    <div style="flex: 1; letter-spacing: normal !important; margin-right:8px;">${question.questionFace ||
                      " "}</div>
                    ${
                      isEnglish
                        ? `<div class="qNum" style="font-size: 12px !important;margin-right: 10px;font-family:calibri !important;">${number +
                            Number(startQuestionNumber) -
                            1}</div>`
                        : ""
                    }</div>`}
                />
              </Grid>
              <Grid
                direction="column"
                alignItems="flex-start"
                spacing={3}
                justify="flex-start"
                container
                style={{ padding: "0 5px", margin: 0 }}
              >
                <Grid
                  direction={isEnglish ? "row-reverse" : "row"}
                  alignItems="flex-start"
                  justify="flex-start"
                  container
                  style={{
                    padding: "0",
                    margin: 0,
                  }}
                >
                  {[
                    { number: 1, farsi: "۱", option: question.option1 },
                    { number: 2, farsi: "۲", option: question.option2 },
                    { number: 3, farsi: "۳", option: question.option3 },
                    { number: 4, farsi: "۴", option: question.option4 },
                  ].map(itm => (
                    <Grid
                      item
                      key={itm.number}
                      xs={sortFilter}
                      direction={isEnglish ? "row-reverse" : "row"}
                      style={{
                        padding: "5px",
                        margin: 0,
                        alignItems: "baseline",
                      }}
                    >
                      <div
                        style={{
                          height: +size.slice(0, 2) + 8,
                          width: +size.slice(0, 2) + 8,
                          fontSize: size,
                        }}
                        className={`${style.optionNumActive} ${style.optionNum}`}
                        onClick={() => changeAnswer(question.id, itm.number)}
                      >
                        <QuestionNumber isEnglish={isEnglish}>
                          {isEnglish ? String(itm.number) : itm.farsi}-
                        </QuestionNumber>
                      </div>
                      <RawHTML value={itm.option} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
          {/* {question.isAnswer && ( */}
          {conditionIsAnswer && (
            <div
              id={`a_${question.id + (isPrintMode ? "_p" : "")}`}
              style={{
                padding: 0,
                width: keyOnly ? "100%" : "calc(100% - 40px)",
                position: "relative",
                right: keyOnly ? 0 : 5,
                // marginBottom: 20,
                borderRadius: "0 0 20px 20px",
              }}
            >
              {hasHeader && printType === "a" && (
                <QuestionHeader
                  header={header}
                  font={style[headerFont || font]}
                  size={headerSize || size}
                  type="a"
                />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: keyOnly ? "center" : "right",
                  justifyContent: keyOnly ? "center" : "right",
                  direction: keyOnly ? "ltr" : "rtl",
                  paddingBottom: "2px",
                }}
              >
                {(!isQuestion || isAparte) && printType != "qa" && (
                  <div
                    style={{
                      flex: "0 0 auto",
                      width: keyOnly ? "1.7rem" : "1.7rem",
                      textAlign: "center",
                      fontSize: keyOnly ? "10px" : "12pt",
                    }}
                  >
                    {`${toFA(number + Number(startQuestionNumber) - 1)}${
                      !isKey ? "-" : ""
                    } `}
                  </div>
                )}
                <div style={{ flex: "0 0 auto", direction: "ltr" }}>
                  <CorrectOption
                    option={question.correctOption}
                    keyOnly={isKey}
                  />
                </div>
              </div>
              {!isKey && (
                <Grid
                  direction="row"
                  alignItems="flex-start"
                  spacing={3}
                  justify="flex-start"
                  container
                  style={{ padding: 0, margin: 0 }}
                >
                  <div style={{ overflow: "hidden", width: "100%" }}>
                    <RawHTML value={question.answer} />
                  </div>
                </Grid>
              )}
            </div>
          )}
        </Grid>
      </div>
    );
  },
);

export default Question;

interface CONTProps {
  children: any;
  keyOnlyMode: boolean;
  isEnglish: boolean;
  keyColumnsCount: number;
  hasHeader: boolean;
}

export const KeysContainer: React.FC<CONTProps> = ({
  children,
  keyOnlyMode,
  isEnglish,
  keyColumnsCount,
  hasHeader,
}) => {
  return !keyOnlyMode ? (
    <>{children}</>
  ) : keyColumnsCount != 5 ? (
    <Grid
      container
      alignItems="flex-start"
      justify="flex-start"
      direction={isEnglish ? "row-reverse" : "row"}
      style={{
        margin: 0,
        padding: 0,
        paddingTop: hasHeader ? "1.2rem" : "3rem",
        direction: "ltr",
      }}
    >
      {children}
    </Grid>
  ) : (
    <div
      style={{
        margin: 0,
        padding: 0,
        paddingTop: hasHeader ? "1.2rem" : "3rem",
        display: "grid",
        gridTemplateColumns: "20% 20% 20% 20% 20%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        direction: "ltr",
      }}
    >
      {children}
    </div>
  );
};

export const KeyWrapper: React.FC<CONTProps> = ({
  children,
  keyOnlyMode,
  keyColumnsCount,
}) => {
  let colWidth: GridSize = 1;

  switch (keyColumnsCount) {
    case 1:
      colWidth = 12;
      break;
    case 2:
      colWidth = 6;
      break;
    case 3:
      colWidth = 4;
      break;
    case 6:
      colWidth = 2;
      break;
    default:
      colWidth = 3;
      break;
  }

  return !keyOnlyMode ? (
    <>{children}</>
  ) : keyColumnsCount != 5 ? (
    <Grid item xs={colWidth} alignItems="flex-start">
      {children}
    </Grid>
  ) : (
    <div style={{ alignItems: "flex-start" }}>{children}</div>
  );
};

interface HeaderProps {
  font: string;
  size: number;
  header: any;
  type: "q" | "a";
}

const QuestionHeader: React.FC<HeaderProps> = ({
  font,
  size,
  header,
  type,
}) => {
  return (
    <div
      className={font}
      style={{
        width: type === "a" ? "calc(100% + 30px)" : "100%",
        padding: "0.5rem",
        margin: "1rem 0",
        borderTop: "1px solid rgb(100, 100, 100)",
        borderBottom: "1px solid rgb(100, 100, 100)",
        display: "flex",
        flexFlow: "row",
        fontSize: size,
      }}
    >
      {[
        { pos: "right", text: header.right },
        { pos: "center", text: header.center },
        { pos: "left", text: header.left },
      ].map(itm => (
        <div
          style={{
            flex: itm.pos === "center" ? "1 1 auto" : "0 0 auto",
            width: itm.pos === "center" ? "" : "33%",
            textAlign:
              itm.pos === "right"
                ? "right"
                : itm.pos == "center"
                ? "center"
                : "left",
          }}
        >
          {itm.text}
        </div>
      ))}
    </div>
  );
};

const RawHTML = ({ value }: { value: string }) => {
  return (
    <span
      style={{ width: "100%" }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};
