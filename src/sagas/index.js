import { LOCATION_CHANGE } from 'react-router-redux';
import { UserActions } from '../actions/user';
import { createApiSaga } from '../libs/ApiActions/createApiSaga';

export const injectSagas = (sagaMiddleware) => {
  sagaMiddleware.run(createApiSaga(UserActions.login, [LOCATION_CHANGE]));
};
