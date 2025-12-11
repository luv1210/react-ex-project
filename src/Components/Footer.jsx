import React from "react";
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="custom-footer">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <h2 className="brand-name">🎓 Student Management</h2>
            <p>
              Empowering teachers and institutions with tools to manage student
              data, performance, and progress efficiently.
            </p>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/students">Students</a></li>
              <li><a href="/reports">Reports</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4>Contact</h4>
            <p>📞 +91-9876543210</p>
            <p>✉ studentmanagement@.com</p>
            <p>📍 New Delhi, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Student Management. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
