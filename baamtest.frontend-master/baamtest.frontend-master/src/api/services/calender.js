import axios from 'axios';
import { post, get } from '../index';

const api_dir = "/api/v1/Calenders";

export function addEvent(obj, token) {
    return post(`${api_dir}/add-Event`, obj, token);
}

export function getEvent(time, token) {
    return get(`${api_dir}/get?time=${time}`, token);
}

export async function getDaysOff(type, day, month) {
    return await axios.get(`https://farsicalendar.com/api/${type}/${day}/${month}`);
}

