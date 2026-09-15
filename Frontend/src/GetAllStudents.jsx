function GetAllStudents({ students, onEdit, onDelete, pageNo, setPageNo }) {
  return (
    <div className="student-history">
      <div className="student-table-wrap">
        <div className="table-header">
          <h2>All Students</h2>
        </div>

        {students.length === 0 ? (
          <p className="empty-state">No student records found on this page.</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Roll No</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.subject}</td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="table-btn edit-btn"
                      onClick={() => onEdit(student.id, student)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="table-btn delete-btn"
                      onClick={() => onDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="pagination-controls">
          <button
            type="button"
            className="secondary-btn"
            disabled={pageNo === 0}
            onClick={() => setPageNo((prev) => prev - 1)}
          >
            ← Prev
          </button>
          <span className="page-indicator">Page {pageNo + 1}</span>
          <button
            type="button"
            className="secondary-btn"
            disabled={students.length === 0}
            onClick={() => setPageNo((prev) => prev + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetAllStudents;
