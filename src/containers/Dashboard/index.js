import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Redirect, Link } from 'react-router-dom';

import RouteWithSubRoutes from '../../components/RouteWithSubRoutes';
import { routes } from './routes';
import { UserActions } from '../../actions/user';
import { makeSelectUserProfileToJs } from '../../selectors/user';

@connect(state => ({
  user: makeSelectUserProfileToJs(state),
}))
export default class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  logout = () => {
    this.props.dispatch(UserActions.logout());
  };

  render() {
    return (
      <div>
        <div>
          <h1 style={{ display: 'inline-block' }}>Dashboard</h1>
          <button onClick={this.logout}>Logout</button>
        </div>
        <div>
          <Link to="/">Home</Link>
          &nbsp;|&nbsp;
          <Link to="/cleaning">Cleaning</Link>
        </div>
        <hr />
        <Switch>
          {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
          <Redirect from="*" to="/not-found" />
        </Switch>
      </div>
    );
  }
}
