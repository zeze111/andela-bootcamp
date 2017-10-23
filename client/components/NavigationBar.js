import React from 'react';

export default () => {
  return (
    <nav className="teal lighten-2" role="navigation">
    <div className="nav-wrapper ">
      <a to="/" id="logo" className="left brand-logo" style="margin-left:2em">More-Recipes</a>
      <a to="#" data-activates="nav-mobile" className="button-collapse left"><i className="material-icons">menu</i></a>
      <ul className="right hide-on-med-and-down">
        <li><a to="/recipes" className="btn-floating btn-medium tooltipped waves-effect waves-light grey" data-position="bottom" data-delay="50"
            data-tooltip="Add A Recipe">
          <i className="material-icons">add</i></a></li>
        <li><a to="/user" className="btn-floating btn-medium tooltipped waves-effect waves-light grey" data-position="bottom" data-delay="50"
            data-tooltip="Favorites">
              <i className="material-icons">star_border</i></a></li>
        <li><a to="/signup">Sign In</a></li>
      </ul>
      <ul id="nav-mobile" className="side-nav">
        <li><a Link to="/recipes">Add</a></li>
        <li><a Link to="/user">Favourites</a></li>
        <li><a Link to="/signup">Sign In</a></li>
      </ul>
    </div>
  </nav>
  );
}
