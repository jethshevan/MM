import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "./css/str.css";

function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "mmproducts");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        quantity: 1,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateQuantity = (id, increment) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + increment) }
          : product
      )
    );
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center">No products available.</div>;
  }

  return (
    <>
      <Header />
      <NavBar />
      <Container className="my-2 mb-5">
        <Row className="mt-4">
          {products.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <Card
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={product.imgUrl || "https://via.placeholder.com/150"}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text style={{ fontSize: "1.2rem" }}>
                    ${product.price.toFixed(2)}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center">
                    <ButtonGroup>
                      <Button
                        variant="outline-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.id, -1);
                        }}
                        disabled={product.quantity === 1}
                      >
                        -
                      </Button>
                      <Button variant="light" disabled>
                        {product.quantity}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(product.id, 1);
                        }}
                      >
                        +
                      </Button>
                    </ButtonGroup>
                    <Button
                      className="gradient-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Store;
