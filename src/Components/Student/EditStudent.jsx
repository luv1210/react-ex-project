import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentById, updateStudent } from "../../Redux/Students/actions";

import { FaEdit, FaArrowLeft } from "react-icons/fa";

const EditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedStudent, loading: studentLoading } = useSelector(
    (state) => state.students
  );

  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
    phone: "",
    gender: "",
    enrollmentDate: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedStudent) {
      setForm({
        name: selectedStudent.name || "",
        age: selectedStudent.age || "",
        course: selectedStudent.course || "",
        email: selectedStudent.email || "",
        phone: selectedStudent.phone || "",
        gender: selectedStudent.gender || "",
        enrollmentDate: selectedStudent.enrollmentDate || "",
        address: selectedStudent.address || "",
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateStudent(id, { ...form, name: form.name.trim() }));
      toast.success("Student updated successfully");
      navigate("/students");
    } catch (error) {
      toast.error(error.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  if (studentLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 800, minHeight: "90vh" }}>
      <Card className="p-4 shadow-lg border-0 rounded-4 stylish-card">
        <Row className="align-items-center mb-4">
          <Col>
            <h3 className="fw-bold text-gradient mb-0">
              <FaEdit className="me-2" />
              Edit Student
            </h3>
          </Col>
          <Col className="text-end">
            <Button
              as={Link}
              to="/students"
              variant="outline-light"
              size="sm"
              className="btn-outline"
            >
              <FaArrowLeft className="me-2" />
              Student List
            </Button>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <h5 className="mb-3 section-title">Personal Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#F8FAFC" }}>Name *</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#F8FAFC" }}>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#F8FAFC" }}>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "#1E293B",
                    color: "#F8FAFC",
                    border: "1.5px solid #14B8A6",
                    borderRadius: "8px",
                  }}
                >
                  <option value="" style={{ color: "#0F172A" }}>
                    Select...
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mb-3 section-title">Contact Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#F8FAFC" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#F8FAFC" }}>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mb-3 section-title">Academic Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#F8FAFC" }}>Course</Form.Label>
                <Form.Control
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="Enter course name"
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#F8FAFC" }}>
                  Enrollment Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="enrollmentDate"
                  value={form.enrollmentDate}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mb-3 section-title">Address</h5>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              placeholder="Enter full address"
              style={inputStyle}
            />
          </Form.Group>

          <Button type="submit" className="btn-filled" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              <>
                <FaEdit className="me-2" />
                Update Student
              </>
            )}
          </Button>
        </Form>
      </Card>

      <style>{`
       /* Global Layout */
body, html, #root {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
  min-height: 100vh;
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #F8FAFC;
  overflow-x: hidden;
}

/* Glass (Frosted) Card */
.stylish-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 2rem;
  border: 1.5px solid rgba(20, 184, 166, 0.5);
  backdrop-filter: blur(14px);
  box-shadow: 0 10px 40px rgba(0, 255, 200, 0.12);
  transition: all 0.3s ease;
}

.stylish-card:hover {
  box-shadow: 0 15px 50px rgba(20, 184, 166, 0.25);
  transform: translateY(-4px);
}

/* Gradient Text */
.text-gradient {
  background: linear-gradient(90deg, #14B8A6, #5EEAD4, #14B8A6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Section Title */
.section-title {
  color: #E2E8F0;
  font-weight: 600;
  border-left: 4px solid #14B8A6;
  padding-left: 10px;
  margin-bottom: 10px;
}

/* Filled Button */
.btn-filled {
  background: linear-gradient(90deg, #14B8A6, #5EEAD4);
  color: #0F172A;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-filled:hover {
  background: linear-gradient(90deg, #0D9488, #14B8A6);
  box-shadow: 0 0 14px rgba(94, 234, 212, 0.6);
  transform: translateY(-2px);
}

/* Outline Button */
.btn-outline {
  border: 2px solid #5EEAD4;
  color: #5EEAD4;
  background: transparent;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: #14B8A6;
  border-color: #14B8A6;
  color: #0F172A;
  box-shadow: 0 0 14px rgba(94, 234, 212, 0.5);
  transform: translateY(-2px);
}

/* Smooth Scroll & Transition */
* {
  scroll-behavior: smooth;
  transition: all 0.25s ease;
}

      `}</style>
    </Container>
  );
};

const inputStyle = {
  backgroundColor: "#1E293B",
  border: "1.5px solid #14B8A6",
  color: "#F8FAFC",
  borderRadius: "8px",
  padding: "8px 12px",
};

export default EditStudent;
