import React from "react";
import {
  IconButton,
  Tooltip,
  Grid,
  Button,
  Select,
  Input,
  CircularProgress,
  Backdrop,
  MenuItem,
} from "@material-ui/core";
import TextField from "../../components/Form/TextField";
import PageTitle from "../../components/PageTitle/PageTitle";
import { SubdirectoryArrowLeft, DeleteSweep } from "@material-ui/icons";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Image2 from "../../images/test/Untitled-1.jpg";
import { grades } from "../../api/services/tags";
import { toast } from "react-toastify";
import {
  getStudent,
  getAllStudent,
  getGroup,
  editGroup,
} from "../../api/services/group";
import { getDateTime, toFA } from "../../utils/Utils";

const ActionButton = ({ Icon, onClick, title }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        aria-controls="profile-menu"
        onClick={onClick}
      >
        <Icon style={{ fill: "#fe5f55", fontSize: "80%" }} />
      </IconButton>
    </Tooltip>
  );
};

const styles = {
  trItem: {
    backgroundColor: "#f4faff",
    color: "#000",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px",
  },
  thItem: {
    color: "#000",
    display: "flex",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2.5px",
    padding: "15px 10px 5px",
  },
};

class GroupAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      teachersList: [],
      grades: [],
      fields: [],
      username: "",
      title: "",
      fieldId: "d",
      gradeId: "d",
      level: "Hard",
      userLessons: [],
      selectedList: [],
      progress: true,
    };
  }

  getTopics = (allData, currentId) => {
    let mainList = [];
    allData.forEach(item => {
      if (!item.parentId || item.parentId === []) {
        mainList.push(item);
      }
    });
  };
  componentDidMount() {
    let token = localStorage.getItem("userToken");
    let groupId = parseInt(this.props.match.params.id);
    let query = "";
    grades().then(res_ => {
      if (res_.isSuccess) {
        this.setState({ grades: res_.data }, () => {
          getGroup(token, groupId).then(res => {
            console.error(res);
            if (res.isSuccess) {
              let list_ = res_.data.filter(
                e => e.title === res.data.gradeTitle,
              );
              this.setState(
                {
                  group: res.data,
                  progress: false,
                  gradeId: list_.length === 0 ? "d" : list_[0].id,
                  title: res.data.title,
                  description: res.data.description,
                  selectedList: res.data.users.map(el => {
                    return {
                      fullName: el.fullName,
                      id: el.id,
                    };
                  }),
                  userExams: res.data.exams,
                  groupUsers: res.data.users.map(el => el.id),
                },
                () => {
                  console.warn(this.state.selectedList);
                  console.warn(this.state.groupUsers);
                },
              );
            }
          });
        });
      }
    });
    // fields().then(res => {
    //     if (res.isSuccess) {
    //         this.setState({fields: res.data})
    //     }
    // })

    this.getStudents(token, query);
  }

  getStudents = (token, query) => {
    getAllStudent(token, query).then(res => {
      if (res.isSuccess) {
        this.setState({ userLessons: res.data });
      }
    });
  };
  changeInput = (field, e) => {
    let value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  searchStudent = () => {
    let token = localStorage.getItem("userToken");
    const { username } = this.state;
    let query = `username=${username}`;
    getStudent(token, query).then(res => {
      if (res.data) {
        this.setState({ userLessons: [res.data] });
      }
    });
  };

  addGroup = () => {
    let token = localStorage.getItem("userToken");
    let groupId = parseInt(this.props.match.params.id);
    const { title, description, selectedList, gradeId } = this.state;
    let obj = {
      id: groupId,
      title,
      gradeId: parseInt(gradeId),
      description,
      addingUsersIds: selectedList
        .filter(el => !this.state.groupUsers.includes(el.id))
        .map(item => item.id),
      removingUsersIds: this.state.groupUsers.filter(
        el => !selectedList.map(item => item.id).includes(el),
      ),
      removingExamsIds: this.state.group.exams
        .filter(e => !this.state.userExams.map(el => el.id).includes(e.id))
        .map(t => t.id),
    };

    // console.error({obj})

    editGroup(token, obj).then(res => {
      if (res.isSuccess) {
        toast.success(res.message);
        this.props.history.push({
          pathname: `/dashboard/group`,
        });
      }
    });
  };

  renderMenuItem = items => {
    return items.map(item => {
      return <MenuItem value={item.id}>{item.title}</MenuItem>;
    });
  };

  renderUserLessons = items => {
    // const classes = this.props.classes;
    return items.map(item => {
      let isSelected = !Boolean(
        this.state.selectedList.filter(it => it.id === item.id).length === 0,
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
            <Grid item style={{ marginRight: 20 }}>
              <SubdirectoryArrowLeft style={{ fill: "#FF0000" }} />
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
                {item.fullName}
              </div>
            </Grid>
            <Grid item>
              <div
                onClick={() => {
                  if (!isSelected) {
                    this.setState({
                      selectedList: [
                        ...this.state.selectedList,
                        {
                          fullName: item.fullName,
                          id: item.id,
                        },
                      ],
                    });
                  } else {
                    let selectedList = this.state.selectedList.filter(
                      it => it.id !== item.id,
                    );
                    this.setState({ selectedList });
                  }
                }}
                style={{
                  backgroundColor: isSelected ? "#FF0000" : "#228B22",
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
            {item.fullName}
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

  renderStudentExams = () => {
    return this.state.userExams.length === 0 ? (
      <div
        style={{
          width: "100%",
          height: 200,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          fontSize: "2rem",
          opacity: 0.3,
        }}
      >
        آزمونی برای این کلاس ثبت نشده است
      </div>
    ) : (
      this.state.userExams.map(item => {
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
            <div style={{ ...styles.trItem, width: 60 }}>{toFA(item.id)}</div>
            <div
              style={{
                ...styles.trItem,
                textAlign: "right !important",
                flex: 1,
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                ...styles.trItem,
                textAlign: "right !important",
                flex: 1,
              }}
            >
              {item.description}
            </div>
            <div style={{ ...styles.trItem, width: 60 }}>
              {toFA(item.numberOfQuestions)}
            </div>
            <div style={{ ...styles.trItem, width: 180 }}>{item.ownerName}</div>
            <div style={{ ...styles.trItem, width: 180 }}>
              {getDateTime(item.startTime)}
            </div>
            <div style={{ ...styles.trItem, width: 180 }}>
              {getDateTime(item.endTime)}
            </div>
            <div
              style={{
                backgroundColor: "#f4faff",
                justifyContent: "center",
                color: "#000",
                display: "flex",
                fontSize: 15,
                alignItems: "center",
                textAlign: "center",
                margin: "0 2.5px",
                padding: "0 20px",
                width: 60,
              }}
            >
              <ActionButton
                Icon={DeleteSweep}
                onClick={() => {
                  this.setState({
                    userExams: this.state.group.exams.filter(
                      e => e.id !== item.id,
                    ),
                  });
                }}
                title="حذف"
              />
            </div>
          </div>
        );
      })
    );
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
        <PageTitle title="ویرایش کلاس" />
        {!this.state.progress && (
          <>
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
                <Grid direction="column" container item xs={6}>
                  {/* <Grid direction="row" container spacing={3}>
                            <Grid item xs={7}>
                                <Grid item sm={12} spacing={1} alignItems="center" className='inputContainer' style={{padding: 0, paddingRight: 10, marginRight: 10, marginTop: 0, height: 45}}>
                                        <TextField
                                        placeholder="نام کاربری را وارد کنید"
                                        style={{height: 40, background: 'transparent'}}
                                        onChange={e => this.changeInput('username', e)}
                                        />
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid item sm={12} spacing={1} alignItems="center" style={{padding: 0, paddingRight: 10, marginRight: 10, marginTop: -20, height: 40}}>
                                    <Button
                                        disabled={Boolean(this.state.username.length < 10)}
                                        onClick={this.searchStudent}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.createAccountButton}
                                        style={{fontSize: "1rem", textAlign : 'center', fontFamily: "Dana"}}
                                        >
                                        جست و جو
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid> */}
                  <Grid direction="row" container spacing={3}>
                    <Grid item xs={7}>
                      <div style={{ width: "fit-content", marginTop: -20 }}>
                        نام گروه
                      </div>
                      <Grid
                        item
                        sm={12}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          paddingRight: 10,
                          marginRight: 10,
                          marginTop: 0,
                          height: 45,
                          flex: 1,
                        }}
                      >
                        <TextField
                          placeholder="نام گروه را وارد کنید"
                          value={this.state.title}
                          style={{ height: 40, background: "transparent" }}
                          onChange={e => this.changeInput("title", e)}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={5}>
                      <div style={{ width: "fit-content", marginTop: -20 }}>
                        پایه
                      </div>
                      <Grid
                        item
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          paddingRight: 10,
                          marginLeft: 2.5,
                          marginRight: 10,
                          marginBottom: 10,
                          width: "100%",
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
                  <Grid direction="row" container spacing={3}>
                    <Grid item xs={12}>
                      <div style={{ width: "fit-content", marginTop: -20 }}>
                        توضیحات
                      </div>
                      <Grid
                        item
                        sm={12}
                        spacing={1}
                        alignItems="center"
                        className="inputContainer"
                        style={{
                          padding: 0,
                          paddingRight: 10,
                          marginRight: 10,
                          marginTop: 0,
                          height: 45,
                          flex: 1,
                        }}
                      >
                        <TextField
                          placeholder="توضیحات"
                          value={this.state.description}
                          style={{ height: 40, background: "transparent" }}
                          onChange={e => this.changeInput("description", e)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
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
                      // backgroundImage: `url(${Image2})`,
                      marginRight: 10,
                      marginTop: 5,
                      width: "100%",
                      boxShadow: "1px 2px 11px -3px #00000075",
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
                        onClick={this.addGroup}
                        fullWidth
                        disabled={
                          this.state.gradeId === "d" ||
                          !this.state.title ||
                          !this.state.description ||
                          this.state.selectedList.length === 0
                        }
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
                <div style={{ width: "100%", marginBottom: -20 }}>
                  <PageTitle
                    title="آزمون های ثبت شده این کلاس"
                    size="h2"
                    color="#000"
                  />
                </div>
                <Grid direction="column" container item xs={12}>
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
                        style={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 10,
                        }}
                      >
                        <div style={{ ...styles.thItem, width: 60 }}>شناسه</div>
                        <div
                          style={{
                            ...styles.thItem,
                            textAlign: "right !important",
                            flex: 1,
                          }}
                        >
                          نام
                        </div>
                        <div
                          style={{
                            ...styles.thItem,
                            textAlign: "right !important",
                            flex: 1,
                          }}
                        >
                          توضیحات
                        </div>
                        <div style={{ ...styles.thItem, width: 60 }}>سوال</div>
                        <div style={{ ...styles.thItem, width: 180 }}>
                          سازنده
                        </div>
                        <div style={{ ...styles.thItem, width: 180 }}>
                          تاریخ شروع
                        </div>
                        <div style={{ ...styles.thItem, width: 180 }}>
                          تاریخ پایان
                        </div>
                        <div style={{ ...styles.thItem, width: 60 }}>حذف</div>
                      </div>
                      {this.renderStudentExams()}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}

export default GroupAdd;
