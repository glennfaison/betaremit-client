import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import SplashScreen from '../SplashScreen';
import { Routes } from '../../constants';

import '../../assets/css/index.css';
import SeedScreen from '../SeedScreen';

class AppSkeleton extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="page-container">
        <section className="row">
          <Switch>
            <Route exact path={Routes.login} component={SplashScreen} />
            <Route exact path={Routes.seed} component={SeedScreen} />
            <Route exact path={Routes.solve} component={SplashScreen} />
            <Route exact path={Routes.solve} component={SplashScreen} />
          </Switch>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  router: state.router
});

export default connect(mapStateToProps, null)(AppSkeleton);
