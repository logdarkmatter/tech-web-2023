import React from 'react'
import Button from 'react-bootstrap/Button';
import BootStrapModal from 'react-bootstrap/Modal';

const Modal = ({isOpen, onClose, onSubmit, onSubmitText='', modalHeading='', modalBody='', onCloseText=''}) => {
  return (
      <BootStrapModal show={isOpen} onHide={onClose}>
        <BootStrapModal.Header closeButton>
          <BootStrapModal.Title><h3>{modalHeading}</h3></BootStrapModal.Title>
        </BootStrapModal.Header>
        <BootStrapModal.Body ><h4>{modalBody}</h4></BootStrapModal.Body>
        <BootStrapModal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {onCloseText}
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {onSubmitText}
          </Button>
        </BootStrapModal.Footer>
      </BootStrapModal>
  );
}

export default Modal