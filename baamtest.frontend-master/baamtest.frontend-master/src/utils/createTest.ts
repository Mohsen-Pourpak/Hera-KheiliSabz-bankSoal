export function createManualTest(
  justSaved: boolean,
  state: {
    gradeId: string;
    title: string;
    fieldId: string | number;
    selectedList: any[];
    grades: any[];
  },
  cb: () => void,
) {
  const { gradeId, title, fieldId, selectedList, grades } = state;
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
    booksId: selectedList.filter(el => el.type === "book").map(item => item.id),
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
  //   this.props.history.push({
  //     pathname: `/dashboard/test/show/`,
  //   });
  cb();
}
