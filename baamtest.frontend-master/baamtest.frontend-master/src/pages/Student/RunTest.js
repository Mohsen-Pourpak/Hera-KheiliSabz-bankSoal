import React from "react";
import { CircularProgress, Grid, Button, Backdrop, Divider } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import { DeleteSweep } from "@material-ui/icons";

// import mask from "../../images/mask.svg";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { runTest, correction } from "../../api/services/exam";
import { toast } from "react-toastify";
import { toFA } from "../../utils/Utils";
import Countdown from "react-countdown";

import MyMath from "../../components/Form/MyMath";
import FilterBox from "../../components/FilterBox";

// const imagem =
//   "https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg";

// const Mask = ({ image, size }) => (
//   <div
//     className="profile-mask"
//     style={{
//       height: size,
//       width: size,
//       maskImage: `url("${mask}")`,
//       WebkitMaskImage: `url("${mask}")`,
//       maskSize: "100%",
//       WebkitMaskSize: "100%",
//     }}
//   >
//     <img src={image} style={{ width: size }} alt='mask' />
//   </div>
// );

// const Completionist = () => <span>You are good to go!</span>;

const style = {
  questionNum: {
    border: "1px solid #fff",
    borderRadius: 60,
    height: 30,
    width: 30,
    paddingTop: "0px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "10px 10px",
    color: "#fff",
    position: "absolute",
    float: "inline-start",
    fontSize: 19,
  },
  optionNum: {
    border: "1px solid #495867",
    borderRadius: 60,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    paddingTop: 3,
    color: "#495867",
    position: "relative",
    fontSize: 19,
    marginLeft: 10,
    cursor: "pointer",
  },
  optionNumActive: {
    border: "1px solid #495867",
    borderRadius: 60,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    paddingTop: 3,
    position: "relative",
    fontSize: 19,
    marginLeft: 10,
    color: "#fff",
    backgroundColor: "#495867",
    cursor: "pointer",
  },
};

class CreateTest extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      questionsList: [],
      selectedList: [],
      time: null,
      startTime: null,
      progress: true,
    };
  }
  componentDidMount() {
    let examId = this.props.match.params.id;
    let token = localStorage.getItem("userToken");
    let startTime = localStorage.getItem("startTime");
    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem("startTime", startTime);
    }
    console.log(parseInt(startTime))
    runTest(examId, token)
      .then(res => {
        console.log(typeof(res.data.suggestTime))
        res.data.questions.map(item => {
          this.setState({
            answers: { ...this.state.answers, [`question__${item.id}`]: 0 },
          });
          if (item.childQuestions) {
            item.childQuestions.map(item_ => {
              this.setState({
                answers: {
                  ...this.state.answers,
                  [`question__${item_.id}`]: 0,
                },
              });
            });
          }
        });
        this.setState({
          questionsList: res.data.questions,
          time: res.data.suggestTime,
          progress: false,
          // startTime: parseInt(startTime),
          startTime: parseInt(startTime)
        });
      })
      .catch(() => {
        this.props.history.push({
          pathname: `/dashboard/test/management/`,
        });
      });
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

  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // this.correctionExam()
      return (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            background: "#fff",
            height: 45,
            borderRadius: 50,
            width: 250,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              flex: 1,
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 15px",
              borderRadius: 50,
              background: "#228b22",
              height: 45,
            }}
          >
            مهلت پاسخ دهی به پایان رسیده است
          </div>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            background: "#fff",
            height: 45,
            borderRadius: 50,
            width: 240,
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
            زمان باقی مانده
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <span style={{ fontSize: 17 }}>
              {toFA(seconds)} : {toFA(minutes)} : {toFA(hours)}
            </span>
          </div>
        </div>
      );
    }
  };

  correctionExam = () => {
    let examId = parseInt(this.props.match.params.id);
    let token = localStorage.getItem("userToken");
    let studentId = parseInt(localStorage.getItem("userId"));
    let questionAndAnswers = [];
    this.state.questionsList.map(el => {
      questionAndAnswers.push({
        questionId: el.id,
        studentAnswer: this.state.answers[`question__${el.id}`],
      });
      if (el.childQuestions) {
        el.childQuestions.map(item_ => {
          questionAndAnswers.push({
            questionId: item_.id,
            studentAnswer: this.state.answers[`question__${item_.id}`],
          });
        });
      }
    });
    let obj = {
      studentId,
      examId,
      questionAndAnswers,
    };
    console.error("$8888888884");
    console.error(obj);
    correction(obj, token).then(res => {
      if (res.isSuccess) {
        toast.success(res.message);
        this.props.history.push({
          pathname: `/dashboard/test/management/`,
        });
      }
    });
  };

  renderQuestionsList = items => {
    // const classes = this.props.classes;
    return items.map((item, idx) => {
      let levelId = item.difficultyId;
      let isOneActive = this.state.answers[`question__${item.id}`] === 1;
      let isTowActive = this.state.answers[`question__${item.id}`] === 2;
      let isThreeActive = this.state.answers[`question__${item.id}`] === 3;
      let isFourActive = this.state.answers[`question__${item.id}`] === 4;
      let labelColor =
        levelId === 1
          ? "#3EC592"
          : levelId === 2
          ? "#FB963A"
          : levelId === 3
          ? "#C83E43"
          : levelId === 4
          ? "#48a148"
          : "#228b22";
      return (
        <>
          <Grid
            item
            sm={12}
            alignItems="flex-start"
            className="inputContainer"
            style={{
              padding: 0,
              backgroundColor: labelColor,
              alignItems: "flex-start",
              width: "calc(100% - 10px)",
              // maxWidth: "80%",
              marginTop: 5,
              marginRight: 5,
              boxShadow: "1px 2px 11px -3px #00000075",
              fontSize: "20px"
            }}
          >
            <div style={style.questionNum}>{toFA(idx + 1)}</div>
            <Grid
              item
              direction="column"
              sm={12}
              spacing={1}
              justify="space-between"
              alignItems="center"
              style={{
                fontSize: "0.9rem",
                padding: "10px 5px",
                backgroundColor: "#fff",
                marginBottom: 0,
                borderRadius: 20,
                borderTopRightRadius: 150,
                minHeight: 300,
              }}
            >
              <Grid
                direction="row"
                alignItems="flex-start"
                spacing={3}
                justify="flex-start"
                container
                style={{ padding: "50px 80px 0 30px", margin: 0 }}
              >
                <MyMath value={item.questionFace} />
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
                  direction="row"
                  alignItems="flex-start"
                  justify="flex-start"
                  container
                  style={{ padding: "0", margin: 0 }}
                >
                  <Grid
                    item
                    xs={6}
                    direction="row"
                    alignItems="flex-start"
                    style={{ padding: "15px 20px", margin: 0 }}
                  >
                    <div
                      style={
                        isOneActive ? style.optionNumActive : style.optionNum
                      }
                      onClick={() => this.changeAnswer(item.id, 1)}
                    >
                      ۱
                    </div>
                    <MyMath value={item.option1.replace(/&nbsp;/g, "")} />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    alignItems="flex-start"
                    direction="row"
                    style={{ padding: "15px 20px", margin: 0 }}
                  >
                    <div
                      style={
                        isTowActive ? style.optionNumActive : style.optionNum
                      }
                      onClick={() => this.changeAnswer(item.id, 2)}
                    >
                      ۲
                    </div>
                    <MyMath value={item.option2.replace(/&nbsp;/g, "")} />
                  </Grid>
                </Grid>
                <Grid
                  direction="row"
                  alignItems="flex-start"
                  justify="flex-start"
                  container
                  style={{ padding: "0", margin: 0 }}
                >
                  <Grid
                    item
                    xs={6}
                    direction="row"
                    style={{ padding: "15px 20px", margin: 0 }}
                  >
                    <div
                      style={
                        isThreeActive ? style.optionNumActive : style.optionNum
                      }
                      onClick={() => this.changeAnswer(item.id, 3)}
                    >
                      ۳
                    </div>
                    <MyMath value={item.option3.replace(/&nbsp;/g, "")} />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    direction="row"
                    style={{ padding: "15px 20px", margin: 0 }}
                  >
                    <div
                      style={
                        isFourActive ? style.optionNumActive : style.optionNum
                      }
                      onClick={() => this.changeAnswer(item.id, 4)}
                    >
                      ۴
                    </div>
                    <MyMath value={item.option4.replace(/&nbsp;/g, "")} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
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
              backgroundColor: "#fe5f55",
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
        <PageTitle title="آزمون آنلاین" />
        <Divider/>
        {!this.state.progress && (
          // <Grid
          //   container
          //   item
          //   xs={12}
          //   style={{
          //     marginBlock: 40,
          //     padding: 70,
          //     borderRadius: "30px",
          //     backgroundColor: "rgb(255 255 255 / 40%)",
          //     alignItems: "flex-start",
          //     display: "flex",
          //   }}
          //   spacing={3}
          // >
          //   <div
          //     style={{
          //       position: "sticky",
          //       top: -15,
          //       flex: 1,
          //       minWidth: 270,
          //       maxHeight: `calc(100vh - 80px)`,
          //       overflowY: "auto",
          //       scrollbarWidth: "thin",
          //       textAlign: "center",
          //     }}
          //   >
          //     <FilterBox title="زمان باقیمانده"></FilterBox>
          //     <FilterBox title="مشخصات آزمون"></FilterBox>
          //     <FilterBox title="وضعیت پاسخگویی"></FilterBox>
          //   </div>
          //   <Grid
          //     className="render-questions"
          //     direction="column"
          //     item
          //     xs={9}
          //     style={{ marginRight: 20 }}
          //   >
          //     {this.renderQuestionsList(this.state.questionsList)}
          //   </Grid>
          // </Grid>
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid
            direction="column"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              margin: 50,
              padding: 40,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            {this.state.time && (
              <div style={{ marginBottom: 20 }}>
                <Countdown
                  date={Date.now() + ((this.state.time)*60)*1000}
                  renderer={this.renderer}
                  onComplete={this.correctionExam}
                />
              </div>
            )}
            <div
              style={{
                alignSelf: "center",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {this.renderQuestionsList(this.state.questionsList)}
            </div>
          </Grid>
          <Grid
            direction="row"
            justify="center"
            style={{ marginTop: 30 }}
            container
            spacing={2}
          >
            <Grid item xs={2}>
              <Button
                onClick={() => {
                  this.correctionExam();
                }}
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
                پایان
              </Button>
            </Grid>
          </Grid>
        </Grid>
        )}
      </>
    );
  }
}

export default CreateTest;
