import { get, get_2, post, put } from '../index';

const api_dir = "/api/v1/Advisors";


export function getPriceAd(code, data, token) {
    return post(`${api_dir}/get-price-account-activation?discount=${code}`, data, token);
}

export function getPriceStudentAd(code, data, token) {
    return post(`${api_dir}/get-price-buy-student?discount=${code}`, data, token);
}

export function getPriceTeacherAd(code, data, token) {
    return post(`${api_dir}/get-price-buy-teacher?discount=${code}`, data, token);
}

export function buyStudentAd(code, data, token) {
    return post(`${api_dir}/buy-student?discount=${code}`, data, token);
}

export function buyTeacherAd(code, data, token) {
    return post(`${api_dir}/buy-teacher?discount=${code}`, data, token);
}

export function activateAccountAd(code, data, token) {
    return post(`${api_dir}/activate-account?discount=${code}`, data, token);
}

export function freeTeachersAd(token) {
    return get(`${api_dir}/free-teacher`, token);
}

export function assignTeacherAd(data, token) {
    return post(`${api_dir}/assign-teacher`, data, token);
}

export function assignStudentAd(data, token) {
    return post(`${api_dir}/assign-student`, data, token);
}

export function getProfileAd(token) {
    return get(`${api_dir}/get-profile`, token);
}

export function editProfileAd(data, token) {
    return put(`${api_dir}/modify-profile`, data, token);
}