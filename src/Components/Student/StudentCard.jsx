import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const StudentCard = ({ student, onDelete }) => {
  const initials = student.name
    ? student.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "?";

  return (
    <Card
      className="border-0 rounded-4 shadow-lg student-card"
      style={{
        maxWidth: "350px",
        height: "auto",
        width: "100%",
        cursor: "pointer",
        margin: "auto",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Gradient Header */}
      <div className="card-header-initials">{initials}</div>

      <Card.Body
        className="d-flex flex-column justify-content-between"
        style={{ padding: "1rem 1.25rem 1rem 1.25rem" }}
      >
        <Card.Title
          className="fw-bold text-gradient mb-2"
          style={{ fontSize: "1.1rem", lineHeight: 1.2 }}
        >
          {student.name}
        </Card.Title>

        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            flexGrow: 1,
            lineHeight: 1.3,
          }}
        >
          <p style={{ marginBottom: "4px" }}>
            <strong>Course:</strong> {student.course || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Age:</strong> {student.age || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Gender:</strong> {student.gender || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Email:</strong> {student.email || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Phone:</strong> {student.phone || "N/A"}
          </p>
          <p style={{ marginBottom: "4px" }}>
            <strong>Enrollment Date:</strong> {student.enrollmentDate || "N/A"}
          </p>
          <p style={{ marginBottom: "0" }}>
            <strong>Address:</strong> {student.address || "N/A"}
          </p>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-between mt-3">
          <Button
            as={Link}
            to={`/students/${student.id}`}
            variant="navy-teal"
            size="sm"
            className="rounded-3 d-flex align-items-center gap-2 px-3"
          >
            <FaEye /> View
          </Button>
          <Button
            as={Link}
            to={`/students/edit/${student.id}`}
            variant="warning"
            size="sm"
            className="rounded-3 d-flex align-items-center gap-2 px-3 btn-edit"
          >
            <FaEdit /> Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="rounded-3 d-flex align-items-center gap-2 px-3"
            style={{
              transition: "all 0.2s ease",
            }}
            onClick={() => onDelete(student.id)}
          >
            <FaTrash /> Delete
          </Button>
        </div>
      </Card.Body>

      {/* Fade-in Animation & Custom Button Variant */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .student-card {
          animation: fadeIn 0.5s ease;
          box-shadow: 0 10px 34px rgba(2,6,23,0.6);
          border: 1px solid var(--card-border);
          background: linear-gradient(180deg,var(--bg-start),var(--bg-end));
          color: var(--text-main);
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .student-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 48px rgba(59,53,161,0.18);
        }
        .card-header-initials {
          background: linear-gradient(135deg,var(--accent-start),var(--accent-end));
          color: #fff;
          padding: 0.75rem 1rem;
          font-size: 1.25rem;
          text-align: center;
          font-weight: 700;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          user-select: none;
        }
        .text-gradient {
          background: linear-gradient(90deg,var(--accent-soft-start),var(--accent-soft-end));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .student-card .card-body { padding: 1rem 1.25rem; }

        /* Custom Button Variant for Navy-Teal */
        .btn-navy-teal {
          background: linear-gradient(135deg,var(--accent-start),var(--accent-end));
          border: none;
          color: white;
          font-weight: 600;
          box-shadow: 0 6px 18px rgba(var(--shadow-accent),0.12);
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-navy-teal:hover, .btn-navy-teal:focus {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(var(--shadow-accent),0.22);
          color: white;
        }

        /* Edit button style */
        .btn-edit {
          background: #fbbf24 !important;
          border: none !important;
          color: #1e3a8a !important;
          box-shadow: 0 6px 16px rgba(251,191,36,0.16) !important;
          transition: all 0.22s ease !important;
        }
        .btn-edit:hover {
          background: #f59e0b !important;
          color: #fff !important;
          transform: translateY(-2px) !important;
        }
      `}</style>
    </Card>
  );
};

export default StudentCard;
