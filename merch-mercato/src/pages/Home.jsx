import React, { useContext } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import Hero from "../assets/Hero.png";
import { AuthContext } from "../firebase/AuthContext";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import Footer from "../components/Footer";

// Import images for New Arrivals section
import One from "../assets/one.png";
import Two from "../assets/two.png";
import Three from "../assets/three.png";
import Four from "../assets/four.jpg";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      navigate("/store"); // Direct user to Store if logged in
    }
  };

  return (
    <>
      <Header />
      <NavBar />

      <div className="image-wrapper text-center justify-content-center">
        <Image src={Hero} fluid alt="Hero Image" className="hero-section" />
      </div>

      {/* New Arrivals Section */}
      <Container className="my-2">
        <Row className="text-center">
          <div className="h3 pb-lg-3 mb-md-4">New Arrivals</div>

          {/* Card 1 */}
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={One}
                style={{
                  width: "100%",
                  maxWidth: "300px", // Card width
                  maxHeight: "200px", // Card height
                  objectFit: "cover", // how image looks inside the card
                }}
              />
            </Card>
          </Col>

          {/* Card 2 */}
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={Two}
                style={{
                  width: "100%",
                  maxWidth: "300px", // Card width
                  maxHeight: "200px", // Card height
                  objectFit: "cover", // how image looks inside the card
                }}
              />
            </Card>
          </Col>

          {/* Card 3 */}
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={Three}
                style={{
                  width: "100%",
                  maxWidth: "300px", // Card width
                  maxHeight: "200px", // Card height
                  objectFit: "cover", // how image looks inside the card
                }}
              />
            </Card>
          </Col>

          {/* Card 4 */}
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={Four}
                style={{
                  width: "100%",
                  maxWidth: "300px", // Card width
                  maxHeight: "200px", // Card height
                  objectFit: "cover", // how image looks inside the card
                }}
              />
            </Card>
          </Col>
        </Row>

        <div className="text-center pt-lg-4 pt-3 mt-md-3 mb-md-5">
          <Button className="go-to-store-btn" onClick={handleButtonClick}>
            Go to Store
          </Button>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Home;
