import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, NavItem } from 'react-materialize';

import { LinkFieldGroup, LinkFieldGroup2 } from '../common/TextFieldGroup';

const AuthUser = props => (
  <div>
    <ul className="right hide-on-med-and-down">
      <LinkFieldGroup
        to="/addRecipe"
        href="/addRecipe"
        dataTool="Add A Recipe"
        icon="add"
      />
      <LinkFieldGroup
        to="/user"
        href="/user"
        dataTool="Favorites"
        icon="star_border"
      />
      <li>
        <Dropdown
          trigger={
            <div className="caps div-pointer2">{props.firstName}
              <i className="material-icons right">arrow_drop_down</i>
            </div>}
        >
          <NavItem
            to="/user"
            href="/user"
          >
            <div className="text-color"> Profile
            </div>
          </NavItem>
          <NavItem
            to="/"
            href="/"
            onClick={props.signout}
          >
            <div className="text-color"> Sign Out
            </div>
          </NavItem>
        </Dropdown>

      </li>
    </ul >
    <ul id="nav-mobile" className="side-nav">
      <LinkFieldGroup2
        to="/addRecipe"
        href="/addRecipe"
        item="Add A Recipe"
        icon="add"
      />
      <LinkFieldGroup2
        to="/user"
        href="/user"
        item="Favourites"
        icon="star"
      />
      <LinkFieldGroup2
        to="/user"
        href="/user"
        item={props.firstName}
        icon="person"
      />
      <LinkFieldGroup2
        to="/"
        href="/"
        item="Sign Out"
        icon="keyboard_tab"
        onClick={props.signout}
      />
    </ul>
  </div >
);

AuthUser.propTypes = {
  firstName: PropTypes.string.isRequired,
  signout: PropTypes.func.isRequired
};

export default AuthUser;
