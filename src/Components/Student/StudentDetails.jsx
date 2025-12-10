import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../Config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Spinner, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "students", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          toast.error("Student not found");
        }
      } catch {
        toast.error("Failed to fetch student");
      }
      setLoading(false);
    };
    fetchStudent();
  }, [id]);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  if (!student)
    return <p className="text-center text-muted mt-4">No details available.</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: 700 }}>
      <Card className="shadow-lg border-0 rounded-4 p-4 stylish-card">
        <h2 className="text-gradient fw-bold mb-3">{student.name}</h2>
        <p><strong>Age:</strong> {student.age || "N/A"}</p>
        <p><strong>Gender:</strong> {student.gender || "N/A"}</p>
        <p><strong>Email:</strong> {student.email || "N/A"}</p>
        <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
        <p><strong>Course:</strong> {student.course || "N/A"}</p>
        <p><strong>Enrollment Date:</strong> {student.enrollmentDate || "N/A"}</p>
        <p><strong>Address:</strong> {student.address || "N/A"}</p>
        <Button as={Link} to="/students" className="back-btn mt-3">
          ← Back to List
        </Button>
      </Card>

      <style>{`
        .stylish-card {
          background: linear-gradient(145deg, #ffffff, #f3f4f6);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(30, 58, 138, 0.3);
        }
        .text-gradient {
          background: linear-gradient(90deg, #1e3a8a, #14b8a6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .back-btn {
          background: linear-gradient(135deg, #1e3a8a, #14b8a6);
          border: none;
          padding: 8px 18px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(20, 58, 138, 0.6);
          transition: all 0.3s ease;
          display: inline-block;
        }
        .back-btn:hover {
          background: linear-gradient(135deg, #143374, #0f746e);
          box-shadow: 0 10px 20px rgba(15, 116, 110, 0.8);
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default StudentDetails;
