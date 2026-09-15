import { useEffect, useState } from "react";
import axios from "axios";
import GetOneStudent from "./GetOneStudent";
import GetAllStudents from "./GetAllStudents";
import EditModal from "./EditModal";

function GetStudentsPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [lookupId, setLookupId] = useState("");
  const [singleStudent, setSingleStudent] = useState(null);
  const [showSingle, setShowSingle] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingStudent, setEditingStudent] = useState(null);

  /* ── Fetch all students when showAll is active ── */
  useEffect(() => {
    if (!showAll) return;

    const fetchAll = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/student/getAll",
          { params: { page: pageNo } }
        );
        setStudents(response.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load students.");
      }
    };

    fetchAll();
  }, [showAll, pageNo, refreshKey]);

  /* ── Get One ── */
  const handleGetOne = async () => {
    if (!lookupId) {
      setError("Please enter a student ID.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/student/get",
        { params: { id: Number(lookupId) } }
      );
      const data = Array.isArray(response.data)
        ? response.data[0]
        : response.data;
      setSingleStudent(data);
      setError("");
      setShowSingle(true);
      setShowAll(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch student.");
      setShowSingle(false);
    }
  };

  /* ── Get All ── */
  const handleGetAll = () => {
    setPageNo(0);
    setShowAll(true);
    setShowSingle(false);
    setSingleStudent(null);
    setError("");
  };

  /* ── Edit ── */
  const handleEdit = (id, student) => {
    setEditingStudent(student);
    setLookupId(id);
  };

  const handleEditDone = () => {
    setEditingStudent(null);
    setRefreshKey((prev) => prev + 1);
  };

  /* ── Delete ── */
  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await axios.delete("http://localhost:8080/api/student/delete-soft", {
        params: { id },
      });
      setError("");

      /* If viewing a single student, clear it */
      if (showSingle) {
        setSingleStudent(null);
        setShowSingle(false);
      }

      /* Switch to table view and refresh */
      setShowAll(true);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <span className="eyebrow">Student Records</span>
        <h1>Get Students</h1>
        <p>Search for a specific student by ID or browse all records.</p>
      </div>

      {error && <div className="error-box">{error}</div>}

      {/* ── Lookup Panel ── */}
      <div className="glass-card lookup-panel">
        <h2 className="card-title">Search Student</h2>
        <div className="lookup-row">
          <label>
            Student ID
            <input
              type="number"
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
              placeholder="Enter student ID"
            />
          </label>

          <div className="lookup-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={handleGetOne}
            >
              Get One
            </button>
            <button
              type="button"
              className="secondary-btn"
              onClick={handleGetAll}
            >
              Get All
            </button>
          </div>
        </div>
      </div>

      {/* ── Single Student Result ── */}
      {showSingle && singleStudent && (
        <div className="glass-card">
          <GetOneStudent
            student={singleStudent}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* ── All Students Table ── */}
      {showAll && (
        <div className="glass-card">
          <GetAllStudents
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
            pageNo={pageNo}
            setPageNo={setPageNo}
          />
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editingStudent && (
        <EditModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdated={handleEditDone}
        />
      )}
    </div>
  );
}

export default GetStudentsPage;
