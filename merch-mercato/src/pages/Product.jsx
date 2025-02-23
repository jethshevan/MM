import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import "./css/Product.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "mmproducts", id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.error("No such product found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert(`Added ${quantity} of ${product.name} to cart.`);
  };

  if (!product)
    return <div style={{ height: "100vh" }}>Loading product details...</div>;

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <>
      <Header />
      <NavBar />
      <Container className="my-5" style={{ minHeight: "75vh" }}>
        <Row>
          {/* Image Column */}
          <Col
            xs={12}
            md={6}
            className="d-flex justify-content-center mb-3 mb-md-0"
          >
            <img
              src={product.imgUrl || "https://via.placeholder.com/300"}
              alt={product.title}
              className="product-image"
            />
          </Col>

          {/* Product Details Column */}
          <Col xs={12} md={6}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>

            {/* Quantity Control and Total Price */}
            <div className="my-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <h5 className="me-3">Quantity:</h5>
                <ButtonGroup>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <FaMinus />
                  </Button>
                  <Button variant="light" disabled>
                    {quantity}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <FaPlus />
                  </Button>
                </ButtonGroup>
              </div>

              <h4>${totalPrice}</h4>
            </div>

            {/* Add to Cart Button */}
            <div className="d-flex justify-content-end mt-3">
              <Button className="gradient-btn" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Product;
