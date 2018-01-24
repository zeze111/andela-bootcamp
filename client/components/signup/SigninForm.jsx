import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextFieldGroup } from '../common/TextFieldGroup';
import PreLoader from '../common/PreLoader';

/**
 *
 *
 * @class SigninForm
 * @extends {React.Component}
 */
class SigninForm extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onSubmit = (event) => {
    this.setState({ errors: {}, isLoading: true });
    event.preventDefault();

    this.props.userSigninRequest(this.state)
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch((error) => {
        this.setState({ errors: error.response.data, isLoading: false });
      });
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
          <TextFieldGroup
            label="Email"
            value={this.state.email}
            onChange={this.onChange}
            id="signInEmail"
            type="email"
            name="email"
          />
          <TextFieldGroup
            label="Password"
            value={this.state.password}
            onChange={this.onChange}
            id="signInPwd"
            type="password"
            name="password"
          />
          <div>
            {
              (this.state.isLoading) &&
              <div className="center-align loader-style">
                <PreLoader />
              </div>
            }
            <input
              className="btn grey white-text right-align"
              type="submit"
              value="Sign in"
            />
          </div> <br />
          {errors &&
          <span className="red-text error-text">
            {errors.message}
          </span>}
        </form>
      </div>
    );
  }
}

SigninForm.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};


export default SigninForm;
