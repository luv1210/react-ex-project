import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, googleSignIn } from "../../Redux/auth/actions";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated || localStorage.getItem("authUser")) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await dispatch(login(email, password));
      toast.success("Signed in successfully!");
      navigate("/");
      return user;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(googleSignIn());
      toast.success("Signed in with Google successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow stylish-card">
            <Card.Body>
              <h2 className="text-center mb-4 text-gradient">Sign In</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="form-input"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btn-gradient"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Button
                  variant="outline-danger"
                  onClick={handleGoogleSignIn}
                  className="w-100 btn-google"
                  disabled={loading}
                >
                  <FaGoogle className="me-2" />
                  Sign In with Google
                </Button>
              </div>

              <div className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
        .btn-google {
          border: 2px solid #dc3545;
          color: #dc3545;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .btn-google:hover:not(:disabled) {
          background: #dc3545;
          color: white;
          box-shadow: 0 10px 20px rgba(220, 53, 69, 0.8);
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

export default SignIn;
