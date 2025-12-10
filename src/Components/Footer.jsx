import React from "react";
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

          <div className="footer-col">
            <h4>Contact</h4>
            <p>📞 +91-9876543210</p>
            <p>✉ info@studentmanagement.com</p>
            <p>📍 New Delhi, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Student Management. All Rights Reserved.
        </div>
      </footer>

      <style>{`
        .custom-footer {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  color: #fff;
  padding: 4rem 1rem 2rem;
  margin-top: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border-top: 1px solid rgba(20, 184, 166, 0.2);
}

/* Brand & Headings in Teal */
.brand-name {
  background: linear-gradient(90deg, #14B8A6 0%, #0EA5E9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-col h4 {
  color: #14B8A6;
}

.footer-col h4::after {
  background: linear-gradient(90deg, #14B8A6 0%, #0EA5E9 100%);
}

.footer-links a:hover {
  color: #14B8A6;
}

.social-icons a:hover {
  background: linear-gradient(135deg, #14B8A6 0%, #0EA5E9 100%);
  box-shadow: 0 5px 15px rgba(20, 184, 166, 0.3);
}
      `}</style>
    </>
  );
};

export default Footer;
