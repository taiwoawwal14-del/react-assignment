import React from "react";
// import { ToastContainer, toast } from "react-toastify";

import { useState } from "react";

const toast = {
  error: (msg) => alert(msg),
  success: (msg) => console.log(msg),
};

// ===== ARRAY: table column headers =====
const headers = ["SN", "Student ID", "Name", "Department", "Course", "Level", "CGPA"];

// ===== ARRAY: which key from the student object maps to each column =====
const fields = ["index", "studentId", "name", "department", "course", "level", "cgpa"];

const Table = () => {
  const [k, setK] = useState(null);
  const [studentDetails, setstudentDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState("registration");
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    name: "",
    studentId: "",
    department: "",
    course: "",
    level: "",
    cgpa: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", studentId: "", department: "", course: "", level: "", cgpa: "" });
  };

  const editDetails = (index) => {
    setIsEditing(true);
    setForm({ ...studentDetails[index] });
    setK(index);
  };

  const handleEdit = () => {
    const { name, studentId, department, course, level, cgpa } = form;
    if (!name || !studentId || !department || !course || !level || !cgpa) {
      return toast.error("Kindly fill all fields");
    }
    const updatedDetails = [...studentDetails];
    updatedDetails[k] = { ...form };
    setstudentDetails(updatedDetails);
    setIsEditing(false);
    resetForm();
  };

  const deleteDetails = (index) => {
    setstudentDetails(studentDetails.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const { name, studentId, department, course, level, cgpa } = form;
    if (!name || !studentId || !department || !course || !level || !cgpa) {
      return toast.error("Kindly fill all fields");
    }
    setstudentDetails([...studentDetails, { ...form }]);
    resetForm();
  };

  const search = () => {
    if (!searchQuery) {
      alert("fill the search bar");
    }
  };

  const filteredStudents = studentDetails.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avgCgpa =
    studentDetails.length === 0
      ? "N/A"
      : (
          studentDetails.reduce((sum, s) => sum + parseFloat(s.cgpa || 0), 0) /
          studentDetails.length
        ).toFixed(2);

  const totalDepartments = new Set(studentDetails.map((s) => s.department)).size;

  return (
    <>
      <div className="container">

        {/* ===== TWO BUTTONS ===== */}
        <div>
          <button onClick={() => setPage("dashboard")}>Students</button>
          <button onClick={() => setPage("registration")}>Add Student</button>
        </div>


        {/* ===== REGISTRATION PAGE ===== */}
        {page === "registration" && (
          <div>

            <input name="name"       value={form.name}       onChange={handleChange} placeholder="Enter your Name.."       />
            <input name="studentId"  value={form.studentId}  onChange={handleChange} placeholder="Enter your Student ID.." />
            <input name="department" value={form.department}  onChange={handleChange} placeholder="Enter your Department.." />
            <input name="course"     value={form.course}     onChange={handleChange} placeholder="Enter your course.."     />
            <input name="level"      value={form.level}      onChange={handleChange} placeholder="Enter your level.."      />
            <input name="cgpa"       value={form.cgpa}       onChange={handleChange} placeholder="Enter your CGPA.." type="number" step="0.01" min="0" max="5" />

            {isEditing ? (
              <button className="update" onClick={handleEdit}>Update</button>
            ) : (
              <button className="submit" onClick={handleSubmit}>Submit</button>
            )}

            {/* <h1><ToastContainer /></h1> */}

            <div className="sea">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search bar"
                type="search"
              />
              <button onClick={search} className="search-button">Search</button>
            </div>

            <table>
              <thead>
                <tr>
                  {/* ===== HEADERS FROM ARRAY ===== */}
                  {[...headers, "Action"].map((header) => (
                    <td key={header}>{header}</td>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((details, index) => (
                  <tr key={index}>
                    {/* ===== CELLS FROM ARRAY ===== */}
                    {fields.map((field) => (
                      <td key={field}>
                        {field === "index" ? index + 1 : details[field]}
                      </td>
                    ))}
                    <td>
                      <button onClick={() => editDetails(studentDetails.indexOf(details))}>Edit</button>
                      <button onClick={() => deleteDetails(studentDetails.indexOf(details))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}


        {/* ===== DASHBOARD PAGE ===== */}
        {page === "dashboard" && (
          <div>

            <p>Total Students: {studentDetails.length}</p>
            <p>Average CGPA: {avgCgpa}</p>
            <p>Total Departments: {totalDepartments}</p>

            <table>
              <thead>
                <tr>
                  {/* ===== HEADERS FROM ARRAY (no Action column on dashboard) ===== */}
                  {headers.map((header) => (
                    <td key={header}>{header}</td>
                  ))}
                </tr>
              </thead>

              <tbody>
                {studentDetails.length === 0 ? (
                  <tr>
                    <td colSpan={headers.length}>No students registered yet.</td>
                  </tr>
                ) : (
                  studentDetails.map((details, index) => (
                    <tr key={index}>
                      {/* ===== CELLS FROM ARRAY ===== */}
                      {fields.map((field) => (
                        <td key={field}>
                          {field === "index" ? index + 1 : details[field]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>
        )}

      </div>
    </>
  );
};

export default Table;