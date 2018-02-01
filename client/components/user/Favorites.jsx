import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PreLoader from '../common/PreLoader';

/** class component to render a single favorite recipe
 *
 * @class Favorites
 *
 * @extends {React.Component}
 */
class Favorites extends Component {
  /** Deletes a recipe from favorites
   *
   * @memberof Home
   *
   * @return {void}
   */
  clickEvent = () => {
    this.props.deleteFavorite(this.props.favorite.id);
  }

  /** component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    if (this.props.isLoading) {
      return (
        <div className="center-align loader-style">
          <PreLoader />
        </div>
      );
    }
    const { favorite } = this.props;

    return (
      <div>
        <li className="collection-item">
          <Link
            to={`/recipe/${favorite.id}`}
            href={`/recipe/${favorite.id}`}
            className="caps text-color "
          >
            {favorite.name}
            <span className="black-text text-space">
              posted by {favorite.User.firstName} {favorite.User.surname}
            </span>
          </Link>
          <div className="secondary-content div-pointer2 ">
            <i
              role="button"
              tabIndex="0"
              onKeyDown={this.handleKeyDown}
              onClick={this.clickEvent}
              className="material-icons icon-color"
            > delete
            </i>
          </div>
        </li>
      </div>
    );
  }
}

Favorites.propTypes = {
  deleteFavorite: PropTypes.func.isRequired,
  favorite: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool.isRequired,
};

Favorites.defaultProps = {
  favorite: {}
};

export default Favorites;
