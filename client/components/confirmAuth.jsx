import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
export default function (ComposedComponent) {
  /** shows all the details of a recipe including reviews,
   * upvotes, downvotes, and favorite
   *
   * @class RecipeDetails
   *
   * @extends {React.Component}
   */
  class Authorize extends Component {
    /** shows all the details of a recipe including reviews,
   * upvotes, downvotes, and favorite
   *
   * @class RecipeDetails
   *
   * @extends {React.Component}
   */
    componentWillMount() {
      if (!this.props.auth.isAuthenticated) {
        this.context.router.history.push('/');
      }
      if (!this.checkToken()) {
        $('.tooltipped').tooltip('remove');
        this.context.router.history.push('/');
        this.props.signout();
      }
    }

    /** shows all the details of a recipe including reviews,
   * upvotes, downvotes, and favorite
   *
   * @class RecipeDetails
   *
   * @extends {React.Component}
   */
    checkToken = () => {
      const token = localStorage.jwtToken;
      let tokenState;
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error) => {
          if (error) {
            tokenState = 0;
          } else {
            tokenState = 1;
          }
        });
      } else {
        tokenState = 0;
      }
      return tokenState;
    };

    /** shows all the details of a recipe including reviews,
   * upvotes, downvotes, and favorite
   *
   * @class RecipeDetails
   *
   * @extends {React.Component}
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
