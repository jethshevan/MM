import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../firebase/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import "./css/NavBar.css";

function NavBar() {
  const { currentUser } = useContext(AuthContext); // Get current user context
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle link clicks
  const handleLinkClick = (e) => {
    if (!currentUser) {
      e.preventDefault(); // Prevent default action
      navigate("/login"); // Redirect to Login page
    }
  };

  return (
    <div className="navbar-wrapper">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar-container justify-content-lg-center align-align-content-start"
      >
        <Container className="m-0 ps-3 pe-3 ps-lg-5 pe-lg-5 pt-2 pb-2 ">
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="custom-toggle ps-0 pe-0"
            variant="outline-light"
          >
            <FaBars className="toggle-icon" />
          </Navbar.Toggle>

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-center"
          >
            <Nav className="nav-links gap-2 gap-lg-5 text-lg-center">
              <Nav.Link href="/" className="nav-link" onClick={handleLinkClick}>
                Home
              </Nav.Link>
              <Nav.Link
                href="/store"
                className="nav-link"
                onClick={handleLinkClick}
              >
                Store
              </Nav.Link>
              <div className="nav-link" onClick={handleLinkClick}>
                Offers
              </div>
              <div className="nav-link" onClick={handleLinkClick}>
                About Us
              </div>
              <div className="nav-link" onClick={handleLinkClick}>
                Contact Us
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
