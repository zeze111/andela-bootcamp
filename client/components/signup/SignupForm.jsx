import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Validator from 'validatorjs';

import validations from '../../../Server/shared/validations';
import { TextFieldGroup } from '../common/TextFieldGroup';
import PreLoader from '../common/PreLoader';

/** Renders form to allow users sign up
 *
 * @class SignupForm
 *
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
  /**
   * @description Constructor Function
   *
   * @param {object} props
   *
   * @memberof Home
   *
   * @return {void}
   */
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
    };
  }

  /** sets state on form input change
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** calls action to signup user
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
      this.props.signUp(this.state)
        .then(() => this.setState({ redirect: true, isLoading: false }))
        .catch((error) => {
          this.setState({ errors: error.response.data, isLoading: false });
        });
    }
  }

  /** checks if form data passes or fails
   *
   * @memberof Home
   *
   * @return {boolean} validator
   */
  isValid() {
    const validator = new Validator(this.state, validations.userRules);
    if (validator.fails()) {
      const errors = validator.errors.all();
      this.setState({ errors });
    }

    return validator.passes();
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    const { errors } = this.state;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <form onSubmit={this.onSubmit} className="col s10 m7 l6 push-s1 push-m2 push-l3"> <br />
          {errors &&
            <span className="red-text error-text">
              {errors.message}
            </span>}
          <TextFieldGroup
            label="First Name"
            value={this.state.firstName}
            onChange={this.onChange}
            id="fname"
            type="text"
            req="*"
            name="firstName"
            error={errors.firstName}
          />
          <TextFieldGroup
            label="Surname"
            value={this.state.surname}
            onChange={this.onChange}
            id="sname"
            type="text"
            req="*"
            name="surname"
            error={errors.surname}
          />
          <TextFieldGroup
            label="Email"
            value={this.state.email}
            onChange={this.onChange}
            id="email"
            type="email"
            req="*"
            name="email"
            error={errors.email}
          />
          <TextFieldGroup
            label="Password"
            value={this.state.password}
            onChange={this.onChange}
            id="pwd"
            type="password"
            req="*"
            name="password"
            error={errors.password}
          />
          <TextFieldGroup
            label="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.onChange}
            id="cf-pwd"
            type="password"
            req="*"
            name="password_confirmation"
            error={errors.password_confirmation}
          />
          <div className="right-align">
            {
              (this.state.isLoading) &&
              <div className="center-align loader-style">
                <PreLoader />
              </div>
            }
            <input
              className="btn grey white-text"
              type="submit"
              value="Register"
              disabled={this.state.isLoading}
            />
          </div> <br />
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signUp: PropTypes.func.isRequired
};


export default SignupForm;
