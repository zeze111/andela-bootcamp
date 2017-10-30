import React, { Component }  from 'react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavigationBar extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div>
        <ul class="right hide-on-med-and-down">
          <li><Link  to="/recipes" className="btn-floating btn-medium tooltipped waves-effect waves-light grey" data-position="bottom" data-delay="50"
            data-tooltip="Add A Recipe"> <i className="material-icons">add</i></Link ></li>
          <li><Link  to="/user" className="btn-floating btn-medium tooltipped waves-effect waves-light grey" data-position="bottom" data-delay="50"
            data-tooltip="Favorites"> <i className="material-icons">star_border</i></Link ></li>
          <li><a class="dropdown-button" href="#!" data-activates="userdrop">Username<i class="material-icons right">arrow_drop_down</i></a></li>
        </ul>
        <ul id="nav-mobile" class="side-nav">
          <li><a href="#">Add</a></li>
          <li><a href="#">Favourites</a></li>
          <li><a href="#">Username</a></li>
        </ul> 
      </div>
    );

    const guestLinks = (
      <div>
        <ul className="right hide-on-med-and-down">
        <li><Link  to="/recipes" className="btn-floating btn-medium tooltipped waves-effect waves-light grey" data-position="bottom" data-delay="50"
            data-tooltip="Add A Recipe">
          <i className="material-icons">add</i></Link ></li>
        <li><Link  to="/user" className="btn-floating btn-medium tooltipped waves-effect waves-light grey" data-position="bottom" data-delay="50"
            data-tooltip="Favorites">
              <i className="material-icons">star_border</i></Link ></li>
        <li><Link  to="/signup">Sign In</Link ></li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li><Link  to="/recipes">Add</Link></li>
          <li><Link  to="/user">Favourites</Link></li>
          <li><Link  to="/signup">Sign In</Link></li>
        </ul>
      </div>
    );

    return (
      <header>
        <ul id="userdrop" class="dropdown-content">
          <li><a href="#">Profile</a></li>
          <li><a href="#!">Sign Out</a></li>
        </ul>
        <nav className="teal lighten-2"role="navigation">
          <div className="nav-wrapper ">
            <Link  to="/" id="logo" className="left brand-logo" style={{marginLeft: 2 + 'em'}}>More-Recipes</Link >
            <Link  to="#" data-activates="nav-mobile" className="button-collapse left"><i className="material-icons">menu</i></Link >
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </nav>
      </header>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(NavigationBar);
