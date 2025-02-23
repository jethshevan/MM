import React, { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaBell, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../firebase/auth";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../firebase/AuthContext"; // Import AuthContext
import "./css/Header.css";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleUserIconClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleAuthButtonClick = async () => {
    if (isUserLoggedIn) {
      await logOut();
    } else {
      navigate("/login");
    }
    setDropdownVisible(false);
  };

  // Function to handle link clicks
  const handleLinkClick = (e) => {
    if (!isUserLoggedIn) {
      e.preventDefault(); // Prevent default action
      navigate("/login"); // Redirect to Login page
    }
  };

  return (
    <header className="header-container pt-2 pt-lg-3 pb-lg-3 pb-2 ps-3 pe-3 ps-lg-5 pe-lg-5">
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          <Col xs="auto" className="p-0">
            <Link to="/" className="brand-name-link">
              <h1 className="brand-name">Merch Mercato</h1>
            </Link>
          </Col>
          <Col xs="auto" className="text-end">
            <div className="icon-container">
              <FaBell className="header-icon" onClick={handleLinkClick} />
              <Link to="/cart" className="cart-link" onClick={handleLinkClick}>
                <FaShoppingCart className="header-icon" />
              </Link>
              <FaUser className="header-icon" onClick={handleUserIconClick} />
              {isDropdownVisible && (
                <div ref={dropdownRef} className="user-dropdown">
                  <button className="auth-btn" onClick={handleAuthButtonClick}>
                    {isUserLoggedIn ? "Logout" : "Login"}
                  </button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
