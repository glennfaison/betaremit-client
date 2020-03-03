import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

import store, { history } from './store';
import * as serviceWorker from './serviceWorker';
import PreAuthLayout from './layouts/PreAuthLayout';
import PostAuthLayout from './layouts/PostAuthLayout';
import { Routes } from './constants';

ReactDOM.render(
  <Provider store={store} >
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <Route path={Routes.root}>
            <PreAuthLayout />
            <PostAuthLayout />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
