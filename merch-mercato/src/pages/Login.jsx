import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Set email from location state if available
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password. Please check your credentials."); // Show error message to user
    }
  };

  return (
    <Container fluid className="signup-container">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={10} sm={8} md={6} lg={5} xl={4}>
          <div className="signup-card">
            <h1 className="signup-heading">Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link to="#" className="forgot-password">
                  Forgot password?
                </Link>
              </Form.Group>
              <Button type="submit" className="signup-button w-100 mt-3">
                Login
              </Button>
            </Form>
            <div className="mt-3 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="signup-link"
                style={{ textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
