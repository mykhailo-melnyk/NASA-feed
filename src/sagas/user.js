/* eslint-disable no-constant-condition */
/**
 * User effects
 */
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';

import { user } from '../api';
import { UserActions } from '../actions/user';

/**
 * login user
 */
export function* login({ payload }) {
  try {
    const { email, password } = payload;
    const userData = yield call(user.loginAPI, email, password);
    yield call(delay, 500); // TODO: Fake timeout to see loader
    yield put(UserActions.login.success({ email, ...userData }));
  } catch (error) {
    yield put(UserActions.login.fail(error.message));
  } finally {
    if (yield cancelled()) {
      yield put(UserActions.login.fail('CANCEL'));
    }
  }
}

export function* loginFork() {
  while (true) {
    const action = yield take(UserActions.login.types.REQUEST);
    const bgSyncTask = yield fork(login, action);
    const cancelAction = yield take([LOCATION_CHANGE, ...UserActions.login.typesList]);
    if (cancelAction.type === LOCATION_CHANGE) {
      yield cancel(bgSyncTask);
    }
  }
}

export default function* () {
  yield fork(loginFork);
}
