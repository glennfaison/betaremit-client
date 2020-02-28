import React from 'react';
import { Modal } from 'react-bootstrap';

function GenericModal(props) {
  const { deleteSelection, ...otherProps } = props;

  return (
    <Modal {...otherProps} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

      <Modal.Body className="text-center">
        {props.message}


        <div className="d-flex justify-content-between pt-3">
        <button className="btn btn-outline btn-outline-danger"
          onClick={() => {
            props.deleteSelection();
            props.onHide();
          }}>
          Delete
        </button>

        <button className="btn btn-outline btn-outline-primary" onClick={() => props.onHide()}>Cancel</button>
      </div>

      </Modal.Body>

    </Modal>
  );
}

export default GenericModal;