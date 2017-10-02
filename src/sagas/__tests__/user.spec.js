import { LOCATION_CHANGE } from 'react-router-redux';
import { put, call, cancel, cancelled, take, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { createMockTask, cloneableGenerator } from 'redux-saga/utils';

import userSaga, { login, loginFork } from '../user';
import { UserActions } from '../../actions/user';
import { user } from '../../api';

describe('User effects', () => {
  beforeEach(() => {
    jest.mock('../../api', () => (
      {
        user: {
          loginAPI: () => (
            new Promise((resolve) => {
              resolve(11111);
            })
          ),
        },
      }
    ));
  });

  afterEach(() => {
    jest.unmock('../../api');
  });

  describe('default generator', () => {
    const generator = userSaga();
    const expectedYield = fork(loginFork);
    expect(generator.next().value).toEqual(expectedYield);
  });

  describe('loginFork generator', () => {
    const generator = cloneableGenerator(loginFork)();

    it('login cancel', () => {
      const expectedYield = take(UserActions.login.types.REQUEST);
      expect(generator.next().value).toEqual(expectedYield);
    });

    it('forks the service', () => {
      const action = UserActions.login.request({ email: '1', password: '1' });
      const expectedYield = fork(login, action);
      expect(generator.next(action).value).toEqual(expectedYield);
    });

    it('waits for stop action and then cancels the service', () => {
      const cloned = generator.clone();
      const mockTask = createMockTask();
      const expectedTakeYield = take([LOCATION_CHANGE, ...UserActions.login.typesList]);
      expect(generator.next(mockTask).value).toEqual(expectedTakeYield);
      const expectedCancelYield = cancel(mockTask);
      expect(generator.next({ type: LOCATION_CHANGE }).value).toEqual(expectedCancelYield);

      const mockTaskCloned = createMockTask();
      const expectedTakeYieldCloned = take([LOCATION_CHANGE, ...UserActions.login.typesList]);
      expect(cloned.next(mockTaskCloned).value).toEqual(expectedTakeYieldCloned);
      expect(cloned.next({ type: 'NOT_LOCATION_CHANGE' }).value).toEqual(take(UserActions.login.types.REQUEST));
    });
  });

  describe('login generator', () => {
    it('login success', () => {
      const mockTask = createMockTask();
      const gen = login(UserActions.login.request({ email: '1', password: '1' }));
      expect(gen.next().value).toEqual(call(user.loginAPI, '1', '1'));
      expect(gen.next({ token: 'some-token' }).value).toEqual(call(delay, 500));
      expect(gen.next(mockTask).value).toEqual(put(UserActions.login.success({ token: 'some-token', email: '1' })));
      expect(gen.next().value).toEqual(cancelled());
      expect(gen.next().done).toEqual(true);
    });

    it('login error', () => {
      const error = new Error('unexpected network error');
      const gen = login(UserActions.login.request({ email: '1', password: '1' }));
      expect(gen.next().value).toEqual(call(user.loginAPI, '1', '1'));
      expect(gen.throw(error).value).toEqual(put(UserActions.login.fail('unexpected network error')));
      expect(gen.next().value).toEqual(cancelled());
      expect(gen.next().done).toEqual(true);
    });

    it('login cancel', () => {
      const mockTask = createMockTask();
      const gen = login(UserActions.login.request({ email: '1', password: '1' }));
      expect(gen.next(mockTask).value).toEqual(call(user.loginAPI, '1', '1'));
      expect(gen.return().value).toEqual(cancelled());
      expect(gen.next(true).value).toEqual(put(UserActions.login.fail('CANCEL')));
    });
  });
});
