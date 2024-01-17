import React from "react";
import { CircularProgress, Grid, Backdrop } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";
import {
  HighlightOff,
  RemoveCircleOutline,
  CheckCircleOutline,
} from "@material-ui/icons";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { toFA } from "../../utils/Utils";
import MyMath from "../../components/Form/MyMath";
import { getExamResult } from "../../api/services/exam";

const style = {
  questionNum: {
    border: "1px solid #fff",
    borderRadius: 60,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "10px 10px",
    color: "#fff",
    position: "absolute",
    float: "inline-start",
    fontSize: 19,
  },
  answerIcon: {
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: -25,
    paddingLeft: 3,
    display: "flex",
    color: "#fff",
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
      progress: true,
    };
  }
  componentDidMount() {
    let examId = this.props.match.params.id;
    let token = localStorage.getItem("userToken");
    getExamResult(examId, token).then(res => {
      console.error({ res });
      this.setState({
        questionsList: res.data,
        progress: false,
      });
    });
  }
  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  renderQuestionsList = items => {
    // const classes = this.props.classes;
    return items.map((item, idx) => {
      let levelId = parseInt(item.difficultyId);
      let isEmpty = item.studentAnswer === 0;
      let isCorrect = item.studentAnswer === item.correctOption;
      let isOneActive = item.correctOption === 1;
      let isTowActive = item.correctOption === 2;
      let isThreeActive = item.correctOption === 3;
      let isFourActive = item.correctOption === 4;
      let isOneWrong = item.studentAnswer === 1 && !isCorrect;
      let isTowWrong = item.studentAnswer === 2 && !isCorrect;
      let isThreeWrong = item.studentAnswer === 3 && !isCorrect;
      let isFourWrong = item.studentAnswer === 4 && !isCorrect;
      let optionColorActive = isEmpty
        ? "#495867"
        : isCorrect
        ? "#28cc2d"
        : "#495867";
      let optionOneNum = {
        ...style.optionNum,
        color: isOneWrong ? "#fff" : "#495867",
        backgroundColor: isOneWrong ? "#d2222d" : "#fff",
        borderColor: isOneWrong ? "#d2222d" : "#495867",
      };
      let optionTowNum = {
        ...style.optionNum,
        color: isTowWrong ? "#fff" : "#495867",
        backgroundColor: isTowWrong ? "#d2222d" : "#fff",
        borderColor: isTowWrong ? "#d2222d" : "#495867",
      };
      let optionThreeNum = {
        ...style.optionNum,
        color: isThreeWrong ? "#fff" : "#495867",
        backgroundColor: isThreeWrong ? "#d2222d" : "#fff",
        borderColor: isThreeWrong ? "#d2222d" : "#495867",
      };
      let optionFourNum = {
        ...style.optionNum,
        color: isFourWrong ? "#fff" : "#495867",
        backgroundColor: isFourWrong ? "#d2222d" : "#fff",
        borderColor: isFourWrong ? "#d2222d" : "#495867",
      };

      let optionNumActive = {
        ...style.optionNumActive,
        backgroundColor: optionColorActive,
        borderColor: optionColorActive,
      };
      let labelColor =
        levelId === 1 ? "#3EC592" : levelId === 2 ? "#FB963A" : "#C83E43";
      let answerColor = isEmpty ? "#ffbf00" : isCorrect ? "#28cc2d" : "#d2222d";
      let AnswerIcon = isEmpty
        ? RemoveCircleOutline
        : isCorrect
        ? CheckCircleOutline
        : HighlightOff;
      return (
        <>
          <Grid
            item
            sm={12}
            alignItems="flex-start"
            className="inputContainer"
            style={{
              padding: 0,
              background: `linear-gradient(90deg, ${answerColor} 50%, ${labelColor} 50%)`,
              alignItems: "flex-start",
              width: "calc(100% - 10px)",
              maxWidth: "80%",
              marginTop: 5,
              marginRight: 5,
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
                padding: "10px 5px",
                backgroundColor: "#fff",
                marginBottom: 0,
                borderRadius: 20,
                borderTopRightRadius: 150,
                borderBottomLeftRadius: 115,
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
                      style={isOneActive ? optionNumActive : optionOneNum}
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
                      style={isTowActive ? optionNumActive : optionTowNum}
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
                      style={isThreeActive ? optionNumActive : optionThreeNum}
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
                      style={isFourActive ? optionNumActive : optionFourNum}
                      onClick={() => this.changeAnswer(item.id, 4)}
                    >
                      ۴
                    </div>
                    <MyMath value={item.option4.replace(/&nbsp;/g, "")} />
                  </Grid>
                </Grid>
              </Grid>
              <div
                style={{
                  padding: "20px 30px 10px",
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
                  <div style={{ overflow: "hidden", width: "100%" }}>
                    <MyMath value={item.answer} />
                  </div>
                </Grid>
              </div>
              <div style={style.answerIcon}>
                {<AnswerIcon style={{ fill: "#fff" }} />}
              </div>
            </Grid>
          </Grid>
        </>
      );
    });
  };

  render() {
    // const classes = this.props.classes;
    return (
      <>
        <Backdrop
          style={{ zIndex: 1000000, color: "#FFD700" }}
          open={this.state.progress}
          onClick={() => console.log("clicked")}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <PageTitle title="نتیجه آزمون" />
        {!this.state.progress && (
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
            <Grid
              direction="row"
              alignItems="flex-start"
              spacing={3}
              justify="center"
              container
              style={{
                padding: 20,
                backgroundColor: "rgb(255 255 255 / 40%)",
                borderRadius: 20,
              }}
            >
              {this.renderQuestionsList(this.state.questionsList)}
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export default CreateTest;
