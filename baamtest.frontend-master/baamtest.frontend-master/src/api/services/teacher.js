import { get, get_2, post, put } from '../index';

const api_dir = "/api/v1/Teachers";


export function getPriceTe(code, data, token) {
    return post(`${api_dir}/get-price-account-activation?discount=${code}`, data, token);
}

export function getPriceStudentTe(code, data, token) {
    return post(`${api_dir}/get-price-buy-student?discount=${code}`, data, token);
}

export function buyStudentTe(code, data, token) {
    return post(`${api_dir}/buy-student?discount=${code}`, data, token);
}

export function activateAccountTe(code, data, token) {
    return post(`${api_dir}/activate-account?discount=${code}`, data, token);
}

export function assignStudentTe(data, token) {
    return post(`${api_dir}/assign-student`, data, token);
}

export function getProfileTe(token) {
    return get(`${api_dir}/get-profile`, token);
}

export function editProfileTe(data, token) {
    return put(`${api_dir}/modify-profile`, data, token);
}
