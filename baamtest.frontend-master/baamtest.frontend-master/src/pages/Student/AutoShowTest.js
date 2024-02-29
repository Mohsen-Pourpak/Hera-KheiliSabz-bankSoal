import React from "react";
import {
  Grid,
  Button,
  Tooltip,
  Backdrop,
  CircularProgress,
  Dialog,
  Divider,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import {
  BookmarkBorder,
  Timeline,
  Feedback,
  Bookmark,
  DeleteSweep,
  ExpandMore,
  Add,
  ExpandLess,
  Remove,
} from "@material-ui/icons";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import Textarea from "../../components/Form/Textarea";
import MyMath from "../../components/Form/MyMath";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import mask from "../../images/mask.svg";
// import { Calendar } from "react-modern-calendar-datepicker";
// import ArrowIcon from "../../images/icons/circle-arrow-icon.svg";
// import Image5 from "../../images/pishkhan/Untitled-5.svg";
import Hard from "../../images/test/chart-simple red .svg";
import Normal from "../../images/test/chart-yellow.svg";
import Easy from "../../images/test/chart-green.svg";
import {
  questionNormal,
  saveQuestion,
  sendQuestionProblemReports,
} from "../../api/services/question";
// import styles from "../../components/PageTitle/styles";
import { toFA, QUESTION_PRICE, PER_PAGE_QUESTIONS } from "../../utils/Utils";

import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";
import Pagination from "../../components/Form/Pagination";

const Point = ({ color }) => (
  <div
    style={{
      height: 12,
      width: 12,
      backgroundColor: color,
      border: "1px solid #495867",
      borderRadius: 30,
    }}
  />
);

const Line = () => (
  <div style={{ height: 1, flex: 1, backgroundColor: "#495867" }} />
);

const Level = ({ image, right, percent }) => {
  console.warn(percent);
  let newPercent = percent;
  return (
    <div
      style={{
        height: 100,
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <img
        style={{ position: "relative", margin: "0 auto" }}
        src={image}
        alt=""
        width={`${newPercent}%`}
      />
      {/* <div style={{height: (80*newPercent), width: (90*newPercent), backgroundImage: `url("${image}")`, backgroundSize: 'cover'}} /> */}
    </div>
  );
};

const style = {
  questionNum: {
    border: "1px solid #000",
    borderRadius: 60,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    paddingTop: 3,
    color: "#000",
    fontSize: 19,
  },
  questionNumContainer: {
    top: 50,
    paddingRight: 15,
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    zIndex: 1000,
    fontSize: "0.8rem",
  },
  optionNum: {
    border: "1px solid #495867",
    borderRadius: 60,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: "none",
    paddingTop: 3,
    color: "#495867",
    position: "relative",
    fontSize: 19,
    marginLeft: 10,
    marginRight: 10,
  },
  optionNumActive: {
    border: "1px solid #495867",
    borderRadius: 60,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: "none",
    paddingTop: 3,
    color: "#495867",
    position: "relative",
    fontSize: 19,
    marginLeft: 10,
    marginRight: 10,
  },
  questionTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto",
    width: "95%",
    marginTop: "0px",
    marginBottom: "-56px",
    marginLeft: "50px",
    position: "relative",
    zIndex: 3000,
  },

  actionText: {
    color: "#deeaf4",
    fontSize: 7,
  },
  actionIcon: {
    fill: "#deeaf4",
    fontSize: 15,
    marginBottom: 0,
  },
  actionButton: {
    backgroundColor: "#228B22",
    color: "#fff",
    width: "fit-content",
    height: 35,
    padding: "6.25px 45px 6.25px 20px",
    zIndex: 900,
    fontSize: 12,
    boxShadow: "0 0 5px -2px #000",
    marginRight: -30,
    marginTop: -10,
    marginLeft: -2,
  },
  circleButton: {
    height: 35,
    width: 35,
    marginTop: -10,
    zIndex: 910,
    position: "absolate",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    backgroundColor: "#fff",
    border: "1px solid #3d82a4",
    boxShadow: "0 0 5px -2px #000",
  },
  bottomActions: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "calc(100% - 60px)",
    marginRight: 5,
    marginTop: -45,
    marginBottom: 30,
  },
  box: {
    backgroundColor: "#228B22",
    color: "#fff",
    width: "fit-content",
    height: 25,
    top: -1,
    right: -1,
    position: "relative",
    borderRadius: 50,
    padding: "3.25px 10px",
  },
  boxOutline: {
    backgroundColor: "#fff",
    border: "1px solid #3d82a4",
    color: "#3d82a4",
    width: "fit-content",
    height: 25,
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
  },
  randomFilter: {
    backgroundColor: "#CBF2CF",
    color: "#000",
    width: "auto",
    height: 40,
    flex: 1,
    padding: 10,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  sortFilter: {
    backgroundColor: "#CBF2CF",
    border: "1px solid #CBF2CF",
    color: "#000",
    height: 40,
    flex: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  sortFilterActive: {
    backgroundColor: "#C87474",
    border: "1px solid #C87474",
    color: "#000",
    height: 40,
    flex: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  correctOption: {
    backgroundColor: "#FF0000",
    color: "#fff",
    width: "fit-content",
    height: 30,
    borderRadius: 50,
    padding: "6.25px 10px",
  },
};

class CreateTest extends React.Component {
  constructor(props) {
    super(props);
    this.mainList = [];
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      page: 1,
      questionsList: [],
      selectedList: [],
      progress: false,
    };
  }
  componentDidMount() {
    let autoCreate = localStorage.getItem("autoCreateObj");
    let autoCreateObj = JSON.parse(autoCreate);
    // console.log(autoCreateObj);
    let selectedList = [];
    autoCreateObj.forEach(item => {
      selectedList.push({
        id: item.id,
        level: item.difficultyId,
      });
    });
    this.mainList = autoCreateObj;
    this.setState({
      questionsList: autoCreateObj,
      progress: false,
      selectedList,
    });
  }

  getQuestions() {
    this.setState({
      progress: true,
    });
    this.fetchData();
  }

  fetchData = () => {
    let query = localStorage.getItem("questionsQuery");
    if (this.state.randomize) {
      query += `&randomize=${this.state.randomize}`;
    }
    if (this.state.repetitive === true || this.state.repetitive === false) {
      query += `&Repetitive=${this.state.repetitive}`;
    }
    let token = localStorage.getItem("userToken");
    questionNormal(token, query).then(res_ => {
      let res = res_.data;
      let pagination = JSON.parse(res_.headers.pagination);
      let pageCount = pagination.totalPages;
      let selectedList = [];
      res.data.forEach(item => {
        selectedList.push({
          id: item.id,
          level: item.difficultyId,
        });
        this.setState({
          answers: { ...this.state.answers, [`question__${item.id}`]: 0 },
        });
      });
      console.error({ selectedList });
      this.mainList = res.data;
      this.setState({
        questionsList: res.data,
        progress: false,
        pageCount,
        selectedList,
      });
    });
  };

  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  openSendReport = id => {
    this.setState({
      selectedQuestion: id,
      open: true,
    });
  };

  sendReport = () => {
    let token = localStorage.getItem("userToken");
    if (!this.state.message) {
      toast.error("لطفا متن گزارش را وارد کنید");
    } else {
      sendQuestionProblemReports(
        this.state.selectedQuestion,
        this.state.message,
        token,
      ).then(res => {
        if (res.isSuccess) {
          toast.success(res.message);
          this.setState({
            selectedQuestion: null,
            message: "",
            open: false,
          });
        }
      });
    }
  };

  changeAnswer = (qId, answer) => {
    // let qAnswer = this.state.answers[`question__${qId}`]
    // if (qAnswer === answer) {
    //     this.setState({answers: {...this.state.answers, [`question__${qId}`]: 0}})
    // } else {
    //     this.setState({answers: {...this.state.answers, [`question__${qId}`]: answer}})
    // }
  };

  sortFilter = type => {
    if (this.state.sortFilter === type) {
      //   console.log(this.mainList[0]);
      //   console.log(this.state.questionsList[0]);
      this.setState({ sortFilter: null, questionsList: this.mainList });
    } else {
      this.setState({ sortFilter: type });
      this.sortList(type);
    }
  };

  sortList = type => {
    let newList = this.state.questionsList.sort((a, b) => {
      var keyA = a.difficultyId,
        keyB = b.difficultyId;
      // Compare the 2 dates
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    if (type === "asc") {
      this.setState({ questionsList: newList.reverse() });
    } else {
      this.setState({ questionsList: newList });
    }
  };

  renderQuestionsList = items => {
    // const classes = this.props.classes;
    let rowId = 1 + (this.state.page - 1) * PER_PAGE_QUESTIONS;
    return items.map((item, idx) => {
      let levelId = item.difficultyId;
      let isOneActive = false;
      let isTowActive = false;
      let isThreeActive = false;
      let isFourActive = false;
      let labelColor =
        levelId === 1 ? "#3EC592" : levelId === 2 ? "#FB963A" : "#C83E43";
      let isMore = this.state[`isMore__${item.id}`];
      let isEnglish = item.lessonId === 6;
      let isSelected =
        this.state.selectedList.filter(el => el.id === item.id).length !== 0;
      return (
        <div style={{ position: "relative", flex: 1, width: "100%" }}>
          {/* <div style={style.questionTitle}>
            {toFA(item.lessonTitle)} | {item.topic}
          </div> */}
          <div style={style.questionNumContainer}>
            <div style={style.questionNum}>{toFA(idx + rowId)}</div>
            {/* <div style={style.boxOutline}>
                            <div style={style.box}>
                                ضریب تمیز
                            </div>
                            <span style={{padding: '3.25px 10px'}}>{toFA(item.cleanCoefficient)}</span>
                        </div> */}
          </div>
          <Grid
            item
            sm={12}
            alignItems="center"
            className="inputContainer"
            style={{
              padding: 0,
              background: `linear-gradient(90deg, ${labelColor} 50%, ${labelColor} 50%)`,
              alignItems: "center",
              width: "calc(100% - 10px)",
              marginTop: 5,
              borderRadius: 20,
              marginRight: 5,
              marginBottom: 20,
            }}
          >
            <Grid
              item
              direction="column"
              sm={12}
              spacing={1}
              justify="space-between"
              alignItems="center"
              style={{
                padding: "10px 5px",
                backgroundColor: "#fff",
                marginBottom: "0px !important",
                borderRadius: "1.2rem",

                minHeight: 300,

                borderBottom: isMore ? "1px solid #3d82a4" : "none",
              }}
            >
              <Grid
                direction="row"
                alignItems="flex-start"
                spacing={3}
                justify="flex-start"
                container
                style={{
                  padding: "50px 80px 0 30px",
                  margin: 0,
                  justifyContent: isEnglish ? "flex-end" : "flex-start",
                }}
              >
                <MyMath
                  value={item.questionFace
                    .replace(/font-size/g, "")
                    .replace(/font-family/g, "")
                    .replace(/&nbsp;/g, "")}
                />
              </Grid>
              <Grid
                direction="column"
                alignItems="flex-start"
                spacing={3}
                justify="flex-start"
                container
                style={{ padding: "20px 67.5px 30px", margin: 0 }}
              >
                <Grid
                  direction={isEnglish ? "row-reverse" : "row"}
                  alignItems="flex-start"
                  justify="flex-start"
                  container
                  style={{ padding: "0", margin: 0 }}
                >
                  <Grid
                    item
                    xs={6}
                    direction={isEnglish ? "row-reverse" : "row"}
                    alignItems="flex-start"
                    style={{
                      padding: "15px 20px",
                      margin: 0,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={
                        isOneActive ? style.optionNumActive : style.optionNum
                      }
                      onClick={() => this.changeAnswer(item.id, 1)}
                    >
                      {isEnglish ? "1" : "۱"}
                    </div>

                    <MyMath
                      value={item.option1
                        .replace(/font-size/g, "")
                        .replace(/font-family/g, "")
                        .replace(/&nbsp;/g, "")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    alignItems="flex-start"
                    direction={isEnglish ? "row-reverse" : "row"}
                    style={{
                      padding: "15px 20px",
                      margin: 0,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={
                        isTowActive ? style.optionNumActive : style.optionNum
                      }
                      onClick={() => this.changeAnswer(item.id, 2)}
                    >
                      {isEnglish ? "2" : "۲"}
                    </div>

                    <MyMath
                      value={item.option2
                        .replace(/font-size/g, "")
                        .replace(/font-family/g, "")
                        .replace(/&nbsp;/g, "")}
                    />
                  </Grid>
                </Grid>
                <Grid
                  direction={isEnglish ? "row-reverse" : "row"}
                  alignItems="flex-start"
                  justify="flex-start"
                  container
                  style={{ padding: "0", margin: 0 }}
                >
                  <Grid
                    item
                    xs={6}
                    direction={isEnglish ? "row-reverse" : "row"}
                    style={{
                      padding: "15px 20px",
                      margin: 0,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={
                        isThreeActive ? style.optionNumActive : style.optionNum
                      }
                      onClick={() => this.changeAnswer(item.id, 3)}
                    >
                      {isEnglish ? "3" : "۳"}
                    </div>

                    <MyMath
                      value={item.option3
                        .replace(/font-size/g, "")
                        .replace(/font-family/g, "")
                        .replace(/&nbsp;/g, "")}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    direction={isEnglish ? "row-reverse" : "row"}
                    style={{
                      padding: "15px 20px",
                      margin: 0,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={
                        isFourActive ? style.optionNumActive : style.optionNum
                      }
                      onClick={() => this.changeAnswer(item.id, 4)}
                    >
                      {isEnglish ? "4" : "۴"}
                    </div>
                    <MyMath
                      value={item.option4
                        .replace(/font-size/g, "")
                        .replace(/font-family/g, "")
                        .replace(/&nbsp;/g, "")}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              direction="column"
              alignItems="center"
              spacing={3}
              justify="space-between"
              container
              style={{ width: 80, display: "content" }}
            >
              <Button
                onClick={() => {
                  let token = localStorage.getItem("userToken");
                  saveQuestion(token, item.id).then(res => {
                    if (res.isSuccess) {
                      toast.success(res.message);
                    }
                    this.setState({
                      questionsList: this.state.questionsList.map(el => ({
                        ...el,
                        saved: el.id === item.id ? !el.saved : el.saved,
                      })),
                    });
                  });
                }}
              >
                <div
                  style={{ width: 50, display: "content", textAlign: "center" }}
                >
                  {item.saved ? (
                    <Bookmark style={style.actionIcon} />
                  ) : (
                    <BookmarkBorder style={style.actionIcon} />
                  )}
                  <div style={style.actionText}>ذخیره کردن</div>
                </div>
              </Button>
              <div style={{ width: 50, height: 30 }} />
              <Button onClick={() => this.openSendReport(item.id)}>
                <div
                  style={{ width: 50, display: "content", textAlign: "center" }}
                >
                  <Feedback style={style.actionIcon} />
                  <div style={style.actionText}>گزارش خطا</div>
                </div>
              </Button>
              <div style={{ width: 50, height: 30 }} />
              <Tooltip title={"در حال بروزرسانی"}>
                <Button>
                  <div
                    style={{
                      width: 50,
                      display: "content",
                      textAlign: "center",
                    }}
                  >
                    <Timeline style={style.actionIcon} />
                    <div style={style.actionText}>اطلاعات آماری</div>
                  </div>
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          {isMore && (
            <div
              style={{
                padding: "20px 30px 45px",
                width: "calc(100% - 60px)",
                backgroundColor: "#fff",
                marginTop: -20,
                position: "relative",
                right: 5,
                marginBottom: 20,
                borderRadius: "0 0 20px 20px",
              }}
            >
              <div style={style.correctOption}>
                گزینه {toFA(item.correctOption)}
              </div>
              <Grid
                direction="row"
                alignItems="flex-start"
                spacing={3}
                justify="flex-start"
                container
                style={{ padding: "20px 20px 0 20px", margin: 0 }}
              >
                {/* <div dangerouslySetInnerHTML={{ __html: item.answer }} /> */}
                <div style={{ overflow: "hidden", maxWidth: "52vw" }}>
                  <MyMath
                    value={item.answer
                      .replace(/font-size/g, "")
                      .replace(/font-family/g, "")
                      .replace(/&nbsp;/g, "")}
                  />
                </div>
              </Grid>
            </div>
          )}
          <div style={style.bottomActions}>
            <div style={{ display: "flex" }}>
              <div
                style={style.circleButton}
                onClick={() => {
                  let selectedList = this.state.selectedList;
                  if (isSelected) {
                    let newList = selectedList.filter(el => el.id !== item.id);
                    this.setState({ selectedList: newList });
                  } else {
                    this.setState({
                      selectedList: [
                        ...selectedList,
                        {
                          id: item.id,
                          level: levelId,
                        },
                      ],
                    });
                  }
                }}
              >
                {isSelected ? (
                  <Remove style={{ fill: "#FF0000" }} />
                ) : (
                  <Add style={{ fill: "#3EC592" }} />
                )}
              </div>
              <div style={style.actionButton}>
                {isSelected ? "حذف" : "انتخاب"} سوال
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={style.circleButton}
                onClick={() => {
                  this.setState({
                    [`isMore__${item.id}`]: !this.state[`isMore__${item.id}`],
                  });
                }}
              >
                {isMore ? <ExpandLess /> : <ExpandMore />}
              </div>
              <div style={style.actionButton}>
                {isMore ? "بستن" : "مشاهده"} پاسخ
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  renderSelectedList = items => {
    return items.map(item => {
      return (
        <div
          style={{
            backgroundColor: "#0000006b",
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            borderRadius: 35,
            padding: "10px 15px",
            textAlign: "right",
            marginLeft: 5,
          }}
        >
          <div style={{ color: "#fff", fontSize: 17, textAlign: "right" }}>
            {item.title}
          </div>
          <div
            onClick={() => {
              let selectedList = this.state.selectedList.filter(
                el => el !== item,
              );
              this.setState({ selectedList });
            }}
            style={{
              backgroundColor: "#FF0000",
              cursor: "pointer",
              width: 45,
              borderRadius: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
            }}
          >
            <DeleteSweep style={{ fill: "#fff" }} />
          </div>
        </div>
      );
    });
  };

  levelPercent = levelId => {
    let List = [1, 2, 3, 4, 5]
      .map(
        levelId =>
          this.state.selectedList.filter(item => item.level === levelId).length,
      )
      .sort((a, b) => {
        return b - a;
      });
    let percent =
      (this.state.selectedList.filter(item => item.level === levelId).length /
        List[0]) *
      100;
    if (this.state.selectedList.length === 0) {
      percent = 0;
    }
    return percent;
  };

  goToRegisterExam = () => {
    console.warn(this.state.selectedList);
    const { selectedList } = this.state;
    // let ownerId = localStorage.getItem("userId");
    let autoCreateObj = localStorage.getItem("autoCreate");
    autoCreateObj = JSON.parse(autoCreateObj);

    console.error(autoCreateObj);
    let obj = {
      title: autoCreateObj.title,
      description: autoCreateObj.title,
      startTime: "",
      endTime: "",
      examType: "Normal",
      target: "Normal",
      level: "Normal",
      ownerId: autoCreateObj.ownerId,
      headId: autoCreateObj.ownerId,
      gradeId: `${autoCreateObj.gradeId}`,
      questionsIdsAndNumbers: selectedList.map((el, idx) => {
        return {
          questionId: el.id,
          questionNumberInExam: idx + 1,
        };
      }),
    };

    localStorage.setItem("autoCreateObj", JSON.stringify(obj));
    this.props.history.push({
      pathname: "/dashboard/test/register-test",
    });
  };

  handleChangePage = (_r, page) => {
    this.setState({ page }, () => this.fetchData());
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        <Backdrop
          style={{ zIndex: 1000000, color: "#228b22" }}
          open={this.state.progress}
          onClick={() => console.log("clicked")}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <PageTitle title="ساخت آزمون - نمایش سوالات" />
        <Divider />
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <div
            style={{
              margin: 60,
              padding: 50,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
              alignItems: "flex-start",
              display: "flex",
            }}
          >
            <div
              style={{ position: "sticky", top: -15, flex: 1, minWidth: 270 }}
            >
              <div>
                <Grid
                  direction="column"
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: "7.5px 15px",
                    backgroundColor: "#F1ECCF",
                    margin: "20px 0",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      paddingTop: 30,
                      margin: "-15px 0",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <PageTitle
                      title="سوالات انتخاب شده"
                      size="h4"
                      color="#555"
                    />
                    <div
                      style={{
                        color: "#3d82a4",
                        fontSize: 14,
                        padding: "10px 17px 0",
                        margin: "-30px 0 0",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 30,
                          fontWeight: 800,
                          margin: "0 0 -10px",
                        }}
                      >
                        {toFA(this.state.selectedList.length)}
                      </div>
                      سوال
                    </div>
                  </div>
                  {/* <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      right: "9%",
                      height: 100,
                      margin: "0 0 -5px 0",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ flex: 0.5 }} />
                    <Level
                      image={Hard}
                      right={0}
                      percent={
                        this.levelPercent(3) +
                        this.levelPercent(4) +
                        this.levelPercent(5)
                      }
                    />
                    <div style={{ margin: "0 -10px" }} />
                    <Level
                      image={Normal}
                      right={-20}
                      percent={this.levelPercent(2)}
                    />
                    <div style={{ margin: "0 -10px" }} />
                    <Level
                      image={Easy}
                      right={-40}
                      percent={this.levelPercent(1)}
                    />
                    <div style={{ flex: 0.5 }} />
                  </div>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      position: "relative",
                      zIndex: 2000,
                      margin: "0 0 30px 0",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Point color="#fff" />
                    <Line />
                    <Point color="#C83E43" />
                    <Line />
                    <Point color="#FB963A" />
                    <Line />
                    <Point color="#3EC592" />
                    <Line />
                    <Point color="#fff" />
                  </div> */}
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      background: "#495867",
                      height: 40,
                      borderRadius: 50,
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ flex: 1, color: "#fff", textAlign: "center" }}
                    >
                      قیمت
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 10,
                        flex: 2,
                        borderRadius: 50,
                        background: "#fff",
                        height: 37,
                        margin: 1,
                      }}
                    >
                      <div
                        style={{ flex: 1, textAlign: "center", fontSize: 20 }}
                      >
                        {toFA(
                          (
                            this.state.selectedList.length * QUESTION_PRICE
                          ).toLocaleString(),
                        )}
                      </div>
                      <div>تومان</div>
                    </div>
                  </div>
                  <div
                    onClick={() => this.setState({ selectedList: [] })}
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      background: "#fff",
                      border: "1px solid #3d82a4",
                      margin: "20px 0 10px",
                      color: "#3d82a4",
                      height: 40,
                      borderRadius: 50,
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    پاک کردن همه
                  </div>
                </Grid>
                <div
                  onClick={this.goToRegisterExam}
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#8AB668",
                    color: "#fff",
                    height: 45,
                    marginBottom: 20,
                    borderRadius: 50,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  ثبت
                </div>
                <Grid
                  direction="column"
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className={`inputContainer filter-box${
                    this.state.filter1 ? " close" : ""
                  }`}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      margin: "-15px 0",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        color: "#555",
                        fontSize: 17,
                        padding: "0 17px",
                        textAlign: "center",
                      }}
                    >
                      ترتیب سوال ها
                    </div>
                    <div
                      className="filter-minimize"
                      onClick={() =>
                        this.setState({ filter1: !this.state.filter1 })
                      }
                    >
                      {this.state.filter1 ? "+" : "-"}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      onClick={() =>
                        this.setState({ randomize: null }, () =>
                          this.getQuestions(),
                        )
                      }
                      style={style.randomFilter}
                    >
                      چینش پیش فرض
                    </div>
                    <div style={{ height: 10 }} />
                    <div
                      onClick={() =>
                        this.setState({ randomize: uuidv4() }, () =>
                          this.getQuestions(),
                        )
                      }
                      style={style.randomFilter}
                    >
                      چینش تصادفی
                    </div>
                  </div>
                </Grid>
                <Grid
                  direction="column"
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className={`inputContainer filter-box${
                    this.state.filter2 ? " close" : ""
                  }`}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      margin: "-15px 0",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        color: "#555",
                        fontSize: 17,
                        padding: "0 17px",
                        textAlign: "center",
                      }}
                    >
                      سطح دشواری
                    </div>
                    <div
                      className="filter-minimize"
                      onClick={() =>
                        this.setState({ filter2: !this.state.filter2 })
                      }
                    >
                      {this.state.filter2 ? "+" : "-"}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", width: "100%", marginBottom: 10 }}
                  >
                    <div
                      onClick={() => this.sortFilter("asc")}
                      style={
                        this.state.sortFilter === "asc"
                          ? style.sortFilterActive
                          : style.sortFilter
                      }
                    >
                      آسان به سخت
                    </div>
                    <div style={{ flex: 0.1 }} />
                    <div
                      onClick={() => this.sortFilter("des")}
                      style={
                        this.state.sortFilter === "des"
                          ? style.sortFilterActive
                          : style.sortFilter
                      }
                    >
                      سخت به آسان
                    </div>
                  </div>
                </Grid>
                <Grid
                  direction="column"
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: "7.5px 15px",
                    cursor: "pointer",
                    backgroundColor: "#F1ECCF",
                    margin: 0,
                    marginBottom: 20,
                    width: "100%",
                  }}
                >
                  <div
                    onClick={() =>
                      this.setState({ repetitive: true }, () =>
                        this.getQuestions(),
                      )
                    }
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      margin: "5px 0px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    انتخاب همه
                    {this.state.repetitive === true && (
                      <img
                        src={CheckRadioIcon}
                        alt=""
                        style={{ height: 20, marginRight: 10 }}
                      />
                    )}
                  </div>
                </Grid>
                <Grid
                  direction="column"
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: "7.5px 15px",
                    cursor: "pointer",
                    backgroundColor: "#F1ECCF",
                    margin: 0,
                    marginBottom: 20,
                    width: "100%",
                  }}
                >
                  <div
                    onClick={() =>
                      this.setState({ repetitive: false }, () =>
                        this.getQuestions(),
                      )
                    }
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      margin: "5px 0px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    حذف سوالات آزمون های قبل
                    {this.state.repetitive === false && (
                      <img
                        src={CheckRadioIcon}
                        alt=""
                        style={{ height: 20, marginRight: 10 }}
                      />
                    )}
                  </div>
                  {/* اضافه شده  */}
                  {/* اضافه شده  */}
                </Grid>
              </div>
            </div>
            <Grid direction="column" item xs={9} style={{ marginRight: 20 }}>
              <div style={{ borderRadius: 20 }}>
                {this.renderQuestionsList(this.state.questionsList)}
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Pagination
                    count={this.state.pageCount}
                    page={this.state.page}
                    onChange={this.handleChangePage}
                    bgColor="#fff"
                  />
                </div>
              </div>
            </Grid>
          </div>
        </Grid>
        {this.state.open && (
          <Dialog
            maxWidth="xs"
            onBackdropClick={this.handleClose}
            onClose={this.handleClose}
            aria-labelledby="report-dialog"
            open={this.state.open}
          >
            <div
              style={{
                background: "#F1ECCF",
                flexDirection: "column",
                padding: "0px 30px",
                width: 400,
                height: 400,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <PageTitle
                style={{ marginBottom: 20, marginTop: 0 }}
                title="ثبت گزارش"
                size="h3"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    color: "#3d82a4",
                    width: "calc(100% - 20px)",
                    minHeight: 200,
                    flex: 1,
                    padding: "5px 20px",
                    margin: "0px 10px 20px",
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Textarea
                    placeholder="متن گزارش"
                    rows={4}
                    style={{ height: 200, background: "transparent" }}
                    onChange={e => this.changeInput("message", e)}
                  />
                </div>
                <Button
                  onClick={this.sendReport}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.createAccountButton}
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    fontFamily: "Dana",
                  }}
                >
                  ثبت گزارش
                </Button>
              </div>
            </div>
          </Dialog>
        )}
      </>
    );
  }
}

export default CreateTest;
