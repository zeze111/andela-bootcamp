import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, NavItem } from 'react-materialize';

import { LinkFieldGroup, LinkFieldGroup2 } from '../common/TextFieldGroup';

/** Stateless component to render actions for authenticated users
 *
 * @export {function} Details
 *
 * @param {object} props
 *
 * @returns {null} null
 */
const AuthUser = props => (
  <div>
    <ul className="right hide-on-med-and-down nav-style">
      <LinkFieldGroup
        id="add"
        to="/add-recipe"
        href="/add-recipe"
        dataTool="Add A Recipe"
        icon="add"
      />
      <LinkFieldGroup
        id="favorite"
        to="/user/favorites"
        href="/user/favorites"
        dataTool="Favorites"
        icon="star_border"
      />
      <LinkFieldGroup
        id="recipes"
        to="/user/recipes"
        href="/user/recipes"
        dataTool="My Recipes"
        icon="format_list_bulleted"
      />
      <li>
        <Dropdown
          trigger={
            <div className="caps div-pointer2 username">{props.firstName}
              <i className="material-icons right">arrow_drop_down</i>
            </div>}
        >
          <NavItem
            to="/user/profile"
            href="/user/profile"
            id="profile"
          >
            <div className="text-color"> Profile
            </div>
          </NavItem>
          <NavItem
            id="signOut"
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
        to="/add-recipe"
        href="/add-recipe"
        item="Add A Recipe"
        icon="add"
      />
      <LinkFieldGroup2
        to="/user/favorites"
        href="/user/favorites"
        item="Favourites"
        icon="star"
      />
      <LinkFieldGroup2
        to="/user/recipes"
        href="/user/recipes"
        item="My Recipes"
        icon="format_list_bulleted"
      />
      <LinkFieldGroup2
        to="/user/profile"
        href="/user/profile"
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
