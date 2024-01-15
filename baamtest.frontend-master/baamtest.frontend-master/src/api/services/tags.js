import { get } from '../index';

const api_dir_1 = "/api/v1/Tags";
const api_dir_2 = "/api/v2/Tags";

export function lessons() {
    return get(`${api_dir_1}/lessons`);
}

export function grades() {
    return get(`${api_dir_1}/grades`);
}

export function fields() {
    return get(`${api_dir_1}/fields`);
}

export function topicAll() {
    return get(`${api_dir_1}/topic-all`);
}

export function topicsConditional(lessonIds) {
    return get(`${api_dir_1}/topics-conditional?lessonIds=${lessonIds}`);
}

export function books() {
    return get(`${api_dir_1}/books`);
}

export function booksConditional() {
    return get(`${api_dir_1}/difficulties`);
}

export function questionType() {
    return get(`${api_dir_1}/questionType`);
}

export function lessonsConditionUser() {
    return get(`${api_dir_1}/lessons-condition-user`);
}

export function bookConditionUser(token, query) {
    return get(`${api_dir_2}/book-condition-user?${query}`, token);
}

export function gradeConditionUser(token) {
    return get(`${api_dir_2}/grade-condition-user`, token);
}

export function fieldConditionUser(token) {
    return get(`${api_dir_2}/field-condition-user`, token);
}