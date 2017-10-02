import * as Cookies from 'js-cookie';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import { createApiReducer } from '../libs/ApiActions/createApiReducer';
import { UserActions } from '../actions/user';
import { AUTH } from '../actions/types';

const initialState = Immutable.fromJS({
  isAuthenticated: false,
  token: null,
  email: null,
});

let cookieState = Cookies.get(AUTH.AUTH_COOKIE_KEY);
if (cookieState) {
  cookieState = Immutable.fromJS(JSON.parse(cookieState));
}

const profileReducer = (state = cookieState || initialState, action) => {
  switch (action.type) {
    case UserActions.login.types.SUCCESS: {
      const newState = state
        .set('isAuthenticated', true)
        .set('token', action.payload.token);
      Cookies.set(AUTH.AUTH_COOKIE_KEY, newState.toJS(), { expires: 14 });  // All cookies must die!
      return newState;
    }
    case AUTH.LOGOUT: {
      Cookies.remove(AUTH.AUTH_COOKIE_KEY);
      return initialState;
    }
    default:
      return state;
  }
};

export default combineReducers({
  profile: profileReducer,
  login: createApiReducer(AUTH.LOGIN_USER),
});

export { initialState, profileReducer };
