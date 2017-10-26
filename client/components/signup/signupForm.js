import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs';
import userRules from '../../../Server/shared/validations';
import TextFieldGroup from '../common/textFieldGroup';

class signupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      surname: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const validator = new Validator(this.state, userRules);
    validator.passes();

    if (validator.fails()) {
      const errors = validator.errors.all()
      this.setState({ errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();


    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
        .then(() => { })
        .catch((error) => { this.setState({ errors: error.response.data, isLoading: false }) });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="col s5 offset-s4"> <br />
          <TextFieldGroup
            label="First Name"
            value={this.state.firstName}
            onChange={this.onChange}
            id="fname"
            type="text"
            name="firstName"
            error={errors.firstName}
          />
          <TextFieldGroup
            label="Surname"
            value={this.state.surname}
            onChange={this.onChange}
            id="sname"
            type="text"
            name="surname"
            error={errors.surname}
          />
          <TextFieldGroup
            label="Email"
            value={this.state.email}
            onChange={this.onChange}
            id="email"
            type="email"
            name="email"
            error={errors.email}
          />
          <TextFieldGroup
            label="Password"
            value={this.state.password}
            onChange={this.onChange}
            id="pwd"
            type="password"
            name="password"
            error={errors.password}
          />
          <TextFieldGroup
            label="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.onChange}
            id="cf-pwd"
            type="password"
            name="password_confirmation"
            error={errors.password_confirmation}
          />
          <div className="right-align">
            <input disabled={this.state.isLoading} className="btn grey white-text" type="submit" value="Create" />
          </div> <br />
          {errors && <span className='help-block' style={{ fontSize: 13 + 'px' }}>
            {errors.message}</span>}
        </form>
      </div>
    );
  }
}

signupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}


export default signupForm;
