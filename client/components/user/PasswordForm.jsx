import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs';

import validations from '../../../Server/shared/validations';
import { TextFieldGroup3 } from '../common/TextFieldGroup';

/**
 * @class PasswordForm
 * @extends {Component}
 */
class PasswordForm extends Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPassword_confirmation: '',
      errors: {},
      isLoading: false
    };
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** calls action to change user's password
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSubmit = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.changePassword(this.state)
        .then(() => this.setState({ isLoading: false }))
        .catch((error) => {
          this.setState({ errors: error.response.data, isLoading: false });
        });
      this.refs.pwdForm.reset();
    }
  }

  /** checks if form data passes or fails
   *
   * @memberof Home
   *
   * @return {boolean} validator
   */
  isValid() {
    const validator = new Validator(this.state, validations.passwordRules);
    if (validator.fails()) {
      const errors = validator.errors.all();
      this.setState({ errors });
    }

    return validator.passes();
  }

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <div id="chpwd" className="col s12 m8 l7 push-l1 push-m1 form-style">
        <form onSubmit={this.onSubmit} className="col s10 push-s1" ref="pwdForm">
          <TextFieldGroup3
            label="Old Password:"
            value={this.state.oldPassword}
            onChange={this.onChange}
            id="old"
            type="password"
            name="oldPassword"
            icon="lock_outline"
            error={this.state.errors.oldPassword}
          />
          <TextFieldGroup3
            label="New Password:"
            value={this.state.newPassword}
            onChange={this.onChange}
            id="new"
            type="password"
            name="newPassword"
            icon="lock_outline"
            error={this.state.errors.newPassword}
          />
          <TextFieldGroup3
            label="Confirm Password:"
            value={this.state.newPassword_confirmation}
            onChange={this.onChange}
            id="confirm"
            type="password"
            name="newPassword_confirmation"
            icon="lock_outline"
            error={this.state.errors.newPassword_confirmation}
          />
          <div className="right-align">
            <input
              className="btn grey white-text"
              type="submit"
              value="Update"
              disabled={this.state.isLoading}
            />
          </div>
          {this.state.errors &&
          <span className="red-text error-text">
            {this.state.errors.message}
          </span>}
        </form>
      </div>
    );
  }
}

PasswordForm.propTypes = {
  changePassword: PropTypes.func.isRequired
};

export default PasswordForm;
