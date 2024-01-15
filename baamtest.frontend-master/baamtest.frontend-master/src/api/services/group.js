import { post, get, delete_, put } from '../index';

const api_dir_1 = "/api/v1/SubStudents";
const api_dir_2 = "/api/v1/Group";
const api_dir_3 = "/api/v1/Users";

export function getAllStudent(token, query) {
    return get(`${api_dir_1}/get-all-student?${query}`, token);
}

export function getGroup(token, groupId) {
    return get(`${api_dir_2}/get/${groupId}`, token);
}

export function createGroup(token, obj) {
    return post(`${api_dir_2}/create`, obj, token);
}

export function editGroup(token, obj) {
    return put(`${api_dir_2}/edit`, obj, token);
}

export function getAllGroups(token) {
    return get(`${api_dir_2}/get-all?`, token);
}

export function getStudent(token, query) {
    return get(`${api_dir_3}/get-student-byUsername?${query}`, token);
}

export function deleteGroup(token, id) {
    return delete_(`${api_dir_2}/delete/${id}`, token);
}

