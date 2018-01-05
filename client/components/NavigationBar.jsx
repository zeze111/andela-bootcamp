import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signout } from '../actions/signinActions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.user.firstName,
    };
  }

  signout(e) {
    e.preventDefault();
    this.props.signout();
    this.context.router.history.push('/');
  }

  componentWillMount() {
    $('.dropown-button').dropdown();
    $('.button-collapse').sideNav();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.user.firstName,
    })
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/addRecipe" className="btn-floating btn-medium tooltipped waves-effect waves-light grey lighten-1"
            data-position="bottom" data-delay="50" data-tooltip="Add A Recipe">
            <i className="material-icons">add</i></Link></li>
          <li><Link to="/user" className="btn-floating btn-medium tooltipped waves-effect waves-light grey lighten-1"
            data-position="bottom" data-delay="50" data-tooltip="Favorites">
            <i className="material-icons">star_border</i></Link></li>
          <li><a className="dropdown-button" href="#" data-activates="userdrop">{this.state.firstName}
            <i className="material-icons right">arrow_drop_down</i></a></li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li><a href="#">Add</a></li>
          <li><a href="#">Favourites</a></li>
          <li><a href="#" style={{ textTransform: "capitalize" }}>{this.state.firstName}</a></li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/signup">Sign In</Link ></li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li><Link to="/signup">Sign In</Link></li>
        </ul>
      </div>
    );

    return (
      <header>
        <ul id="userdrop" className="dropdown-content">
          <li><Link to="/user">Profile</Link></li>
          <li><Link to="/" onClick={this.signout.bind(this)}>Sign Out</Link></li>
        </ul>
        <nav className="nav-color" role="navigation">
          <div className="nav-wrapper ">
            <Link to="/" id="logo" className="left brand-logo" style={{ marginLeft: 2 + 'em' }}>More-Recipes</Link >
            <Link to="#" data-activates="nav-mobile" className="button-collapse left"><i className="material-icons">
              menu</i></Link >
            {isAuthenticated ? userLinks : guestLinks}
          </div>
        </nav>
      </header>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
}

NavigationBar.defaultProps =
{
  user:{}
};

NavigationBar.contextTypes = {
  router: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { signout })(NavigationBar);
