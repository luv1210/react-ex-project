import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Container, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/auth/actions";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "", displayName: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated || localStorage.getItem("authUser")) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((err) => ({ ...err, [e.target.name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await dispatch(register(form.email, form.password, form.displayName || undefined));
      toast.success("Registered successfully!");
      navigate("/signin");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 420 }}>
      <Card className="shadow stylish-card p-4">
        <h2 className="mb-4 text-center text-gradient">Sign Up</h2>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="displayName">
            <Form.Label>Full name (optional)</Form.Label>
            <Form.Control
              type="text"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              placeholder="Your full name"
              disabled={loading}
              className="form-input"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
              isInvalid={!!errors.email}
              required
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              isInvalid={!!errors.password}
              minLength={6}
              required
              className="form-input"
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100 btn-gradient" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" /> Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </Form>
        <div className="mt-3 text-center">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </Card>

      {/* Custom styles */}
      <style>{`
        .stylish-card {
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 8px 30px rgba(30, 58, 138, 0.1);
        }
        .text-gradient {
          background: linear-gradient(90deg, #1e3a8a, #14b8a6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .btn-gradient {
          background: linear-gradient(135deg, #1e3a8a, #14b8a6);
          border: none;
          font-weight: 600;
          padding: 10px 0;
          box-shadow: 0 5px 15px rgba(20, 58, 138, 0.6);
          transition: all 0.3s ease;
        }
        .btn-gradient:hover:not(:disabled) {
          box-shadow: 0 10px 25px rgba(20, 58, 138, 0.9);
          transform: translateY(-2px);
        }
        .form-input {
          border-radius: 10px;
          border: 1.5px solid #1e3a8a;
          transition: border-color 0.3s ease;
        }
        .form-input:focus {
          border-color: #14b8a6;
          box-shadow: 0 0 5px #14b8a6;
          outline: none;
        }
      `}</style>
    </Container>
  );
};

export default SignUp;
