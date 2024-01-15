import { get, post } from '../index';

const api_dir_1 = "/api/v1/Auth";
const api_dir_2 = "/api/v1/Users";
const api_dir_3 = "/api/v1/Discount";
const api_dir_4 = "/api/v2/Users";


export function login(username, password) {
    let obj = JSON.stringify({username, password, rememberMe: true}) 
    return post(`${api_dir_1}/login`, obj);
}

export function studentRegister(data) {
    let obj = JSON.stringify(data)
    return post(`${api_dir_1}/Register/Student`, obj);
}

export function teacherRegister(data) {
    let obj = JSON.stringify(data)
    return post(`${api_dir_1}/Register/Teacher`, obj);
}

export function advisorRegister(data) {
    let obj = JSON.stringify(data)
    return post(`${api_dir_1}/Register/Advisor`, obj);
}

export function schoolRegister(data) {
    let obj = JSON.stringify(data)

    return post(`${api_dir_1}/Register/School`, obj);
}

export function changePassword(data, token) {
    let obj = JSON.stringify(data)
    return post(`${api_dir_1}/password-change`, obj, token);
}

export function uploadUser(data, token) {
    return post(`${api_dir_2}/upload-avatar`, data, token);
}

export function getUserId(token) {
    return get(`${api_dir_1}/getUserId`, token);
}

export function getUserRole(token) {
    return get(`${api_dir_1}/getRole`, token);
}

export function getBalance(token) {
    return get(`${api_dir_2}/get-balance`, token);
}

export function getIdentifierCode(token) {
    return get(`${api_dir_3}/user-identifier-code`, token);
}

export function getHeads(token) {
    return get(`${api_dir_2}/get-heads`, token);
}

export function getStar(token) {
    return get(`${api_dir_2}/get-star`, token);
}

export function getName(token) {
    return get(`${api_dir_2}/get-name`, token);
}

export function getInfo(token) {
    return get(`${api_dir_4}/get-user-info`, token);
}

export function getProfileParameter(token) {
    return get(`${api_dir_2}/get-profile-parameter`, token);
}

export function subAdvisors(token) {
    return get(`${api_dir_2}/get-sub-advisor`, token);
}

export function subTeachers(token) {
    return get(`${api_dir_2}/get-sub-teacher`, token);
}

export function subStudents(token) {
    return get(`${api_dir_2}/get-sub-student`, token);
}

export function getTeacher(token, query) {
    return get(`${api_dir_2}/get-teacher-byUsername?${query}`, token);
}
export function getAdvisor(token, query) {
    return get(`${api_dir_2}/get-advisor-byUsername?${query}`, token);
}

export function uploadUsersExcel(token, type, file, rowsCount) {
    let data = new FormData()
    data.append('File', file)
    data.append('Type', type)
    data.append('NumberOfRows', rowsCount)
    return post(`${api_dir_2}/upload-excel`, data, token);
}

export function getHome() {
    return get(`/api/v1/Home`);
}

