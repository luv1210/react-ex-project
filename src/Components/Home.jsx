import React from "react";
import { useSelector } from "react-redux";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaSearch, FaChartBar } from "react-icons/fa";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const carouselCaptionStyle = {
    background: "rgba(11, 25, 59, 0.65)", 
    padding: "20px",
    borderRadius: "12px",
  };

  const featureCardStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "none",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(27, 19, 19, 0.08)",
  };

  const featureIconStyle = {
    fontSize: "3rem",
    marginBottom: "15px",
    color: "#3e635fff", 
  };

  const sectionTitleStyle = {
    fontWeight: "bold",
    color: "#091328ff",
    textTransform: "uppercase",
    letterSpacing: "2px",
  };

  const ctaBtnStyle = {
    padding: "12px 30px",
    fontSize: "1.1rem",
    fontWeight: "bold",
  };

  return (
    <div className="home-page">
      <style>{`
        .feature-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>

      {/* Carousel Section */}
      <Carousel fade interval={3000}>
        {[
          {
            img: "https://beams360.com/wp-content/uploads/2024/08/School-Management-system-02-1170x580.jpg",
            title: " Student Management System",
            text: "Efficiently manage student records with our powerful system",
          },
          {
            img: "https://sanako.com/wp-content/uploads/2024/01/Teaching-digital-literacy-in-school-1024x683.jpg",
            title: "Track Student Progress",
            text: "Monitor and analyze student performance easily",
          },
          {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhr58Z9vgA5bPs1EAYTK2g03Lp7h2PFRK5bw&s",
            title: "Generate Reports",
            text: "Get detailed insights on student performance and attendance",
          },
        ].map((slide, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={slide.img}
              alt={slide.title}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption style={carouselCaptionStyle}>
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center mb-5" style={sectionTitleStyle}>
          ✨ Key Features ✨
        </h2>
        <Row>
          {[
            {
              icon: <FaUserGraduate style={featureIconStyle} />,
              title: "Student Records",
              text: "Manage all student information in one centralized location.",
            },
            {
              icon: <FaSearch style={featureIconStyle} />,
              title: "Advanced Search",
              text: "Quickly find students with our powerful search and filter tools.",
            },
            {
              icon: <FaChartBar style={featureIconStyle} />,
              title: "Reports",
              text: "Generate detailed reports on student performance and attendance.",
            },
          ].map((feature, index) => (
            <Col md={4} className="mb-4" key={index}>
              <Card className="h-100 feature-card" style={featureCardStyle}>
                <Card.Body className="text-center">
                  {feature.icon}
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Call to Action Section */}
      <div
        className="py-5"

      >
        <Container className="text-center text-dark">
          <h2 className="mb-4">Ready to get started?</h2>
          {isAuthenticated ? (
            <Button
              as={Link}
              to="/students"
              size="lg"
              style={{
                background: "#14B8A6",    
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                fontSize: "1.2rem",
                borderRadius: "8px"
              }}
            >
              Manage Students
            </Button>

          ) : (
            <div>
              <Button
                as={Link}
                to="/signup"
                variant="light"
                size="lg"
                className="me-3"
                style={ctaBtnStyle}
              >
                Sign Up Now
              </Button>
              <Button
                as={Link}
                to="/signin"
                variant="outline-light"
                size="lg"
                style={ctaBtnStyle}
              >
                Sign In
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;
