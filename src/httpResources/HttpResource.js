import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { Settings } from '../constants';

const superagent = superagentPromise(_superagent, global.Promise);

// const encode = encodeURIComponent;
const responseBody = res => res;

let token = null;
const setBearer = req => {
  if (!token) {
    setToken(localStorage.getItem('betaremit-token'));
  }
  if (token) {
    req.set('authorization', `Bearer ${token}`);
    return;
  }
};

export const setToken = _token => {
  token = _token;
  localStorage.setItem('betaremit-token', _token);
};

export const HttpResource = {
  del: url =>
    superagent.del(`${Settings.apiRoot}${url}`).use(setBearer).then(responseBody),
  get: url =>
    superagent.get(`${Settings.apiRoot}${url}`).use(setBearer).then(responseBody),
  put: (url, body) =>
    superagent.put(`${Settings.apiRoot}${url}`, body).use(setBearer).then(responseBody),
  post: (url, body) =>
    superagent.post(`${Settings.apiRoot}${url}`, body).use(setBearer).then(responseBody)
};
