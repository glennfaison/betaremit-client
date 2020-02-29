import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';

import { updateProductById } from '../../store/actions';

function ProductDetailsModal(props) {
  const [editMode, toggleEdit] = React.useState(false);
  let [yourRating, setYourRating] = React.useState(0);

  const product = { ...props.product };
  const { updateProductById, ...otherProps } = props;

  return (
    <Modal {...otherProps} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

      {/* Display only if editMode === false */}
      {
        editMode ||
        <Modal.Body className="text-center">

          {/* Star Rating */}
          <div><strong>Rating</strong></div>
          <div>
            <StarRatings rating={props.product.rating}
              starRatedColor="blue"
              numberOfStars={5}
              name="rating"
              starDimension="2em"
              starSpacing=".2em"
              isAggregateRating={false}
              isSelectable={false}
            />
          </div>
          {/* End Star Rating */}

          {/* Name */}
          <div><strong>Name</strong></div>
          <h4>{props.product.name}</h4>

          {/* Type */}
          <div><strong>Product Type</strong></div>
          <h4>{props.product.type}</h4>

          <div className="d-flex justify-content-between align-items-end">
            <div>
              {/* Type */}
              <div><strong>Price</strong></div>
              <h4>$ {props.product.price}</h4>
            </div>

            <div className="p-3"></div>

            <div>
              {/* Type */}
              <div><strong>Warranty Years</strong></div>
              <h4>{props.product.warranty_years} years</h4>
            </div>
          </div>

          <div className="checkbox d-flex justify-content-center">
            <label>
              This product is {props.product.available ? 'Available' : 'Unavailable'} at the moment
            </label>
          </div>

          <div className="d-flex justify-content-center pt-3">
            <button className="btn btn-outline btn-outline-primary"
              onClick={() => toggleEdit(!editMode)}>
              Edit Product
            </button>
          </div>

        </Modal.Body>
      }

      {/* Display only if editMode === true */}
      {
        editMode &&
        <Modal.Body className="text-center">

          {/* Star Rating */}
          <div><strong>Rating</strong></div>
          <div>
            <StarRatings rating={yourRating}
              starRatedColor="blue"
              changeRating={setYourRating}
              numberOfStars={5}
              name="rating"
              starDimension="2em"
              starSpacing=".2em"
              isAggregateRating={false}
              isSelectable={true}
            />
          </div>
          {/* End Star Rating */}

          {/* Name */}
          <div><strong>Name</strong></div>
          <input type="text" className="form-control" defaultValue={props.product.name} onChange={e => product.name = e.target.value} />

          {/* Type */}
          <div><strong>Product Type</strong></div>
          <input type="text" className="form-control" defaultValue={props.product.type} onChange={e => product.type = e.target.value} />

          <div className="d-flex justify-content-between align-items-end">
            <div>
              {/* Type */}
              <div><strong>Price</strong></div>
              <input type="number" min={0} step={0.01} className="form-control" defaultValue={props.product.price} onChange={e => product.price = e.target.value} />
            </div>

            <div className="p-3"></div>

            <div>
              {/* Type */}
              <div><strong>Warranty Years</strong></div>
              <input type="number" min={0} max={5} step={1} className="form-control" defaultValue={props.product.warranty_years} onChange={e => product.warranty_years = e.target.value} />
            </div>
          </div>

          <div className="checkbox d-flex justify-content-center">
            <label>
              <input type="checkbox" className="form-check form-check-inline" defaultChecked={props.product.available} onClick={e => product.available = !e.target.value} />
              {props.product.available ? 'Available' : 'Unavailable'}
            </label>
          </div>

          <div className="d-flex justify-content-between pt-3">
            <button className="btn btn-outline btn-outline-primary"
              onClick={() => {
                product.rating = yourRating;
                props.updateProductById(product);
                props.onHide();
                setYourRating(0);
                toggleEdit(!editMode);
              }}>
              Save
            </button>

            <button className="btn btn-outline btn-outline-primary" onClick={() => toggleEdit(!editMode)}>Cancel</button>
          </div>

        </Modal.Body>
      }

    </Modal>
  );
}

export default connect(null, {
  updateProductById,
})(ProductDetailsModal)