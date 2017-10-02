import client from './client';

/**
 * Create menu item
 * @param  {string} email      email
 * @param  {string} password   password
 * @return {object}            The response data
 */
export const loginAPI = (email, password) => (
  client.post('/api/v1/get-token/', { email, password })
);
