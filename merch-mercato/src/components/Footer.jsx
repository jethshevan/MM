// Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./css/Footer.css";

function Footer() {
  return (
    <footer className="footer-gradient text-light py-4">
      <Container>
        <Row className="align-items-start">
          {/* What We Do Section */}
          <Col
            xs={12}
            md={4}
            className="text-center text-md-start mb-4 mb-md-0"
          >
            <h5>What We Do</h5>
            <p>
              We are a passionate start-up e-commerce platform that provides a
              marketplace for Artists and Influencers to sell merchandise to
              their fans.
            </p>
          </Col>

          {/* Centered Quick Links Section */}
          <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <div
                  to="/about"
                  className="text-light text-decoration-none fw-bold"
                >
                  About
                </div>
              </li>
              <li className="mb-2">
                <div
                  to="/contact"
                  className="text-light text-decoration-none fw-bold"
                >
                  Contact
                </div>
              </li>
              <li className="mb-2">
                <div
                  to="/faq"
                  className="text-light text-decoration-none fw-bold"
                >
                  FAQ
                </div>
              </li>
            </ul>
          </Col>

          {/* Follow Us Section */}
          <Col
            xs={12}
            md={4}
            className="text-md-end d-flex flex-column align-items-center align-items-md-end"
          >
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light me-3"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light me-3"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="bg-light" />

        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Merch Mercato. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
