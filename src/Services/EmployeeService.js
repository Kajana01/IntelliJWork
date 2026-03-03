import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

const axiosInstance = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET all employees
export const listEmployees = () => axiosInstance.get('');

// GET employee by ID
export const getEmployee = (employeeId) =>
  axiosInstance.get(`/${employeeId}`);

// CREATE employee
export const createEmployee = (employee) =>
  axiosInstance.post('', employee);

// UPDATE employee
export const updateEmployee = (employeeId, employee) =>
  axiosInstance.put(`/${employeeId}`, employee);

// DELETE employee
export const deleteEmployee = (employeeId) =>
  axiosInstance.delete(`/${employeeId}`);

// GET employees by Department
export const getEmployeesByDepartment = (departmentId) =>
  axiosInstance.get(`/department/${departmentId}`);