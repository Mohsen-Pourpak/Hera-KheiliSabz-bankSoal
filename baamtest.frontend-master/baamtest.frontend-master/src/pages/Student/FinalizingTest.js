import React from "react";
import {
  Grid,
  IconButton,
  Backdrop,
  CircularProgress,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { DeleteSweep } from "@material-ui/icons";
import { toast } from "react-toastify";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import PageTitle from "../../components/PageTitle/PageTitle";
import TextField from "../../components/Form/TextField";
import FilterBox from "../../components/FilterBox";

import { toEn, toFA, QUESTION_PRICE } from "../../utils/Utils";
import { questionRandom } from "../../api/services/question";
import { getRandomQuestionCount } from "../../api/services/exam";

import Hard from "../../images/test/hard.svg";
import Normal from "../../images/test/normal.svg";
import Easy from "../../images/test/easy.svg";
import CheckRadioIcon from "../../images/icons/check-radio-icon.svg";

const ActionButton = ({ Icon, onClick, color }) => {
  return (
    <IconButton color="inherit" aria-controls="profile-menu" onClick={onClick}>
      <Icon style={{ fill: color ? color : "#555", fontSize: "80%" }} />
    </IconButton>
  );
};

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
        width={`${newPercent}%`}
        alt="level"
      />
      {/* <div style={{height: (80*newPercent), width: (90*newPercent), backgroundImage: `url("${image}")`, backgroundSize: 'cover'}} /> */}
    </div>
  );
};

const styles = {
  trItem: {
    backgroundColor: "#f4faff",
    color: "#8AB668",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    fontSize: 14,
    margin: "0 2.5px",
    padding: "10px 10px",
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
  countInput: {
    borderRadius: 30,
    margin: "0px 10px",
    color: "#fff",
    textAlign: "center",
  },

  randomFilter: {
    backgroundColor: "#fff",
    color: "#8AB668",
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
    backgroundColor: "#8AB668",
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
    border: "1px solid #8AB668",
    color: "#8AB668",
    height: 40,
    flex: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  sortFilterActive: {
    backgroundColor: "#8AB668",
    border: "1px solid #8AB668",
    color: "#fff",
    height: 40,
    flex: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

class FinalizingTest extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      userLessons: [],
      selectedList: [],
      selectedListTotal: [],
      progress: true,

      loading: false,
      selectedTopics: [],
      includeReadingAndEtc: false,
      repetitive: false,
      startTime: { _d: new Date() },
      endTime: { _d: new Date() },
      repeatState: 2,
    };
  }

  calculate = selectedList => {
    if (selectedList && selectedList.length > 0) {
      let hardTotal = selectedList
        .map(item => {
          return item.numberOfHardQuestions;
        })
        .reduce((a, b) => parseInt(a) + parseInt(b));
      let mediumTotal = selectedList
        .map(item => {
          return item.numberOfMediumQuestions;
        })
        .reduce((a, b) => parseInt(a) + parseInt(b));
      let easyTotal = selectedList
        .map(item => {
          return item.numberOfEasyQuestions;
        })
        .reduce((a, b) => parseInt(a) + parseInt(b));
      console.error("pppppp", selectedList);
      let hardList = Array.apply(0, Array(hardTotal)).map(el => {
        return { level: 3 };
      });
      let mediumList = Array.apply(0, Array(mediumTotal)).map(el => {
        return { level: 2 };
      });
      let easyList = Array.apply(0, Array(easyTotal)).map(el => {
        return { level: 1 };
      });

      return Array.prototype.concat.apply([], [hardList, mediumList, easyList]);
    } else {
      return [];
    }
  };

  componentDidMount() {
    let selectedList = JSON.parse(localStorage.getItem("selectedList"));
    this.getQuestionsCount(selectedList);
    this.setState({ selectedTopics: selectedList, selectedList });
  }

  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  changeCountInput = (field, itemId, e, maxCount, title) => {
    let newValue = toEn(e.target.value);

    if (parseInt(newValue) > maxCount) {
      let difficulty =
        field === "Hard" ? "سخت" : field === "Easy" ? "آسان" : "متوسط";
      toast.error(
        `شما نمیتوانید بیشتر از ${toFA(
          maxCount,
        )} سوال ${difficulty} برای ${title} انتخاب کنید`,
      );
    } else {
      if (!newValue) {
        newValue = 0;
      }
      let selectedList = this.state.selectedList;
      let newSelectedList = selectedList.filter(el => {
        if (el.id === itemId) {
          let item = el;
          item[`numberOf${field}Questions`] = parseInt(newValue);
          return item;
        } else {
          return el;
        }
      });

      let selectedListTotal = this.calculate(newSelectedList);

      this.setState({
        selectedList: newSelectedList,
        selectedListTotal,
      });
    }
  };

  removeItem = itemId => {
    let selectedList = this.state.selectedList;
    let newSelectedList = selectedList.filter(el => el.id !== itemId);

    let selectedListTotal = this.calculate(newSelectedList);

    this.setState({
      selectedList: newSelectedList,
      selectedListTotal,
    });
  };

  removeAllItems = () => {
    let selectedList = this.state.selectedList;
    let newSelectedList = selectedList.map(el => {
      let item = el;
      item.numberOfEasyQuestions = 0;
      item.numberOfMediumQuestions = 0;
      item.numberOfHardQuestions = 0;
      return item;
    });

    let selectedListTotal = this.calculate(newSelectedList);

    this.setState({
      selectedList: newSelectedList,
      selectedListTotal,
    });
  };

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    });
  };

  renderLevels(title, value, color) {
    const { level } = this.state;
    let isActive = level === value;
    return (
      <div
        style={{
          border: `1px solid ${color}`,
          backgroundColor: isActive ? color : "#fff",
          cursor: "pointer",
          borderRadius: 30,
          marginLeft: 20,
          padding: "5px 15px",
          textAlign: "center",
        }}
        onClick={() => this.setState({ level: value })}
      >
        <div
          style={{
            color: isActive ? "#fff" : color,
            fontSize: 13,
            textAlign: "center",
          }}
        >
          {title}
        </div>
      </div>
    );
  }

  renderExams = () => {
    return this.state.selectedTopics.map((item, idx) => {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ ...styles.trItem, flex: 1 }}>{toFA(idx + 1)}</div>
          <div
            style={{ ...styles.trItem, textAlign: "right !important", flex: 4 }}
          >
            <Typography>{item.title}</Typography>
            {item.description && (
              <Typography variant="caption">{item.description}</Typography>
            )}
          </div>
          <div
            style={{
              ...styles.trItem,
              alignItems: "center",
              flex: 4,
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <TextField
              style={{ ...styles.countInput, backgroundColor: "#3EC592" }}
              value={toFA(item.numberOfEasyQuestions)}
              onChange={e =>
                this.changeCountInput(
                  "Easy",
                  item.id,
                  e,
                  item.totalEasy,
                  item.title,
                )
              }
            />
            <TextField
              style={{ ...styles.countInput, backgroundColor: "#FB963A" }}
              value={toFA(item.numberOfMediumQuestions)}
              onChange={e =>
                this.changeCountInput(
                  "Medium",
                  item.id,
                  e,
                  item.totalModerate,
                  item.title,
                )
              }
            />
            <TextField
              style={{ ...styles.countInput, backgroundColor: "#C83E43" }}
              value={toFA(item.numberOfHardQuestions)}
              onChange={e =>
                this.changeCountInput(
                  "Hard",
                  item.id,
                  e,
                  item.totalHard,
                  item.title,
                )
              }
            />
          </div>
          <div
            style={{
              ...styles.trItem,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 2,
            }}
          >
            {toFA(
              parseInt(item.numberOfEasyQuestions) +
                parseInt(item.numberOfMediumQuestions) +
                parseInt(item.numberOfHardQuestions),
            )}
          </div>
          <div
            style={{
              ...styles.trItem,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flex: 1,
            }}
          >
            <ActionButton
              Icon={DeleteSweep}
              color="#fe5f55"
              onClick={() => {
                this.removeItem(item.id);
              }}
            />
          </div>
        </div>
      );
    });
  };

  levelPercent = levelId => {
    let List = [1, 2, 3, 4, 5]
      .map(
        levelId =>
          this.state.selectedListTotal.filter(item => item.level === levelId)
            .length,
      )
      .sort((a, b) => {
        return b - a;
      });
    let percent =
      (this.state.selectedListTotal.filter(item => item.level === levelId)
        .length /
        List[0]) *
      100;
    if (this.state.selectedListTotal.length === 0) {
      percent = 0;
    }
    return percent;
  };

  goToRegisterExam = () => {
    // if()
    const { selectedList } = this.state;
    let autoCreateObj = localStorage.getItem("autoCreate");
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
      generateRandomQuestionDTO: {
        includeReadingAndEtc: this.state.includeReadingAndEtc,
        repetitive: this.state.repetitive,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        selectedTopics: [],
        selectedBook: [],
      },
    };

    selectedList.forEach(item => {
      if (item.type === "topic") {
        obj.generateRandomQuestionDTO.selectedTopics.push({
          topicId: item.id,
          numberOfEasyQuestions: item.numberOfEasyQuestions,
          numberOfMediumQuestions: item.numberOfMediumQuestions,
          numberOfHardQuestions: item.numberOfHardQuestions,
        });
      } else {
        obj.generateRandomQuestionDTO.selectedBook.push({
          bookId: item.id,
          numberOfEasyQuestions: item.numberOfEasyQuestions,
          numberOfMediumQuestions: item.numberOfMediumQuestions,
          numberOfHardQuestions: item.numberOfHardQuestions,
        });
      }
    });
    let isStudent = localStorage.getItem("userType") === "Student";
    let token = localStorage.getItem("userToken");

    if (isStudent) {
      localStorage.setItem("autoCreateObj", JSON.stringify(obj));
      localStorage.setItem("selectedList", JSON.stringify(selectedList));
      this.props.history.push({
        pathname: "/dashboard/test/register-test",
      });
    } else {
      questionRandom(token, obj.generateRandomQuestionDTO).then(res => {
        localStorage.setItem("autoCreateObj", JSON.stringify(res.data));
        localStorage.setItem("selectedList", JSON.stringify(selectedList));
        this.props.history.push({
          pathname: "/dashboard/test/auto/show",
        });
      });
    }
  };

  // ------------- NEW -------------

  getQuestionsCount = selectedList => {
    let token = localStorage.getItem("userToken");
    let autoCreate = JSON.parse(localStorage.getItem("autoCreate"));
    // let selectedList = JSON.parse(localStorage.getItem("selectedList"));
    let selectedListTotal = this.calculate(selectedList);

    let books = selectedList
      .filter(el => el.type === "book")
      .map(e => `booksId=${e.id}`)
      .join("&");
    let topics = selectedList
      .filter(el => el.type === "topic")
      .map(e => `topicsId=${e.id}`)
      .join("&");

    let query = [books, topics].join("&");

    this.setState({ loading: true });

    getRandomQuestionCount(query, token).then(res => {
      let countsSeparated = selectedList.map(item => {
        let countConf = res.data[`${item.type}Counts`].filter(
          el => el.id === item.id,
        )[0];
        return {
          ...item,
          ...countConf,
        };
      });
      let newList = this.state.selectedList;
      let index = 0;
      res.data.bookCounts.forEach(book => {
        index = newList.findIndex(b => b.id === book.id);
        if (index > -1) {
          newList[index].totalEasy = book.totalEasy;
          newList[index].totalModerate = book.totalModerate;
          newList[index].totalHard = book.totalHard;
        }
      });
      res.data.topicCounts.forEach(topic => {
        index = newList.findIndex(b => b.id === topic.id);
        if (index > -1) {
          newList[index].totalEasy = topic.totalEasy;
          newList[index].totalModerate = topic.totalModerate;
          newList[index].totalHard = topic.totalHard;
        }
      });

      this.setState({
        totalEasy: res.data.totalEasy,
        totalHard: res.data.totalHard,
        totalModerate: res.data.totalModerate,
        autoCreate,
        countsSeparated,
        selectedListTotal,

        selectedList: newList,
        loading: false,
        progress: false,
      });
    });
  };

  toggleTopic = topic => {
    let index = this.state.selectedTopics.findIndex(st => st.id === topic.id);

    if (index > -1) {
      this.setState(
        {
          selectedTopics: this.state.selectedTopics.filter(
            st => st.id !== topic.id,
          ),
        },
        () => this.getQuestionsCount(this.state.selectedTopics),
      );
    } else {
      this.setState(
        {
          selectedTopics: this.state.selectedTopics.concat(topic),
        },
        () => this.getQuestionsCount(this.state.selectedTopics),
      );
    }
  };

  goToAddTopic = () => {
    const Create = JSON.parse(localStorage.getItem("Create"));
    const questionsQuery = JSON.parse(localStorage.getItem("questionsQuery"));
    const gradeTitle = localStorage.getItem("gradeTitle");
    const selectedList = JSON.parse(localStorage.getItem("selectedList"));
    const state = {
      Create,
      questionsQuery,
      gradeTitle,
      selectedList,
      editTopics: true,
      isManual: false,
      isAutomatic: true,
    };

    this.props.history.push("/dashboard/test/create", state);
  };

  render() {
    // const classes = this.props.classes;
    return (
      <>
        <Backdrop
          style={{ zIndex: 1000000, color: "#228b22" }}
          open={this.state.progress || this.state.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <PageTitle title="ساخت آزمون - انتخاب خودکار" />
        {!this.state.progress && (
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
            <Grid
              direction="row"
              alignItems="flex-start"
              spacing={2}
              justify="space-between"
              container
              style={{
                padding: 10,
                backgroundColor: "rgb(255 255 255 / 40%)",
                borderRadius: 20,
                marginBottom: 30,
              }}
            >
              <Grid direction="column" container item xs={3}>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    height: 45,
                    borderRadius: 20,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 10,
                      flex: 6,
                      borderRadius: 20,
                      background: "#3EC592",
                      height: 45,
                    }}
                  >
                    <div
                      style={{ flex: 1, textAlign: "center", color: "#fff" }}
                    >
                      تعداد سوالات آسان
                    </div>
                  </div>
                  <div style={{ flex: 4, color: "#888", textAlign: "center" }}>
                    {toFA(this.state.totalEasy)} سوال
                  </div>
                </div>
              </Grid>
              <Grid direction="column" container item xs={3}>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    height: 45,
                    borderRadius: 20,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 10,
                      flex: 6,
                      borderRadius: 20,
                      background: "#FB963A",
                      height: 45,
                    }}
                  >
                    <div
                      style={{ flex: 1, textAlign: "center", color: "#fff" }}
                    >
                      تعداد سوالات متوسط
                    </div>
                  </div>
                  <div style={{ flex: 4, color: "#888", textAlign: "center" }}>
                    {toFA(this.state.totalModerate)} سوال
                  </div>
                </div>
              </Grid>
              <Grid direction="column" container item xs={3}>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    background: "#fff",
                    height: 45,
                    borderRadius: 20,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 10,
                      flex: 6,
                      borderRadius: 20,
                      background: "#FF0000",
                      height: 45,
                    }}
                  >
                    <div
                      style={{ flex: 1, textAlign: "center", color: "#fff" }}
                    >
                      تعداد سوالات سخت
                    </div>
                  </div>
                  <div style={{ flex: 4, color: "#888", textAlign: "center" }}>
                    {toFA(this.state.totalHard)} سوال
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid
              direction="row"
              alignItems="flex-start"
              spacing={2}
              justify="flex-start"
              container
              style={{
                padding: 10,
                backgroundColor: "rgb(255 255 255 / 40%)",
                borderRadius: 20,
              }}
            >
              <Grid direction="column" container item xs={3}>
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
                        color: "#8AB668",
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
                        {toFA(this.state.selectedListTotal.length)}
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
                            this.state.selectedListTotal.length * QUESTION_PRICE
                          ).toLocaleString(),
                        )}
                      </div>
                      <div>تومان</div>
                    </div>
                  </div>
                  <div
                    onClick={() => this.removeAllItems()}
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      background: "#fff",
                      border: "1px solid #8AB668",
                      margin: "20px 0 10px",
                      color: "#8AB668",
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
                <FilterBox title="درک مطلب">
                  <Typography>
                    استفاده از سوالات ریدینگ، کلوز و درک مطلب
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color={
                      this.state.includeReadingAndEtc ? "secondary" : "primary"
                    }
                    onClick={() =>
                      this.setState({
                        includeReadingAndEtc: !this.state.includeReadingAndEtc,
                      })
                    }
                  >
                    استفاده شود
                  </Button>
                </FilterBox>
                <FilterBox title="انتخاب بازۀ زمانی">
                  {/* <Button
                    fullWidth
                    variant="contained"
                    color={this.state.repetitive ? "secondary" : "primary"}
                    onClick={() =>
                      this.setState({
                        repetitive: !this.state.repetitive,
                      })
                    }
                  >
                    حذف سوالات ازمون های قبل
                  </Button> */}
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
                          ...styles.randomFilter,
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
                          onChange={e => this.setState({ startTime: e })}
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
                          ...styles.randomFilter,
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
                          onChange={e => this.setState({ endTime: e })}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      this.setState({ repetitive: false, repeatState: 0 })
                    }
                    style={
                      this.state.repeatState === 0
                        ? {
                            ...styles.sortFilterActive,
                            padding: 10,
                            marginBottom: 10,
                            width: "100%",
                          }
                        : {
                            ...styles.sortFilter,
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
                      this.setState({
                        repeatState: 1,
                        repetitive: false,
                        startTime: undefined,
                        endTime: undefined,
                      })
                    }
                    style={
                      this.state.repeatState === 1
                        ? {
                            ...styles.sortFilterActive,
                            padding: 10,
                            width: "100%",
                          }
                        : { ...styles.sortFilter, padding: 10, width: "100%" }
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
                      this.setState({ repetitive: true, repeatState: 2 })
                    }
                    style={
                      this.state.repeatState === 2
                        ? {
                            ...styles.sortFilterActive,
                            padding: 10,
                            marginTop: 10,
                            width: "100%",
                          }
                        : {
                            ...styles.sortFilter,
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
              </Grid>
              <Grid direction="column" container item xs={9}>
                <Grid
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{ padding: "7.5px", margin: 0, width: "100%" }}
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
                      {this.state.selectedList.map(t => (
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
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ ...styles.thItem, flex: 1 }}>شماره</div>
                      <div style={{ ...styles.thItem, flex: 4 }}>عنوان</div>
                      <div style={{ ...styles.thItem, flex: 4 }}>
                        ترکیب سختی سوالات
                      </div>
                      <div style={{ ...styles.thItem, flex: 2 }}>مجموع</div>
                      <div style={{ ...styles.thItem, flex: 1 }}></div>
                    </div>
                    {this.renderExams()}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export default FinalizingTest;
