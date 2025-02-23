import React from "react";
import Header from "../components/Header";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
// import "./css/Cart.css"; // Better not to import it here.

function Cart() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Header />
      <NavBar />
      <Container className="my-5 mb-5">
        <h4 className="mb-4">Shopping Cart</h4>
        {cartItems.length > 0 ? (
          <>
            <Row>
              {cartItems.map((item) => (
                <Col md={12} key={item.id} className="mb-3">
                  <Card className="p-3">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img
                          src={item.imgUrl || "https://via.placeholder.com/150"}
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={5}>
                        <h5>{item.name}</h5>
                        <p className="price-text">
                          Price: ${item.price.toFixed(2)}
                        </p>
                      </Col>
                      <Col
                        xs={4}
                        className="d-flex flex-column align-items-end"
                      >
                        <ButtonGroup>
                          <Button
                            variant="outline-secondary"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <FaMinus />
                          </Button>
                          <Button variant="light" disabled>
                            {item.quantity}
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <FaPlus />
                          </Button>
                        </ButtonGroup>

                        <Button
                          className="remove mt-3 btn btn-danger"
                          onClick={() => removeItem(item.id)}
                        >
                          <FaTrash /> Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row className="mt-4">
              <Col className="text-end">
                <h4 className="total-text">Total: ${calculateTotal()}</h4>
                <Button
                  className=" mt-3 btn btn-success"
                  onClick={() => navigate("/checkout")} // Navigate to Checkout.jsx
                >
                  Proceed to Checkout
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ height: "100vh" }}>
            <p>Your cart is empty.</p>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Cart;
