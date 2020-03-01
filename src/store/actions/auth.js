import { ActionTypes, Routes } from "../../constants";
import { AuthResource, setToken } from '../../httpResources';
import { routerActions } from 'react-router-redux';

export const logOut = () => async (dispatch) => {
  dispatch({ type: ActionTypes.LogoutAttempt });
  try {
    localStorage.removeItem("betaremit-token");
    dispatch({ type: ActionTypes.LogoutSuccess });
  } catch (error) {
    dispatch({ type: ActionTypes.LogoutFailure });
  }
};

export const logInWithEmailAndPassword = (user) => (dispatch) => {
  dispatch({ type: ActionTypes.LoginAttempt });
  AuthResource.logIn({ user: user }).then(res => {
    dispatch({ type: ActionTypes.LoginSuccess, payload: res.body.data });
    setToken(res.body.data.token);
    localStorage.setItem("betaremit-token", res.body.data.token);
    // If login is successful, go to the /products page
    dispatch(routerActions.push(Routes.products));
  }).catch(err => {
    dispatch({ type: ActionTypes.LoginFailure, payload: null });
  });
};

export const fetchThisUser = () => (dispatch) => {
  dispatch({ type: ActionTypes.FetchThisUserAttempt });
  AuthResource.me().then(res => {
    dispatch({ type: ActionTypes.FetchThisUserSuccess, payload: res.body.data });
    setToken(res.body.data.token);
    localStorage.setItem("betaremit-token", res.body.data.token);
  }).catch(err => {
    dispatch(logOut());
    dispatch({ type: ActionTypes.FetchThisUserFailure, payload: null });
  });
};

export const signUpWithEmailAndPassword = (user) => (dispatch) => {
  dispatch({ type: ActionTypes.SignupAttempt });
  AuthResource.register({ user }).then(res => {
    console.log(res);
    dispatch({ type: ActionTypes.SignupSuccess, payload: res.body.data });
    // If registration is successful, initiate login for the user
    dispatch(logInWithEmailAndPassword(user));
  }).catch(err => {
    dispatch({ type: ActionTypes.SignupFailure, payload: {} });
  });
};
