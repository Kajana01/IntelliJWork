import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeesByDepartment } from "../Services/EmployeeService";

const ViewDepartmentEmployeesComponent = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, [id]);

  const loadEmployees = async () => {
    try {
      const res = await getEmployeesByDepartment(id);
      setEmployees(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Employees in Department</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/departments")}>
        Back
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDepartmentEmployeesComponent;