import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./css/SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is already registered
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      alert("This email is already registered. Redirecting to Login page.");
      navigate("/login", { state: { email } }); // Pass email to Login page
      return; // Exit the function if the user is already registered
    }

    // Validate password pattern
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      setPassword(""); // Clear the password field
      return; // Exit if the password is invalid
    }

    // Proceed with signup if email is not registered and password is valid
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to the home page after successful signup
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Redirecting to Login page.");
        navigate("/login", { state: { email } }); // Pass email to Login page
      } else {
        console.error("Error signing up:", error);
        alert("Error signing up: " + error.message); // Show error message to user
      }
    }
  };

  return (
    <Container fluid className="signup-container">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={10} sm={8} md={6} lg={5} xl={4}>
          <div className="signup-card">
            <h1 className="signup-heading">Register</h1>
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
              </Form.Group>
              <Button type="submit" className="signup-button w-100 mt-3">
                Sign Up
              </Button>
            </Form>
            <div className="mt-3 text-center">
              Already have an account?{" "}
              <Link style={{ textDecoration: "none" }} to="/login">
                Login
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
