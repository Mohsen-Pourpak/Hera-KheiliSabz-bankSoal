import { PER_PAGE_TABLES } from '../../utils/Utils';
import { get, post } from '../index';

const api_dir_1 = "/api/v1/Wallet/";
const api_dir_2 = "/api/v1/PurchaseInvoices/";

export function payment(amount, token) {
    return get(`${api_dir_1}/InvokePaymentPage?amount=${amount}`, token);
}

export function getPaymentStatus(walletId, token) {
    return get(`${api_dir_1}/get-wallet-details?walletId=${walletId}`, token);
}

export function getAllPayments(token, page) {
    return get(`${api_dir_1}?PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`, token, true);
}

export function getAllPurchaseInvoices(token, page) {
    return post(`${api_dir_2}?PageNumber=${page}&PageSize=${PER_PAGE_TABLES}`, {}, token, true);
}

export function getPurchaseInvoices(id, token) {
    return get(`${api_dir_2}${id}`, token);
}

