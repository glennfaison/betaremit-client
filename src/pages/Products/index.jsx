import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { fetchAllProducts, deleteProductById, uncheckAllProducts } from '../../store/actions';
import ProductListItem from '../../components/ProductListItem';
import GenericModal from '../../components/GenericModal';
import CreateProductModal from '../../components/CreateProductModal';

import './index.css'

class Products extends React.Component {
  state = {
    searchText: '',
    deleteActionModal: false,
    createActionModal: false,
  };

  UNSAFE_componentWillMount() {
    this.props.fetchAllProducts();
    this.props.uncheckAllProducts();
  }

  search = (txt) => {
    this.setState({ searchText: txt });
  }

  render() {
    const productList = this.props.productList.data.filter(i => {
      return i.name.includes(this.state.searchText) || i.type.includes(this.state.searchText);
    });
    return (
      <div className="container-fluid">

        <div className="row no-gutters">
          <div className="col-12 col-lg-6 mx-auto">
            <div className="row no-gutters">

              {/* Search bar */}
              <div className="input-group col-md-12 my-3 position-relative">
                <input type="text" className="form-control col-12" placeholder="Search" onChange={e => this.search(e.target.value)} />

                <span className="bg-dark rounded-right input-group-append">
                  <button className="btn btn-outline text-white" type="button">
                    <span className="fas fa-search"></span>
                  </button>
                </span>
              </div>
              {/* End search bar */}

              <ul className="list-view col-12">

                {/* Item list */}
                {productList.map((prod) => <ProductListItem key={prod.id} product={prod} />)}
                {/* End item list */}

                {/* Display if there are no list items */}
                {
                  (this.props.productList.data.length < 1 && !this.props.productList.waiting) &&
                  <div className="p-3 text-center bg-light empty-list-indicator">
                    <h3>No items found</h3>
                    <h5>Try adding one</h5>
                    <i className="fas fa-arrow-down fa-10x"></i>
                  </div>
                }

                {/* Display if data is loading */}
                {
                  (!!this.props.productList.waiting) &&
                  <div className="p-3 text-center bg-light list-loading-indicator">
                    <h3>
                      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                      Your products are loading...
                    </h3>
                  </div>
                }
              </ul>

              {/* Action button group */}
              <div className="col-12">
                <div className="form-group d-flex justify-content-between">

                  {/* Add button */}
                  <button type="button" className="btn btn-default"
                    onClick={() => this.setState({ createActionModal: true })}>
                    <i className="fas fa-plus fa-lg"></i> &nbsp; <span>Add</span>
                  </button>
                  {/* End Add button */}

                  {/* Delete button */}
                  <button type="button" className="btn btn-default"
                    onClick={() => {
                      const selectedProducts = this.props.productList.data.filter(i => i.isChecked);
                      this.setState({ deleteActionModal: selectedProducts.length > 0 });
                    }}>
                    <i className="fas fa-trash-alt fa-lg"></i> &nbsp; <span>Delete</span>
                  </button>
                  {/* End Delete button */}

                </div>
              </div>
              {/* Action button group */}

            </div>
          </div>
        </div>


        <GenericModal
          show={this.state.deleteActionModal}
          onHide={() => this.setState({ deleteActionModal: false })}
          message="Are you sure you want to delete the selected items? This action cannot be reversed!"
          deleteSelection={() => {
            const productIds = this.props.productList.data.filter(i => i.isChecked).map(i => i.id);
            this.props.deleteProductById(...productIds);
          }}
        />

        <CreateProductModal
          show={this.state.createActionModal}
          onHide={() => this.setState({ createActionModal: false })}
        />


      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  router: state.router,
  productList: state.productList,
});

export default connect(mapStateToProps, {
  fetchAllProducts: fetchAllProducts,
  deleteProductById: deleteProductById,
  uncheckAllProducts: uncheckAllProducts,
})(Products);
