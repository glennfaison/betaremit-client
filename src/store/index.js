import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { asyncActionMiddleware/*, localStorageMiddleware*/ } from './middleware';
import rootReducer from './reducers';

import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory as createHistory } from 'history';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      myRouterMiddleware,
      asyncActionMiddleware/*,
      localStorageMiddleware*/
    );
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      myRouterMiddleware,
      asyncActionMiddleware/*,
      createLogger(),
      localStorageMiddleware*/
    );
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(getMiddleware())
);

export default store;
