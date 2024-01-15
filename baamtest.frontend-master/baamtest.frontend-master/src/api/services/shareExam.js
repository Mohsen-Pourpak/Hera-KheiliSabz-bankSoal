import { PER_PAGE_TABLES } from '../../utils/Utils';
import { post, get, put } from '../index';

const api_dir = "/api/v1/SharedExams";

export function shareTest(id, token) {
    return post(`${api_dir}/share/${id}`, null, token);
}

export function getShared(token, page) {
    return get(`${api_dir}/shared?PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`, token, true);
}

export function getAllShared(token, page) {
    return get(`${api_dir}/all?PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`, token, true);
}

export function getBoughtShared(token, page) {
    return get(`${api_dir}/bought?PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`, token, true);
}

export function correctionShared(data, token) {
    return post(`${api_dir}/correction`, data, token);
}

export function buyShared(examId, discount, token) {
    return post(`${api_dir}/buy?sharedExamId=${examId}&discount=${discount}`, null, token);
}

export function runShared(id, token) {
    return get(`${api_dir}/run?sharedExamId =${id}`, token);
}