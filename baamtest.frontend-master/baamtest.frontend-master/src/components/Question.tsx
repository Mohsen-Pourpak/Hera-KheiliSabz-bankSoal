import React from "react";
import { Grid, Button, Tooltip } from "@material-ui/core";
import {
  Bookmark,
  BookmarkBorder,
  Feedback,
  Timeline,
  Remove,
  Add,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";

import { toFA } from "../utils/Utils";
import MyMath from "./Form/MyMath";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
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
    margin: "0 auto -25px",
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
  sortFilter: {
    backgroundColor: "transparent",
    border: "1px solid #3d82a4",
    color: "#3d82a4",
    width: "fit-content",
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
    width: "fit-content",
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
});

export default function Question({
  idx,
  item,
  labelColor,
  isMore,
  isEnglish,
  isSelected,
  changeAnswer,
  isOneActive,
  isTwoActive,
  isThreeActive,
  isFourActive,
  openSendReport,
  handleSaveQuestion,
  handleSelect,
  toggleIsMore,
}: {
  idx: number;
  item: any;
  labelColor: string;
  isMore: boolean;
  isEnglish: boolean;
  isSelected: boolean;
  isOneActive: boolean;
  isTwoActive: boolean;
  isThreeActive: boolean;
  isFourActive: boolean;
  changeAnswer: (a: any, b: any) => void;
  openSendReport: (a: any) => void;
  handleSaveQuestion: (a: any) => void;
  handleSelect: (a: any) => void;
  toggleIsMore: (a: any) => void;
}) {
  const style = useStyle();

  return (
    <div style={{ position: "relative", flex: "none" }}>
      <div className={style.questionTitle}>
        {toFA(item.lessonTitle)} | {toFA(item.gradeTitle)}
      </div>
      <div className={style.questionNumContainer}>
        <div className={style.questionNum}>{toFA(idx + 1)}</div>
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
                  className={
                    isOneActive ? style.optionNumActive : style.optionNum
                  }
                  onClick={() => changeAnswer(item.id, 1)}
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
                  className={
                    isTwoActive ? style.optionNumActive : style.optionNum
                  }
                  onClick={() => changeAnswer(item.id, 2)}
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
                  className={
                    isThreeActive ? style.optionNumActive : style.optionNum
                  }
                  onClick={() => changeAnswer(item.id, 3)}
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
                  className={
                    isFourActive ? style.optionNumActive : style.optionNum
                  }
                  onClick={() => changeAnswer(item.id, 4)}
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
          <Button onClick={handleSaveQuestion}>
            <div
              style={{
                width: 50,
                display: "content",
                textAlign: "center",
              }}
            >
              {item.saved ? (
                <Bookmark className={style.actionIcon} />
              ) : (
                <BookmarkBorder className={style.actionIcon} />
              )}
              <div className={style.actionText}>ذخیره کردن</div>
            </div>
          </Button>
          <div style={{ width: 50, height: 30 }} />
          <Button onClick={() => openSendReport(item.id)}>
            <div
              style={{
                width: 50,
                display: "content",
                textAlign: "center",
              }}
            >
              <Feedback className={style.actionIcon} />
              <div className={style.actionText}>گزارش خطا</div>
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
                <Timeline className={style.actionIcon} />
                <div className={style.actionText}>اطلاعات آماری</div>
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
          <div className={style.correctOption}>
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
            <div style={{ overflow: "hidden", width: "100%" }}>
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
      <div className={style.bottomActions}>
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className={style.circleButton} onClick={handleSelect}>
            {isSelected ? (
              <Remove style={{ fill: "#fe5f55" }} />
            ) : (
              <Add style={{ fill: "#3EC592" }} />
            )}
          </div>
          <div className={style.actionButton}>
            {isSelected ? "حذف" : "انتخاب"} سوال
          </div>
        </div>
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className={style.circleButton} onClick={toggleIsMore}>
            {isMore ? <ExpandLess /> : <ExpandMore />}
          </div>
          <div className={style.actionButton}>
            {isMore ? "بستن" : "مشاهده"} پاسخ
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 *
              <div style={{ position: "relative", flex: "none" }}>
                <div style={style.questionTitle}>
                  {toFA(item.lessonTitle)} | {toFA(item.gradeTitle)}
                </div>
                <div style={style.questionNumContainer}>
                  <div style={style.questionNum}>{toFA(idx + 1)}</div>
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
                              isOneActive
                                ? style.optionNumActive
                                : style.optionNum
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
                              isTowActive
                                ? style.optionNumActive
                                : style.optionNum
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
                              isThreeActive
                                ? style.optionNumActive
                                : style.optionNum
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
                              isFourActive
                                ? style.optionNumActive
                                : style.optionNum
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
                      <div style={{ overflow: "hidden", width: "100%" }}>
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
                  <div
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      display: "flex",
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
                  <div
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      display: "flex",
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
                </div>
              </div>
 */
