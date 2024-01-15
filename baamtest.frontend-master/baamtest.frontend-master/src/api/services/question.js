import { PER_PAGE_QUESTIONS, PER_PAGE_TABLES } from "../../utils/Utils";
import { post, get } from "../index";

const api_dir_1 = "/api/v2/Questions";
const api_dir_2 = "/api/v1/QuestionProblemReports";

export function getExamsQuestions(token, examIds, page) {
  const url = `${api_dir_1}/get-exams-questions?`;
  const examsQueries = examIds.map(id => "examsId=" + id + "&").join("");
  const path = `${url}${examsQueries}PageNumber=${page}&PageSize=${PER_PAGE_QUESTIONS}`;

  return get(path, token, true);
}

export function questionNormal(token, query, obj, page) {
  return post(
    `${api_dir_1}/question-normal?${
      query ? query + "&" : ""
    }PageNumber=${page}&PageSize=${PER_PAGE_QUESTIONS}`,
    obj,
    token,
    true,
  );
}

export function questionRandom(token, obj) {
  return post(`${api_dir_1}/get-random`, obj, token);
}

export function saveQuestion(token, id) {
  return post(`${api_dir_1}/save-question?questionId=${id}`, null, token);
}

export function getQuestionProblemReports(token, page) {
  return get(
    `${api_dir_2}?PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`,
    token,
    true,
  );
}

export function sendQuestionProblemReports(questionId, message, token) {
  return post(`${api_dir_2}`, { questionId, message }, token);
}
