/* eslint-disable no-restricted-syntax,guard-for-in */
/**
 * This module contains configurations for axios client which is used as base http client for XHR.
 */

import axios from 'axios';
import Qs from 'qs';
import { BASE_URL, MOCK_ENABLED, MOCK_URLS } from '../app.constants';
// import { store } from '../app';

const client = axios.create({
  baseURL: BASE_URL,
});

/**
 * The default url param serializer. For all those GET methods with filters.
 * @param params
 * @returns {*|string}
 */
axios.paramsSerializer = params => (
  Qs.stringify(params, { arrayFormat: 'brackets' })
);

client.interceptors.request.use((config) => {
  // const state = store.getState().get('auth').toJS();
  // Object.assign(config.headers, state.headers);
  if (MOCK_ENABLED) {
    for (const key in MOCK_URLS) {
      const re = new RegExp(key);
      if (config.url.match(re)) {
        config.url = MOCK_URLS[key];
        config.method = 'get';
        break;
      }
    }
  }
  return config;
});

client.interceptors.response.use(response => (
  response.data
), error => (
  new Promise((resolve, reject) => {
    if (error.response.status === 400 || error.response.status === 401) {
      reject(error.response.data);
    } else {
      reject(error);
    }
  })
));

export default client;
