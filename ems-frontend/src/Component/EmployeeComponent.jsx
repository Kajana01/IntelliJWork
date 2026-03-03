import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../Services/EmployeeService";
import { listDepartments } from "../Services/DepartmentService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentIds, setDepartmentIds] = useState([]);
  const [departments, setDepartments] = useState([]);

  const { id } = useParams(); // Employee ID for edit
  const navigate = useNavigate();

  useEffect(() => {
    loadDepartments();
    if (id) loadEmployee();
  }, [id]);

  const loadDepartments = async () => {
    try {
      const res = await listDepartments();
      setDepartments(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadEmployee = async () => {
    try {
      const res = await getEmployee(id);
      const emp = res.data;
      console.log('Loaded employee:', emp);
      setFirstName(emp.firstName);
      setLastName(emp.lastName);
      setEmail(emp.email);
      setDepartmentIds(emp.departmentIds ? emp.departmentIds.map(Number) : []);
      console.log('Department IDs:', emp.departmentIds);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDepartmentChange = (deptId) => {
    const numId = Number(deptId);
    setDepartmentIds((prev) =>
      prev.includes(numId)
        ? prev.filter((id) => id !== numId)
        : [...prev, numId]
    );
  };

  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || departmentIds.length === 0) {
      return alert("Fill all fields and select at least one department");
    }

    const employee = { firstName, lastName, email, departmentIds };
    console.log('Saving employee:', employee);

    try {
      if (id) {
        const res = await updateEmployee(id, employee);
        console.log('Update response:', res.data);
      } else {
        await createEmployee(employee);
      }
      navigate("/employees");
    } catch (err) {
      console.error('Save error details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        fullError: err
      });
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">{id ? "Update" : "Add"} Employee</h2>

      <form onSubmit={saveOrUpdateEmployee}>
        <input
          type="text"
          placeholder="First Name"
          className="form-control mb-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="form-control mb-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="form-label">Select Departments (Click to select/deselect)</label>
        <div className="border rounded p-2 mb-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {departments.map((d) => (
            <div key={d.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`dept-${d.id}`}
                value={d.id}
                checked={departmentIds.includes(d.id)}
                onChange={() => handleDepartmentChange(d.id)}
              />
              <label className="form-check-label" htmlFor={`dept-${d.id}`}>
                {d.departmentName}
              </label>
            </div>
          ))}
        </div>
        <button className="btn btn-success">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default EmployeeComponent;