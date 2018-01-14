import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signout } from '../actions/signinActions';

/**
 * @class Profile
 * @extends {Component}
 */
class NavigationBar extends Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.user.firstName,
    };

    this.signout = this.signout.bind(this);
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentWillMount() {
    $('.dropown-button').dropdown();
    $('.button-collapse').sideNav();
    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip({ delay: 50 });
  }

  /**
   * @param {any} nextProps
   * @memberof Home
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.user.firstName,
    });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  signout(event) {
    event.preventDefault();
    this.props.signout();
    $('.tooltipped').tooltip('remove');
    this.context.router.history.push('/');
  }

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link
              to="/addRecipe"
              href="/addRecipe"
              className="btn-floating btn-medium tooltipped waves-effect waves-light grey lighten-1"
              data-position="bottom"
              data-tooltip="Add A Recipe"
            >
              <i className="material-icons">add</i>
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              href="/user"
              className="btn-floating btn-medium tooltipped waves-effect waves-light grey lighten-1"
              data-position="bottom"
              data-tooltip="Favorites"
            >
              <i className="material-icons">star_border</i>
            </Link>
          </li>
          <li>
            <a href="#" className="dropdown-button" data-activates="userdrop">{this.state.firstName}
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li><a href="/addRecipe">Add</a></li>
          <li><a href="/user">Favourites</a></li>
          <li><a href="#" style={{ textTransform: 'capitalize' }}>{this.state.firstName}</a></li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/signup" href="/signup">Sign In</Link ></li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li><Link to="/signup" href="/signup">Sign In</Link></li>
        </ul>
      </div>
    );

    return (
      <header>
        <ul id="userdrop" className="dropdown-content">
          <li><Link to="/user" href="/user">Profile</Link></li>
          <li><Link to="/" href="/" onClick={this.signout}>Sign Out</Link></li>
        </ul>
        <nav className="nav-color">
          <div className="nav-wrapper ">
            <Link
              to="/"
              href="/"
              id="logo"
              className="left brand-logo"
              style={{ marginLeft: `${2}em` }}
            >More-Recipes
            </Link >
            <Link
              to="#"
              href="#"
              data-activates="nav-mobile"
              className="button-collapse left"
            >
              <i className="material-icons">
                menu
              </i>
            </Link >
            {isAuthenticated ? userLinks : guestLinks}
          </div>
        </nav>
      </header>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
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
