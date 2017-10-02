import { combineReducers } from 'redux-immutable';

import user from './user';
import routerReducer from './router';

const rootReducer = asyncReducers => (
  combineReducers({
    router: routerReducer,
    user,
    ...asyncReducers,
  })
);

export default rootReducer;
