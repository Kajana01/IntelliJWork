import React, { useEffect, useState } from "react";
import { getDepartments, deleteDepartment } from "../Services/DepartmentService";
import { useNavigate } from "react-router-dom";

const ListDepartmentsComponent = () => {
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState("");
  const navigate = useNavigate();

  // Load departments when component mounts
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new department
  const addDepartment = async () => {
    if (!newDeptName.trim()) return;
    try {
      await fetch("http://localhost:8080/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departmentName: newDeptName }),
      });
      setNewDeptName("");
      loadDepartments(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete department
  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      loadDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Add Department</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Department Name"
          className="form-control"
          value={newDeptName}
          onChange={(e) => setNewDeptName(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addDepartment}>
          Add
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.departmentName}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => navigate(`/departments/edit/${dept.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(dept.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => navigate(`/departments/${dept.id}/employees`)}
                >
                  View Employees
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartmentsComponent;