import { get, post } from '../index';

const api_dir = "/api/v1/Home";

export function getHome() {
    return get(`${api_dir}`);
}
export function getBamTeacherLeader() {
    return get(`${api_dir}/get-bamTeacher-leader`);
}
export function getBamSchools() {
    return get(`${api_dir}/get-bamSchool`);
}
export function getBamTeacherSingleLesson(lesson) {
    return get(`${api_dir}/get-bamTeacher-singleLesson?lesson=${lesson}`);
}
