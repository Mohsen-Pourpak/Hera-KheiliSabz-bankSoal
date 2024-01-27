import React, { useCallback, useEffect, useState } from "react";
import { Button, Dialog, Grid } from "@material-ui/core";
import { SubdirectoryArrowLeft } from "@material-ui/icons";
import { toast } from "react-toastify";

import ExamFields from "../CreateTest/ExamFields";
import SearchBox from "../CreateTest/SearchBox";
import SelectedList from "../CreateTest/SelectedList";

import ArrowIcon from "../../images/icons/circle-arrow-icon.svg";

import {
  bookConditionUser,
  gradeConditionUser,
  fieldConditionUser,
} from "../../api/services/tags";
import { createManualTest } from "../../utils/createTest";

export default function AddTopic({
  onClose,
  open,
  fieldId,
  gradeId,
  selectedList,
  title,
  questionsQuery,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  fieldId: string;
  gradeId: string;
  selectedList: any;
  questionsQuery: any;
  onSubmit: (testData: any) => void;
}) {
  const [state, setState] = useState<any>({
    teachersList: [],
    grades: [],
    fields: [],
    selectedList: [],
    level: "Hard",
    userLessons: [],
    title,
    fieldId,
    gradeId,

    search: "",
    searchFetched: false,
    isStudent: false,
  });
  const [topicsSelection, setTopicsSelection] = useState(selectedList);

  const renderTopic = useCallback(
    list => {
      return list.map((item_: any) => {
        let isSelected = !Boolean(
          topicsSelection.filter(
            (it: any) => it.id === item_.id && it.title === item_.title,
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
                <Grid item style={{ marginRight: 20 }}>
                  <SubdirectoryArrowLeft style={{ fill: "#fe5f55" }} />
                </Grid>
              ) : (
                <Grid item>
                  <img
                    src={ArrowIcon}
                    alt="toggle"
                    style={{
                      height: 25,
                      marginRight: 10,
                      cursor: "pointer",
                      transform: state[`isShow__${item_.id}`]
                        ? "rotate(-90deg)"
                        : "rotate(0deg)",
                      opacity: state[`isShow__${item_.id}`] ? 0.5 : 1,
                    }}
                    onClick={() => {
                      setState((prev: any) => ({
                        ...prev,
                        [`isShow__${item_.id}`]: !state[`isShow__${item_.id}`],
                      }));
                    }}
                  />
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
                  {item_.title} {generateTopicTitle(item_)}
                </p>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color={isSelected ? "secondary" : "primary"}
                  onClick={() => toggleSelectTopic("topic", item_, isSelected)}
                  style={{ fontSize: 11, height: 30 }}
                >
                  {isSelected ? "- حذف" : "+ افزودن"}
                </Button>
              </Grid>
            </Grid>
            {state[`isShow__${item_.id}`] && renderTopic(item_.subTopics)}
          </div>
        );
      });
    },
    [topicsSelection, state, setState],
  );

  const generateTopicTitle = ({ parentTopic }: { parentTopic: any }) => {
    if (state.searchFetched) {
      return `(${parentTopic ? parentTopic.parentTopicTitle : ""} ${
        parentTopic ? parentTopic.title : ""
      })`;
    }
    return ``;
  };

  const toggleSelectTopic = (type: any, item_: any, isSelected: any) => {
    let element_ = {
      id: item_.id,
      title: item_.title,
      numberOfEasyQuestions: 0,
      numberOfMediumQuestions: 0,
      numberOfHardQuestions: 0,
      type,
    };
    if (!isSelected) {
      setTopicsSelection((prev: any) => [...prev, element_]);
      // setState((prev: any) => ({
      //   ...prev,
      //   selectedList: [...state.selectedList, element_],
      // }));
    } else {
      // let selectedList = topicsSelection.filter(
      //   (it: any) => it.id !== item_.id && it.title !== item_.title,
      // );
      setTopicsSelection((prev: any) => {
        let res = prev.filter(
          (it: any) => it.id !== item_.id && it.title !== item_.title,
        );

        return res;
      });
      // setState((prev: any) => ({ ...prev, selectedList }));
    }
  };

  const renderUserLessons = useCallback(
    (items: any) => {
      return items.map((item: any) => {
        let isSelected = !Boolean(
          topicsSelection.filter(
            (it: any) => it.id === item.id && it.title === item.title,
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
                    transform: state[`isShow__${item.id}`]
                      ? "rotate(-90deg)"
                      : "rotate(0deg)",
                    opacity: state[`isShow__${item.id}`] ? 0.5 : 1,
                  }}
                  onClick={() => {
                    setState((prev: any) => ({
                      ...prev,
                      [`isShow__${item.id}`]: !state[`isShow__${item.id}`],
                    }));
                  }}
                />
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
                  onClick={() => toggleSelectTopic("book", item, isSelected)}
                  style={{ fontSize: 11, height: 30 }}
                  disabled={state.searchFetched}
                >
                  {isSelected ? "- حذف" : "+ افزودن"}
                </Button>
              </Grid>
            </Grid>
            {state[`isShow__${item.id}`] && renderTopic(item.topics)}
          </>
        );
      });
    },
    [topicsSelection, state, state.userLessons],
  );

  const getBooks = (fieldId?: any, gradeId?: any, search?: any) => {
    // this.setState({ progress: true });
    let token = localStorage.getItem("userToken");
    let query = "";
    if (fieldId && fieldId !== "d") {
      query += `fieldsId=${state.fieldId}&`;
    }
    if (gradeId && gradeId !== "d") {
      query += `gradesId=${state.gradeId}&`;
    }
    if (search) {
      query += `search=${search}`;
    }

    if (query) {
      bookConditionUser(token, query).then(res => {
        let userLessons: any = [];
        res.data.forEach((el: any) => {
          if (!userLessons.map((_i: any) => _i.id).includes(el.id)) {
            userLessons.push(el);
          }
        });
        setState((prev: any) => ({ ...prev, userLessons, progress: false }));
      });
    } else {
      setState((prev: any) => ({ ...prev, progress: false }));
      toast.error("لطفا پایه و رشته را وارد کنید");
    }
  };

  useEffect(() => {
    let isStudent = localStorage.getItem("userType") === "Student";
    setState((prev: any) => ({ ...prev, isStudent, title, fieldId, gradeId }));

    const getGradesAndFields = async () => {
      let token = localStorage.getItem("userToken");
      const gradesCon = await gradeConditionUser(token);
      if (gradesCon.isSuccess) {
        setState((prev: any) => ({ ...prev, grades: gradesCon.data }));
      }
      const fieldsCon = await fieldConditionUser(token);
      if (fieldsCon.isSuccess) {
        setState((prev: any) => ({ ...prev, fields: fieldsCon.data }));
      }
      getBooks(questionsQuery.fieldIds[0], state.gradeId);
    };
    getGradesAndFields();
  }, [open]);

  const handleChangeInput = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value ? e.target.value : "";
    setState((prev: any) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    getBooks(state.fieldId, state.gradeId);
  }, [state.fieldId, state.gradeId, state.search]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" >
      <div
        style={{
          padding: 20,
          backgroundColor: "rgba(203, 242, 207, 0.95)",
        }}
      >
        <Grid container item xs={12}>
          <Grid
            direction="row"
            alignItems="flex-start"
            spacing={3}
            justify="flex-start"
            container
          >
            <Grid direction="column" container item md={6} xs={12}>
              <Grid direction="row" container spacing={1}>
                <ExamFields
                  changeInput={handleChangeInput}
                  fieldId={state.fieldId}
                  fields={state.fields}
                  gradeId={state.gradeId}
                  grades={state.grades}
                  title={state.title}
                />
              </Grid>
              <Grid direction="column" container item xs={12}>
                <div
                  style={{
                    maxHeight: 400,
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#ddd #666",
                  }}
                >
                  {state.userLessons ? (
                    state.userLessons.length === 0 ? (
                      <div
                        style={{
                          marginTop: "30%",
                          fontSize: "1.5rem",
                          opacity: 0.5,
                        }}
                      >
                        {Boolean(fieldId !== "d" && gradeId !== "d")
                          ? "کتابی موجود نیست"
                          : "لطفا یک پایه و رشته تحصیلی انتخاب کنید"}
                      </div>
                    ) : (
                      renderUserLessons(state.userLessons)
                    )
                  ) : null}
                </div>
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
                <SearchBox
                  searchFetched={state.searchFetched}
                  onSubmit={search => {
                    if (search) {
                      setState((prev: any) => ({
                        ...prev,
                        searchFetched: true,
                      }));
                      getBooks(state.fieldId, state.gradeId, search);
                    } else {
                      setState((prev: any) => ({
                        ...prev,
                        searchFetched: false,
                      }));
                      getBooks(state.fieldId, state.gradeId);
                    }
                  }}
                />
              </Grid>
              {/* <SelectedList
                onChange={list => setTopicsSelection(list)}
                selectedList={topicsSelection}
              /> */}
              <Grid direction="row" justify="center" container spacing={1}>
                <Grid item md={4} xs={6}>
                  <Button
                    onClick={() => {
                      if (topicsSelection.length === 0) {
                        toast.error(
                          "لطفا حداقل یک درس برای ساخت آزمون انتخاب کنید",
                        );
                      } else if (
                        !state.title ||
                        state.gradeId === "d" ||
                        state.fieldId === "d"
                      ) {
                        toast.error("لطفا همه موارد را وارد کنید");
                      } else {
                        const testData = {
                          ...state,
                          selectedList: topicsSelection,
                          gradeId: state.gradeId,
                          fieldId: state.fieldId,
                          title: state.title,
                        };

                        createManualTest(false, testData, () =>
                          onSubmit({
                            topicsSelection,
                            gradeId: state.gradeId,
                            fieldId: state.fieldId,
                            title: state.title,
                          }),
                        );
                      }
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      fontFamily: "Dana",
                    }}
                  >
                    ثبت
                  </Button>
                </Grid>
                {/* {!state.isStudent && (
                  <Grid item md={4} xs={6}>
                    <Button
                      onClick={() => {
                        if (topicsSelection.length === 0) {
                          toast.error(
                            "لطفا حداقل یک درس برای ساخت آزمون انتخاب کنید",
                          );
                        } else if (
                          !state.title ||
                          state.gradeId === "d" ||
                          state.fieldId === "d"
                        ) {
                          toast.error("لطفا همه موارد را وارد کنید");
                        } else {
                          const testData = {
                            ...state,
                            selectedList: topicsSelection,
                            gradeId: state.gradeId,
                            fieldId: state.fieldId,
                            title: state.title,
                          };

                          createManualTest(false, testData, () =>
                            onSubmit({
                              topicsSelection,
                              gradeId: state.gradeId,
                              fieldId: state.fieldId,
                              title: state.title,
                            }),
                          );
                        }
                      }}
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{
                        fontSize: "1rem",
                        textAlign: "center",
                        fontFamily: "Dana",
                      }}
                    >
                      ثبت
                    </Button>
                  </Grid>
                )} */}
                <Grid item md={4} xs={6}>
                  <Button
                    onClick={onClose}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      fontFamily: "Dana",
                    }}
                  >
                    بستن
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
}
