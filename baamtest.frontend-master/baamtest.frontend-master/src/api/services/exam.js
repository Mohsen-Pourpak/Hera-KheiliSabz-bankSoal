import { PER_PAGE_TABLES } from "../../utils/Utils";
import { post, get, put } from "../index";

const api_dir_1 = "/api/v1/exam";
const api_dir_2 = "/api/v1/GeneralReportCard";
const api_dir_3 = "/api/v1/ReportCard";

export function share() {
  return post(`${api_dir_1}/share`);
}

export function runTest(id, token) {
  return get(`${api_dir_1}/run/${id}`, token);
}

export function getTest(id, token) {
  return get(`${api_dir_1}/get/${id}`, token);
}

export function getAll(headId, token, page) {
  if (headId === "none") {
    headId = "";
  } else {
    headId = `headId=${headId}&`;
  }
  return get(
    `${api_dir_1}/get-all/?${headId}PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`,
    token,
    true,
  );
}

// Added by AMM
export function getAllFilter(obj, token, headId, page) {
  return post(
    `${api_dir_1}/all/?headId=${headId}&PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`,
    obj,
    token,
    true,
  );
}
//--------------------

export function getAnswerSheet(id, token) {
  return get(`${api_dir_1}/test-sheet-print?examId=${id}`, token);
}

export function getRandomQuestionCount(query, token) {
  return get(`${api_dir_1}/get-random-question-count?${query}`, token);
}

export function autoCreateTest(obj, token) {
  return post(`${api_dir_1}/create-for-student`, obj, token);
}

export function createTest(discount, obj, token) {
  let query = discount ? `?discountCode=${discount}` : "";
  return post(`${api_dir_1}/create${query}`, obj, token);
}

export function addToGroup(obj, token) {
  return post(`${api_dir_1}/add-group`, obj, token);
}

export function correction(obj, token) {
  return post(`${api_dir_1}/correction`, obj, token);
}

export function editTest(obj, token) {
  return put(`${api_dir_1}/edit`, obj, token);
}

export function getNotAccepted(token, page) {
  return get(
    `${api_dir_1}/get-all-notAccepted?PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`,
    token,
    true,
  );
}

export function allGroupInExam(id, token) {
  return get(`${api_dir_1}/all-group-in-exam?examId=${id}`, token);
}

export function acceptTest(id, token) {
  return put(`${api_dir_1}/acceptExam/${id}`, null, token);
}

export function getReportCard(id, token) {
  return get(`${api_dir_2}?examId=${id}`, token);
}

export function createReportCard(obj, token) {
  return post(`${api_dir_2}`, obj, token);
}

export function getTestLessons(id, token) {
  return get(`${api_dir_2}/get-lesson-inExam?examId=${id}`, token);
}

export function getHaveReportCard(id, token) {
  return get(`${api_dir_2}/have-reportCard?examId=${id}`, token);
}

export function allStudentReportCard(id, token) {
  return get(`${api_dir_2}/all-student-reportCard?examId=${id}`, token);
}

export function allQuestionReportCard(id, token) {
  return get(`${api_dir_2}/all-question-reportCard?examId=${id}`, token);
}

export function getLessonInExam(id, token) {
  return get(`${api_dir_2}/get-lesson-inExam?examId=${id}`, token);
}

export function getExamResult(id, token) {
  return get(`${api_dir_3}/single-exam-result?examId=${id}`, token);
}

export function getExamPercentResult(id, token) {
  return get(`${api_dir_3}/single-exam-percent-result?examId=${id}`, token);
}

export function mergeExams({ mainExamId, removeDuplicate, examIds, token }) {
  return put(
    `/api/v2/Exams/merge-exams?mainExamId=${mainExamId}&removeDuplicate=${removeDuplicate}`,
    examIds,
    token,
  );
}
