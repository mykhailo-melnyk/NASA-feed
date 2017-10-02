import React, { Component } from 'react';
import { Switch, Redirect, Link } from 'react-router-dom';
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes';
import { routes } from './routes';

class Cleaning extends Component {
  render() {
    return (
      <div>
        <h1>Cleaning</h1>
        <div>
          <Link to="/cleaning/calendar">Calendar</Link>
          &nbsp;|&nbsp;
          <Link to="/cleaning/schedule">Schedule</Link>
        </div>
        <hr />
        <Switch>
          {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
          <Redirect from="*" to="/cleaning/calendar" />
        </Switch>
      </div>
    );
  }
}

export default Cleaning;
