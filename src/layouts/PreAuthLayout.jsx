import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { Routes } from '../constants';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { history } from '../store';

function PreAuthLayout(props) {
  if (!!localStorage.getItem('betaremit-token')) {
    return (<></>);
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

const mapStateToProps = (state, ownProps) => ({
  thisUser: state.thisUser,
});

export default connect(mapStateToProps, {})(PreAuthLayout);
