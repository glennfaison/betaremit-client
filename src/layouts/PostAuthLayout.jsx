import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIoClient from 'socket.io-client';

import HelloComponent from '../components/HelloComponent';
import NavBar from '../components/NavBar';
import { Routes, Settings } from '../constants';
import Products from '../pages/Products';
import { fetchThisUser, fetchAllProducts } from '../store/actions';
import { history } from '../store';
import NotFound from '../pages/NotFound';

const socket = socketIoClient(Settings.apiRoot, { transports: ['websocket'] });

function PostAuthLayout(props) {
  if (!localStorage.getItem('betaremit-token')) {
    return <></>;
  }
  if (!props.thisUser.data && !props.thisUser.waiting) {
    props.fetchThisUser()
  }

  // If we receive the `productsChanged` event, refresh the product list
  socket.on('productsChanged', () => {
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
            <Route exact path={Routes.notFound} component={NotFound} />
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