import React, { useEffect, useState } from "react";
import { db } from "../../Config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col, Spinner, Card, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import StudentCard from "./StudentCard";

import { FaSearch, FaPlus } from "react-icons/fa";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch {
      toast.error("Failed to fetch students");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteDoc(doc(db, "students", id));
        toast.success("Student deleted successfully");
        fetchStudents();
      } catch {
        toast.error("Failed to delete student");
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="container mt-4">
      {/* Search & Add */}
      <Card className="p-4 shadow border-0 rounded-4 mb-4 stylish-card">
        <Row>
          <Col md={6}>
            <InputGroup className="search-box">
              <InputGroup.Text
                id="search-icon"
                style={{ background: "transparent", border: "none" }}
              >
                <FaSearch color="#1e3a8a" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search students..."
                aria-label="Search students"
                aria-describedby="search-icon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shadow-none border-0"
              />
            </InputGroup>
          </Col>
          <Col md={6} className="text-end">
            <Button as={Link} to="/students/add" className="add-btn">
              <FaPlus />
              Add New Student
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Student List */}
      <Row xs={1} sm={2} md={3} className="g-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <Col
              key={student.id}
              style={{
                animation: `fadeInUp 0.4s ease ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <StudentCard student={student} onDelete={handleDelete} />
            </Col>
          ))
        ) : (
          <p className="text-center mt-4 text-muted">No students found.</p>
        )}
      </Row>

      {/* Custom CSS */}
      <style>{`
        .stylish-card {
          background: linear-gradient(135deg, #f9fafb, #e5e7eb);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(30, 58, 138, 0.1);
        }
        .search-box {
          background: #fff;
          border-radius: 12px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 8px rgba(30, 58, 138, 0.1);
          transition: all 0.3s ease;
          border: 1.5px solid transparent;
        }
        .search-box:focus-within {
          box-shadow: 0 0 0 3px rgba(20, 116, 110, 0.3);
          border-color: #14b8a6;
        }
        .add-btn {
          background: linear-gradient(135deg, #1e3a8a, #14b8a6);
          border: none;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(20, 58, 138, 0.6);
          transition: all 0.3s ease;
          color: white;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .add-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(20, 58, 138, 0.8);
          color: white;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StudentList;
