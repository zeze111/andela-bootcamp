import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Validator from 'validatorjs';
import validations from '../../../Server/shared/validations';
import { TextFieldGroup } from '../common/TextFieldGroup';
import PreLoader from '../common/PreLoader';

/**
 *
 *
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();


    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
        .then(() => this.setState({ redirect: true }))
        .catch((error) => {
          this.setState({ errors: error.response.data, isLoading: false });
        });
    }
  }

  /**
   * @memberof Home
   * @return {void}
   */
  isValid() {
    const validator = new Validator(this.state, validations.userRules);
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
    const { errors } = this.state;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <form onSubmit={this.onSubmit} className="col s5 offset-s4"> <br />
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
            />
          </div> <br />
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};


export default SignupForm;
