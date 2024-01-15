import React from "react";
import {
  Grid,
  Button,
  MenuItem,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { SubdirectoryArrowLeft, DeleteSweep } from "@material-ui/icons";
import { toast } from "react-toastify";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "../../themes/createTest.css";

import PageTitle from "../../components/PageTitle/PageTitle";

import ArrowIcon from "../../images/icons/circle-arrow-icon.svg";

import {
  bookConditionUser,
  gradeConditionUser,
  fieldConditionUser,
} from "../../api/services/tags";

import SearchBox from "../../features/CreateTest/SearchBox";
import ExamFields from "../../features/CreateTest/ExamFields";
import SelectedList from "../../features/CreateTest/SelectedList";

import { ExamFieldsRadio } from "../../features/CreateTest/ExamFieldsRadio"

class CreateTest extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      title: "",
      fieldId: "d",
      gradeId: "d",
      selectedList: [],
      level: "Hard",
      userLessons: [],

      search: "",
      searchFetched: false,

      selectedFields: [],
      selectedGrades: [],
    };
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.editTopics) {
      const data = this.props.location.state;
      this.setState(
        {
          title: data.Create ? data.Create.title : "",
          fieldId: data.questionsQuery.fieldIds[0],
          gradeId: data.Create ? data.Create.gradeId : "",
          selectedList: data.selectedList,
        },
        async () => {
          let token = localStorage.getItem("userToken");
          const gradesCon = await gradeConditionUser(token);
          if (gradesCon.isSuccess) {
            this.setState({ grades: gradesCon.data });
          }
          const fieldsCon = await fieldConditionUser(token);
          if (fieldsCon.isSuccess) {
            this.setState({ fields: fieldsCon.data });
          }
          this.getBooks(data.questionsQuery.fieldIds[0], data.Create.gradeId);
        },
      );
    } else {
      let token = localStorage.getItem("userToken");
      gradeConditionUser(token).then(res => {
        if (res.isSuccess) {
          this.setState({ grades: res.data });
        }
      });
      fieldConditionUser(token).then(res => {
        if (res.isSuccess) {
          this.setState({ fields: res.data });
        }
      });
    }
    let isStudent = localStorage.getItem("userType") === "Student";
    this.setState({ isStudent });
  }

  queryCreator = (gradesLabel, fieldsLabel) => {
    let query = "";

    if (gradesLabel.length !== 0) {
      gradesLabel.forEach(el => query += 'gradesId=' + el + '&')
      this.setState({ gradeId: gradesLabel[0] })
    }
    if (fieldsLabel.length !== 0) {
      fieldsLabel.forEach(el => query += 'fieldsId=' + el + '&')
      this.setState({ fieldId: fieldsLabel[0] })
    }

    return query
  }

  getBooksMultipleFilter = (fieldIds, gradeIds, search) => {
    let token = localStorage.getItem("userToken");
    let query = this.queryCreator(fieldIds, gradeIds)

    if (search) {
      query += `search=${search}`;
    }

    if (query) {
      bookConditionUser(token, query).then(res => {
        let userLessons = [];
        res.data.forEach(el => {
          if (!userLessons.map(_i => _i.id).includes(el.id)) {
            userLessons.push(el);
          }
        });
        this.setState({ userLessons, progress: false });
      });
    } else {
      this.setState({ progress: false });
      toast.error("لطفا پایه و رشته را وارد کنید");
    }
  }

  getBooks = (fieldId, gradeId, search) => {
    // this.setState({ progress: true });
    let token = localStorage.getItem("userToken");
    let query = "";
    if (fieldId && fieldId !== "d") {
      
      query += `fieldsId=${fieldId}&`;
    }
    if (gradeId && gradeId !== "d") {
      query += `gradesId=${gradeId}&`;
    }
    if (search) {
      query += `search=${search}`;
    }

    if (query) {
      bookConditionUser(token, query).then(res => {
        let userLessons = [];
        res.data.forEach(el => {
          if (!userLessons.map(_i => _i.id).includes(el.id)) {
            userLessons.push(el);
          }
        });
        this.setState({ userLessons, progress: false });
      });
    } else {
      this.setState({ progress: false });
      toast.error("لطفا پایه و رشته را وارد کنید");
    }
  };

  setSearchTitle = (examTitle) => {
    this.setState({ title: examTitle })
  }

  setSelectedGrades = (arr) => {
    this.setState({ selectedGrades: arr })
  }

  setSelectedFields = (arr) => {
    this.setState({ selectedFields: arr })
  }

  // FLAG
  changeInput = (gradesLabel, fieldsLabel, examTitle) => {
    if (examTitle) {
      this.setState({ title: examTitle })
    }

    let token = localStorage.getItem("userToken");
    let query = this.queryCreator(gradesLabel, fieldsLabel)

    bookConditionUser(token, query).then(res => {
      let userLessons = [];
      res.data.forEach(el => {
        if (!userLessons.map(_i => _i.id).includes(el.id)) {
          userLessons.push(el);
        }
      });
      this.setState({ userLessons, progress: false });
    });

    this.setState({ searchFetched: false });
  };

  // changeInput = (field, e) => {
  //   let value = e.target.value;
  //   console.log("=============change input=============")
  //   console.log(value)
  //   this.setState(
  //     {
  //       [field]: value,
  //     },
  //     () => {
  //       if (field === "fieldId" || field === "gradeId") {
  //         if (this.state.gradeId !== "d" && this.state.fieldId !== "d") {
  //           let gradeId = this.state.gradeId;
  //           let fieldId = this.state.fieldId;
  //           this.getBooks(fieldId, gradeId);
  //           this.setState({ searchFetched: false });
  //         }
  //       }
  //     },
  //   );
  // };

  create = justSaved => {
    const { gradeId, title, fieldId, selectedList, grades } = this.state;
    let ownerId = localStorage.getItem("userId");
    // let token = localStorage.getItem("userToken");
    let obj_ = {
      title,
      description: title,
      ownerId: ownerId,
      headId: ownerId,
      gradeId: `${gradeId}`,
    };
    localStorage.setItem("Create", JSON.stringify(obj_));
    let obj = {
      gradeIds: [gradeId],
      fieldIds: [fieldId],
      booksId: selectedList
        .filter(el => el.type === "book")
        .map(item => item.id),
      questionTypeId: [],
      difficultyIds: [1],
      topicIds: selectedList
        .filter(el => el.type === "topic")
        .map(item => item.id),
      sourceIds: [],
      repetitive: true,
      startTime: "",
      endTime: "",
      ownerId: ownerId,
      justSaved: Boolean(justSaved),
    };
    localStorage.setItem("questionsQuery", JSON.stringify(obj));
    localStorage.setItem(
      "gradeTitle",
      grades.filter(el => el.id === parseInt(gradeId, 10))[0].title,
    );
    localStorage.setItem("selectedList", JSON.stringify(selectedList));
    this.props.history.push({
      pathname: `/dashboard/test/show/`,
    });
  };

  autoCreate = () => {
    const { gradeId, title, selectedList, grades, fieldId } = this.state;
    let ownerId = localStorage.getItem("userId");
    // let token = localStorage.getItem("userToken");
    let obj = {
      title,
      description: title,
      startTime: "",
      endTime: "",
      examType: "Normal",
      target: "Normal",
      level: "Normal",
      ownerId: ownerId,
      headId: ownerId,
      gradeId: `${gradeId}`,
      fieldId: `${fieldId}`,
      generateRandomQuestionDTO: {
        selectedTopics: [],
        selectedLessons: [],
      },
    };
    localStorage.setItem("autoCreate", JSON.stringify(obj));
    localStorage.setItem("Create", JSON.stringify(obj));
    let obj_ = {
      gradeIds: [gradeId],
      fieldIds: [fieldId],
      booksId: selectedList
        .filter(el => el.type === "book")
        .map(item => item.id),
      questionTypeId: [],
      difficultyIds: [1],
      topicIds: selectedList
        .filter(el => el.type === "topic")
        .map(item => item.id),
      sourceIds: [],
      repetitive: true,
      startTime: "",
      endTime: "",
      ownerId: ownerId,
      // justSaved: Boolean(justSaved),
    };
    localStorage.setItem("questionsQuery", JSON.stringify(obj_));
    localStorage.setItem(
      "gradeTitle",
      grades.filter(el => el.id === parseInt(gradeId))[0].title,
    );
    localStorage.setItem("selectedList", JSON.stringify(selectedList));
    this.props.history.push({
      pathname: `/dashboard/test/finalizing/`,
    });
    // selectedList.map(item => {
    //     if (item.type === 'topic') {
    //         obj.generateRandomQuestionDTO.selectedTopics.push({
    //             topicId: item.id,
    //             numberOfEasyQuestions: 0,
    //             numberOfMediumQuestions: 0,
    //             numberOfHardQuestions: 0
    //         })
    //     } else {
    //         obj.generateRandomQuestionDTO.selectedLessons.push({
    //             lessonId: item.id,
    //             numberOfEasyQuestions: 0,
    //             numberOfMediumQuestions: 0,
    //             numberOfHardQuestions: 0
    //         })
    //     }
    // })
    // console.error(obj)
    // autoCreateTest(obj, token).then(res => {
    //     console.error(res)
    //     if (res.isSuccess) {
    //         toast.success(res.message)
    //     }
    // })
  };

  generateTopicTitle = ({ parentTopic }) => {
    // if (parentTopic && parentTopic.parentTopicTitle && parentTopic.title) {
    if (this.state.searchFetched) {
      return `(${parentTopic.parentTopicTitle} ${parentTopic.title})`;
    }
    return ``;
  };

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    });
  };

  renderTopic = list => {
    // const classes = this.props.classes;
    return list.map(item_ => {
      let isSelected = !Boolean(
        this.state.selectedList.filter(
          it => it.id === item_.id && it.title === item_.title,
        ).length === 0,
      );
      return (
        <div style={{ width: "calc(100% - 50px)", marginRight: 45 }}>
          <Grid
            item
            sm={12}
            spacing={1}
            justify="space-between"
            alignItems="center"
            className="inputContainer"
            style={{ padding: "10px 5px", marginTop: -5 }}
          >
            {!item_.subTopics || item_.subTopics.length === 0 ? (
              <Grid item style={{ marginRight: 20, color: "#fe5f55" }}>
                <SubdirectoryArrowLeft style={{ fill: "#fe5f55" }} />
                {/* زیر مباحث */}
              </Grid>
            ) : (
              <Grid
                item
                style={{
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    color: "#fff",
                    alignItems: "center",
                    padding: "0 10px 0 20px",
                    borderRadius: 50,
                    background: "#fe5f55",
                    height: 45,
                    opacity: this.state[`isShow__${item_.id}`] ? 0.5 : 1,
                  }}
                  onClick={() => {
                    this.setState({
                      [`isShow__${item_.id}`]: !this.state[
                        `isShow__${item_.id}`
                      ],
                    });
                  }}
                >
                  <img
                    src={ArrowIcon}
                    alt="password"
                    style={{
                      height: 25,
                      marginRight: 10,
                      cursor: "pointer",
                      transform: this.state[`isShow__${item_.id}`]
                        ? "rotate(-90deg)"
                        : "rotate(0deg)",
                      opacity: this.state[`isShow__${item_.id}`] ? 0.5 : 1,
                    }}
                    onClick={() => {
                      this.setState({
                        [`isShow__${item_.id}`]: !this.state[
                          `isShow__${item_.id}`
                        ],
                      });
                    }}
                  />
                  {this.state[`isShow__${item_.id}`] ? 'پنهان کردن' : 'نمایش جزئیات'}
                </div>
              </Grid>
            )}
            <Grid item style={{ padding: 0, flex: 1 }}>
              <p
                style={{
                  color: "#3d82a4",
                  fontWeight: "bold",
                  fontSize: 18,
                  padding: "0 17px",
                  textAlign: "center",
                }}
              >
                {item_.title} {this.generateTopicTitle(item_)}
              </p>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color={isSelected ? "secondary" : "primary"}
                onClick={() =>
                  this.toggleSelectTopic("topic", item_, isSelected)
                }
                style={{ fontSize: 11, height: 30 }}
              >
                {isSelected ? "- حذف" : "+ افزودن"}
              </Button>
            </Grid>
          </Grid>
          {this.state[`isShow__${item_.id}`] &&
            this.renderTopic(item_.subTopics)}
        </div>
      );
    });
  };

  renderUserLessons = items => {
    // const classes = this.props.classes;
    return items.map(item => {
      let isSelected = !Boolean(
        this.state.selectedList.filter(
          it => it.id === item.id && it.title === item.title,
        ).length === 0,
      );
      return (
        <>
          <Grid
            item
            sm={12}
            spacing={1}
            justify="space-between"
            alignItems="center"
            className="inputContainer"
            style={{
              padding: "10px 5px",
              width: "calc(100% - 10px)",
              marginTop: 5,
              marginRight: 5,
            }}
          >
            <Grid
              item
              style={{
                cursor: "pointer",
              }}
            > 
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  color: "#fff",
                  alignItems: "center",
                  padding: "0 10px 0 20px",
                  borderRadius: 50,
                  background: "#fe5f55",
                  height: 45,
                  opacity: this.state[`isShow__${item.id}`] ? 0.5 : 1,
                }}
                onClick={() => {
                  this.setState({
                    [`isShow__${item.id}`]: !this.state[`isShow__${item.id}`],
                  });
                }}
              >
                <img
                  src={ArrowIcon}
                  alt="password"
                  style={{
                    height: 25,
                    cursor: "pointer",
                    marginLeft: '10px',
                    transform: this.state[`isShow__${item.id}`]
                      ? "rotate(-90deg)"
                      : "rotate(0deg)",
                    opacity: this.state[`isShow__${item.id}`] ? 0.5 : 1,
                  }}
                  onClick={() => {
                    this.setState({
                      [`isShow__${item.id}`]: !this.state[`isShow__${item.id}`],
                    });
                  }}
                />
                {this.state[`isShow__${item.id}`] ? 'پنهان کردن' : 'نمایش فصول'}
              </div>
              
            </Grid>
            <Grid item style={{ padding: 0, flex: 1 }}>
              <div
                style={{
                  color: "#3d82a4",
                  fontWeight: "bold",
                  fontSize: 18,
                  padding: "0 17px",
                  textAlign: "center",
                }}
              >
                {item.title}
              </div>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color={isSelected ? "secondary" : "primary"}
                onClick={() => this.toggleSelectTopic("book", item, isSelected)}
                style={{ fontSize: 11, height: 30 }}
                disabled={this.state.searchFetched}
              >
                {isSelected ? "- حذف" : "+ افزودن"}
              </Button>
            </Grid>
          </Grid>
          {this.state[`isShow__${item.id}`] && this.renderTopic(item.topics)}
        </>
      );
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

  toggleSelectTopic = (type, item_, isSelected) => {
    const { parentTopic } = item_;
    const description = parentTopic
      ? parentTopic.parentTopicTitle
        ? `${parentTopic.parentTopicTitle} ${parentTopic.title}`
        : ""
      : "";

    let element_ = {
      id: item_.id,
      title: item_.title,
      numberOfEasyQuestions: 0,
      numberOfMediumQuestions: 0,
      numberOfHardQuestions: 0,
      type,
      description,
    };
    if (!isSelected) {
      this.setState({
        selectedList: [...this.state.selectedList, element_],
      });
    } else {
      let selectedList = this.state.selectedList.filter(
        it => it.id !== item_.id && it.title !== item_.title,
      );
      this.setState({ selectedList });
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        <PageTitle title="ساخت آزمون - انتخاب مباحث" />
        <Backdrop
          style={{ zIndex: 1000000, color: "#3d82a4" }}
          open={this.state.progress}
          onClick={() => console.log("clicked")}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid
            direction="row"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
            style={{
              padding: 20,
              backgroundColor: "rgb(255 255 255 / 40%)",
              borderRadius: 20,
            }}
          >
            <Grid direction="column" container item md={6} xs={12}>
              <Grid direction="row" container spacing={1}>
                {/* FLAG */}
                {/* <ExamFields 
                  changeInput={this.changeInput}
                  fieldId={this.state.fieldId}
                  fields={this.state.fields}
                  gradeId={this.state.gradeId}
                  grades={this.state.grades}
                  title={this.state.title}
                /> */}
                <ExamFieldsRadio 
                  changeInput={this.changeInput}
                  fieldId={this.state.fieldId}
                  fields={this.state.fields}
                  gradeId={this.state.gradeId}
                  grades={this.state.grades}
                  title={this.state.title}
                  setSelectedGrades={this.setSelectedGrades}
                  setSelectedFields={this.setSelectedFields}
                  setSearchTitle={this.setSearchTitle}
                />
              </Grid>
              <Grid direction="column" container item xs={12}>
                {this.state.userLessons.length === 0 ? (
                  <div
                    style={{
                      marginTop: "30%",
                      fontSize: "1.5rem",
                      opacity: 0.5,
                    }}
                  >
                    {Boolean(
                      this.state.fieldId !== "d" && this.state.gradeId !== "d",
                    )
                      ? "کتابی موجود نیست"
                      // : "لطفا یک پایه و رشته تحصیلی انتخاب کنید"}
                      : <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                          <p>لطفا نام آزمون، پایه(ها) و رشته(های) مورد نظر خود را انتخاب کنید</p>
                          <p>سپس دکمه اعمال را فشار دهید</p>
                        </div>
                    }
                  </div>
                ) : (
                  this.renderUserLessons(this.state.userLessons)
                )}
              </Grid>
            </Grid>
            <Grid
              className="part-2"
              direction="column"
              container
              item
              md={6}
              xs={12}
            >
              <Grid
                item
                sm={12}
                spacing={1}
                alignItems="center"
                className="inputContainer"
                style={{
                  padding: "5px 15px",
                  marginRight: 10,
                  marginTop: 5,
                  width: "100%",
                }}
              >
                {/* flag */}
                <SearchBox
                  searchFetched={this.state.searchFetched}
                  onSubmit={search => {
                    if (search) {
                      this.setState({ searchFetched: true });
                      this.getBooksMultipleFilter(
                        this.state.selectedFields,
                        this.state.selectedGrades,
                        search,
                      );
                    } else {
                      this.setState({ searchFetched: false });
                      this.getBooksMultipleFilter(this.state.selectedFields, this.state.selectedGrades);
                    }
                  }}
                />
              </Grid>
              <SelectedList
                onChange={list => this.setState({ selectedList: list })}
                selectedList={this.state.selectedList}
              />
              <Grid direction="row" justify="center" container spacing={1}>
                  <Grid item md={4} xs={6}>
                    <Button
                      disabled={Boolean(
                        this.props.location &&
                          this.props.location.state &&
                          this.props.location.state.isAutomatic
                          ? this.props.location.state.isAutomatic
                          : false,
                      )}
                      onClick={() => {
                        if (this.state.selectedList.length === 0) {
                          toast.error(
                            "لطفا حداقل یک درس برای ساخت آزمون انتخاب کنید",
                          );
                        } else if (
                          !this.state.title ||
                          this.state.gradeId === "d" ||
                          this.state.fieldId === "d"
                        ) {
                          toast.error("لطفا همه موارد را وارد کنید");
                        } else {
                          this.create(false);
                        }
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
                      انتخاب دستی
                    </Button>
                  </Grid>
                {/* {!this.state.isStudent && (
                  <Grid item md={4} xs={6}>
                    <Button
                      disabled={Boolean(
                        this.props.location &&
                          this.props.location.state &&
                          this.props.location.state.isAutomatic
                          ? this.props.location.state.isAutomatic
                          : false,
                      )}
                      onClick={() => {
                        if (this.state.selectedList.length === 0) {
                          toast.error(
                            "لطفا حداقل یک درس برای ساخت آزمون انتخاب کنید",
                          );
                        } else if (
                          !this.state.title ||
                          this.state.gradeId === "d" ||
                          this.state.fieldId === "d"
                        ) {
                          toast.error("لطفا همه موارد را وارد کنید");
                        } else {
                          this.create(false);
                        }
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
                      انتخاب دستی
                    </Button>
                  </Grid>
                )} */}
                <Grid item md={4} xs={6}>
                  <Button
                    disabled={Boolean(
                      this.props.location &&
                        this.props.location.state &&
                        this.props.location.state.isManual
                        ? this.props.location.state.isManual
                        : false,
                    )}
                    onClick={() => {
                      if (this.state.selectedList.length === 0) {
                        toast.error(
                          "لطفا حداقل یک درس برای ساخت آزمون انتخاب کنید",
                        );
                      } else if (
                        !this.state.title ||
                        this.state.gradeId === "d" ||
                        this.state.fieldId === "d"
                      ) {
                        toast.error("لطفا همه موارد را وارد کنید");
                      } else {
                        this.autoCreate();
                      }
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
                    انتخاب خودکار
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default CreateTest;
