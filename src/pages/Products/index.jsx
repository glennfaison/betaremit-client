import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';
import { fetchAllProducts } from '../../store/actions';

// import { Routes } from '../../constants';
// import { Link } from 'react-router-dom';
import './index.css'
import ProductListItem from '../../components/ProductListItem';

class Products extends React.Component {
  state = {
    searchText: '',
  };

  UNSAFE_componentWillMount() {
    this.props.fetchAllProducts();
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

        {/* Navbar */}
        <NavBar />
        {/* Navbar */}

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
                {productList.map((prod, i) => <ProductListItem key={i} index={i} product={prod} />)}
                {/* End item list */}
              </ul>

              {/* Action button group */}
              <div className="col-12">
                <div className="form-group d-flex justify-content-between">

                  {/* Add button */}
                  <button type="button" className="btn btn-default">
                    <i className="fas fa-plus fa-lg"></i> &nbsp; <span>Add</span>
                  </button>
                  {/* End Add button */}

                  {/* Delete button */}
                  <button type="button" className="btn btn-default">
                    <i className="fas fa-trash-alt fa-lg"></i> &nbsp; <span>Delete</span>
                  </button>
                  {/* End Delete button */}

                </div>
              </div>
              {/* Action button group */}

            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  router: state.router,
  productList: state.productList,
});

export default connect(mapStateToProps, {
  fetchAllProducts,
})(Products);
