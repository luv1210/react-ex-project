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
          background: linear-gradient(180deg,var(--bg-start),var(--bg-end));
          border-radius: 12px;
          box-shadow: 0 10px 34px rgba(2,6,23,0.6);
          border: 1px solid var(--card-border);
          color: var(--text-main);
        }
        .text-gradient {
          background: linear-gradient(90deg,var(--accent-soft-start),var(--accent-soft-end));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .back-btn {
          background: linear-gradient(135deg,var(--accent-start),var(--accent-end));
          border: none;
          padding: 8px 18px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          box-shadow: 0 6px 18px rgba(var(--shadow-accent),0.16);
          transition: all 0.25s ease;
          display: inline-block;
        }
        .back-btn:hover {
          background: linear-gradient(135deg,#2b2a97,#5b21b6);
          box-shadow: 0 12px 28px rgba(var(--shadow-accent),0.22);
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default StudentDetails;
