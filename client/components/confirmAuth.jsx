import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import { signout } from '../actions/signinActions';

/** Checkes if a user has a token,
   * if token, checks if token is correct or expired
   *
   * @export {function} ConfirmAuth
   *
   * @param {any} ComposedComponent
   *
   * @returns {React.Component} rendered component
   */
export default function confirmAuth(ComposedComponent) {
  /** High order component to protect routes
   *
   * @class Authorize
   *
   * @extends {React.Component}
   */
  class Authorize extends Component {
    /** checks and validates user token
     *
     * @memberof Home
     *
     * @return {void}
     */
    componentWillMount() {
      if (!this.props.auth.isAuthenticated) {
        this.context.router.history.push('/');
      }
      const token = localStorage.jwtToken;
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error) => {
          if (error) {
            $('.tooltipped').tooltip('remove');
            swal({
              text: 'Your Session Expired, Please Sign In',
              icon: 'error',
              button: 'Got It!',
              dangerMode: true
            }).then(() => {
              this.props.signout();
              this.context.router.history.push('/signup');
            });
          }
        });
      } else {
        $('.tooltipped').tooltip('remove');
        this.context.router.history.push('/');
        this.props.signout();
      }
    }

    /** html component to render
     *
     * @memberof Home
     *
     * @return {void}
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authorize.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    signout: PropTypes.func.isRequired
  };

  Authorize.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });

  return connect(mapStateToProps, { signout })(Authorize);
}
