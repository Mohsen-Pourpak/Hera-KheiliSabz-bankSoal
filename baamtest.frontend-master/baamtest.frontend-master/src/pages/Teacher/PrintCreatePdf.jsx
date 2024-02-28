import React from "react";
import {
  Grid,
  Modal,
  Backdrop,
  CircularProgress,
  Fade,
  Button,
  LinearProgress,
  Divider,
} from "@material-ui/core";

import logoPlaceholder from "../../images/لوگو-خیلی-سبز.png";
// import ImageSimple from "../../images/test/Simple WB.jpg";
// import ImageFantasy from "../../images/test/Fantasy WB.jpg";
// import ImageNastaliq from "../../images/test/Nastaliq WB.jpg"; // Page number center
import ImageSimple from "../../images/test/kheilisabz1-edited.jpg";
import ImageFantasy from "../../images/test/kheilisabz2-edited.jpg";
import ImageNastaliq from "../../images/test/kheilisabz3-edited.jpg";
import ImageSimpleWob from "../../images/test/3.png";
import ImageFantasyWob from "../../images/test/2.png";
import ImageNastaliqWob from "../../images/test/1.png"; // Page number center
import ImageFantasyPage2 from "../../images/test/2.png";
import ImageFantasyWobPage2 from "../../images/test/2.png";
import ImageNastaliqPage2 from "../../images/test/1.png"; // Page number center
import ImageNastaliqWobPage2 from "../../images/test/1.png"; // Page number center

import { getTest } from "../../api/services/exam";
import { toFA } from "../../utils/Utils";

import PageTitle from "../../components/PageTitle/PageTitle";
import ImageCropper from "../../components/Form/ImageCropper";

import PrintBtn from "../../features/PrintCreatePdf/PrintBtn";
import ColumnBox from "../../features/PrintCreatePdf/ColumnBox";
import ExamHeading from "../../features/PrintCreatePdf/ExamHeading";
import ExamFont from "../../features/PrintCreatePdf/ExamFont";
import ChangeBackgroundModal from "../../features/PrintCreatePdf/ChangeBackgroundModal";

import Question, {
  KeysContainer,
  KeyWrapper,
} from "../../features/PrintCreatePdf/Question";
import Heading from "../../features/PrintCreatePdf/Heading";
import ReplaceQuestion from "../../features/PrintCreatePdf/ReplaceQuestion";
import QuestionHeader from "../../features/PrintCreatePdf/QuestionHeader";
import QuestionProperty from "../../features/PrintCreatePdf/QuestionProperty";
import KeyColumns from "../../features/PrintCreatePdf/KeyColumns";

const pageContentHeight = "calc(297mm - 4em)";

const QuestionList = React.memo(
  ({
    items,
    state,
    changeAnswer,
    getQuestionProps,
    isPrintMode,
    printType,
    showHeaderLine,
  }) => {
    let isKey = state.isKey === true;

    if (!items) {
      return null;
    }

    const keyColumnsCount = state.keyColumns;
    const headerItem =
      items.length > 0 && items[0].type === "header" ? items[0] : null;
    const theItems = !!headerItem ? items.filter((x, i) => i > 0) : items;

    return (
      <>
        {!!headerItem && (
          <Heading
            showHeaderLine={showHeaderLine}
            title={state.title}
            headingBoxs={state.headingBoxs}
            customLogo={state.customLogo}
            suggestTime={state.suggestTime}
            isPrintMode={isPrintMode}
            fontFamily={state.headerFont}
            fontSize={state.headerSize}
            rowGap={state.headerLineSpace}
            columnGap={state.headerColumnSpace}
          />
        )}
        <KeysContainer
          keyOnlyMode={isKey}
          keyColumnsCount={keyColumnsCount}
          hasHeader={!!headerItem}
        >
          {theItems.map((item, idx) => {
            let questionHeader =
              state.questionHeaders[String((item.data || {}).id || "_")] || {};

            let isMore = !!item.id && state[`isMore__${item.id}`];
            let isEnglish = false;
            if (item && item.data) {
              isEnglish = item.data.lessonId === 6;
            }
            let cnt = state.questionsSorted.findIndex(q =>
              item.data ? q.data.id === item.data.id : -1,
            );

            return (
              <KeyWrapper keyOnlyMode={isKey} keyColumnsCount={keyColumnsCount}>
                {!item.data ? (
                  <></>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      flex: "none",
                      letterSpacing: "normal",
                      width: "100%",
                    }}
                    key={idx}
                  >
                    <Question
                      number={item.number}
                      question={item.data}
                      questionType={item.type}
                      header={questionHeader}
                      idx={
                        state.isAparte
                          ? item.type === "answer"
                            ? cnt - state.questionsSorted.length
                            : cnt
                          : cnt
                      }
                      changeAnswer={changeAnswer}
                      isAparte={state.isAparte}
                      isEnglish={isEnglish}
                      isKey={state.isKey}
                      isMore={isMore}
                      isQuestion={state.isQuestion}
                      startQuestionNumber={state.startQuestionNumber}
                      eachQuestionSpace={getQuestionProps(item.data.id).space}
                      size={getQuestionProps(item.data.id).size}
                      font={getQuestionProps(item.data.id).font}
                      headerSize={getQuestionProps(item.data.id).headerSize}
                      headerFont={getQuestionProps(item.data.id).headerFont}
                      sortFilter={getQuestionProps(item.data.id).column}
                      conditionIsQuestion={
                        item.type === "both" || item.type === "question"
                      }
                      conditionIsAnswer={
                        item.type === "both" || item.type === "answer"
                      }
                      isPrintMode={isPrintMode}
                      printType={printType}
                      keyColumnsCount={keyColumnsCount}
                      rawHtml={state.rawHtml[(item.data || {}).id]}
                    />
                  </div>
                )}
              </KeyWrapper>
            );
          })}
        </KeysContainer>
      </>
    );
  },
);

class CreateTest extends React.Component {
  constructor(props) {
    super(props);
    this.mainList = [];
    this.state = {
      questionHeaders: {},
      keyColumns: 4,

      teachersList: [],
      customLogo: logoPlaceholder,
      grades: [],
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      questionsList: [],
      selectedList: [],
      progress: false,
      loading: false,
      positioningDone: false,
      repetitive: true,
      finalQuestions: [],
      height: 0,
      sortFilter: 6,
      aaa: [],
      font: "bkoodak",
      size: "11pt",

      space: 0,
      eachQuestionSpace: 0,
      startQuestionNumber: 1,
      headingBoxs: ["نام:", "نام خانوادگی:", "کلاس:", "شماره:"],
      questionsSorted: [],
      questionsProperties: [],
      tab: "general",

      scaleX: 0,
      scaleY: 0,
      translationX: 0,
      translationY: 0,

      headerFont: "bkoodak",
      headerSize: "12pt",
      headerLineSpace: 0,
      headerColumnSpace: 0,

      miniHeaderFont: "bkoodak",
      miniHeaderSize: "12pt",
      suggestTime: "زمان آزمون: ",

      rawHtml: {},
      withoutBaamtestLogo: false,
      changeBgModal: false,
      bgImage: null,
    };

    this.myInput = React.createRef();
    this.examPreview = React.createRef();
    this.questionListWrapper = React.createRef();
    this.allQuestions = React.createRef();
    this.allAnswers = React.createRef();
    this.allHeaders = React.createRef();
  }

  componentDidMount() {
    this.getQuestions();
    this.fillPreview(true);
    window.addEventListener(
      "resize",
      () => {
        this.fillPreview(true);
      },
      true,
    );
  }

  getQuestions() {
    let examId = parseInt(this.props.match.params.id);
    let token = localStorage.getItem("userToken");
    let printType = localStorage.getItem("printType");
    let isAnswer = printType === "a";
    let isQuestion = printType === "q";
    let isAparte = false;
    let isKey = false;
    if (printType === "qa") {
      isAnswer = true;
      isQuestion = true;
    } else if (printType === "qa-a") {
      isAnswer = true;
      isQuestion = true;
      isAparte = true;
    } else if (printType === "ak") {
      isAnswer = true;
      isKey = true;
    }
    this.setState({
      progress: true,
      isAnswer: isAnswer,
      isQuestion: isQuestion,
      isAparte,
      isKey,
    });
    getTest(examId, token)
      .then(res => {
        const answersState = res.data.questions.reduce(
          (prev, cur) => {
            return {
              ...prev,
              [`question__${cur.id}`]: 0,
              ordering: {
                ...prev.ordering,
                [`question__${cur.id}`]: cur.questionNumberInExam,
              },
              selectedList: [
                ...prev.selectedList,
                {
                  id: cur.id,
                  level: 0,
                },
              ],
            };
          },
          { ordering: {}, selectedList: [] },
        );
        this.mainList = res.data.questions;

        this.setState(
          {
            answers: answersState,
            title: "آزمون " + res.data.title,
            description: "توضیحات : " + res.data.description,
            suggestTime: `زمان آزمون: ${res.data.suggestTime} دقیقه`,
            exam: res.data,
            questionsList: res.data.questions,
            progress: false,
          },
          () => {
            // const delay = Math.round(this.state.questionsList.length / 4) * 600;

            // setTimeout(() => {
            //   this.reshapeExam();
            // }, delay);
            this.reshapeExam();
          },
        );
      })
      .catch(e => console.error(e));
  }

  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  changeAnswer = (qId, answer) => {
    let qAnswer = this.state.answers[`question__${qId}`];
    if (qAnswer === answer) {
      this.setState({
        answers: { ...this.state.answers, [`question__${qId}`]: 0 },
      });
    } else {
      this.setState({
        answers: { ...this.state.answers, [`question__${qId}`]: answer },
      });
    }
  };

  sortFilter = type => {
    this.setState({ sortFilter: type });
  };

  fontAndSizeFilter = (font, size) => {
    this.setState({ font, size });
  };

  _reshapeExam = ({ lastUpdate } = {}) => {
    const printType = localStorage.getItem("printType");
    let pageNumber = 0;

    const questions = [];
    const answers = [];

    const getPageHeight = () => {
      const elem = document.createElement("div");
      elem.setAttribute(
        "style",
        `position:fixed; top:0; left:-2000; opacity:0; width:1px; height:${pageContentHeight};`,
      );
      document.body.appendChild(elem);
      const ht = elem.offsetHeight;
      document.body.removeChild(elem);
      return printType === "ak" ? ht - 30 : ht;
    };

    //start calculating the positioning of the questions
    let pageContents = [];
    const pageHeight = getPageHeight();
    const keyColumnsCount = this.state.keyColumns;

    setTimeout(() => {
      if (!this.examPreview.current) return;

      if (!lastUpdate)
        window.MathJax.Hub.Typeset(this.examPreview.current, () => {
          this.setState(
            {
              positioningDone: true,
              rawHtml: this.state.questionsList.reduce(
                (acc, q) => (
                  (acc[q.id] = document.getElementById(
                    "q_" + q.id + "_wrapper",
                  ).innerHTML),
                  acc
                ),
                {},
              ),
            },
            () => this._reshapeExam({ lastUpdate: true }),
          );

          //this.reshapeExam({ lastUpdate: true });
          //this.setState({ positioningDone: true });
          //this.setState({ loading: false });
        });
      else {
        /*
        window.MathJax.Hub.Typeset(this.examPreview.current, () => { 
          window.MathJax.Hub.Typeset(this.componentRef, () => { 
            this.setState({ loading: false }); 
          });
        });
        */
      }
    }, 1000);

    this.state.questionsList.forEach((q, ind) => {
      let printId = "q_" + q.id;
      let elm =
        document.getElementById(printId + "_wrapper") ||
        document.getElementById(printId) ||
        {};

      questions.push({
        name: q.id,
        type: printType === "qa" ? "both" : "question",
        height: elm.offsetHeight,
        data: q,
        number: ind + 1,
      });
    });

    this.state.questionsList.forEach((q, ind) => {
      answers.push({
        name: q.id,
        type: "answer",
        height: (document.getElementById("a_" + q.id) || {}).offsetHeight,
        data: q,
        number: ind + 1,
      });
    });

    pageContents.push([{ name: "t_1", type: "header" }]);
    let headerHeight =
      (document.getElementById("t_1") || {}).offsetHeight || 100;

    const addArray = (arr, initialHeight) => {
      arr.forEach(item => {
        const hasNextPageHeader =
          ((this.state.questionHeaders || {})[item.data.id] || {}).nextPage ===
          true;

        if (
          !hasNextPageHeader &&
          lastUpdate &&
          initialHeight + item.height <= pageHeight
        ) {
          pageContents[pageNumber].push(item);
          initialHeight += item.height;
        } else {
          pageContents.push([item]);
          initialHeight = item.height;
          pageNumber++;
        }
      });
    };

    if (["q", "qa", "qa-a"].some(tp => tp == printType)) {
      addArray(questions, headerHeight);

      if (printType == "qa-a") {
        pageContents.push([]);
        pageNumber++;
        addArray(answers, 0);
      }
    } else if (["a"].some(tp => tp == printType))
      addArray(answers, headerHeight);
    else if (["ak"].some(tp => tp == printType)) {
      let isFirstPage = true;

      let keyHeight = (!answers.length ? 0 : answers[0].height) || 18;

      let tempKeys = [].concat(answers);

      while (tempKeys.length) {
        let newPage = [];

        /*
        let rowsCount = Math.floor(
          (pageHeight - (isFirstPage ? headerHeight : 0)) / keyHeight,
        );
        */
        let rowsCount = 50;

        let takeCount = Math.min(keyColumnsCount * rowsCount, tempKeys.length);

        let curKeys = tempKeys.slice(0, takeCount);
        tempKeys = tempKeys.slice(takeCount);

        for (
          let ind = 0;
          ind < Math.min(rowsCount, takeCount) * keyColumnsCount;
          ind++
        ) {
          let colInd = ind % keyColumnsCount;
          let rowInd = Math.floor(ind / keyColumnsCount);
          let pos = colInd * rowsCount + rowInd;

          newPage.push(curKeys[pos] || {});
        }

        if (isFirstPage) newPage.forEach(x => pageContents[0].push(x));
        else pageContents.push(newPage);

        pageNumber++;

        isFirstPage = false;
      }
    }

    this.setState({
      aaa: pageContents,
      questionsSorted: questions,
      answersSorted: answers,
      loading: !lastUpdate,
    });
  };

  reshapeExam = () => {
    // Types of print: q:question only, a:answer only, qa:question and answer, qa-a:question and answer separated, ak:answer keys

    this.setState({ loading: true, rawHtml: {} }, () => this._reshapeExam());
  };

  replaceQuestion = (from, to) => {
    const fromIndex = this.state.questionsList.findIndex(
      q => q.id === this.state.questionsSorted[from].data.id,
    );

    const toIndex = this.state.questionsList.findIndex(
      q => q.id === this.state.questionsSorted[to].data.id,
    );

    const temp = this.state.questionsList.slice();
    [temp[fromIndex], temp[toIndex]] = [temp[toIndex], temp[fromIndex]];

    this.setState({ questionsList: temp }, () => this.reshapeExam());
  };

  getQuestionProps = id => {
    const res = this.state.questionsProperties.find(q => q.id === id);

    if (res) {
      return res;
    } else {
      return {
        column: this.state.sortFilter,
        space: this.state.eachQuestionSpace,
        size: this.state.size,
        font: this.state.font,
        headerSize: this.state.miniheaderSize,
        headerFont: this.state.miniHeaderFont,
      };
    }
  };

  setQuestionProps = (id, props) => {
    const index = this.state.questionsProperties.findIndex(q => q.id === id);
    const temp = this.state.questionsProperties.slice();

    if (index > -1) {
      temp[index] = { id, ...props };
      this.setState({ questionsProperties: temp }, () => this.reshapeExam());
    } else {
      this.setState(
        {
          questionsProperties: this.state.questionsProperties.concat({
            id,
            ...props,
          }),
        },
        () => this.reshapeExam(),
      );
    }
  };

  removeQuestionProp = id => {
    const index = this.state.questionsProperties.findIndex(q => q.id === id);
    const temp = this.state.questionsProperties.slice();

    if (index > -1) {
      temp.splice(index, 1);

      this.setState({ questionsProperties: temp }, () => this.reshapeExam());
    }
  };

  fillPreview = proportional => {
    if (!this.examPreview.current) {
      return;
    }
    var currentWidth = this.examPreview.current.offsetWidth;
    var currentHeight = this.examPreview.current.offsetHeight;

    var availableHeight = this.questionListWrapper.current.offsetHeight;
    var availableWidth = this.questionListWrapper.current.offsetWidth;

    var scaleX = Math.round((availableWidth / currentWidth) * 100) / 100;
    var scaleY = Math.round((availableHeight / currentHeight) * 100) / 100;

    if (proportional) {
      scaleX = Math.min(scaleX, scaleY);
      scaleY = scaleX;
    }

    this.setState({ scaleX, scaleY });
  };

  setQuestionHeader = (questionId, data) => {
    questionId = String(questionId);
    let hasData =
      !!(data || {}).right || !!(data || {}).center || !!(data || {}).left;

    let arr = Object.keys(this.state.questionHeaders).map(id => ({
      id: id,
      data: this.state.questionHeaders[id],
    }));

    if (arr.some(x => x.id === questionId)) {
      arr
        .filter(x => x.id === questionId)
        .forEach(x => (x.data = hasData ? data : null));
    } else if (hasData) arr.push({ id: questionId, data: data });

    this.setState({
      questionHeaders: arr
        .filter(x => !!x.data)
        .reduce((acc, cur) => ((acc[cur.id] = cur.data), acc), {}),
    });

    setTimeout(() => this.reshapeExam(), 100);
  };

  setKeyColumns = value => {
    this.setState({ keyColumns: value });

    setTimeout(() => this.reshapeExam(), 100);
  };

  getPrintBg() {
    const bgUrls = {
      simple: ImageSimple,
      fantasy: ImageFantasy,
      nastaliq: ImageNastaliq,
    };
    const bgPage2Urls = {
      simple: ImageSimple,
      fantasy: ImageFantasyPage2,
      nastaliq: ImageNastaliqPage2,
    };
    const bgWithoutLogoUrls = {
      simple: ImageSimpleWob,
      fantasy: ImageFantasyWob,
      nastaliq: ImageNastaliqWob,
    };
    const bgWithoutLogoPage2Urls = {
      simple: ImageSimpleWob,
      fantasy: ImageFantasyWobPage2,
      nastaliq: ImageNastaliqWobPage2,
    };
    const centerPageNumber = ["nastaliq"];
    const needHeaderLine = ["simple"];
    const bg = this.state.bgImage || localStorage.getItem("printBackground");
    const isCentered = centerPageNumber.some(p => p === bg);
    // const withoutLogo = localStorage.getItem("printWithoutLogo") === "false";
    const withoutLogo = this.state.withoutBaamtestLogo;
    const shouldShowHeaderLine = needHeaderLine.some(p => p === bg);

    return {
      bgUrl: withoutLogo ? bgWithoutLogoUrls[bg] : bgUrls[bg],
      bgPage2Url: withoutLogo ? bgWithoutLogoPage2Urls[bg] : bgPage2Urls[bg],
      shouldShowHeaderLine,
      bg,
      isCentered,
      withoutLogo,
    };
  }

  render() {
    const printType = localStorage.getItem("printType");
    let hasButtons = ["q", "a", "qa", "ak"].some(x => x == printType);

    const setPrintType = tp => {
      localStorage.setItem("printType", tp);
      this.setState({ isKey: tp == "ak", isQuestion: tp == "q" }, () =>
        this.reshapeExam(),
      );
    };

    const enableQuestionHeaders = ["q", "a", "qa", "qa-a"].some(
      tp => tp === printType,
    );

    return (
      <>
        <Backdrop
          style={{ zIndex: 1000000, color: "#228b22" }}
          open={this.state.progress}
        >
          <LinearProgress color="inherit" />
        </Backdrop>
        <Backdrop
          style={{ zIndex: 1000000, color: "#228b22" }}
          open={this.state.loading}
        >
          <LinearProgress color="inherit" />
        </Backdrop>
        <ChangeBackgroundModal
          open={this.state.changeBgModal}
          onClose={() => this.setState({ changeBgModal: false })}
          prevSelected={this.state.bgImage}
          onSubmit={selected => {
            const templates = ["simple", "fantasy", "nastaliq"];
            this.setState({
              bgImage: templates[selected],
              changeBgModal: false,
            });
          }}
        />
        <PageTitle title="مدیریت آزمون - پرینت آزمون" />
        <Divider />
        {!this.state.progress && (
          <div
            style={{
              padding: 50,
              margin: 60,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <Grid container spacing={3} style={{ padding: "0 10px" }}>
              <Grid
                item
                xs={8}
                spacing={2}
                sm={4}
                style={{ alignItems: "flex-start", padding: "60px" }}
              >
                <div
                  style={{
                    position: "sticky",
                    top: 0,
                    flex: 1,
                  }}
                >
                  <PrintBtn content={() => this.componentRef} />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      margin: "8px 0",
                    }}
                  >
                    <Button
                      variant="contained"
                      // color={
                      //   this.state.tab === "general" ? "primary" : "secondary"
                      // }
                      onClick={() => this.setState({ tab: "general" })}
                      style={{
                        borderRadius: 50,
                        height: 40,
                        boxShadow: "none",
                        flexShrink: 0,
                        backgroundColor:
                          this.state.tab === "general"
                            ? "#8AB668"
                            : "red",
                        border:this.state.tab === "general"
                        ? "1px solid black"
                        : "none",
                      }}
                    >
                      کلی
                    </Button>
                    <Button
                      variant="contained"
                      // color={
                      //   this.state.tab === "minor" ? "primary" : "secondary"
                      // }
                      onClick={() => this.setState({ tab: "minor" })}
                      style={{
                        borderRadius: 50,
                        height: 40,
                        boxShadow: "none",
                        flexShrink: 0,
                        backgroundColor:
                          this.state.tab === "minor" ? "#8AB668" : "red",
                          border:this.state.tab === "minor"
                          ? "1px solid black"
                          : "none",
                      }}
                    >
                      جزئی
                    </Button>
                  </div>
                  <div
                    style={{
                      maxHeight: `calc(100vh - 200px)`,
                      overflowY: "auto",
                      scrollbarWidth: "thin",
                      textAlign: "center",
                    }}
                  >
                    {this.state.tab === "general" && (
                      <>
                        <ColumnBox
                          goToRegisterExam={() => this.reshapeExam()}
                          selectedFilter={this.state.sortFilter}
                          sortFilter={this.sortFilter}
                        />
                        <ExamHeading
                          onSelectLogoClicked={() =>
                            this.setState({ openDialog: true })
                          }
                          selectedLogo={this.state.customLogo}
                          examTitle={this.state.title}
                          suggestTime={this.state.suggestTime}
                          headingBoxs={this.state.headingBoxs}
                          setState={newState => this.setState(newState)}
                          handleDeleteBaamtestLogo={() =>
                            this.setState({
                              withoutBaamtestLogo: !this.state
                                .withoutBaamtestLogo,
                            })
                          }
                          withoutBaamtestLogo={this.state.withoutBaamtestLogo}
                          handleOpenChangeBgModal={() =>
                            this.setState({ changeBgModal: true })
                          }
                        />
                        {/* <div style={{ display: "flex", gap: 4 }}> */}
                        <ExamFont
                          hasQuestionHeader={enableQuestionHeaders}
                          questionHeaderCount={
                            Object.keys(this.state.questionHeaders || {}).length
                          }
                          state={this.state}
                          setState={newState => this.setState(newState)}
                          goToRegisterExam={() => this.reshapeExam()}
                        />
                        <KeyColumns
                          disabled={printType != "ak"}
                          onSubmit={this.setKeyColumns}
                        />
                      </>
                    )}
                    {this.state.tab === "minor" && (
                      <>
                        <ReplaceQuestion
                          questions={this.state.questionsSorted}
                          onSubmit={this.replaceQuestion}
                        />
                        <QuestionHeader
                          disabled={!enableQuestionHeaders}
                          questions={this.state.questionsSorted}
                          questionHeaders={this.state.questionHeaders}
                          onSubmit={this.setQuestionHeader}
                        />
                        <QuestionProperty
                          questions={this.state.questionsSorted}
                          onSubmit={this.setQuestionProps}
                          onClearOne={this.removeQuestionProp}
                          defaultFont={this.state.font}
                          defaultSize={this.state.size}
                        />
                      </>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid
                direction="column"
                item
                xs={4}
                sm={8}
                style={{ alignItems: "flex-end" }}
                ref={this.questionListWrapper}
              >
                {hasButtons && (
                  <div style={{ width: "100%", textAlign: "center" }}>
                    {[
                      { type: "q", title: "سوال" },
                      { type: "a", title: "پاسخ" },
                      { type: "qa", title: "سوال و پاسخ" },
                      { type: "ak", title: "کلید" },
                    ].map(itm => (
                      <Button
                        style={{
                          margin: "0 0.5em",
                          fontWeight:
                            printType === itm.type ? "bold" : "normal",
                          backgroundColor:
                            printType === itm.type
                              ? "rgb(255, 0, 0)"
                              : "transparent",
                          border: "1px solid rgb(254, 95, 85)",
                          color:
                            printType === itm.type
                              ? "white"
                              : "rgb(254, 95, 85)",
                          borderRadius: "10rem",
                        }}
                        variant="contained"
                        onClick={() => setPrintType(itm.type)}
                      >
                        {itm.title}
                      </Button>
                    ))}
                  </div>
                )}
                <div
                  id="preview-exam"
                  className="exam-wrapper"
                  ref={this.examPreview}
                  style={{
                    marginTop: "1em",
                    transition: "all 500ms ease",
                    width: "210mm",
                    maxHeight: "297mm",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    transform: `scale3d(${this.state.scaleX}, ${this.state.scaleY}, 1)`,
                    transformOrigin: "0 0",
                  }}
                >
                  {this.state.aaa.map((el, idx) => {
                    return (
                      <div
                        id={`n_${idx}`}
                        style={{
                          width: "100%",
                          marginBottom: 20,
                          backgroundImage: `url('${
                            idx === 0
                              ? this.getPrintBg().bgUrl
                              : this.getPrintBg().bgPage2Url
                          }')`,
                          backgroundSize: "100%",
                          backgroundRepeat: "no-repeat",

                          padding: "2em",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{ height: pageContentHeight, width: "100%" }}
                        >
                          <QuestionList
                            showHeaderLine={
                              this.getPrintBg().shouldShowHeaderLine
                            }
                            state={this.state}
                            items={el}
                            changeAnswer={this.changeAnswer}
                            getQuestionProps={this.getQuestionProps}
                            printType={printType}
                          />
                        </div>
                        <div /* className="pageNum" */
                          style={{
                            position: "absolute",
                            bottom: "0.7em",
                            left: this.getPrintBg().isCentered
                              ? "18.8em"
                              : "3.5em",
                            width: "1.9em",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        >
                          {toFA(idx + 1)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
            <div
              className="cont-page exam-wrapper"
              ref={el => (this.componentRef = el)}
            >
              {this.state.positioningDone &&
                this.state.aaa.map((el, idx) => {
                  return (
                    <>
                      <div
                        className="page-p"
                        id={`n_${idx}`}
                        style={{
                          width: "210mm",
                          height: `297mm`,

                          overflow: "hidden",
                          backgroundImage: `url('${
                            idx === 0
                              ? this.getPrintBg().bgUrl
                              : this.getPrintBg().bgPage2Url
                          }')`,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",

                          padding: "2em",

                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",

                          colorAdjust: "exact",
                          WebkitPrintColorAdjust: "exact",
                        }}
                      >
                        <div
                          style={{ width: "100%", height: pageContentHeight }}
                        >
                          <QuestionList
                            showHeaderLine={
                              this.getPrintBg().shouldShowHeaderLine
                            }
                            items={el}
                            state={this.state}
                            changeAnswer={this.changeAnswer}
                            getQuestionProps={this.getQuestionProps}
                            isPrintMode={true}
                            printType={printType}
                          />
                        </div>
                        <div /* className="pageNum2" */
                          style={{
                            position: "absolute",
                            bottom: "0.7em",
                            left: this.getPrintBg().isCentered
                              ? "18.8em"
                              : "3.5em",
                            width: "1.9em",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        >
                          {toFA(idx + 1)}
                        </div>
                      </div>
                      <div className="after-break"></div>
                    </>
                  );
                })}
            </div>
          </div>
        )}
        {this.state.openDialog && (
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={this.state.openDialog}
            onClose={this.handleClose}
            style={{ backgroundColor: "rgb(0 0 0 / 26%)" }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.openDialog}>
              <ImageCropper
                isUpload={false}
                image={this.state.customLogo}
                onChangeImage={customLogo => this.setState({ customLogo })}
                onCloseModal={() => this.setState({ openDialog: false })}
              />
            </Fade>
          </Modal>
        )}
      </>
    );
  }
}

export default CreateTest;
