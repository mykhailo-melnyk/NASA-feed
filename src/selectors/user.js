import { createSelector } from 'reselect';

const selectUser = state => state.get('user');

const makeSelectUserProfile = createSelector(
  selectUser,
  state => state.get('profile'),
);

const makeSelectUserProfileToJs = createSelector(
  makeSelectUserProfile,
  profile => profile.toJS(),
);

const makeSelectUserLogin = createSelector(
  selectUser,
  state => state.get('login'),
);

const makeSelectUserLoginToJs = createSelector(
  makeSelectUserLogin,
  login => login.toJS(),
);

export {
  selectUser,
  makeSelectUserProfile,
  makeSelectUserProfileToJs,
  makeSelectUserLogin,
  makeSelectUserLoginToJs,
};
