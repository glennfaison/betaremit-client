import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import asyncProcesses from './asyncProcesses';
import thisUser from './thisUser';
import productList from './productList';

const rootReducer = combineReducers({
  router: routerReducer,
  asyncProcesses: asyncProcesses,
  thisUser: thisUser,
  productList: productList,
});

export default rootReducer;
