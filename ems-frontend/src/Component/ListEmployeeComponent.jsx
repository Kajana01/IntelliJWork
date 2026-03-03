import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listEmployees, deleteEmployee } from "../Services/EmployeeService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await listEmployees();
      setEmployees(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const removeEmployee = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Employees</h2>
      <button className="btn btn-primary mb-2" onClick={() => navigate("/add-employee")}>
        Add Employee
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Departments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.departmentNames?.join(", ") || "No Departments"}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => navigate(`/update-employee/${emp.id}`)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => removeEmployee(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;