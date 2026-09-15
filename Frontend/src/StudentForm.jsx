import axios from "axios";

function StudentForm({
  formData,
  handleChange,
  handleReset,
  setError,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      setError("Please fill in all required student fields.");
      return;
    }

    setError("");
    handleCreate(formData);
  };

  const handleCreate = async (formData) => {
    try {
      await axios.post("http://localhost:8080/api/student/create", formData);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students.");
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Age
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
            placeholder="Enter roll no"
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
        <button
          type="submit"
          className="primary-btn"
        >
          {isEditMode ? "Update Student" : "Save Student"}
        </button>
        <button
          type="button"
          className="secondary-btn"
          onClick={handleReset}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
