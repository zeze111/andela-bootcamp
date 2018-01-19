import React, { Component } from 'react';
import { TextFieldGroup3 } from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PreLoader from '../common/PreLoader';

/**
 *
 *
 * @class Favorites
 * @extends {React.Component}
 */
class Favorites extends Component {
  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  clickEvent = (event) => {
    this.props.deleteFavorite(this.props.favorite.id);
  }

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    const { favorite } = this.props;

    return (
      <div>
        <li className="collection-item">
          <Link to={`/userRecipe/${favorite.id}`} className="caps text-color">
            {favorite.name} <span className="black-text" >
              posted by {favorite.User.firstName} {favorite.User.surname} </span>
          </Link>
          <div className="secondary-content div-pointer2">
            <i onClick={this.clickEvent} className="material-icons icon-color">delete</i>
          </div>
        </li>
      </div>
    )
  };
}

Favorites.propTypes = {
  deleteFavorite: PropTypes.func.isRequired,
}

export default Favorites;
