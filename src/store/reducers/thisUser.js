import { ActionTypes } from "../../constants";

const DefaultState = {
  waiting: false,
  data: null
};

const thisUser = (state = DefaultState, action) => {
  let type = action.type || undefined;
  switch (type) {
    case ActionTypes.LoginAttempt:
      return { waiting: true, data: { ...state.data } };

    case ActionTypes.LoginSuccess:
      let newUser = action.payload;
      return { waiting: false, data: { ...newUser } };

    case ActionTypes.LoginFailure:
      return { waiting: false, data: null };



    case ActionTypes.FetchThisUserAttempt:
      return { waiting: true, data: { ...state.data } };

    case ActionTypes.FetchThisUserSuccess:
      let fetchedUser = action.payload;
      return { waiting: false, data: { ...fetchedUser } };

    case ActionTypes.FetchThisUserFailure:
      return { waiting: false, data: { ...state.data } };



    // case ActionTypes.SignupAttempt:
    //   return { waiting: true, data: { ...state.data } };

    // case ActionTypes.SignupSuccess:
    //   return { waiting: false, data: { ...state.data } };

    // case ActionTypes.SignupFailure:
    //   return { waiting: false, data: null };



    case ActionTypes.LogoutAttempt:
      return { waiting: true, data: null };

    case ActionTypes.LogoutSuccess:
    case ActionTypes.LogoutFailure:
      return { waiting: false, data: null };



    default:
      return state;
  }
};

export default thisUser;
