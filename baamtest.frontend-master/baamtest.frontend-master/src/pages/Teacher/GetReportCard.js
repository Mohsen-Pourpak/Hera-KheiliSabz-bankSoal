import React from "react";
import {
  CircularProgress,
  Grid,
  Backdrop,
  Select,
  Input,
  MenuItem,
  Button,
  LinearProgress,
  Divider,
} from "@material-ui/core";
import TextField from "../../components/Form/TextField";
import PageTitle from "../../components/PageTitle/PageTitle";
import {
  Bookmark,
  SubdirectoryArrowLeft,
  School,
  DeleteSweep,
} from "@material-ui/icons";
import axios from "axios";
import {
  allQuestionReportCard,
  allStudentReportCard,
  createTest,
  getReportCard,
} from "../../api/services/exam";
import mask from "../../images/mask.svg";
import { fields } from "../../api/services/tags";
import { toast } from "react-toastify";
import { payment } from "../../api/services/buy";
import * as qs from "qs";
import MyChart from "../../components/MyChart";
import MyChartDonout from "../../components/MyChartDonout";
import exportFromJSON from "export-from-json";

import { toEn, toFA } from "../../utils/Utils";

const styles = {
  trItem: {
    backgroundColor: "#f4faff",
    color: "#8AB668",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px",
  },
  thItem: {
    color: "#8AB668",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px 5px",
  },
};

class ShowReportCard extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      fields: [],
      title: "",
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      selectedFields: [],
      selectedList: [],
      progress: true,
      price: 0,
    };
  }
  componentDidMount() {
    let isStudent = localStorage.getItem("userType") === "Student";
    console.error("isStudent", isStudent);
    this.setState({ isStudent });

    let token = localStorage.getItem("userToken");
    let examId = parseInt(this.props.match.params.id);

    getReportCard(examId, token).then(res => {
      if (res.isSuccess) {
        this.setState({
          report: res.data,
          easyInfo: [
            res.data.easyAnswersInfo.totalCorrect,
            res.data.easyAnswersInfo.totalEmpty,
            res.data.easyAnswersInfo.totalWrong,
          ],
          normalInfo: [
            res.data.normalAnswersInfo.totalCorrect,
            res.data.normalAnswersInfo.totalEmpty,
            res.data.normalAnswersInfo.totalWrong,
          ],
          hardInfo: [
            res.data.hardAnswersInfo.totalCorrect,
            res.data.hardAnswersInfo.totalEmpty,
            res.data.hardAnswersInfo.totalWrong,
          ],
          lessons_balance: res.data.lessonsBalance,
          lessons_type: "balance",
          groups_type: "balance",
          lessonsData: res.data.lessonsBalance.map(el => {
            return { x: el.lessonTitle, y: [el.min, el.max] };
          }),
          lessons_percent: res.data.lessonsPercent,
          groups_balance: res.data.lessonsBalanceInGroups,
          groupsData: res.data.lessonsBalanceInGroups.map(el => {
            return { x: el.lessonTitle, y: [el.min, el.max] };
          }),
          groups_percent: res.data.lessonsPercentInGroups,
          progress: false,
        });
      }
    });
    allStudentReportCard(examId, token).then(res => {
      if (res.isSuccess) {
        this.setState({
          students: res.data.cardMinimalShow.map(el => ({
            ...el,
            studentLessonDetails: [
              {
                studentId: 59,
                lessonId: 0,
                lessonTitle: "کل",
                lessonPercent: "-",
                lessonBalance: el.totalBalance,
                rank: el.totalRank,
              },
              ...el.studentLessonDetails,
            ],
            studentLessonDetailsNoNegativePoint: [
              {
                studentId: 59,
                lessonId: 0,
                lessonTitle: "کل",
                lessonPercent: "-",
                lessonBalance: el.totalBalanceNoNegativePoint,
                rank: el.totalRankNoNegativePoint,
              },
              ...el.studentLessonDetailsNoNegativePoint,
            ],
          })),
          lessonDetails: [
            {
              examId: 86,
              lessonId: 0,
              lessonTitle: "کل",
              numberOfQuestion: res.data.lessonDetails
                .map(e => e.numberOfQuestion)
                .reduce((a, b) => a + b),
            },
            ...res.data.lessonDetails,
          ],
          dataStudent: "studentLessonDetails",
        });
      }
    });
    allQuestionReportCard(examId, token).then(res => {
      if (res.isSuccess) {
        this.setState({
          questions: res.data.sort(
            (a, b) => a.questionNumberInExam - b.questionNumberInExam,
          ),
          questionsExcel: res.data.map(el => {
            return {
              سوال: el.questionNumberInExam,
              درس: el.lessonTitle,
              فصل: el.topics,
              صحیح: el.correct,
              غلط: el.wrong,
              نزده: el.empty,
              "گزینه ۱": el.option1,
              "گزینه ۲": el.option2,
              "گزینه ۳": el.option3,
              "گزینه ۴": el.option4,
              "ضریب تمیز در آزمون": el.questionCoefficientInExam,
              "ضریب تمیز": el.questionCoefficient,
              "سطح دشواری": el.difficulty,
            };
          }),
        });
      }
    });
  }

  changeData = (type, data) => {
    let mainList = this.state[`${data}_${type}`];
    let newList = mainList.map(el => {
      return { x: el.lessonTitle, y: [el.min, el.max] };
    });
    console.error({ newList });
    this.setState({
      [`${data}Data`]: newList,
      [`${data}_type`]: type,
    });
  };

  renderStudents = () => {
    return this.state.students.map(item => {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginBottom: 10,
          }}
        >
          <div style={{ ...styles.trItem, width: 170 }}>{item.studentName}</div>
          {item[this.state.dataStudent].map(el => {
            return (
              <div style={{ width: 200, display: "flex" }}>
                <div style={{ ...styles.trItem, flex: 1 }}>
                  {toFA(el.lessonPercent)}
                </div>
                <div style={{ ...styles.trItem, flex: 1.5 }}>
                  {toFA(el.lessonBalance)}
                </div>
                <div style={{ ...styles.trItem, flex: 1 }}>{toFA(el.rank)}</div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  renderQuestions = () => {
    return this.state.questions.map(item => {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginBottom: 10,
          }}
        >
          <div style={{ ...styles.trItem, width: 50 }}>
            {toFA(item.questionNumberInExam)}
          </div>
          <div style={{ ...styles.trItem, flex: 1 }}>
            {toFA(item.lessonTitle)}
          </div>
          <div style={{ ...styles.trItem, flex: 1 }}>
            {toFA(item.topics || "----")}
          </div>
          <div style={{ ...styles.trItem, width: 50 }}>
            {toFA(item.correct)}
          </div>
          <div style={{ ...styles.trItem, width: 50 }}>{toFA(item.wrong)}</div>
          <div style={{ ...styles.trItem, width: 50 }}>{toFA(item.empty)}</div>
          <div style={{ ...styles.trItem, width: 70 }}>
            {toFA(item.option1)}
          </div>
          <div style={{ ...styles.trItem, width: 70 }}>
            {toFA(item.option2)}
          </div>
          <div style={{ ...styles.trItem, width: 70 }}>
            {toFA(item.option3)}
          </div>
          <div style={{ ...styles.trItem, width: 70 }}>
            {toFA(item.option4)}
          </div>
          <div style={{ ...styles.trItem, width: 140 }}>
            {toFA(item.questionCoefficientInExam)}
          </div>
          <div style={{ ...styles.trItem, width: 90 }}>
            {toFA(item.questionCoefficient)}
          </div>
          <div style={{ ...styles.trItem, width: 100 }}>
            {toFA(item.difficulty)}
          </div>
        </div>
      );
    });
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
          <LinearProgress color="inherit" />
        </Backdrop>
        <PageTitle title="مدیریت آزمون - ارزیابی و مشاهده کارنامه" />
        <Divider />
        {!this.state.progress && (
          <Grid
            direction="column"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              paddingTop: 100,
              paddingBottom: 100,
              paddingLeft: 208,
              paddingRight: 208,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 40,
              marginTop: 60,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  flex: 1,
                  flexDirection: "row",
                  display: "flex",
                  background: "#fff",
                  height: 45,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    padding: "0 15px",
                    borderRadius: 50,
                    background: "#8AB668",
                    height: 45,
                  }}
                >
                  نام آزمون
                </div>
                <div style={{ flex: 1, textAlign: "center", width: "100%" }}>
                  <span
                    style={{ fontSize: 17, width: "100%", textAlign: "center" }}
                  >
                    {toFA(this.state.report.examTitle)}
                  </span>
                </div>
              </div>
              <div style={{ flex: 0.2 }} />
              <div
                style={{
                  flex: 1,
                  flexDirection: "row",
                  display: "flex",
                  background: "#fff",
                  height: 45,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    padding: "0 15px",
                    borderRadius: 50,
                    background: "#8AB668",
                    height: 45,
                  }}
                >
                  تعداد سوال
                </div>
                <div style={{ flex: 1, textAlign: "center", width: "100%" }}>
                  <span
                    style={{ fontSize: 17, width: "100%", textAlign: "center" }}
                  >
                    {toFA(this.state.report.numberOfQuestions)}
                  </span>
                </div>
              </div>
              <div style={{ flex: 0.2 }} />
              <div
                style={{
                  flex: 1,
                  flexDirection: "row",
                  display: "flex",
                  background: "#fff",
                  height: 45,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    padding: "0 15px",
                    borderRadius: 50,
                    background: "#8AB668",
                    height: 45,
                  }}
                >
                  پایه
                </div>
                <div style={{ flex: 1, textAlign: "center", width: "100%" }}>
                  <span
                    style={{ fontSize: 17, width: "100%", textAlign: "center" }}
                  >
                    {toFA(this.state.report.examGradeTitle)}
                  </span>
                </div>
              </div>
              <div style={{ flex: 0.2 }} />
              <div
                style={{
                  flex: 1,
                  flexDirection: "row",
                  display: "flex",
                  background: "#fff",
                  height: 45,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    padding: "0 15px",
                    borderRadius: 50,
                    background: "#8AB668",
                    height: 45,
                  }}
                >
                  تعداد برگزاری
                </div>
                <div style={{ flex: 1, textAlign: "center", width: "100%" }}>
                  <span
                    style={{ fontSize: 17, width: "100%", textAlign: "center" }}
                  >
                    {toFA(this.state.report.numberOfPresentStudents)}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <div style={{ width: 320 }}>
                <div
                  style={{
                    backgroundColor: "rgb(241 236 207)",
                    borderRadius: 20,
                    padding: "20px 10px",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      marginBottom: 20,
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
                      مشخصات اجرا
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        کد
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 100 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 100,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.examId)}
                        </span>
                      </div>
                    </div>
                    <div style={{ width: 15 }} />
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        تاریخ
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 100 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 100,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.examStartTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 20,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        برگزارکننده
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 75 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.examHeadUserFullName)}
                        </span>
                      </div>
                    </div>
                    <div style={{ width: 15 }} />
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        نوع برگزاری
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 75 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.examType)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(241 236 207)",
                    marginTop: 20,
                    borderRadius: 20,
                    padding: "20px 10px",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      marginBottom: 20,
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
                      شرکت کنندگان
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        کل
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 75 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.numberOfStudents)}
                        </span>
                      </div>
                    </div>
                    <div style={{ width: 15 }} />
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        حاضرین اجرا
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 75 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.numberOfPresentStudents)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 20,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        غایبین اجرا
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 75 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.numberOfAbsentStudents)}
                        </span>
                      </div>
                    </div>
                    <div style={{ width: 15 }} />
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(241 236 207)",
                    marginTop: 20,
                    borderRadius: 20,
                    padding: "20px 10px",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      marginBottom: 20,
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
                      تراز
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        میانگین
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 75 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.balanceAverage)}
                        </span>
                      </div>
                    </div>
                    <div style={{ width: 15 }} />
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        میانگین بالا
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 75 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.highBalanceAverage)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 20,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        background: "#fff",
                        height: 30,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          flexDirection: "row",
                          display: "flex",
                          color: "#fff",
                          alignItems: "center",
                          padding: "0 15px",
                          borderRadius: 50,
                          background: "#8AB668",
                          height: 30,
                        }}
                      >
                        میانگین پایین
                      </div>
                      <div style={{ flex: 1, textAlign: "center", width: 75 }}>
                        <span
                          style={{
                            fontSize: 10,
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {toFA(this.state.report.lowBalanceAverage)}
                        </span>
                      </div>
                    </div>
                    <div style={{ width: 15 }} />
                  </div>
                </div>
              </div>
              <div style={{ flex: 0.1 }} />
              <div
                style={{
                  flex: 3,
                  backgroundColor: "rgb(241 236 207)",
                  borderRadius: 20,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        width: "100%",
                        marginRight: 20,
                        marginBottom: -20,
                        marginTop: 30,
                      }}
                    >
                      <PageTitle
                        title="نمودار بازه نمره در گروه درسی"
                        size="h3"
                        color="#000"
                      />
                    </div>
                    <Grid
                      alignItems="center"
                      className="inputContainer"
                      style={{
                        padding: 0,
                        paddingRight: 10,
                        marginRight: 30,
                        marginLeft: 30,
                      }}
                    >
                      <Grid
                        item
                        style={{
                          paddingTop: 5,
                          paddingBottom: 5,
                          width: "82.5%",
                          marginRight: 10,
                        }}
                      >
                        <Select
                          id="demo-simple-select"
                          value={this.state.lessons_type}
                          style={{ width: "100%" }}
                          input={<Input disableUnderline />}
                          onChange={e =>
                            this.changeData(e.target.value, "lessons")
                          }
                        >
                          <MenuItem value="percent">درصد</MenuItem>
                          <MenuItem value="balance">تراز</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        marginRight: 60,
                        marginLeft: -25,
                        marginTop: 30,
                      }}
                    >
                      <MyChart
                        data={this.state.lessonsData}
                        min={
                          this.state.lessonsData.map(el => el.y[0]).sort()[0]
                        }
                        max={
                          this.state.lessonsData.map(el => el.y[1]).sort()[0]
                        }
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        width: "100%",
                        marginRight: 20,
                        marginBottom: -20,
                        marginTop: 30,
                      }}
                    >
                      <PageTitle
                        title="نمودار بازه نمره در کلاس"
                        size="h3"
                        color="#000"
                      />
                    </div>
                    <Grid
                      alignItems="center"
                      className="inputContainer"
                      style={{
                        padding: 0,
                        paddingRight: 10,
                        marginRight: 30,
                        marginLeft: 30,
                      }}
                    >
                      <Grid
                        item
                        style={{
                          paddingTop: 5,
                          paddingBottom: 5,
                          width: "82.5%",
                          marginRight: 10,
                        }}
                      >
                        <Select
                          id="demo-simple-select"
                          value={this.state.groups_type}
                          style={{ width: "100%" }}
                          input={<Input disableUnderline />}
                          onChange={e =>
                            this.changeData(e.target.value, "groups")
                          }
                        >
                          <MenuItem value="percent">درصد</MenuItem>
                          <MenuItem value="balance">تراز</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        marginRight: 50,
                        marginLeft: -25,
                        marginTop: 30,
                      }}
                    >
                      <MyChart
                        data={this.state.groupsData}
                        min={this.state.groupsData.map(el => el.y[0]).sort()[0]}
                        max={this.state.groupsData.map(el => el.y[1]).sort()[0]}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    paddingLeft: 50,
                    paddingRight: 50,
                    marginTop: 50,
                  }}
                >
                  <MyChartDonout name="آسان" data={this.state.easyInfo} />
                  <div style={{ flex: 0.1 }} />
                  <MyChartDonout name="عادی" data={this.state.normalInfo} />
                  <div style={{ flex: 0.1 }} />
                  <MyChartDonout name="سخت" data={this.state.hardInfo} />
                </div>
              </div>
            </div>
          </Grid>
        )}
        {this.state.students && (
          <Grid
            direction="column"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              padding: "80px",
              marginTop: 40,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: -15,
                marginTop: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <Grid
                  alignItems="center"
                  className="inputContainer"
                  style={{ width: "50%", marginTop: -20 }}
                >
                  <Grid
                    item
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      width: "82.5%",
                      marginRight: 10,
                    }}
                  >
                    <Select
                      value={this.state.dataStudent}
                      style={{ width: "100%" }}
                      disabled
                      input={<Input disableUnderline />}
                      onChange={e =>
                        this.changeData(e.target.value, "dataStudent")
                      }
                    >
                      <MenuItem value="studentLessonDetails">
                        با نمره منفی
                      </MenuItem>
                      <MenuItem value="studentLessonDetailsNoNegativePoint">
                        بدون نمره منفی
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </div>
              <div style={{ flex: 1 }}>
                <PageTitle
                  style={{ justifyContent: "center" }}
                  title="کارنامه دانش آموزان"
                  size="h3"
                  color="#000"
                />
              </div>
              <div style={{ flex: 1 }} />
            </div>
            <Grid
              item
              sm={12}
              spacing={1}
              alignItems="center"
              className="inputContainer"
              style={{
                padding: "7.5px",
                margin: 0,
                width: "100%",
                overflow: "scroll",
              }}
            >
              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ ...styles.thItem, width: 170 }}>
                    نام دانش آموز
                  </div>
                  {this.state.lessonDetails.map(el => {
                    return (
                      <>
                        <div style={{ width: 200 }}>
                          <div style={{ ...styles.thItem }}>
                            {el.lessonTitle}
                          </div>
                          <div style={{ ...styles.thItem }}>
                            تعداد : {toFA(el.numberOfQuestion)} سوال
                          </div>
                          <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ ...styles.thItem, flex: 1 }}>
                              نمره
                            </div>
                            <div style={{ ...styles.thItem, flex: 1.5 }}>
                              تراز
                            </div>
                            <div style={{ ...styles.thItem, flex: 1 }}>
                              رتبه
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                {this.renderStudents()}
              </div>
            </Grid>
          </Grid>
        )}
        {this.state.questions && (
          <Grid
            direction="column"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              padding: "80px",
              marginTop: 40,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: -15,
                marginTop: 10,
              }}
            >
              <div style={{ marginTop: -40, opacity: 0 }}>
                <Button
                  disabled
                  fullWidth={false}
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    fontFamily: "Dana",
                  }}
                >
                  دانلود اکسل
                </Button>
              </div>
              <PageTitle
                style={{ justifyContent: "center" }}
                title="گزارش سوالی"
                size="h3"
                color="#000"
              />
              <div style={{ marginTop: -40 }}>
                <Button
                  onClick={() => {
                    exportFromJSON({
                      data: this.state.questionsExcel,
                      fileName: `Exam_${this.state.report.examId} Questions Report`,
                      exportType: "xls",
                    });
                  }}
                  fullWidth={false}
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    fontFamily: "Dana",
                  }}
                >
                  دانلود اکسل
                </Button>
              </div>
            </div>
            <Grid
              item
              sm={12}
              spacing={1}
              alignItems="center"
              className="inputContainer"
              style={{
                padding: "7.5px",
                margin: 0,
                width: "100%",
                overflow: "scroll",
              }}
            >
              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ ...styles.thItem, width: 50 }}>سوال</div>
                  <div style={{ ...styles.thItem, flex: 1 }}>درس</div>
                  <div style={{ ...styles.thItem, flex: 1 }}>فصل</div>
                  <div style={{ ...styles.thItem, width: 50 }}>صحیح</div>
                  <div style={{ ...styles.thItem, width: 50 }}>غلط</div>
                  <div style={{ ...styles.thItem, width: 50 }}>نزده</div>
                  <div style={{ ...styles.thItem, width: 70 }}>گزینه ۱</div>
                  <div style={{ ...styles.thItem, width: 70 }}>گزینه ۲</div>
                  <div style={{ ...styles.thItem, width: 70 }}>گزینه ۳</div>
                  <div style={{ ...styles.thItem, width: 70 }}>گزینه ۴</div>
                  <div style={{ ...styles.thItem, width: 140 }}>
                    ضریب تمیز در آزمون
                  </div>
                  <div style={{ ...styles.thItem, width: 90 }}>ضریب تمیز</div>
                  <div style={{ ...styles.thItem, width: 100 }}>سطح دشواری</div>
                </div>
                {this.renderQuestions()}
              </div>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export default ShowReportCard;
