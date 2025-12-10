import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/auth/actions";
import logo from "../assets/logo.webp";
import {
  FaHome,
  FaUserGraduate,
  FaPlusCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <style>{`
     /* Cyberpunk/Dark Theme */
.navbar-custom {
  background: linear-gradient(90deg, #000000, #0a0a0a);
  border-bottom: 1px solid rgba(20, 184, 166, 0.3);
  box-shadow: 0 0 30px rgba(20, 184, 166, 0.2);
  padding: 0.5rem 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.navbar-custom .navbar-brand {
  color: #FFFFFF !important;
  font-weight: 800;
  font-size: 1.6rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #14B8A6, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(20, 184, 166, 0.5);
}

.navbar-custom .nav-link {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 600;
  margin: 0 0.75rem;
  padding: 0.5rem 1rem !important;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.navbar-custom .nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #14B8A6, #8B5CF6);
  transition: width 0.3s ease;
}

.navbar-custom .nav-link:hover {
  color: #FFFFFF !important;
  text-shadow: 0 0 10px rgba(20, 184, 166, 0.8);
}

.navbar-custom .nav-link:hover::before {
  width: 100%;
}

.navbar-custom .nav-link.active {
  color: #FFFFFF !important;
  background: rgba(20, 184, 166, 0.1);
  border-radius: 4px;
  text-shadow: 0 0 15px rgba(20, 184, 166, 1);
}

.navbar-custom .nav-link.active::before {
  width: 100%;
  box-shadow: 0 0 10px #14B8A6;
}

.navbar-custom .btn-neon {
  background: transparent;
  border: 2px solid #14B8A6;
  color: #14B8A6;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.navbar-custom .btn-neon:hover {
  background: rgba(20, 184, 166, 0.1);
  color: #FFFFFF;
  text-shadow: 0 0 10px #14B8A6;
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.5);
  transform: translateY(-2px);
}

.navbar-custom .btn-neon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.3), transparent);
  transition: left 0.5s ease;
}

.navbar-custom .btn-neon:hover::before {
  left: 100%;
}

.navbar-custom .navbar-text {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: rgba(20, 184, 166, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(20, 184, 166, 0.3);
}

/* Glowing Elements */
.navbar-custom .glow-effect {
  position: relative;
}

.navbar-custom .glow-effect::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #14B8A6, #8B5CF6, #14B8A6);
  z-index: -1;
  filter: blur(5px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.navbar-custom .glow-effect:hover::after {
  opacity: 1;
}

/* Mobile Responsive */
@media (max-width: 991px) {
  .navbar-custom {
    background: #000000;
  }
  
  .navbar-custom .nav-link {
    margin: 0.5rem 0;
    padding: 1rem !important;
    border-left: 3px solid transparent;
  }
  
  .navbar-custom .nav-link.active {
    border-left: 3px solid #14B8A6;
    background: rgba(20, 184, 166, 0.1);
  }
  
  .navbar-custom .nav-link::before {
    display: none;
  }
}
      `}</style>

      <BSNavbar expand="lg" className="navbar-custom" sticky="top" variant="dark">
        <Container>
          <BSNavbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center text-white fw-bold"
          >
            <img
              src={logo}
              alt="Student Management Logo"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
          </BSNavbar.Brand>
          <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BSNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <FaHome /> Home
              </Nav.Link>

              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/students">
                    <FaUserGraduate /> Students
                  </Nav.Link>
                  <Nav.Link as={Link} to="/students/add">
                    <FaPlusCircle /> Add Student
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav>
              {isAuthenticated ? (
                <>
                  <span className="navbar-text me-3">
                    Welcome, {user?.displayName || user?.email || "User"}
                  </span>
                  <Button variant="outline-light" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-light"
                    className="me-2"
                    as={Link}
                    to="/signin"
                  >
                    <FaSignInAlt /> Login
                  </Button>
                  <Button variant="light" as={Link} to="/signup">
                    <FaUserPlus /> Register
                  </Button>
                </>
              )}
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
    </>
  );
};

export default Navbar;
