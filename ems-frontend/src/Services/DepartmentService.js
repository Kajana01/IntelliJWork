import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/departments";

// GET all departments
export const listDepartments = () => 
  axios.get(REST_API_BASE_URL);

// GET one department
export const getDepartment = (departmentId) =>
  axios.get(`${REST_API_BASE_URL}/${departmentId}`);

// CREATE department
export const createDepartment = (department) =>
  axios.post(REST_API_BASE_URL, department, {
    headers: { 'Content-Type': 'application/json' }
  });

// UPDATE department
export const updateDepartment = (departmentId, department) =>
  axios.put(`${REST_API_BASE_URL}/${departmentId}`, department, {
    headers: { 'Content-Type': 'application/json' }
  });

// DELETE department
export const deleteDepartment = (departmentId) =>
  axios.delete(`${REST_API_BASE_URL}/${departmentId}`);