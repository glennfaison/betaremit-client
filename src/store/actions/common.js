import { ActionTypes } from "../../constants";

export const contactUs = ({ name, email, subject, message }) => dispatch => {
  dispatch({ type: ActionTypes.ContactUs, payload: { name, email, subject, message } });
};

export const postNotification = ({ messageType, message }) => dispatch => {
  dispatch({
    type: ActionTypes.PostNotification,
    payload: { messageType: messageType, message: message }
  });
};

export const navBarSearch = (searchString) => dispatch => {
  dispatch({ type: ActionTypes.NavBarSearch, payload: { searchString: searchString } });
};