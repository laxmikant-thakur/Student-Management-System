import { useState } from "react";
import axios from "axios";

function EditModal({ student, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: student.name || "",
    email: student.email || "",
    age: student.age || "",
    rollNo: student.rollNo || "",
    subject: student.subject || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      setError("Please fill in all required fields (Name, Email, Age).");
      return;
    }

    try {
      await axios.put("http://localhost:8080/api/student/update", formData,
        {
          params: {
            id: student.id,
          }
        }
      );
      setError("");
      onUpdated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Student #{student.id}</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

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
              Update Student
            </button>
            <button type="button" className="ghost-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
