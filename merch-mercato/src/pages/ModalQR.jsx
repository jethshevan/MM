import React from "react";
import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import "./css/ModalQR.css";

function ModalQR({ show, handleClose, orderDetails, totalPrice }) {
  const qrValue = `Order Details:\n${orderDetails}\nTotal Price: $${totalPrice}`;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Confirmation QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <QRCode value={qrValue} size={256} />
        <p className="mt-3">Scan this QR code to view your order details.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-danger"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalQR;
