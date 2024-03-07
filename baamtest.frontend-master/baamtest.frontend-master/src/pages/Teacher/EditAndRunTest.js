import React from "react";
import {
  Container,
  Grid,
  Backdrop,
  CircularProgress,
  Button,
  Select,
  Input,
  MenuItem,
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
import { EXAM_TYPES, EXAM_TARGETS } from "../../utils/Utils";
import mask from "../../images/mask.svg";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import ArrowIcon from "../../images/icons/circle-arrow-icon.svg";
import Image2 from "../../images/test/Untitled-1.jpg";
import Image3 from "../../images/pishkhan/Untitled-3.svg";
import Image4 from "../../images/pishkhan/Untitled-4.svg";
import Image5 from "../../images/pishkhan/Untitled-5.svg";
import {
  topicsConditional,
  grades,
  fields,
  lessons,
} from "../../api/services/tags";
import { toast } from "react-toastify";
import {
  addToGroup,
  allGroupInExam,
  editTest,
  getTest,
} from "../../api/services/exam";
import { getAllGroups } from "../../api/services/group";

const style = {
  sortFilter1: {
    width: "max-content",
    height: 40,
    marginLeft: 20,
    borderRadius: 50,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  sortFilter: {
    backgroundColor: "transparent",
    border: "1px solid #3d82a4",
    color: "#3d82a4",
    width: "max-content",
    height: 40,
    flex: 1,
    marginLeft: 20,
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
    width: "max-content",
    flex: 1,
    marginLeft: 20,
    height: 40,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

class AddToGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      res: {},
      teachersList: [],
      grades: [],
      fields: [],
      title: "",
      fieldId: "d",
      gradeId: "d",
      type: "",
      target: "",
      level: "Hard",
      userLessons: [],
      selectedList: [],
      progress: true,
    };
  }

  getTopics = (allData, currentId) => {
    let mainList = [];
    allData.map(item => {
      if (!item.parentId || item.parentId === []) {
        mainList.push(item);
      }
    });
  };
  componentDidMount() {
    let isStudent = localStorage.getItem("userType") === "Student";
    console.error("isStudent", isStudent);
    this.setState({ isStudent });
    let token = localStorage.getItem("userToken");

    getAllGroups(token).then(res => {
      this.setState({ userLessons: res.data });
    });
    this.setState({
      progress: true,
    });
    let examId = parseInt(this.props.match.params.id);
    getTest(examId, token).then(res_ => {
      let res = res_.data;
      console.log(res);
      this.setState({
        res: res,
        target: res.target,
        type: res.examType,
        level: res.level,
        progress: false,
      });
    });
    allGroupInExam(examId, token).then(res => {
      this.setState({ selectedList: res.data });
    });
  }
  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };
  autoCreate = () => {
    console.warn(this.state.selectedList);
    let { gradeId, title, res, ordering, selectedList } = this.state;
    let ownerId = localStorage.getItem("userId");
    let token = localStorage.getItem("userToken");
    let examId = parseInt(this.props.match.params.id);
    let obj = {
      id: examId,
      title: res.title,
      description: res.description,
      startTime: res.startTime,
      endTime: res.endTime,
      examType: this.state.type,
      target: this.state.target,
      level: this.state.level,
      ownerId: ownerId,
      headId: ownerId,
      gradeId: `${res.gradeId}`,
      questionsIdsAndNumbers: res.questionsIdsAndNumbers,
    };
    let obj_ = {
      examId,
      groupsIds: selectedList.map(el => el.id),
    };

    editTest(obj, token).then(res => {
      if (res.isSuccess) {
        console.log(res);
        addToGroup(obj_, token).then(res => {
          console.error(res);
          if (res.isSuccess) {
            toast.success(res.message);
            this.props.history.push({
              pathname: `/dashboard/test/management/`,
            });
          }
        });
      }
    });
  };

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    });
  };

  renderTopic = list => {
    const classes = this.props.classes;
    return list.map(item_ => {
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
            <Grid item style={{ marginRight: 20 }}>
              <SubdirectoryArrowLeft style={{ fill: "#fe5f55" }} />
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
                {item_.fullName}
              </div>
            </Grid>
          </Grid>
        </div>
      );
    });
  };

  renderUserLessons = items => {
    const classes = this.props.classes;
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
            <Grid item>
              <img
                src={ArrowIcon}
                alt="password"
                style={{
                  height: 25,
                  marginRight: 10,
                  cursor: "pointer",
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
            </Grid>
            <Grid item style={{ padding: 0, flex: 1 }}>
              <div
                style={{
                  color: "#000",
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
              <div
                onClick={() => {
                  let element = {
                    id: item.id,
                    title: item.title,
                    numberOfEasyQuestions: 0,
                    numberOfMediumQuestions: 0,
                    numberOfHardQuestions: 0,
                    type: "lesson",
                  };
                  if (!isSelected) {
                    this.setState({
                      selectedList: [...this.state.selectedList, element],
                    });
                  } else {
                    console.error(this.state.selectedList);
                    let selectedList = this.state.selectedList.filter(
                      it => it.id !== item.id && it.title !== item.title,
                    );
                    this.setState({ selectedList: selectedList });
                  }
                }}
                style={{
                  backgroundColor: isSelected ? "#FF0000" : "#8AB668",
                  borderRadius: 30,
                  cursor: "pointer",
                  padding: "5px 15px",
                  textAlign: "center",
                  marginLeft: 5,
                }}
              >
                <div
                  style={{ color: "#fff", fontSize: 13, textAlign: "center" }}
                >
                  {isSelected ? "- حذف" : "+ افزودن"}
                </div>
              </div>
            </Grid>
          </Grid>
          {this.state[`isShow__${item.id}`] && this.renderTopic(item.users)}
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
          marginLeft: 5,
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
              this.setState({ selectedList: selectedList });
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

  typeOnClick = type => {
    this.setState({ type });
  };

  targetOnClick = target => {
    this.setState({ target });
  };

  renderLevels(title, value, color) {
    const { level } = this.state;
    let isActive = level === value;
    return (
      <div
        style={{
          ...style.sortFilter1,
          border: `1px solid ${color}`,
          backgroundColor: isActive ? `${color}` : "#fff",
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
        <PageTitle title="مدیریت آزمون - اجرای آزمون" />
        <Divider />
        {!this.state.progress && (
          <Grid container item xs={12} style={{ padding: "0 10px" }}>
            <Grid
              direction="row"
              alignItems="flex-start"
              spacing={3}
              justify="flex-start"
              container
              style={{
                padding: 40,
                margin: 60,
                backgroundColor: "rgb(255 255 255 / 40%)",
                borderRadius: 20,
              }}
            >
              <Grid direction="column" container item xs={6}>
                <Grid direction="column" container item xs={12}>
                  {this.renderUserLessons(this.state.userLessons)}
                </Grid>
              </Grid>
              <Grid direction="column" container item xs={6}>
                <Grid
                  item
                  sm={12}
                  spacing={1}
                  alignItems="center"
                  className="inputContainer"
                  style={{
                    padding: "15px 15px",
                    overflow: "scroll",
                    backgroundSize: "cover",
                    marginRight: 10,
                    marginTop: 5,
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "column",
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      height: 400,
                    }}
                  >
                    {this.renderSelectedList(this.state.selectedList)}
                  </div>
                </Grid>
                <Grid direction="row" justify="center" container spacing={2}>
                  <Grid item xs={4}>
                    <Button
                      onClick={this.autoCreate}
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
                      ثبت نهایی
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid direction="column" alignItems="flex-start" spacing={1} justify="flex-start" container style={{padding: 20, marginTop: 40, backgroundColor: 'rgb(255 255 255 / 40%)', borderRadius: 20}}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <div style={{padding: '0 15px 20px', flex: 1, background: '#fff', borderRadius: 20}}>
                            <div style={{width: '100%', marginBottom: -20, marginTop: 20}}>
                                <PageTitle title="تعیین شیوه اجرای آزمون" size="h4" color="#000" />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',}}>
                                {EXAM_TYPES.map(item => {
                                    return (
                                        <div onClick={() => this.typeOnClick(item.value)} style={this.state.type === item.value ? style.sortFilterActive : style.sortFilter}>
                                            {item.title}
                                        </div>
                                    )
                                })}
                                <div style={{marginRight: -15}} />
                            </div>
                        </div>
                        <div style={{width: 20}} />
                        <div style={{padding: '0 15px 20px', background: '#fff', borderRadius: 20}}>
                            <div style={{width: '100%', marginBottom: -20, marginTop: 20}}>
                                <PageTitle title="تعیین مدت آزمون" size="h4" color="#000" />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',}}>
                                <div style={style.sortFilter}>
                                    <TextField
                                        placeholder="مدت آزمون (دقیقه)"
                                        style={{height: 40, background: 'transparent', textAlign: 'center'}}
                                        onChange={e => this.changeInput('time', e)}
                                    />
                                </div>
                                <div style={{marginRight: -15}} />
                            </div>
                        </div>
                    </div>
                    <div style={{height: 20}} />
                    <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <div style={{padding: '0 15px 20px', flex: 2, background: '#fff', borderRadius: 20}}>
                            <div style={{width: '100%', marginBottom: -20, marginTop: 20}}>
                                <PageTitle title="تعیین هدف" size="h4" color="#000" />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',}}>
                                {EXAM_TARGETS.map(item => {
                                    return (
                                        <div onClick={() => this.targetOnClick(item.value)} style={this.state.target === item.value ? style.sortFilterActive : style.sortFilter}>
                                            {item.title}
                                        </div>
                                    )
                                })}
                                <div style={{marginRight: -15}} />
                            </div>
                        </div>
                        <div style={{width: 20}} />
                        <div style={{padding: '0 15px 20px', flex: 1, background: '#fff', borderRadius: 20}}>
                            <div style={{width: '100%', marginBottom: -20, marginTop: 20}}>
                                <PageTitle title="سطح دشواری" size="h4" color="#000" />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',}}>
                                {this.renderLevels('سخت', 'Hard', '#C83E43')}
                                {this.renderLevels('متوسط', 'Normal', '#FB963A')}
                                {this.renderLevels('آسان', 'Easy', '#3EC592')}
                                <div style={{marginRight: -15}} />
                            </div>
                        </div>
                    </div>
                </Grid> */}
          </Grid>
        )}
      </>
    );
  }
}

export default AddToGroup;
