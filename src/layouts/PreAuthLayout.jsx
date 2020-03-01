import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIoClient from 'socket.io-client';

import { Routes, Settings } from '../constants';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { history } from '../store';
import { fetchAllProducts } from '../store/actions';

function PreAuthLayout(props) {
  const socket = socketIoClient(Settings.apiRoot);
  // If we receive the `productsChanged` event, refresh the product list
  socket.on('productsChanged', () => {
    console.log('Products Changed');
    props.fetchAllProducts();
  });

  if (localStorage.getItem('betaremit-token')) {
    return (<React.Fragment></React.Fragment>);
  }
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={Routes.login} component={Login} />
        <Route exact path={Routes.register} component={Register} />
        <Redirect to={Routes.login} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {
  fetchAllProducts: fetchAllProducts,
})(PreAuthLayout);
