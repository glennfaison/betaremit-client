import React from 'react';
import { connect } from 'react-redux';

import { checkProduct } from '../../store/actions';
// import { Routes } from '../../constants';
// import { Link } from 'react-router-dom';

import './index.css';
import ProductDetailsModal from '../ProductDetailsModal';

function ProductListItem(props) {
  const product = props.product;
  const [modalShow, setModalShow] = React.useState(false);
  const [isChecked, toggleCheck] = React.useState(product.isChecked);
  return (
    <div className="product-list-item d-flex justify-content-stretch align-content-stretch">
      <div className="checkbox justify-content-center" onClick={() => {
        props.checkProduct(props.index);
        toggleCheck(!isChecked);
      }}>
        <span className="position-relative">
          <input type="checkbox" className="form-control-lg"
            defaultChecked={isChecked} />
          {/*<i className={isChecked ? 'far fa-check-square fa-lg' : 'far fa-square fa-lg'}></i>*/}
        </span>
      </div>

      <div className="body p-1 clickable" onClick={() => setModalShow(true)}>
        <b>{product.name}</b>
        <i className="d-block">{product.type}</i>
        <small className="small d-block">$ {product.price}</small>
      </div>

      <div className="rating p-2">
        <small className="small d-block">{product.available ? 'Available' : 'Unavailable'}</small>
        <i className="d-block"><strong>Rating:</strong> {product.rating}</i>
      </div>


      <ProductDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        index={props.index}
      />


    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {
  checkProduct,
})(ProductListItem);
