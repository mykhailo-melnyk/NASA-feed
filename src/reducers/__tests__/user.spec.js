import * as Cookies from 'js-cookie';
import Immutable from 'immutable';

import { initialState, profileReducer } from '../user';
import { AUTH } from '../../actions/user';

describe('User reducer', () => {
  describe('[profile] reducer', () => {
    it('should return the initial state', () => {
      expect(profileReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle LOGIN_USER_SUCCESS', () => {
      expect(profileReducer(undefined, {
        type: `${AUTH.LOGIN_USER}_SUCCESS`,
        payload: { token: 'token', email: 'test@mail.com' },
      })).toEqual(Immutable.fromJS({
        isAuthenticated: true,
        token: 'token',
        email: 'test@mail.com',
      }));
      expect(Cookies.get(AUTH.AUTH_COOKIE_KEY)).toEqual({
        isAuthenticated: true,
        token: 'token',
        email: 'test@mail.com',
      });
    });

    it('should handle LOGOUT', () => {
      expect(profileReducer(undefined, {
        type: AUTH.LOGOUT,
        payload: { token: 'token' },
      })).toEqual(initialState);
    });
  });
});
