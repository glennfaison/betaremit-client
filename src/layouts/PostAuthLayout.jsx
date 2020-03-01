import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { connect } from 'react-redux';

import HelloComponent from '../components/HelloComponent';
import { Routes } from '../constants';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import { fetchThisUser } from '../store/actions';
import { history } from '../store';

class PostAuthLayout extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.fetchThisUser();
  }

  render() {
    // if (!this.props.thisUser.data) {
    if (!localStorage.getItem('betaremit-token')) {
      return (<React.Fragment></React.Fragment>);
    }
    return (
      <div className="container-fluid" id="page-container">
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
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps, {
  fetchThisUser,
})(PostAuthLayout);