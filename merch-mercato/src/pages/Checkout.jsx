import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import ModalQR from "./ModalQR"; // Import the ModalQR component
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "./css/Checkout.css";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderDetails = cartItems
      .map(
        (item) => `${item.name} x ${item.quantity} @ $${item.price.toFixed(2)}`
      )
      .join("\n");

    emailjs
      .send(
        "service_v1yrwvd",
        "template_hi5leeg",
        {
          to_name: name,
          to_email: email,
          to_phone: `${countryCode} ${phone}`,
          to_address: address,
          order_details: orderDetails,
          total_price: totalPrice.toFixed(2),
        },
        "8ZkztgLNHjOeMFEsM"
      )
      .then(() => {
        setShowModal(true); // Show the QR code modal before alerting
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        alert("There was an issue with placing the order.");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearCart(); // Clear cart after closing the modal
    alert("Order placed successfully! An email has been sent.");
    navigate("/store"); // Redirect to store after showing alert
  };

  return (
    <>
      <Header />
      <NavBar />
      <Container className="my-3 mb-5">
        <h4 className="text-start mb-4">Checkout</h4>
        <Card className="mb-4">
          <Card.Header>Order Summary</Card.Header>
          <Card.Body>
            <Card.Title>Types of Item: {cartItems.length}</Card.Title>
            <Card.Text>
              Total Price: <strong>${totalPrice.toFixed(2)}</strong>
            </Card.Text>
            <Card.Text>
              You are about to purchase the following items:
            </Card.Text>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} @ ${item.price.toFixed(2)} each
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={2} className="d-flex">
              <Form.Group
                controlId="formCountryCode"
                className="flex-grow-1 me-2"
              >
                <Form.Label>Country Code</Form.Label>
                <Form.Control
                  type="text"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  required
                  style={{ height: "38px" }}
                />
              </Form.Group>
            </Col>

            <Col md={4} className="d-flex">
              <Form.Group controlId="formPhone" className="flex-grow-1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ height: "38px" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={{ height: "88px" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            type="submit"
            size="sm"
            className="btn btn-success place-order-btn w-25 d-block mb-4 "
          >
            Place Order
          </Button>
        </Form>

        <ModalQR
          show={showModal}
          handleClose={handleCloseModal}
          orderDetails={cartItems
            .map(
              (item) =>
                `${item.name} x ${item.quantity} @ $${item.price.toFixed(2)}`
            )
            .join("\n")}
          totalPrice={totalPrice.toFixed(2)}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Checkout;
