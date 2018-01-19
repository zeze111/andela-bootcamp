import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, NavItem } from 'react-materialize';
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
            <Dropdown
              trigger={
                <div className="caps div-pointer2">{this.state.firstName}
                  <i className="material-icons right">arrow_drop_down</i>
                </div>}
            >
              <NavItem
                to="/user"
                href="/user"
              >
                <div
                  className="text-color"
                >Profile
                </div>
              </NavItem>
              <NavItem
                to="/"
                href="/"
                onClick={this.signout}
              >
                <div
                  className="text-color"
                >Sign Out
                </div>
              </NavItem>
            </Dropdown>

          </li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li className="nav-list"><i className="material-icons">add</i>
            <Link
              to="/addRecipe"
              href="/addRecipe"
              className="white-text list-item"
            >Add A Recipe
            </Link>
          </li>
          <li className="nav-list">
            <i className="material-icons">star</i>
            <Link
              to="/user"
              href="/user"
              className="white-text list-item"
            >Favourites
            </Link>
          </li>
          <li className="nav-list">
            <i className="material-icons">person</i>
            <Link
              to="/user"
              href="/user"
              className="caps white-text list-item"
            >{this.state.firstName}
            </Link>
          </li>
          <li className="nav-list">
            <i className="material-icons">keyboard_tab</i>
            <Link
              to="/"
              href="/"
              className="white-text list-item"
              onClick={this.signout}
            >Sign Out
            </Link>
          </li>
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
