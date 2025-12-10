import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { addStudent } from "../../Redux/Students/actions";
import { toast } from "react-toastify";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }
    if (!formData.course.trim()) newErrors.course = "Course is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await dispatch(addStudent({ ...formData, age: Number(formData.age) }));
      toast.success("Student added successfully!");
      navigate("/students");
    } catch (error) {
      toast.error(error.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ minHeight: "90vh" }}>
      <Card className="shadow-lg border-0 rounded-4 stylish-card">
        <Card.Body>
          <h2 className="text-center mb-4 text-gradient">Add New Student</h2>

          {Object.keys(errors).length > 0 && (
            <Alert variant="danger">Please fix the errors below</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#F8FAFC" }}>Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                style={inputStyle}
                placeholder="Enter full name"
              />
              <Form.Control.Feedback type="invalid" style={errorStyle}>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#F8FAFC" }}>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                style={inputStyle}
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid" style={errorStyle}>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#F8FAFC" }}>Age *</Form.Label>
              <Form.Control
                type="number"
                name="age"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                isInvalid={!!errors.age}
                style={inputStyle}
                placeholder="Enter age"
              />
              <Form.Control.Feedback type="invalid" style={errorStyle}>
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#F8FAFC" }}>Course *</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                isInvalid={!!errors.course}
                style={inputStyle}
                placeholder="Enter course"
              />
              <Form.Control.Feedback type="invalid" style={errorStyle}>
                {errors.course}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#F8FAFC" }}>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                style={inputStyle}
                placeholder="https://example.com/student.jpg"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" disabled={loading} className="btn-filled">
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Adding Student...
                  </>
                ) : (
                  "Add Student"
                )}
              </Button>
              <Button
                variant="outline-light"
                onClick={() => navigate("/students")}
                className="btn-outline"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <style>{`
body, html, #root {
  background: linear-gradient(90deg, #1e1b4b, #4c1d95);
}

.stylish-card {
  border: 1.5px solid #8b5cf6;
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
}

.text-gradient {
  background: linear-gradient(90deg, #1e1b4b, #8b5cf6);
}

.btn-filled {
  background: #ede9fe;
  color: #1e1b4b;
}

.btn-filled:hover {
  background: #ddd6fe;
  box-shadow: 0 0 12px #8b5cf6;
}

.btn-outline {
  border: 1.5px solid #f5f3ff;
  color: #f5f3ff;
}

.btn-outline:hover {
  background: #8b5cf6;
  border-color: #8b5cf6;
  color: #ffffff;
}
      `}</style>
    </div>
  );
};

const inputStyle = {
  backgroundColor: "#1E293B",
  border: "1.5px solid #14B8A6",
  color: "#F8FAFC",
  borderRadius: "8px",
  padding: "8px 12px",
};

const errorStyle = {
  color: "#F87171", // a soft red for error text
};

export default AddStudent;
