import { ActionTypes } from "../../constants";

const asyncProcesses = (processes = {}, action) => {
  switch (action.type) {
    case ActionTypes.asyncStart:
      return {
        ...processes,
        [action.subType]: {
          inProgress: false,
          errors: action.error ? action.payload.errors : null
        }
      };
    case ActionTypes.asyncEnd:
      let obj = JSON.parse(JSON.stringify(processes));
      delete obj[action.subType];
      return {
        ...obj
      };
    default:
      return processes;
  }
};

export default asyncProcesses;