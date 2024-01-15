import { delete_, get, post, post_, put } from "../index";

const api_dir = "/api/v1/admin/";

// ManageBooks

export function getBooks(token, page, perPage) {
  return get(`${api_dir}ManageBooks?PageNumber=${page}&PageSize=${perPage}`, token, true);
}

export function addBook(data, token) {
  return post(`${api_dir}ManageBooks`, data, token);
}

export function getBook(id, token) {
  return get(`${api_dir}ManageBooks/${id}`, token);
}

export function editBook(data, token) {
  return put(`${api_dir}ManageBooks/`, data, token);
}

export function deleteBook(id, token) {
  return delete_(`${api_dir}ManageBooks/${id}`, token);
}

// ManageQuestionPacks

export function getQuestionPacks(token, page, perPage) {
  return get(`${api_dir}ManageQuestionPacks?PageNumber=${page}&PageSize=${perPage}`, token, true);
}

export function addQuestionPack(data, token) {
  return post(`${api_dir}ManageQuestionPacks`, data, token);
}

export function getQuestionPack(id, token) {
  return get(`${api_dir}ManageQuestionPacks/${id}`, token);
}

export function editQuestionPack(data, token) {
  return put(`${api_dir}ManageQuestionPacks`, data, token);
}

export function deleteQuestionPack(id, token) {
  return delete_(`${api_dir}ManageQuestionPacks/${id}`, token);
}

// ManageUsers

export function changeUserPassword(id, username, description, newPassword, token) {
  console.error({ username, description, newPassword });
  return post(`${api_dir}ManageUsers/change-user-password`, { id, username, description, newPassword }, token);
}

export function chargeUserBalance(id, username, description, price, token) {
  return post(`${api_dir}ManageUsers/charge-user-balance`, { id, username, description, price }, token);
}

// ManageSchools

export function getAllSchools(data, token, page, perPage) {
  return post(`${api_dir}ManageSchools/get-all?PageNumber=${page}&PageSize=${perPage}`, data, token, true);
}

export function addSchool(data, token) {
  return post(`${api_dir}ManageSchools`, data, token);
}

export function getSchool(id, token) {
  return get(`${api_dir}ManageSchools/${id}`, token);
}

export function editSchool(data, id, token) {
  return put(`${api_dir}ManageSchools?userId=${id}`, data, token);
}

export function deleteSchool(id, token) {
  return delete_(`${api_dir}ManageSchools/${id}`, token);
}

// ManageAdvisors

export function getAllAdvisors(data, token, page, perPage) {
  return post(`${api_dir}ManageAdvisors/get-all?PageNumber=${page}&PageSize=${perPage}`, data, token, true);
}

export function addAdvisor(data, token) {
  return post(`${api_dir}ManageAdvisors`, data, token);
}

export function getAdvisor(id, token) {
  return get(`${api_dir}ManageAdvisors/${id}`, token);
}

export function editAdvisor(data, id, token) {
  return put(`${api_dir}ManageAdvisors?userId=${id}`, data, token);
}

export function deleteAdvisor(id, token) {
  return delete_(`${api_dir}ManageAdvisors/${id}`, token);
}

// ManageTeachers

export function getAllTeachers(data, token, page, perPage) {
  return post(`${api_dir}ManageTeachers/get-all?PageNumber=${page}&PageSize=${perPage}`, data, token, true);
}

export function addTeacher(data, token) {
  return post(`${api_dir}ManageTeachers`, data, token);
}

export function getTeacher(id, token) {
  return get(`${api_dir}ManageTeachers/${id}`, token);
}

export function editTeacher(data, id, token) {
  return put(`${api_dir}ManageTeachers?userId=${id}`, data, token);
}

export function deleteTeacher(id, token) {
  return delete_(`${api_dir}ManageTeachers/${id}`, token);
}

// ManageStudents

export function getAllStudents(data, token, page, perPage) {
  return post(`${api_dir}ManageStudents/get-all?PageNumber=${page}&PageSize=${perPage}`, data, token, true);
}

export function addStudent(data, token) {
  return post(`${api_dir}ManageStudents`, data, token);
}

export function getStudent(id, token) {
  return get(`${api_dir}ManageStudents/${id}`, token);
}

export function editStudent(data, id, token) {
  return put(`${api_dir}ManageStudents?userId=${id}`, data, token);
}

export function deleteStudent(id, token) {
  return delete_(`${api_dir}ManageStudents/${id}`, token);
}

// ManageBamTeachers

export function getAllBamTeachers(token, page, perPage) {
  return get(`${api_dir}ManageBamTeachers?PageNumber=${page}&PageSize=${perPage}`, token, true);
}

export function addBamTeacher(data, token) {
  return post(`${api_dir}ManageBamTeachers`, data, token);
}

export function getBamTeacher(id, token) {
  return get(`${api_dir}ManageBamTeachers/${id}`, token);
}

export function editBamTeacher(data, token) {
  return put(`${api_dir}ManageBamTeachers`, data, token);
}

export function deleteBamTeacher(id, token) {
  return delete_(`${api_dir}ManageBamTeachers/${id}`, token);
}


// ManageBamSchools

export function getAllBamSchools(token, page, perPage, filter_name) {
  let link = `${api_dir}ManageBamSchools/get-all?PageNumber=${page}&PageSize=${perPage}`;
  if (filter_name && filter_name.toString().trim() !== "") link += `&name=${filter_name}`;
  return get(link, token, true);
}

export function addBamSchool(data, token) {
  return post(`${api_dir}ManageBamSchools`, data, token);
}

export function getBamSchool(id, token) {
  return get(`${api_dir}ManageBamSchools?id=${id}`, token);
}

export function editBamSchool(id, data, token) {
  return put(`${api_dir}ManageBamSchools?id=${id}`, data, token);
}

export function deleteBamSchool(id, token) {
  return delete_(`${api_dir}ManageBamSchools/${id}`, token);
}


// ManageColleagues

export function getAllColleagues(token, page, perPage) {
  return get(`${api_dir}ManageColleagues?PageNumber=${page}&PageSize=${perPage}`, token, true);
}

export function addColleague(data, token) {
  return post(`${api_dir}ManageColleagues`, data, token);
}

export function getColleague(id, token) {
  return get(`${api_dir}ManageColleagues/${id}`, token);
}

export function editColleague(data, token) {
  return put(`${api_dir}ManageColleagues`, data, token);
}

export function deleteColleague(id, token) {
  return delete_(`${api_dir}ManageColleagues/${id}`, token);
}

// ManageDiscounts

export function getAllDiscounts(isActive, token, page, perPage) {
  let query = `PageNumber=${page}&PageSize=${perPage}`;
  if (isActive !== null) {
    query += `isActive=${isActive}`;
  }
  return get(`${api_dir}ManageDiscounts?${query}`, token, true);
}

export function addDiscount(data, token) {
  return post(`${api_dir}ManageDiscounts`, data, token);
}

export function getDiscount(id, token) {
  return get(`${api_dir}ManageDiscounts/${id}`, token);
}

export function editDiscount(data, token) {
  return put(`${api_dir}ManageDiscounts`, data, token);
}

export function deleteDiscount(id, token) {
  return delete_(`${api_dir}ManageDiscounts/${id}`, token);
}

// ManageSliders

export function getAllSliders(token, page, perPage) {
  return get(`${api_dir}ManageSliders?PageNumber=${page}&PageSize=${perPage}`, token, true);
}

export function addSlider(data, token) {
  return post(`${api_dir}ManageSliders`, data, token);
}

export function getSlider(id, token) {
  return get(`${api_dir}ManageSliders/${id}`, token);
}

export function editSlider(data, token) {
  return put(`${api_dir}ManageSliders`, data, token);
}

export function deleteSlider(id, token) {
  return delete_(`${api_dir}ManageSliders/${id}`, token);
}

// ManagePurchaseInvoices

export function getAllPurchaseInvoices(data, token, page, perPage) {
  return post(`${api_dir}ManagePurchaseInvoices?PageNumber=${page}&PageSize=${perPage}`, data, token, true);
}

export function getPurchaseInvoice(id, token) {
  return get(`${api_dir}ManagePurchaseInvoices/${id}`, token);
}

// ManageQuestionProblemReports

export function getAllQuestionProblemReports(status, token, page, perPage) {
  let query = `PageNumber=${page}&PageSize=${perPage}`;
  status.map(el => {
    query += `&status=${el}`;
  });
  return get(`${api_dir}ManageQuestionProblemReports?${query}`, token, true);
}

export function getQuestionProblemReport(id, token) {
  return get(`${api_dir}ManageQuestionProblemReports/show?id=${id}`, token);
}

export function editQuestionProblemReport(data, token) {
  return put(`${api_dir}ManageQuestionProblemReports`, data, token);
}

// ManageHomePageParameters

export function getHomePageParameters(token) {
  return get(`${api_dir}ManageHomePageParameters`, token);
}

export function editHomePageParameters(data, token) {
  return put(`${api_dir}ManageHomePageParameters`, data, token);
}