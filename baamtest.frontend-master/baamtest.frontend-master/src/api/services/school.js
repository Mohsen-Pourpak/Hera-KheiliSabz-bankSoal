import { get, get_2, post, put } from '../index';

const api_dir = "/api/v1/Schools";


export function getPriceSc(code, data, token) {
    return post(`${api_dir}/get-price-account-activation?discount=${code}`, data, token);
}

export function getPriceStudentSc(code, data, token) {
    return post(`${api_dir}/get-price-buy-student?discount=${code}`, data, token);
}

export function getPriceTeacherSc(code, data, token) {
    return post(`${api_dir}/get-price-buy-teacher?discount=${code}`, data, token);
}

export function getPriceAdvisorSc(code, data, token) {
    return post(`${api_dir}/get-price-buy-advisor?discount=${code}`, data, token);
}

export function buyStudentSc(code, data, token) {
    return post(`${api_dir}/buy-student?discount=${code}`, data, token);
}

export function buyTeacherSc(code, data, token) {
    return post(`${api_dir}/buy-teacher?discount=${code}`, data, token);
}

export function buyAdvisorSc(code, data, token) {
    return post(`${api_dir}/buy-advisor?discount=${code}`, data, token);
}

export function activateAccountSc(code, data, token) {
    return post(`${api_dir}/activate-account?discount=${code}`, data, token);
}

export function freeAdvisorsSc(token) {
    return get(`${api_dir}/free-advisor`, token);
}

export function freeTeachersSc(token) {
    return get(`${api_dir}/free-teacher`, token);
}

export function assignAdvisorSc(data, token) {
    return post(`${api_dir}/assign-advisor`, data, token);
}

export function assignTeacherSc(data, token) {
    return post(`${api_dir}/assign-teacher`, data, token);
}

export function assignStudentSc(data, token) {
    return post(`${api_dir}/assign-student`, data, token);
}

export function getProfileSc(token) {
    return get(`${api_dir}/get-profile`, token);
}

export function editProfileSc(data, token) {
    return put(`${api_dir}/modify-profile`, data, token);
}