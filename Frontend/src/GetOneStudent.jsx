function GetOneStudent({ student, onEdit, onDelete }) {
  if (!student) return null;

  return (
    <div className="student-preview">
      <p className="preview-label">Student Details</p>
      <div className="response-box">
        <div className="response-row">
          <span>ID</span>
          <strong>{student.id}</strong>
        </div>
        <div className="response-row">
          <span>Name</span>
          <strong>{student.name}</strong>
        </div>
        <div className="response-row">
          <span>Email</span>
          <strong>{student.email}</strong>
        </div>
        <div className="response-row">
          <span>Age</span>
          <strong>{student.age}</strong>
        </div>
        <div className="response-row">
          <span>Roll No</span>
          <strong>{student.rollNo}</strong>
        </div>
        <div className="response-row">
          <span>Subject</span>
          <strong>{student.subject}</strong>
        </div>

        <div className="response-actions">
          <button
            type="button"
            className="primary-btn"
            onClick={() => onEdit(student.id, student)}
          >
            Edit
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(student.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetOneStudent;
