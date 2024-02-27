import React from "react";
import {
  Select,
  MenuItem,
  Grid,
  Input,
  Button,
  Backdrop,
  CircularProgress,
  Dialog,
  Tooltip,
  Divider,
} from "@material-ui/core";
import {
  Add,
  Bookmark,
  BookmarkBorder,
  DeleteSweep,
  ExpandLess,
  ExpandMore,
  Feedback,
  Remove,
  Timeline,
} from "@material-ui/icons";
import { toast } from "react-toastify";
import jMoment from "moment-jalaali";
import { DateTimePicker } from "@material-ui/pickers";

import "react-modern-calendar-datepicker/lib/DatePicker.css";

import PageTitle from "../../components/PageTitle/PageTitle";
import Textarea from "../../components/Form/Textarea";
import TextField from "../../components/Form/TextField";
import FilterBox from "../../components/FilterBox";

// import Hard from "../../images/test/hard.svg";
// import Normal from "../../images/test/normal.svg";
// import Easy from "../../images/test/easy.svg";

import Hard from "../../images/test/chart-simple red .svg";
import Normal from "../../images/test/chart-yellow.svg";
import Easy from "../../images/test/chart-green.svg";

import { QUESTION_PRICE } from "../../utils/Utils";
import { jalaliToDateObj, toFA } from "../../utils/Utils";
import { fields, grades } from "../../api/services/tags";
import { getTest, editTest } from "../../api/services/exam";
import {
  sendQuestionProblemReports,
  getExamsQuestions,
  saveQuestion,
} from "../../api/services/question";

import SelectExams from "../../features/Modals/SelectExams";
import List from "../../features/EditQuestions/List";
import MyMath from "../../components/Form/MyMath";
import { PaginatedList } from "react-paginated-list";
import Pagination from "../../components/Form/Pagination";
import QuestionReplaceForm from "../../components/QuestionReplaceForm/QuestionReplaceForm";

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
        width={`${newPercent}%`}
        alt="Percent"
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
    top: 2,
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    zIndex: 1000,
    fontSize: "0.8rem"
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

  rightDetailDivs: {
    fontSize: "15px",
    textAlign: "center",
    border: "1px solid #000",
    width: "60px",
    height: "30px",
    margin: "0px",
  },

  leftDetailDivs: {
    fontSize: "15px",
    textAlign: "center",
    border: "1px solid #000",
    width: "60px",
    height: "30px",
    margin: "0px",
  },

  leftDetailDivExpand: {
    fontSize: "20px",
    textAlign: "center",
    border: "1px solid #000",
    height: "30px",
    margin: "0px",
    width: "50.0%",
  },

  rightDetailDivExpand: {
    fontSize: "20px",
    textAlign: "center",
    border: "1px solid #000",
    height: "30px",
    margin: "0px",
    width: "50.0%",
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
    marginLeft: -2
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
  randomFilterActive: {
    backgroundColor: "#C87474",
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
    backgroundColor: "#fe5f55",
    color: "#fff",
    width: "fit-content",
    height: 30,
    borderRadius: 50,
    padding: "6.25px 10px",
  },
};

class EditTest extends React.Component {
  //main list is the original
  //every edit goes to questionsList
  //selected list goes to server
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
      questionsList: [],
      selectedList: [],
      progress: true,
      repetitive: true,
      showSelectExamModal: false,
      selectedExams: [],

      page: 1,
      pageCount: 0,
      perPage: 5,
      pageData: [],
    };
  }

  componentDidMount = async () => {
    this.getQuestions();
    this.getFieldsAndGrades();
  };

  getFieldsAndGrades = async () => {
    let grades_ = await grades();
    let fields_ = await fields();
    this.setState({ grades: grades_.data, fields: fields_.data });
  };

  getQuestions() {
    this.setState({
      progress: true,
    });
    let examId = parseInt(this.props.match.params.id);
    let token = localStorage.getItem("userToken");
    getTest(examId, token)
      .then(res => {
        console.error({ res });
        let selectedList = [];
        res.data.questions.forEach(item => {
          this.setState({
            answers: {
              ...this.state.answers,
              [`question__${item.id}`]: 0,
              ordering: {
                ...this.state.ordering,
                [`question__${item.id}`]: item.questionNumberInExam,
              },
            },
          });
          selectedList.push({
            id: item.id,
            level: item.difficultyId,
          });
        });
        this.mainList = [...res.data.questions];
        this.setState({
          selectedList,
          res: res,
          level: res.data.level,
          title: res.data.title,
          startTime: jalaliToDateObj(res.data.startTime),
          endTime: jalaliToDateObj(res.data.endTime),
          gradeId: res.data.gradeId,
          fieldId: res.data.fieldId,
          questionsList: res.data.questions,
          progress: false,
        });
      })
      .then(() => {
        this.handlePagination(this.state.questionsList.length);
      });

    // getExamsQuestions(
    //   token,
    //   [examId, ...this.state.selectedExams],
    //   this.state.page,
    // )
    // .then(res => {
    //   const selectedList = res.data.data.map(item => ({
    //     id: item.id,
    //     level: item.difficultyId,
    //   }));
    //   const answers = res.data.data.map(item => ({
    //     [`question__${item.id}`]: 0,
    //   }));
    //   const ordering = res.data.data.map(item => ({
    //     [`question__${item.id}`]: item.questionNumberInExam,
    //   }));

    //   this.mainList = res.data.data;
    //   this.setState({
    //     pageCount: JSON.parse(res.headers.pagination).totalPages,
    //     answers: { ...answers, ordering },
    //     selectedList,
    //     res: res,
    //     level: res.data.level,
    //     title: res.data.title,
    //     startTime: jalaliToDateObj(res.data.startTime),
    //     endTime: jalaliToDateObj(res.data.endTime),
    //     gradeId: res.data.gradeId,
    //     fieldId: res.data.fieldId,
    //     questionsList: res.data.data,
    //     progress: false,
    //   });
    // })
    // .catch(e => console.log(e));
  }

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
      this.setState(
        { sortFilter: null, questionsList: [...this.mainList] },
        () => this.handlePagination(this.state.questionsList.length),
      );
    } else {
      this.setState({ sortFilter: type });
      this.sortList(type);
      this.handlePagination(this.state.questionsList.length);
    }
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

  goToRegisterExam = isNew => {
    const { gradeId, title, res, selectedList } = this.state;
    // TODO: update selected list
    let newSelectedList = [];
    this.state.questionsList.map(elem => {
      selectedList.map(item => {
        if (elem.id === item.id) {
          newSelectedList.push({ id: elem.id, level: elem.level });
        }
      });
    });
    // let temp = selectedList.sort(() => Math.random() - 0.5)
    // console.log(temp)
    let ownerId = localStorage.getItem("userId");
    let token = localStorage.getItem("userToken");
    let examId = parseInt(this.props.match.params.id);
    let obj = {
      id: examId,
      title,
      description: title,
      startTime: this.state.startTime.toISOString(),
      endTime: this.state.endTime.toISOString(),
      examType: res.examType,
      target: res.target,
      level: res.level,
      ownerId: ownerId,
      headId: ownerId,
      gradeId: `${gradeId}`,
      questionsIdsAndNumbers: newSelectedList.map((el, idx) => {
        return {
          questionId: el.id,
          questionNumberInExam: idx + 1,
        };
      }),
    };

    if (isNew) {
      delete obj["id"];
      localStorage.setItem("autoCreateObj", JSON.stringify(obj));
      this.props.history.push({
        pathname: "/dashboard/test/register-test",
      });
      // createTest('', obj, token).then(res => {
      //     if (res.isSuccess) {
      //         toast.success(res.message)
      //         this.props.history.push({
      //             pathname: '/dashboard/test/management'
      //         })
      //     }
      // })
    } else {
      editTest(obj, token).then(res => {
        if (res.isSuccess) {
          toast.success(res.message);
          this.props.history.push({
            pathname: "/dashboard/test/management",
          });
        }
      });
    }
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

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleAddExams = examIds => {
    this.setState(
      { showSelectExamModal: false, selectedExams: examIds },
      () => {
        this.getQuestions();
      },
    );
  };

  // handlePageChange = (e, newPage) => {
  //   this.setState({ page: newPage }, () => this.getQuestions());
  // };

  handleChangePage = (_r, page) => {
    this.setState({ page });
  };

  handlePagination = len => {
    this.setState({ page: 1 });

    const newPageCount = Math.ceil(len / this.state.perPage);
    this.setState({ pageCount: newPageCount });

    let newPageData = [];
    for (let i = 0; i < newPageCount; i++) {
      let from = i * this.state.perPage;
      let to = (i + 1) * this.state.perPage;
      newPageData.push(this.state.questionsList.slice(from, to));
    }
    this.setState({ pageData: newPageData });
  };

  replaceQuestion = (from, to) => {
    const temp = this.state.questionsList.slice();
    [temp[from], temp[to]] = [temp[to], temp[from]];

    this.setState({ questionsList: temp }, () =>
      this.handlePagination(this.state.questionsList.length),
    );
  };

  renderQuestionsList = items => {
    // const classes = this.props.classes;
    return (
      <div>
        {this.state.pageData.length === 0 ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              fontSize: "2rem",
              opacity: 0.3,
            }}
          ></div>
        ) : (
          this.state.pageData[this.state.page - 1].map((item, idx) => {
            let levelId = item.difficultyId;
            let isOneActive = this.state.answers[`question__${item.id}`] === 1;
            let isTowActive = this.state.answers[`question__${item.id}`] === 2;
            let isThreeActive =
              this.state.answers[`question__${item.id}`] === 3;
            let isFourActive = this.state.answers[`question__${item.id}`] === 4;

            let labelColor =
              levelId === 1 ? "#3EC592" : levelId === 2 ? "#FB963A" : "#C83E43";
            let isMore = this.state[`isMore__${item.id}`];
            let isEnglish = item.lessonId === 6;
            let isSelected =
              this.state.selectedList.filter(el => el.id === item.id).length !==
              0;
            // return (
            //   <div style={{ position: "relative", flex: "none" }}>
            //     <div style={style.questionTitle}>
            //       {toFA(item.lessonTitle)} | {toFA(item.gradeTitle)}
            //     </div>
            //     <div style={style.questionNumContainer}>
            //       <div style={style.questionNum}>
            //         {toFA(this.state.questionsList.indexOf(item) + 1)}
            //       </div>
            //       {/* <div style={style.boxOutline}>
            //                         <div style={style.box}>
            //                             ضریب تمیز
            //                         </div>
            //                         <span style={{padding: '3.25px 10px'}}>{toFA(item.cleanCoefficient)}</span>
            //                     </div> */}
            //     </div>
            //     <Grid
            //       item
            //       sm={12}
            //       alignItems="center"
            //       className="inputContainer"
            //       style={{
            //         padding: 0,
            //         background: `linear-gradient(90deg, #3d82a4 50%, ${labelColor} 50%)`,
            //         alignItems: "center",
            //         width: "calc(100% - 10px)",
            //         marginTop: 5,
            //         borderRadius: 20,
            //         marginRight: 5,
            //         marginBottom: 20,
            //       }}
            //     >
            //       <Grid
            //         item
            //         direction="column"
            //         sm={12}
            //         spacing={1}
            //         justify="space-between"
            //         alignItems="center"
            //         style={{
            //           padding: "10px 5px",
            //           backgroundColor: "#fff",
            //           marginBottom: "0px !important",
            //           borderRadius: 20,
            //           borderTopRightRadius: 150,
            //           minHeight: 300,
            //           borderBottomLeftRadius: isMore ? 0 : 20,
            //           borderBottomRightRadius: isMore ? 0 : 20,
            //           borderBottom: isMore ? "1px solid #3d82a4" : "none",
            //         }}
            //       >
            //         <Grid
            //           direction="row"
            //           alignItems="flex-start"
            //           spacing={3}
            //           justify="flex-start"
            //           container
            //           style={{
            //             padding: "50px 80px 0 30px",
            //             margin: 0,
            //             justifyContent: isEnglish ? "flex-end" : "flex-start",
            //           }}
            //         >
            //           <MyMath
            //             value={item.questionFace
            //               .replace(/font-size/g, "")
            //               .replace(/font-family/g, "")
            //               .replace(/&nbsp;/g, "")}
            //           />
            //         </Grid>
            //         <Grid
            //           direction="column"
            //           alignItems="flex-start"
            //           spacing={3}
            //           justify="flex-start"
            //           container
            //           style={{ padding: "20px 67.5px 30px", margin: 0 }}
            //         >
            //           <Grid
            //             direction={isEnglish ? "row-reverse" : "row"}
            //             alignItems="flex-start"
            //             justify="flex-start"
            //             container
            //             style={{ padding: "0", margin: 0 }}
            //           >
            //             <Grid
            //               item
            //               xs={6}
            //               direction={isEnglish ? "row-reverse" : "row"}
            //               alignItems="flex-start"
            //               style={{
            //                 padding: "15px 20px",
            //                 margin: 0,
            //                 alignItems: "flex-start",
            //               }}
            //             >
            //               <div
            //                 style={
            //                   isOneActive
            //                     ? style.optionNumActive
            //                     : style.optionNum
            //                 }
            //                 onClick={() => this.changeAnswer(item.id, 1)}
            //               >
            //                 {isEnglish ? "1" : "۱"}
            //               </div>
            //               <MyMath
            //                 value={item.option1
            //                   .replace(/font-size/g, "")
            //                   .replace(/font-family/g, "")
            //                   .replace(/&nbsp;/g, "")}
            //               />
            //             </Grid>
            //             <Grid
            //               item
            //               xs={6}
            //               alignItems="flex-start"
            //               direction={isEnglish ? "row-reverse" : "row"}
            //               style={{
            //                 padding: "15px 20px",
            //                 margin: 0,
            //                 alignItems: "flex-start",
            //               }}
            //             >
            //               <div
            //                 style={
            //                   isTowActive
            //                     ? style.optionNumActive
            //                     : style.optionNum
            //                 }
            //                 onClick={() => this.changeAnswer(item.id, 2)}
            //               >
            //                 {isEnglish ? "2" : "۲"}
            //               </div>
            //               <MyMath
            //                 value={item.option2
            //                   .replace(/font-size/g, "")
            //                   .replace(/font-family/g, "")
            //                   .replace(/&nbsp;/g, "")}
            //               />
            //             </Grid>
            //           </Grid>
            //           <Grid
            //             direction={isEnglish ? "row-reverse" : "row"}
            //             alignItems="flex-start"
            //             justify="flex-start"
            //             container
            //             style={{ padding: "0", margin: 0 }}
            //           >
            //             <Grid
            //               item
            //               xs={6}
            //               direction={isEnglish ? "row-reverse" : "row"}
            //               style={{
            //                 padding: "15px 20px",
            //                 margin: 0,
            //                 alignItems: "flex-start",
            //               }}
            //             >
            //               <div
            //                 style={
            //                   isThreeActive
            //                     ? style.optionNumActive
            //                     : style.optionNum
            //                 }
            //                 onClick={() => this.changeAnswer(item.id, 3)}
            //               >
            //                 {isEnglish ? "3" : "۳"}
            //               </div>
            //               <MyMath
            //                 value={item.option3
            //                   .replace(/font-size/g, "")
            //                   .replace(/font-family/g, "")
            //                   .replace(/&nbsp;/g, "")}
            //               />
            //             </Grid>
            //             <Grid
            //               item
            //               xs={6}
            //               direction={isEnglish ? "row-reverse" : "row"}
            //               style={{
            //                 padding: "15px 20px",
            //                 margin: 0,
            //                 alignItems: "flex-start",
            //               }}
            //             >
            //               <div
            //                 style={
            //                   isFourActive
            //                     ? style.optionNumActive
            //                     : style.optionNum
            //                 }
            //                 onClick={() => this.changeAnswer(item.id, 4)}
            //               >
            //                 {isEnglish ? "4" : "۴"}
            //               </div>
            //               <MyMath
            //                 value={item.option4
            //                   .replace(/font-size/g, "")
            //                   .replace(/font-family/g, "")
            //                   .replace(/&nbsp;/g, "")}
            //               />
            //             </Grid>
            //           </Grid>
            //         </Grid>
            //       </Grid>
            //       <Grid
            //         direction="column"
            //         alignItems="center"
            //         spacing={3}
            //         justify="space-between"
            //         container
            //         style={{ width: 80, display: "content" }}
            //       >
            //         <Button
            //           onClick={() => {
            //             let token = localStorage.getItem("userToken");
            //             saveQuestion(token, item.id).then(res => {
            //               if (res.isSuccess) {
            //                 toast.success(res.message);
            //               }
            //               this.setState({
            //                 questionsList: this.state.questionsList.map(el => ({
            //                   ...el,
            //                   saved: el.id === item.id ? !el.saved : el.saved,
            //                 })),
            //               });
            //             });
            //           }}
            //         >
            //           <div
            //             style={{
            //               width: 50,
            //               display: "content",
            //               textAlign: "center",
            //             }}
            //           >
            //             {item.saved ? (
            //               <Bookmark style={style.actionIcon} />
            //             ) : (
            //               <BookmarkBorder style={style.actionIcon} />
            //             )}
            //             <div style={style.actionText}>ذخیره کردن</div>
            //           </div>
            //         </Button>
            //         <div style={{ width: 50, height: 30 }} />
            //         <Button onClick={() => this.openSendReport(item.id)}>
            //           <div
            //             style={{
            //               width: 50,
            //               display: "content",
            //               textAlign: "center",
            //             }}
            //           >
            //             <Feedback style={style.actionIcon} />
            //             <div style={style.actionText}>گزارش خطا</div>
            //           </div>
            //         </Button>
            //         <div style={{ width: 50, height: 30 }} />
            //         <Tooltip title={"در حال بروزرسانی"}>
            //           <Button>
            //             <div
            //               style={{
            //                 width: 50,
            //                 display: "content",
            //                 textAlign: "center",
            //               }}
            //             >
            //               <Timeline style={style.actionIcon} />
            //               <div style={style.actionText}>اطلاعات آماری</div>
            //             </div>
            //           </Button>
            //         </Tooltip>
            //       </Grid>
            //     </Grid>
            //     {isMore && (
            //       <div
            //         style={{
            //           padding: "20px 30px 45px",
            //           width: "calc(100% - 60px)",
            //           backgroundColor: "#fff",
            //           marginTop: -20,
            //           position: "relative",
            //           right: 5,
            //           marginBottom: 20,
            //           borderRadius: "0 0 20px 20px",
            //         }}
            //       >
            //         <div style={style.correctOption}>
            //           گزینه {toFA(item.correctOption)}
            //         </div>
            //         <Grid
            //           direction="row"
            //           alignItems="flex-start"
            //           spacing={3}
            //           justify="flex-start"
            //           container
            //           style={{ padding: "20px 20px 0 20px", margin: 0 }}
            //         >
            //           {/* <div dangerouslySetInnerHTML={{ __html: item.answer }} /> */}
            //           <div style={{ overflow: "hidden", width: "100%" }}>
            //             <MyMath
            //               value={item.answer
            //                 .replace(/font-size/g, "")
            //                 .replace(/font-family/g, "")
            //                 .replace(/&nbsp;/g, "")}
            //             />
            //           </div>
            //         </Grid>
            //       </div>
            //     )}
            //     <div style={style.bottomActions}>
            //       <div
            //         style={{
            //           flex: 1,
            //           justifyContent: "center",
            //           display: "flex",
            //         }}
            //       >
            //         <div
            //           style={style.circleButton}
            //           onClick={() => {
            //             let selectedList = this.state.selectedList;
            //             if (isSelected) {
            //               let newList = selectedList.filter(
            //                 el => el.id !== item.id,
            //               );
            //               this.setState({ selectedList: newList });
            //             } else {
            //               this.setState({
            //                 selectedList: [
            //                   ...selectedList,
            //                   {
            //                     id: item.id,
            //                     level: levelId,
            //                   },
            //                 ],
            //               });
            //             }
            //           }}
            //         >
            //           {isSelected ? (
            //             <Remove style={{ fill: "#fe5f55" }} />
            //           ) : (
            //             <Add style={{ fill: "#3EC592" }} />
            //           )}
            //         </div>
            //         <div style={style.actionButton}>
            //           {isSelected ? "حذف" : "انتخاب"} سوال
            //         </div>
            //       </div>
            //       <div
            //         style={{
            //           flex: 1,
            //           justifyContent: "center",
            //           display: "flex",
            //         }}
            //       >
            //         <div
            //           style={style.circleButton}
            //           onClick={() => {
            //             this.setState({
            //               [`isMore__${item.id}`]: !this.state[
            //                 `isMore__${item.id}`
            //               ],
            //             });
            //           }}
            //         >
            //           {isMore ? <ExpandLess /> : <ExpandMore />}
            //         </div>
            //         <div style={style.actionButton}>
            //           {isMore ? "بستن" : "مشاهده"} پاسخ
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // );
            return (
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  width: "100%",
                  marginBottom: "-50px",
                }}
                key={item.id}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={style.questionTitle}>
                    {/* {toFA(item.lessonTitle)} | {item.topic} */}
                    {/* <div
                      class="Question-rightSide-detailContainer"
                      style={{
                        backgroundColor: `${labelColor}`,
                        height: "60px",
                        width: "300px",
                        margin: "20px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div style={style.rightDetailDivs}>
                        {toFA(item.lessonTitle)}
                      </div>
                      <div style={style.rightDetailDivs}>فصل</div>
                      <div style={style.rightDetailDivs}>مبحث</div>
                      <div style={style.rightDetailDivs}>زیر مبحث</div>
                      <div style={style.rightDetailDivs}>مبحث تر</div>
                      <div style={style.rightDetailDivs}>سطح</div>
                      <div style={style.rightDetailDivs}>تکراری ؟</div>
                      <div style={style.rightDetailDivs}>تستی ؟</div>
                      <div style={style.rightDetailDivs}>سبک</div>
                      <div style={style.rightDetailDivs}>مولف|منبع</div>
                    </div>
                    <div
                      class="Question-leftSide-detailContainer"
                      style={{
                        backgroundColor: `${labelColor}`,
                        height: "60px",
                        width: "300px",
                        margin: "20px",
                        display: "flex",
                        flexWrap: "wrap",
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={style.leftDetailDivs}>comment</div>
                      <div style={style.leftDetailDivs}>note</div>
                      <div style={style.leftDetailDivs}>bug</div>
                      <div style={style.leftDetailDivs}>آمار</div>
                      <div style={style.leftDetailDivs}>ذخیره</div>
                      <div
                        id="left-div-expand"
                        style={style.leftDetailDivExpand}
                      >
                        Rating
                      </div>
                      <div
                        id="right-div-expand"
                        style={style.rightDetailDivExpand}
                      >
                        زمان پاسخگویی
                      </div>
                    </div> */}
                  </div>
                </div>
                <Grid
                  item
                  sm={12}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: 0,
                    background: `linear-gradient(0deg, ${labelColor} , ${labelColor} 60%)`,
                    alignItems: "center",
                    width: "calc(100% - 10px)",
                    marginTop: 5,
                    marginRight: 5,
                    marginBottom: 20,
                    borderRadius: "1.2rem",
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
                      backgroundColor: "#DEF6FF",
                      marginBottom: "0px !important",
                      border: "solid",
                      borderColor: "black",
                      borderWidth: "thin",
                      minHeight: 250,
                      paddingTop: "30px",
                      borderTopLeftRadius: "1.2rem",
                      borderTopRightRadius: "1.2rem"
                    }}
                  >
                    {/* <div style={style.questionNumContainer}>
                      <div style={{ ...style.questionNum, fontSize }}>
                        {toFA(rowNumber)}
                      </div>
                    </div> */}
                    <Grid
                      direction="row"
                      alignItems="flex-start"
                      spacing={3}
                      justify="flex-start"
                      container
                      style={{
                        padding: "20px"

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
                      <div style={style.questionNumContainer}>
                        <div style={style.questionNum}>
                          {toFA(this.state.questionsList.indexOf(item) + 1)}
                        </div>
                        <MyMath value={item.questionFace} />
                      </div>
                    </Grid>
                    <Grid
                      direction="column"
                      alignItems="flex-start"
                      spacing={3}
                      justify="flex-start"
                      container
                      style={{ padding: "20px", marginBottom: "30px" }}
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
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={
                              isOneActive
                                ? style.optionNumActive
                                : style.optionNum
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
                              isTowActive
                                ? style.optionNumActive
                                : style.optionNum
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
                              isThreeActive
                                ? style.optionNumActive
                                : style.optionNum
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
                              isFourActive
                                ? style.optionNumActive
                                : style.optionNum
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
                        style={{
                          width: 50,
                          display: "content",
                          textAlign: "center",
                        }}
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
                            style={{
                              width: 50,
                              display: "content",
                              textAlign: "center",
                            }}
                          >
                            <Feedback style={style.actionIcon} />
                            <div style={style.actionText}>گزارش خطا</div>
                          </div>
                        </Button>
                      </div>
                    )}
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
                    width: "calc(100% - 64px)",
                    backgroundColor: "#DEF6FF",
                    marginTop: -20,
                    position: "relative",
                    right: 5,
                    marginBottom: 20,
                    borderRadius: "0 0 20px 20px",
                    border: "1px solid #000",
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
                  <div
                    style={{
                      flex: 1,
                      justifyContent: "flex-start",
                      display: "flex",
                      marginBottom: 100,
                    }}
                  >
                    <div
                      style={style.circleButton}
                      onClick={() => {
                        this.setState({
                          [`isMore__${item.id}`]: !this.state[
                            `isMore__${item.id}`
                          ],
                        });
                      }}
                    >
                      {isMore ? <ExpandLess /> : <ExpandMore />}
                    </div>
                    <div style={style.actionButton}>
                      {isMore ? "بستن" : "مشاهده"} پاسخ
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      display: "flex",
                      marginLeft: "4px",
                    }}
                  >
                    <div
                      style={style.circleButton}
                      onClick={() => {
                        let selectedList = this.state.selectedList;
                        if (isSelected) {
                          let newList = selectedList.filter(
                            el => el.id !== item.id,
                          );
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
                        <Remove style={{ fill: "#fe5f55" }} />
                      ) : (
                        <Add style={{ fill: "#3EC592" }} />
                      )}
                    </div>
                    <div style={style.actionButton}>
                      {isSelected ? "حذف" : "انتخاب"} سوال
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        <Backdrop
          style={{ zIndex: 1000000, color: "#228b22" }}
          open={this.state.progress}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <PageTitle title="ساخت آزمون - ویرایش آزمون" />
        <Divider/>
        {!this.state.progress && (
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
            <Grid
              direction="row"
              alignItems="flex-start"
              spacing={3}
              justify="flex-start"
              container
              style={{
                margin: 63,
                padding: 30,
                backgroundColor: "rgb(255 255 255 / 40%)",
                borderRadius: 20,
              }}
            >
              <Grid direction="row" container sm={12} spacing={2}>
                <Grid
                  direction="row"
                  container
                  sm={9}
                  spacing={2}
                  style={{ marginBottom: -10 }}
                >
                  <Grid
                    item
                    style={{ alignItems: "flex-start" }}
                    direction="row"
                    xs={5}
                  >
                    <div
                      style={{
                        width: "max-content",
                        marginTop: 17.5,
                        marginRight: 10,
                      }}
                    >
                      نام آزمون :{" "}
                    </div>
                    <Grid
                      item
                      sm={12}
                      spacing={1}
                      alignItems="center"
                      className="inputContainer"
                      style={{
                        padding: 0,
                        flex: "auto",
                        paddingRight: 10,
                        marginRight: 10,
                        top: -8.5,
                        position: "relative",
                        marginTop: 15,
                        height: 40,
                      }}
                    >
                      <TextField
                        placeholder="نام آزمون را وارد کنید"
                        value={this.state.title}
                        style={{ height: 40, background: "transparent" }}
                        onChange={e => this.changeInput("title", e)}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    style={{ alignItems: "flex-start" }}
                    direction="row"
                    xs={4}
                  >
                    <div
                      style={{
                        width: "max-content",
                        marginTop: 17.5,
                        marginRight: 10,
                      }}
                    >
                      پایه :{" "}
                    </div>
                    <Grid
                      item
                      spacing={1}
                      alignItems="center"
                      className="inputContainer"
                      style={{
                        padding: 0,
                        flex: "auto",
                        paddingRight: 10,
                        marginLeft: 2.5,
                        marginRight: 10,
                        marginTop: 7.5,
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
                          value={this.state.gradeId}
                          style={{ width: "100%" }}
                          input={<Input disableUnderline />}
                          onChange={e => this.changeInput("gradeId", e)}
                        >
                          <MenuItem value="d" disabled>
                            پایه
                          </MenuItem>
                          {this.renderMenuItem(this.state.grades)}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid direction="column" container item xs={3}>
                <div
                  style={{
                    backgroundColor: "#CBF2CF",
                    padding: "30px",
                    paddingBottom: "20px",
                    marginBottom: "20px",
                    borderRadius: "2rem",
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
                      backgroundColor: "#fff",
                      margin: "20px 0",
                      width: "100%",
                    }}
                  >
                    {/* <div
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
                  </div> */}
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        width: "100%",
                        paddingTop: 30,
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
                </div>
                <div
                  onClick={() => this.setState({ open2: true })}
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#228B22",
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
                <Button
                  onClick={() => this.setState({ showSelectExamModal: true })}
                  style={{ marginBottom: 20 }}
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  افزودن آزمون
                </Button>
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
                  <FilterBox title="چینش سوالات بر اساس: ">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
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
                  </FilterBox>
                </Grid>

                <QuestionReplaceForm
                  questions={this.state.questionsList}
                  onSubmit={this.replaceQuestion}
                />

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
                 <FilterBox title="بازۀ زمانی امتحان">
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
                      <div>از : </div>
                      <div
                        style={{
                          ...style.randomFilter,
                          padding: 5,
                          marginRight: 10,
                        }}
                      >
                        <DateTimePicker
                          okLabel="تأیید"
                          cancelLabel="لغو"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          hideTabs={true}
                          mode="24h"
                          ampm={false}
                          labelFunc={() =>
                            this.state.startTime
                              ? jMoment(this.state.startTime).format(
                                  "jYYYY/jMM/jDD HH:mm",
                                )
                              : ""
                          }
                          value={this.state.startTime}
                          onChange={e =>
                            this.setState({
                              startTime: new Date(e),
                            })
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
                      <div>تا : </div>
                      <div
                        style={{
                          ...style.randomFilter,
                          padding: 5,
                          marginRight: 10,
                        }}
                      >
                        <DateTimePicker
                          okLabel="تأیید"
                          cancelLabel="لغو"
                          style={{ cursor: "pointer" }}
                          InputProps={{
                            disableUnderline: true,
                            style: { textAlign: "center", cursor: "pointer" },
                          }}
                          mode="24h"
                          ampm={false}
                          hideTabs={true}
                          labelFunc={date =>
                            this.state.endTime
                              ? jMoment(this.state.endTime).format(
                                  "jYYYY/jMM/jDD HH:mm",
                                )
                              : ""
                          }
                          value={this.state.endTime}
                          onChange={e =>
                            this.setState({
                              endTime: new Date(e.toISOString()),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  </FilterBox>
                </Grid>
              </Grid>
              <Grid direction="column" item xs={9}>
                {this.renderQuestionsList(this.state.questionsList)}
                {/* <List
                  list={this.state.questionsList}
                  state={this.state}
                  page={this.state.page}
                  pageCount={this.state.pageCount}
                  onPageChange={this.handlePageChange}
                  changeAnswer={this.changeAnswer}
                  setState={this.setState}
                  openSendReport={this.openSendReport}
                  setIsMore={obj => this.setState(obj)}
                  setQuestionList={questionsList =>
                    this.setState({ questionsList })
                  }
                  setSelectedList={selectedList =>
                    this.setState({ selectedList })
                  }
                /> */}
                <Pagination
                  count={this.state.pageCount}
                  page={this.state.page}
                  onChange={this.handleChangePage}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {this.state.open && (
          <Dialog
            maxWidth="xs"
            onBackdropClick={this.handleClose}
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title"
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
              <Grid direction="column" container spacing={3}>
                <Grid
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
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
                </Grid>
                <Grid item sm={12} spacing={1} alignItems="center">
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
                </Grid>
              </Grid>
            </div>
          </Dialog>
        )}
        {this.state.open2 && (
          <Dialog
            maxWidth="xs"
            onBackdropClick={this.handleClose2}
            onClose={this.handleClose2}
            aria-labelledby="simple-dialog-title"
            open={this.state.open2}
          >
            <div
              style={{
                background: "rgb(61 130 164 / 20%)",
                flexDirection: "column",
                padding: "0px 30px",
                width: 400,
                height: 200,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Grid direction="column" container spacing={3}>
                <Grid item sm={12} spacing={1} alignItems="center">
                  <Button
                    onClick={() => this.goToRegisterExam(true)}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      height: 55,
                      fontFamily: "Dana",
                    }}
                  >
                    ثبت آزمون جدید
                  </Button>
                </Grid>
                <Grid item sm={12} spacing={1} alignItems="center">
                  <Button
                    onClick={() => this.goToRegisterExam(false)}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.createAccountButton}
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      height: 55,
                      fontFamily: "Dana",
                    }}
                  >
                    ویرایش آزمون فعلی
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Dialog>
        )}
        <SelectExams
          open={this.state.showSelectExamModal}
          onClose={() => this.setState({ showSelectExamModal: false })}
          // onAdd={this.handleAddExams}
          onDone={() => this.getQuestions()}
          examId={parseInt(this.props.match.params.id)}
          userExams={this.state.selectedExams}
        />
      </>
    );
  }
}

export default EditTest;
