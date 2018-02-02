import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextFieldGroup } from '../common/TextFieldGroup';
import PreLoader from '../common/PreLoader';

/** Renders form to allow users sign in
 *
 * @class SigninForm
 *
 * @extends {React.Component}
 */
class SigninForm extends React.Component {
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
      email: '',
      password: '',
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

  /** calls action to sign user in
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSubmit = (event) => {
    this.setState({ errors: {}, isLoading: true });
    event.preventDefault();

    this.props.userSigninRequest(this.state)
      .then(() => {
        this.setState({ redirect: true, isLoading: false });
      })
      .catch((error) => {
        this.setState({ errors: error.response.data, isLoading: false });
      });
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
              value="Sign in"
              disabled={this.state.isLoading}
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
