import React, { Component } from 'react';
import { TextFieldGroup3 } from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
    }

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div id="chpwd" className="col s10 offest-s2" style={{ marginTop: '3em', marginBottom: '3em' }}>
        <form className="col s6 offset-s2">
          <TextFieldGroup3
            label="Old Password:"
            value={this.state.oldPassword}
            onChange={this.onChange}
            id="old"
            type="text"
            name="oldPassword"
            icon="lock_outline"
          />
          <TextFieldGroup3
            label="New Password:"
            value={this.state.newPassword}
            onChange={this.onChange}
            id="new"
            type="text"
            name="newPassword"
            icon="lock_outline"
          />
          <div className="right-align">
            <button className="btn grey" type="button"> Update </button>
          </div>
        </form>
      </div>
    )
  };
}

PasswordForm.propTypes = {
}

export default PasswordForm;
