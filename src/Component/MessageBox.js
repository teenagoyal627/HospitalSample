import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const MessageBox = ({ showModal, handleClose,handleConfirm,title,body }) => {
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

