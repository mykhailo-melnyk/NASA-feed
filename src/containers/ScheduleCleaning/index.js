import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormField, RequiredValidator, EmailValidator, formConnector } from 'vb-react-form';

import { UserActions } from '../../actions/user';
import { makeSelectUserLoginToJs } from '../../selectors/user';
import { replaceRoute } from '../../actions/routing';
import { WAIT_FOR_ACTION } from '../../middlewares';
import Loader from '../../components/Loader';

const Actions = formConnector(({ form: { isValid } }) => (
  <button type="submit" disabled={!isValid}>SEND</button>
));

class ScheduleCleaning extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  onSubmit = (data) => {
    this.props.dispatch(UserActions.login.request(
      { email: data.email, password: data.password },
      WAIT_FOR_ACTION,
    )).then(() => {
      this.props.dispatch(replaceRoute('/'));
    });
  };

  render() {
    // console.log('Login: render');
    const { auth: { isLoading } } = this.props;

    return (
      <div>
        <h1>LOGIN</h1>
        <Form onSubmit={this.onSubmit}>
          <FormField
            name="email"
            validators={[new RequiredValidator(), new EmailValidator()]}
            placeholder="Enter username"
          />
          <FormField
            name="password"
            type="password"
            validators={[new RequiredValidator()]}
            placeholder="Enter username"
          />
          <Actions />
        </Form>
        {isLoading && <Loader />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: makeSelectUserLoginToJs(state),
});

export default connect(mapStateToProps)(ScheduleCleaning);
