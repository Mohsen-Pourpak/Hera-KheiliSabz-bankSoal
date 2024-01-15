import React from "react";
import {
  Dialog,
  Grid,
  Button,
  Tooltip,
  Backdrop,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import {
  BookmarkBorder,
  Timeline,
  Feedback,
  Bookmark,
  ExpandMore,
  Add,
  ExpandLess,
  Remove,
} from "@material-ui/icons";

import PageTitle from "../../components/PageTitle/PageTitle";
import Pagination from "../../components/Form/Pagination";
import MyMath from "../../components/Form/MyMath";
import FilterBox from "../../components/FilterBox";
import { FilterBoxTextField } from "../../components/Form/TextField";
import Textarea from "../../components/Form/Textarea";

import "react-modern-calendar-datepicker/lib/DatePicker.css";

import Hard from "../../images/test/hard.svg";
import Normal from "../../images/test/normal.svg";
import Easy from "../../images/test/easy.svg";
import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";

import {
  questionNormal,
  saveQuestion,
  sendQuestionProblemReports,
} from "../../api/services/question";

import { toFA, QUESTION_PRICE, PER_PAGE_QUESTIONS } from "../../utils/Utils";
import AddTopic from "../../features/ShowTest/AddTopic";

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
  // let newPercent = percent;
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
        width={`${percent}%`}
      />
      {/* <div style={{height: (80*newPercent), width: (90*newPercent), backgroundImage: `url("${image}")`, backgroundSize: 'cover'}} /> */}
    </div>
  );
};

const style = {
  questionNum: {
    border: "1px solid #fff",
    borderRadius: 60,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    paddingTop: 3,
    color: "#fff",
    fontSize: 19,
  },
  questionNumContainer: {
    marginBottom: -30,
    top: 15,
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginRight: 5,
    zIndex: 1000,
    width: "calc(100% - 60px)",
    padding: "0 10px 0 15px",
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
    backgroundColor: "#3d82a4",
    color: "#fff",
    height: 40,
    width: "fit-content",
    padding: "10px 20px",
    zIndex: 3000,
    position: "relative",
    marginBottom: -25,
    borderRadius: 50,
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
    backgroundColor: "#3d82a4",
    color: "#fff",
    width: "fit-content",
    height: 25,
    padding: "6.25px 45px 6.25px 20px",
    zIndex: 900,
    borderRadius: 50,
    fontSize: 12,
    boxShadow: "0 0 5px -2px #000",
    marginRight: -30,
    marginTop: 10,
  },
  circleButton: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginBottom: -30,
    zIndex: 1000,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    backgroundColor: "#fff",
    border: "1px solid #3d82a4",
    boxShadow: "0 0 5px -2px #000",
    marginTop: 5,
  },
  bottomActions: {
    display: "flex",
    flexDirection: "row",
    width: "calc(100% - 60px)",
    marginRight: 5,
    marginTop: -45,
    marginBottom: 30,
  },
  box: {
    backgroundColor: "#3d82a4",
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
    backgroundColor: "#fff",
    color: "#3d82a4",
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
  randomFilterActive: {
    backgroundColor: "#3d82a4",
    color: "#fff",
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
    backgroundColor: "transparent",
    border: "1px solid #3d82a4",
    color: "#3d82a4",
    height: 40,
    flex: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  sortFilterActive: {
    backgroundColor: "#3d82a4",
    border: "1px solid #3d82a4",
    color: "#fff",
    height: 40,
    flex: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  correctOption: {
    backgroundColor: "#fe5f55",
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
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      questionsList: [],
      selectedList: [],
      progress: true,
      repetitive: true,
      pageCount: 1,
      page: 1,
      sortFilter: null,
      sortBySaved: false,
      className: "",
      hidden: "hidden",

      startTime: { _d: new Date() },
      endTime: { _d: new Date() },
      repeatState: 2,
      topics: [],
      selectedTopics: [],
      difficultyIds: [],
      justSaved: false,
      questionContentSearch: undefined,
      questionAnswerContentSearch: undefined,
      addTopic: false,
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    let selectedList = JSON.parse(localStorage.getItem("selectedList"));
    this.setState({ selectedTopics: selectedList, topics: selectedList }, () =>
      this.getQuestions(),
    );
    let isStudent = localStorage.getItem("userType") === "Student";
    this.setState({ isStudent });
  }

  getQuestions() {
    this.setState({
      isLoading: true,
      page: 1,
    });
    this.fetchData();
  }

  fetchData = () => {
    let questionsQuery = localStorage.getItem("questionsQuery");
    let obj = JSON.parse(questionsQuery);

    let query = "";
    if (this.state.randomize) {
      query += `&randomize=${this.state.randomize}`;
    }
    if (this.state.repetitive === true || this.state.repetitive === false) {
      obj["repetitive"] = this.state.repetitive;
    }
    if (this.state.repetitive === false) {
      if (this.state.startTime) {
        obj["startTime"] = this.state.startTime._d.toISOString();
      }
      if (this.state.endTime) {
        obj["endTime"] = this.state.endTime._d.toISOString();
      }
    }
    if (this.state.sortFilter) {
      switch (this.state.sortFilter) {
        case "asc":
          obj["difficultySort"] = "EasyToHard";
          break;
        case "des":
          obj["difficultySort"] = "HardToEasy";
          break;
        default:
          obj["difficultySort"] = "NoSort";
          break;
      }
    } else {
      obj["difficultySort"] = "NoSort";
    }
    obj["difficultyIds"] = this.state.difficultyIds;
    obj["sortBySaved"] = this.state.sortBySaved;
    obj["justSaved"] = this.state.justSaved;
    obj["questionContentSearch"] = this.state.questionContentSearch;
    obj["questionAnswerContentSearch"] = this.state.questionAnswerContentSearch;

    if (this.state.selectedTopics.length > 0) {
      obj["booksId"] = this.state.selectedTopics
        .filter(st => st.type === "book")
        .map(st => st.id);
      obj["topicIds"] = this.state.selectedTopics
        .filter(st => st.type === "topic")
        .map(st => st.id);
    } else {
      obj["booksId"] = this.state.topics
        .filter(st => st.type === "book")
        .map(st => st.id);
      obj["topicIds"] = this.state.topics
        .filter(st => st.type === "topic")
        .map(st => st.id);
    }

    let token = localStorage.getItem("userToken");
    // let time__ = Date.now();
    // this.setState({ isLoading: true });
    questionNormal(token, query, obj, this.state.page)
      .then(res_ => {
        // let time_ = Date.now();
        // console.error("miliseccond 1: ", time_ - time__);
        let res = res_.data;
        let pagination = JSON.parse(res_.headers.pagination);
        let pageCount = pagination.totalPages;
        this.setState({
          questionsList: res.data,
          progress: false,
          isLoading: false,
          pageCount,
          className: "",
          hidden: "hidden",
        });
        if (res.data.length === 0) {
          toast.error("سوالی یافت نشد.");
        }
        // let time = Date.now();
        // console.error("miliseccond 2: ", time - time__);
      })
      .catch(e => console.log(e))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleChangePage = (_r, page) => {
    // this.setState({ className: "blur", hidden: "" }, () => {
    if (!page) {
      return;
    }
    this.setState({ className: "blur", hidden: "" }, () => {
      this.myRef.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        this.setState({ page }, () => this.fetchData());
      }, 1000);
    });
  };

  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
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
      this.setState({ sortFilter: null }, () => this.getQuestions());
    } else {
      this.setState({ sortFilter: type }, () => this.getQuestions());
    }
  };

  openSendReport = id => {
    this.setState({
      selectedQuestion: id,
      open: true,
    });
  };

  selectQuestion = item => {
    let selectedList = this.state.selectedList.slice();
    // let isSelected = selectedList.filter(el => el.id === item.id).length !== 0;
    let itemIndex = selectedList.findIndex(el => el.id === item.id);

    if (itemIndex > -1) {
      let newList = selectedList.slice();
      newList.splice(itemIndex, 1);

      this.setState({ selectedList: newList });
    } else {
      // [
      //   ...selectedList,
      //   {
      //     id: item.id,
      //     level: item.difficultyId,
      //   },
      // ]
      this.setState({
        selectedList: selectedList.concat({
          id: item.id,
          level: item.difficultyId,
        }),
      });
    }
  };

  selectAll = () => {
    let selectedList = this.state.selectedList;

    this.state.questionsList.forEach(item => {
      let isSelected =
        selectedList.filter(el => el.id === item.id).length !== 0;

      if (!isSelected) {
        selectedList.push({
          id: item.id,
          level: item.difficultyId,
        });
      }
    });

    this.setState({ selectedList });
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

  goToRegisterExam = () => {
    // console.warn(this.state.selectedList);
    const { selectedList } = this.state;
    if (selectedList.length === 0) {
      toast.error("حداقل یک سوال انتخاب کنید");
    } else {
      // let ownerId = localStorage.getItem("userId");
      let autoCreateObj = localStorage.getItem("Create");
      autoCreateObj = JSON.parse(autoCreateObj);
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
    }
  };

  renderQuestionsList = items => {
    // console.log(items);
    // const classes = this.props.classes;
    let rowId,
      levelId,
      isOneActive,
      isTowActive,
      isThreeActive,
      isFourActive,
      labelColor,
      isMore,
      isSelected,
      rowNumber,
      isEnglish,
      fontSize;
    return items.map((item, idx) => {
      rowId = 1 + (this.state.page - 1) * PER_PAGE_QUESTIONS;
      levelId = item.difficultyId;
      isOneActive = false;
      isTowActive = false;
      isThreeActive = false;
      isFourActive = false;
      labelColor =
        levelId === 1 ? "#3EC592" : levelId === 2 ? "#FB963A" : "#C83E43";
      isMore = this.state[`isMore__${item.id}`];
      isSelected =
        this.state.selectedList.filter(el => el.id === item.id).length !== 0;
      rowNumber = idx + rowId;
      isEnglish = item.lessonId === 6;
      fontSize =
        `${rowNumber}`.length === 4
          ? 11
          : `${rowNumber}`.length === 3
          ? 14
          : 19;
      return (
        <div
          style={{ position: "relative", flex: 1, width: "100%" }}
          key={item.id}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={style.questionTitle}>
              {toFA(item.lessonTitle)} | {item.topic}
            </div>
          </div>
          <div style={style.questionNumContainer}>
            <div style={{ ...style.questionNum, fontSize }}>
              {toFA(rowNumber)}
            </div>
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
              background: `linear-gradient(90deg, #3d82a4 50%, ${labelColor} 50%)`,
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
                borderRadius: 20,
                borderTopRightRadius: 150,
                minHeight: 300,
                borderBottomLeftRadius: isMore ? 0 : 20,
                borderBottomRightRadius: isMore ? 0 : 20,
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
                {/* <MathJax.Html
                  html={item.questionFace
                    .replace(/font-size/g, "")
                    .replace(/font-family/g, "")
                    .replace(/&nbsp;/g, "")}
                /> */}
                <MyMath value={item.questionFace} />
              </Grid>
              <Grid
                direction="column"
                alignItems="flex-start"
                spacing={3}
                justify="flex-start"
                container
                style={{ padding: "20px", marginLeft: 30, marginBottom: 20 }}
              >
                <Grid
                  direction={isEnglish ? "row-reverse" : "row"}
                  alignItems="flex-start"
                  justify="flex-start"
                  container
                  // style={{ padding: "0", margin: 0 }}
                  spacing={2}
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
                    <div style={{ marginTop: 5, width: "100%" }}>
                      <MyMath value={item.option1} />
                    </div>
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
                    <div style={{ marginTop: 5, width: "100%" }}>
                      <MyMath value={item.option2} />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  direction={isEnglish ? "row-reverse" : "row"}
                  alignItems="flex-start"
                  justify="flex-start"
                  container
                  // style={{ padding: "0", margin: 0 }}
                  spacing={2}
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
                    <div style={{ marginTop: 5, width: "100%" }}>
                      <MyMath value={item.option3} />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    className="dana"
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
                    <div style={{ marginTop: 5, width: "100%" }}>
                      <MyMath value={item.option4} />
                    </div>
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
              {!this.state.isStudent && (
                <div>
                  <div style={{ width: 50, height: 30 }} />
                  <Button onClick={() => this.openSendReport(item.id)}>
                    <div
                      style={{ width: 50, display: "content", textAlign: "center" }}
                    >
                      <Feedback style={style.actionIcon} />
                      <div style={style.actionText}>گزارش خطا</div>
                    </div>
                  </Button>
                </div>
                )
              }
              {/* <div>
                <div style={{ width: 50, height: 30 }} />
                <Button onClick={() => this.openSendReport(item.id)}>
                  <div
                    style={{ width: 50, display: "content", textAlign: "center" }}
                  >
                    <Feedback style={style.actionIcon} />
                    <div style={style.actionText}>گزارش خطا</div>
                  </div>
                </Button>
              </div> */}
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
          <div
            style={{
              padding: "20px 30px 45px",
              display: isMore ? "block" : "none",
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
              <MyMath value={item.answer} />
            </Grid>
          </div>
          <div style={style.bottomActions}>
            <div style={{ flex: 1, justifyContent: "center", display: "flex" }}>
              <div
                style={style.circleButton}
                onClick={() => this.selectQuestion(item)}
              >
                {isSelected ? (
                  <Remove style={{ fill: "#fe5f55" }} />
                ) : (
                  <Add style={{ fill: "#3EC592" }} />
                )}
              </div>
              <div style={style.actionButton}>
                {isSelected ? "حذف" : "انتخاب"} سوال
              </div>
            </div>
            <div style={{ flex: 1, justifyContent: "center", display: "flex" }}>
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

  handleClose = () => {
    this.setState({ open: false });
  };

  // ------------ NEW ------------

  handleDifficultyId = difficultyId => {
    let difficultyIdsState = [...this.state.difficultyIds];
    const index = difficultyIdsState.findIndex(d => d === difficultyId);

    if (index > -1) {
      difficultyIdsState.splice(index, 1);
    } else {
      difficultyIdsState.push(difficultyId);
    }

    this.setState({ difficultyIds: difficultyIdsState }, () =>
      this.getQuestions(),
    );
  };

  toggleTopic = topic => {
    let index = this.state.selectedTopics.findIndex(st => st.id === topic.id);

    if (index > -1) {
      this.setState(
        {
          page: 1,
          selectedTopics: this.state.selectedTopics.filter(
            st => st.id !== topic.id,
          ),
        },
        () => this.getQuestions(),
      );
    } else {
      this.setState(
        {
          page: 1,
          selectedTopics: this.state.selectedTopics.concat(topic),
        },
        () => this.getQuestions(),
      );
    }
  };

  goToAddTopic = () => {
    // const Create = JSON.parse(localStorage.getItem("Create"));
    // const questionsQuery = JSON.parse(localStorage.getItem("questionsQuery"));
    // const gradeTitle = localStorage.getItem("gradeTitle");
    // const selectedList = JSON.parse(localStorage.getItem("selectedList"));
    // const state = {
    //   Create,
    //   questionsQuery,
    //   gradeTitle,
    //   selectedList,
    //   editTopics: true,
    //   isManual: true,
    // };

    // this.props.history.push("/dashboard/test/create", state);
    this.setState({ addTopic: true });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div ref={this.myRef}>
        <AddTopic
          open={this.state.addTopic}
          onClose={() => this.setState({ addTopic: false })}
          fieldId={
            JSON.parse(localStorage.getItem("questionsQuery")).fieldIds[0]
          }
          gradeId={JSON.parse(localStorage.getItem("Create")).gradeId}
          selectedList={JSON.parse(localStorage.getItem("selectedList"))}
          title={JSON.parse(localStorage.getItem("Create")).title}
          questionsQuery={JSON.parse(localStorage.getItem("questionsQuery"))}
          onSubmit={d =>
            // console.log(d)
            this.setState(
              {
                selectedTopics: d.topicsSelection,
                topics: d.topicsSelection,
                fieldId: d.fieldId,
                gradeId: d.gradeId,
                title: d.title,
                addTopic: false,
              },
              () => this.getQuestions(),
            )
          }
        />

        <Backdrop
          style={{ zIndex: 1000000, color: "#3d82a4" }}
          open={this.state.progress}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Backdrop
          style={{ zIndex: 1000000, color: "#3d82a4" }}
          open={this.state.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <PageTitle title="ساخت آزمون - انتخاب دستی" />
        {!this.state.progress && (
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
            <div
              style={{
                padding: 20,
                backgroundColor: "rgb(255 255 255 / 40%)",
                borderRadius: 20,
                alignItems: "flex-start",
                display: "flex",
              }}
            >
              <div
                style={{
                  position: "sticky",
                  top: -15,
                  flex: 1,
                  minWidth: 270,
                  maxHeight: `calc(100vh - 80px)`,
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  textAlign: "center",
                }}
              >
                <Grid
                  direction="column"
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: "7.5px 15px",
                    backgroundColor: "rgb(61 130 164 / 30%)",
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
                  <div
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
                  </div>
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
                  <div
                    onClick={this.selectAll}
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      background: "#3d82a4",
                      border: "1px solid #3d82a4",
                      margin: "10px 0 10px",
                      color: "#fff",
                      height: 40,
                      borderRadius: 50,
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    انتخاب همه
                  </div>
                </Grid>
                <div
                  onClick={this.goToRegisterExam}
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fe5f55",
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
                <FilterBox title="جست و جو">
                  <FilterBoxTextField
                    title="صورت سوال"
                    value={
                      this.state.questionContentSearch
                        ? this.state.questionContentSearch
                        : ""
                    }
                    onChange={e =>
                      this.setState({ questionContentSearch: e.target.value })
                    }
                  />
                  <FilterBoxTextField
                    title="پاسخ سوال"
                    value={
                      this.state.questionAnswerContentSearch
                        ? this.state.questionAnswerContentSearch
                        : ""
                    }
                    onChange={e =>
                      this.setState({
                        questionAnswerContentSearch: e.target.value,
                      })
                    }
                  />
                  <Box display="flex" alignItems="center" style={{ gap: 10 }}>
                    <Button
                      style={{ marginTop: 10 }}
                      variant="contained"
                      color="primary"
                      onClick={() => this.getQuestions()}
                    >
                      جست و جو
                    </Button>
                    <Button
                      style={{ marginTop: 10 }}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        this.setState(
                          {
                            questionContentSearch: "",
                            questionAnswerContentSearch: "",
                          },
                          () => this.getQuestions(),
                        )
                      }
                    >
                      پاک کن
                    </Button>
                  </Box>
                </FilterBox>
                <FilterBox title="ترتیب سوال ها">
                  <div>
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
                    <div style={{ height: 10 }} />
                    <div
                      onClick={() =>
                        this.setState(
                          { sortBySaved: !this.state.sortBySaved },
                          () => this.getQuestions(),
                        )
                      }
                      style={
                        this.state.sortBySaved
                          ? style.randomFilterActive
                          : style.randomFilter
                      }
                    >
                      براساس سوالات ذخیره شده
                    </div>
                    <div style={{ height: 10 }} />
                    <div
                      onClick={() =>
                        this.setState(
                          { justSaved: !this.state.justSaved },
                          () => this.getQuestions(),
                        )
                      }
                      style={
                        this.state.justSaved
                          ? { ...style.sortFilterActive, padding: 10 }
                          : { ...style.sortFilter, padding: 10 }
                      }
                    >
                      نمایش سوالات ذخیره شده
                    </div>
                  </div>
                </FilterBox>
                <FilterBox title="سطح دشواری">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      width: "100%",
                      marginBottom: 10,
                      gap: 10,
                    }}
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
                    <div
                      onClick={() => this.handleDifficultyId(1)}
                      style={
                        this.state.difficultyIds.findIndex(d => d === 1) > -1
                          ? style.sortFilterActive
                          : style.sortFilter
                      }
                    >
                      آسان
                    </div>
                    <div
                      onClick={() => this.handleDifficultyId(2)}
                      style={
                        this.state.difficultyIds.findIndex(d => d === 2) > -1
                          ? style.sortFilterActive
                          : style.sortFilter
                      }
                    >
                      متوسط
                    </div>
                    <div
                      onClick={() => this.handleDifficultyId(3)}
                      style={
                        this.state.difficultyIds.findIndex(d => d === 3) > -1
                          ? style.sortFilterActive
                          : style.sortFilter
                      }
                    >
                      سخت
                    </div>
                  </div>
                </FilterBox>
                <FilterBox>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>از :</div>
                      <div
                        style={{
                          ...style.randomFilter,
                          padding: 5,
                          marginRight: 10,
                        }}
                      >
                        <DatePicker
                          okLabel="تأیید"
                          cancelLabel="لغو"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          hideTabs={true}
                          mode="24h"
                          ampm={false}
                          labelFunc={date =>
                            date ? date.format("jYYYY/jMM/jDD") : ""
                          }
                          value={this.state.startTime}
                          onChange={e =>
                            this.setState(
                              { startTime: e },
                              () => this.state.endTime && this.getQuestions(),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ height: 10 }} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>تا :</div>
                      <div
                        style={{
                          ...style.randomFilter,
                          padding: 5,
                          marginRight: 10,
                        }}
                      >
                        <DatePicker
                          okLabel="تأیید"
                          cancelLabel="لغو"
                          style={{ cursor: "pointer" }}
                          InputProps={{
                            disableUnderline: true,
                            style: {
                              textAlign: "center",
                              cursor: "pointer",
                            },
                          }}
                          mode="24h"
                          ampm={false}
                          hideTabs={true}
                          labelFunc={date =>
                            date ? date.format("jYYYY/jMM/jDD") : ""
                          }
                          value={this.state.endTime}
                          onChange={e =>
                            this.setState(
                              { endTime: e },
                              () => this.state.startTime && this.getQuestions(),
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      this.setState({ repetitive: false, repeatState: 0 }, () =>
                        this.getQuestions(),
                      )
                    }
                    style={
                      this.state.repeatState === 0
                        ? {
                            ...style.sortFilterActive,
                            padding: 10,
                            marginBottom: 10,
                            width: "100%",
                          }
                        : {
                            ...style.sortFilter,
                            padding: 10,
                            marginBottom: 10,
                            width: "100%",
                          }
                    }
                  >
                    حذف سوالات آزمون های قبل
                    {this.state.repeatState === 0 && (
                      <img
                        src={CheckRadioIcon}
                        style={{ height: 20, marginRight: 10 }}
                        alt=""
                      />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      this.setState(
                        {
                          repeatState: 1,
                          repetitive: false,
                          startTime: undefined,
                          endTime: undefined,
                        },
                        () => this.getQuestions(),
                      )
                    }
                    style={
                      this.state.repeatState === 1
                        ? {
                            ...style.sortFilterActive,
                            padding: 10,
                            width: "100%",
                          }
                        : { ...style.sortFilter, padding: 10, width: "100%" }
                    }
                  >
                    حذف کل سوالات ازمون های قبل
                    {this.state.repeatState === 1 && (
                      <img
                        src={CheckRadioIcon}
                        style={{ height: 20, marginRight: 10 }}
                        alt=""
                      />
                    )}
                  </div>
                  <div
                    onClick={() =>
                      this.setState({ repetitive: true, repeatState: 2 }, () =>
                        this.getQuestions(),
                      )
                    }
                    style={
                      this.state.repeatState === 2
                        ? {
                            ...style.sortFilterActive,
                            padding: 10,
                            marginTop: 10,
                            width: "100%",
                          }
                        : {
                            ...style.sortFilter,
                            padding: 10,
                            marginTop: 10,
                            width: "100%",
                          }
                    }
                  >
                    انتخاب همه
                    {this.state.repeatState === 2 && (
                      <img
                        src={CheckRadioIcon}
                        style={{ height: 20, marginRight: 10 }}
                        alt=""
                      />
                    )}
                  </div>
                </FilterBox>
              </div>
              <Grid direction="column" item xs={9} style={{ marginRight: 20 }}>
                <div className="sp-parent">
                  {/* <div class={`sp sp-3balls ${this.state.hidden}`}></div> */}
                  <div class={`loader4 ${this.state.hidden}`}></div>
                </div>
                <div
                  className="exam-tabs"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    margin: "8px 0",
                  }}
                >
                  {this.state.topics.map(t => (
                    <Button
                      key={t.id}
                      variant="contained"
                      onClick={() => this.toggleTopic(t)}
                      color={
                        this.state.selectedTopics.findIndex(
                          d => d.id === t.id,
                        ) > -1
                          ? "secondary"
                          : "primary"
                      }
                    >
                      {t.title}
                    </Button>
                  ))}
                  <Button variant="contained" onClick={this.goToAddTopic}>
                    افزودن
                  </Button>
                </div>
                <div
                  className={`qList ${this.state.className}`}
                  style={{ borderRadius: 20, width: "100%" }}
                >
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
        )}
        <Dialog
          maxWidth="xs"
          onBackdropClick={this.handleClose}
          onClose={this.handleClose}
          open={this.state.open}
        >
          <div
            style={{
              background: "rgb(61 130 164 / 30%)",
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
      </div>
    );
  }
}

export default CreateTest;
