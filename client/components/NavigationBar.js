import React, { Component }  from 'react';
import { Link  } from 'react-router-dom';

class NavigationBar extends Component {
  render() {
    return (
      <header>
        <nav className="teal lighten-2"role="navigation">
          <div className="nav-wrapper ">
            <Link  to="/" id="logo" className="left brand-logo" style={{marginLeft: 2 + 'em'}}>More-Recipes</Link >
            <Link  to="#" data-activates="nav-mobile" className="button-collapse left"><i className="material-icons">menu</i></Link >
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
      </nav>
    </header>
    );
  }
}

export default NavigationBar;
