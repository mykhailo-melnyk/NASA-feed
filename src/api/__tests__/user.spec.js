import moxios from 'moxios';

import client from '../client';
import { loginAPI } from '../user';

describe('User API', () => {
  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('login success', (done) => {
    const onResolved = jest.fn();
    loginAPI('test@mail.com', 'secure').then(onResolved);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: { token: 'some-data' },
      }).then(({ data }) => {
        expect(data).toEqual({ token: 'some-data' });
        expect(onResolved).toBeCalledWith({ token: 'some-data' });
        done();
      });
    });
  });

  it('login error', (done) => {
    const onRejected = jest.fn();
    loginAPI('test@mail.com', 'secure').catch(onRejected);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 400,
        response: { error: 'custom error' },
      }).then(() => {
        expect(onRejected).toBeCalledWith({ error: 'custom error' });
        done();
      });
    });
  });
});
