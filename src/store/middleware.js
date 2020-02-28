function isFunction(v) {
  return v && typeof v === typeof(function(){});
};

export const asyncActionMiddleware = store => next => action => {
  if (isFunction(action)) {
    action(store.dispatch);
    return;
  }

  next(action);
};
