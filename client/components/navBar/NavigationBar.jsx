import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthUser from './AuthUser';
import { signout } from '../../actions/signinActions';

/** shows navigation bar for all users
 *
 * @class NavigationBar
 *
 * @extends {Component}
 */
export class NavigationBar extends Component {
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
      firstName: this.props.user.firstName,
    };

    this.signout = this.signout.bind(this);
  }

  /** css initialisation when component is mounted
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.tooltipped').tooltip({ delay: 50 });
  }

  /** props to receive when the component is mounted
   *
   * @param {object} nextProps
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.user.firstName,
    });
  }

  /** calls action to sign user out
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  signout = () => {
    this.props.signout();
    $('.tooltipped').tooltip('remove');
    this.context.router.history.push('/');
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    const { isAuthenticated } = this.props.auth;

    const guestLinks = (
      <div>
        <ul className="right hide-on-med-and-down nav-style">
          <li>
            <Link
              id="auth"
              to="/signup"
              href="/signup"
            >Sign Up / In
            </Link >
          </li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li className="nav-list">
            <i className="material-icons"> keyboard_tab </i>
            <Link
              to="/signup"
              href="/signup"
              className="white-text list-item2"
            >Sign Up / In
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <header>
        <nav className="nav-color">
          <div className="nav-wrapper ">
            <Link
              to="/"
              href="/"
              id="logo"
              className="left brand-logo logo-style"
            >MoreRecipes
            </Link >
            <Link
              to="#!"
              href="#!"
              data-activates="nav-mobile"
              className="button-collapse left"
            >
              <i className="material-icons">
                menu
              </i>
            </Link >
            {isAuthenticated ?
              <AuthUser
                firstName={this.state.firstName}
                signout={this.signout}
              /> : guestLinks}
          </div>
        </nav>
      </header>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  signout: PropTypes.func.isRequired
};

NavigationBar.defaultProps =
  {
    user: {}
  };

NavigationBar.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps, { signout })(NavigationBar);
