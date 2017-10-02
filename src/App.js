import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';

import { history } from './store/configureStore';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import asyncComponent from './components/AsyncComponent';
import loginRequired from './containers/Authenticated';

const Dashboard = asyncComponent(() => (
  import('./containers/Dashboard').then(module => module.default).then(module => (
    new Promise((resolve) => { // TODO: Fake timeout to see loader
      setTimeout(() => {
        resolve(module);
      }, 400);
    })),
  )
));

const App = () => (
  <ConnectedRouter basename="/" history={history}>
    <div>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/not-found" exact component={NotFound} />
        <Route component={loginRequired(Dashboard)} />
      </Switch>
    </div>
  </ConnectedRouter>
);

export default App;
