import { get, post, put } from '../index';

const api_dir_1 = "/api/v1/Students";
const api_dir_2 = "/api/v1/Product";


export function getProfileSt(token) {
    return get(`${api_dir_1}/get-profile`, token);
}

export function editProfileSt(data, token) {
    return put(`${api_dir_1}/modify-profile`, data, token);
}

export function getPackPrice(bookId, packPeriod, countInPack, discount, token) {
    return get(`${api_dir_1}/get-questionPack-price?bookId=${bookId}&packPeriod=${packPeriod}&countInPack=${countInPack}&discount=${discount}`, token);
}

export function buyPack(discount, data, token) {
    return post(`${api_dir_1}/buy-questionPack?discount=${discount}`, data, token);
}

export function getAllQuestionPack(token) {
    return get(`${api_dir_2}/get-all-questionPack`, token);
}

export function getAllQuestionPackv2(token) {
    return get(
        `${api_dir_2}/get-all-questionPack/?PageNumber=1&PageSize=1000`,
        token,
    );
}

export function getQuestionPack(bookId, token) {
    return get(`${api_dir_2}/get-questionPack?bookId=${bookId}`, token);
}

export function getAllQuestionPackFiltered(query, token) {
    return get(`${api_dir_2}/get-all-questionPack?${query}`, token);
}