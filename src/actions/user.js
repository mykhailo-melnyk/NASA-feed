import { AUTH } from './types';
import { ActionCreator } from '../libs/ApiActions/createApiActions';
import { loginAPI } from '../api/user';

export const UserActions = {
  login: new ActionCreator(AUTH.LOGIN_USER, loginAPI),
  logout: () => ({
    type: AUTH.LOGOUT,
  }),
};

export { AUTH };
