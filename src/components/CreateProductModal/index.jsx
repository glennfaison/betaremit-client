import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createProduct } from '../../store/actions';

function CreateProductModal(props) {
  const newProduct = {
    name: '',
    type: '',
    price: 0.00,
    rating: 0.0,
    warranty_years: 0,
    available: false,
  };
  const { createProduct, ...otherProps } = props;

  return (
    <Modal {...otherProps} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

      <Modal.Body className="text-center">

        {/* Name */}
        <div><strong>Name</strong></div>
        <input type="text" className="form-control" defaultValue={newProduct.name} onChange={e => newProduct.name = e.target.value} />

        {/* Type */}
        <div><strong>Product Type</strong></div>
        <input type="text" className="form-control" defaultValue={newProduct.type} onChange={e => newProduct.type = e.target.value} />

        <div className="d-flex justify-content-between align-items-end">
          <div>
            {/* Type */}
            <div><strong>Price</strong></div>
            <input type="number" min={0} step={0.01} className="form-control" defaultValue={newProduct.price} onChange={e => newProduct.price = e.target.value} />
          </div>

          <div className="p-3"></div>

          <div>
            {/* Type */}
            <div><strong>Warranty Years</strong></div>
            <input type="number" min={0} max={5} step={1} className="form-control" defaultValue={newProduct.warranty_years} onChange={e => newProduct.warranty_years = e.target.value} />
          </div>
        </div>

        <div className="checkbox d-flex justify-content-center">
          <label>
            <input type="checkbox" className="form-check form-check-inline" defaultChecked={newProduct.available} onClick={e => newProduct.available = !e.target.value} />
            Is Available?
          </label>
        </div>

        <div className="d-flex justify-content-between pt-3">
          <button className="btn btn-outline btn-outline-success"
            onClick={() => {
              props.createProduct(newProduct);
              props.onHide();
            }}>
            Save
            </button>

          <button className="btn btn-outline btn-outline-primary" onClick={() => props.onHide()}>Cancel</button>
        </div>

      </Modal.Body>

    </Modal>
  );
}

export default connect(null, {
  createProduct: createProduct,
})(CreateProductModal)