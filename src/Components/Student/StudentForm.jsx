import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Row,
  Col
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../Config/firebaseConfig";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";

import { FaPlus, FaEdit, FaArrowLeft } from "react-icons/fa";

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
    phone: "",
    gender: "",
    enrollmentDate: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (id) {
        try {
          const docRef = doc(db, "students", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setForm(docSnap.data());
          } else {
            toast.error("Student not found");
            navigate("/students");
          }
        } catch {
          toast.error("Failed to load student");
        }
      }
    };
    fetchStudent();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await updateDoc(doc(db, "students", id), {
          ...form,
          name: form.name.trim(),
        });
        toast.success("Student updated successfully");
      } else {
        await addDoc(collection(db, "students"), {
          ...form,
          name: form.name.trim(),
        });
        toast.success("Student added successfully");
      }
      navigate("/students");
    } catch (error) {
      toast.error(error.message || "Failed to save student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 800 }}>
      <Card className="p-4 shadow-lg border-0 rounded-4 stylish-card m-5">
        <Row className="align-items-center mb-4">
          <Col>
            <h3 className="fw-bold text-gradient mb-0">
              {id ? (
                <>
                  <FaEdit className="me-2" />
                  Edit Student
                </>
              ) : (
                <>
                  <FaPlus className="me-2" />
                  Add New Student
                </>
              )}
            </h3>
          </Col>
          <Col className="text-end">
            <Button
              as={Link}
              to="/students"
              variant="outline-primary"
              size="sm"
              className="student-list-btn"
            >
              <FaArrowLeft className="me-2" />
              Student List
            </Button>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <h5 className="mb-3 section-title">Personal Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Contact Information */}
          <h5 className="mb-3 section-title">Contact Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Academic Information */}
          <h5 className="mb-3 section-title">Academic Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course</Form.Label>
                <Form.Control
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="Enter course name"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enrollment Date</Form.Label>
                <Form.Control
                  type="date"
                  name="enrollmentDate"
                  value={form.enrollmentDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Address */}
          <h5 className="mb-3 section-title">Address</h5>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              placeholder="Enter full address"
            />
          </Form.Group>

          {/* Submit Button */}
          <Button type="submit" className="save-btn" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : id ? (
              <>
                <FaEdit className="me-2" />
                Update Student
              </>
            ) : (
              <>
                <FaPlus className="me-2" />
                Add Student
              </>
            )}
          </Button>
        </Form>
      </Card>

      {/* Custom CSS */}
      <style>{`
        .stylish-card {
          background: linear-gradient(145deg, #ffffff, #f3f4f6);
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .text-gradient {
          background: linear-gradient(90deg, #1e3a8a, #14b8a6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-title {
          font-weight: 600;
          color: #555;
          border-left: 4px solid #1e3a8a;
          padding-left: 8px;
        }
        .save-btn {
          background: linear-gradient(135deg, #1e3a8a, #14b8a6);
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 500;
          box-shadow: 0 5px 15px rgba(20, 58, 138, 0.6);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: white;
        }
        .save-btn:hover {
          background: linear-gradient(135deg, #143374, #0f746e);
          box-shadow: 0 10px 20px rgba(15, 116, 110, 0.8);
          transform: translateY(-2px);
        }
        .student-list-btn {
          font-weight: 600;
          border-radius: 12px;
          padding: 6px 14px;
          box-shadow: 0 3px 10px rgba(30, 58, 138, 0.4);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #1e3a8a;
          border: 1.5px solid #1e3a8a;
          background: transparent;
        }
        .student-list-btn:hover {
          background: linear-gradient(135deg, #1e3a8a, #14b8a6);
          color: white;
          box-shadow: 0 5px 15px rgba(20, 58, 138, 0.6);
          transform: translateY(-2px);
          border-color: #143374;
        }
      `}</style>
    </Container>
  );
};

export default StudentForm;
