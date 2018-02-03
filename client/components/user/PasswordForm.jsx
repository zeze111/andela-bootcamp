import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    };
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <div id="chpwd" className="col s12 m8 l7 push-l1 push-m1 form-style">
        <form className="col s10 push-s1">
          <TextFieldGroup3
            label="Old Password:"
            value={this.state.oldPassword}
            onChange={this.onChange}
            id="old"
            type="password"
            name="oldPassword"
            icon="lock_outline"
          />
          <TextFieldGroup3
            label="New Password:"
            value={this.state.newPassword}
            onChange={this.onChange}
            id="new"
            type="password"
            name="newPassword"
            icon="lock_outline"
          />
          <div className="right-align">
            <button className="btn grey" type="button"> Update </button>
          </div>
        </form>
      </div>
    );
  }
}

PasswordForm.propTypes = {
};

export default PasswordForm;
