import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIoClient from 'socket.io-client';

import HelloComponent from '../components/HelloComponent';
import NavBar from '../components/NavBar';
import { Routes, Settings } from '../constants';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import { fetchThisUser, fetchAllProducts } from '../store/actions';
import { history } from '../store';

const socket = socketIoClient(Settings.apiRoot);

function PostAuthLayout(props) {
  if (!props.thisUser.data && !props.waiting) {
    return (<React.Fragment></React.Fragment>);
  }

  // If we receive the `productsChanged` event, refresh the product list
  socket.on('productsChanged', () => {
    console.log('Products Changed');
    props.fetchAllProducts();
  });

  return (
    <div className="container-fluid" id="page-container">

      {/* Navbar */}
      <NavBar />
      {/* Navbar */}

      <section className="row">
        <Router history={history}>
          <Switch>
            <Route exact path={Routes.products} component={Products} />
            <Route exact path={Routes.error} component={HelloComponent} />
            <Route exact path={Routes.notFound} component={HelloComponent} />

            <Route exact path={Routes.login} component={Login} />
            <Route exact path={Routes.root} component={Login} />
            <Route exact path={Routes.register} component={Register} />
            <Redirect to={Routes.notFound} />
          </Switch>
        </Router>
      </section>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  thisUser: state.thisUser,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchThisUser: () => dispatch(fetchThisUser()),
  fetchAllProducts: () => dispatch(fetchAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostAuthLayout);