import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
} from "../Services/DepartmentService";

const DepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await listDepartments();
      setDepartments(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const saveDepartment = async (e) => {
    e.preventDefault();
    if (!departmentName.trim()) return alert("Department name required");

    const dept = { departmentName };
    try {
      if (editingId === null) {
        const res = await createDepartment(dept);
        setDepartments([...departments, res.data]);
      } else {
        const res = await updateDepartment(editingId, dept);
        setDepartments(
          departments.map((d) => (d.id === editingId ? res.data : d))
        );
        setEditingId(null);
      }
      setDepartmentName("");
    } catch (err) {
      console.error(err);
    }
  };

  const editDepartment = async (id) => {
    try {
      const res = await getDepartment(id);
      setDepartmentName(res.data.departmentName);
      setEditingId(id);
    } catch (err) {
      console.error(err);
    }
  };

  const removeDepartment = async (id) => {
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">{editingId ? "Update" : "Add"} Department</h2>

      <form onSubmit={saveDepartment}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.departmentName}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => editDepartment(d.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeDepartment(d.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info ms-2"
                    onClick={() => navigate(`/view-department/${d.id}`)}
                  >
                    View Employees
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentComponent;