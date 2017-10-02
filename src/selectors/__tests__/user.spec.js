import Immutable from 'immutable';
import {
  selectUser,
  makeSelectUserProfile,
  makeSelectUserProfileToJs,
  makeSelectUserLogin,
  makeSelectUserLoginToJs,
} from '../user';

describe('User selectors', () => {
  let state;
  beforeEach(() => {
    state = Immutable.Map();
  });

  it('selectUser', () => {
    expect(selectUser(state)).not.toBeDefined();
    state = state.set('user', 'User');
    expect(selectUser(state)).toEqual('User');
  });

  it('makeSelectUserProfile', () => {
    state = state.set('user', Immutable.fromJS({ profile: 'Profile' }));
    expect(makeSelectUserProfile(state)).toEqual('Profile');
  });

  it('makeSelectUserProfileToJs', () => {
    state = state.set('user', Immutable.fromJS({ profile: { username: 'John' } }));
    expect(makeSelectUserProfileToJs(state)).toEqual({ username: 'John' });
  });

  it('makeSelectUserLogin', () => {
    state = state.set('user', Immutable.fromJS({ login: 'Profile' }));
    expect(makeSelectUserLogin(state)).toEqual('Profile');
  });

  it('makeSelectUserLoginToJs', () => {
    state = state.set('user', Immutable.fromJS({ login: { username: 'John' } }));
    expect(makeSelectUserLoginToJs(state)).toEqual({ username: 'John' });
  });
});
