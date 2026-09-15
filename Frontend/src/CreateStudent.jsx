import { useState } from "react";
import axios from "axios";

function CreateStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    rollNo: "",
    subject: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", age: "", rollNo: "", subject: "" });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      setError("Please fill in all required fields (Name, Email, Age).");
      setSuccess("");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/student/create", formData);
      setSuccess("Student created successfully!");
      setError("");
      setFormData({ name: "", email: "", age: "", rollNo: "", subject: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create student.");
      setSuccess("");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <span className="eyebrow">New Entry</span>
        <h1>Create Student</h1>
        <p>Fill in the details below to add a new student record.</p>
      </div>

      {error && <div className="error-box">{error}</div>}
      {success && <div className="success-toast">{success}</div>}

      <div className="glass-card">
        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Name *
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
              />
            </label>

            <label>
              Email *
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Age *
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
              />
            </label>

            <label>
              Roll No
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="Enter roll number"
              />
            </label>
          </div>

          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />
          </label>

          <div className="button-group">
            <button type="submit" className="primary-btn">
              Save Student
            </button>
            <button type="button" className="secondary-btn" onClick={handleReset}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
