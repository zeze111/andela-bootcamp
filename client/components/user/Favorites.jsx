import React, { Component } from 'react';
import { TextFieldGroup3 } from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Favorites extends Component {

  clickEvent = (event) => {
    this.props.deleteFavorite(this.props.favorite.id)
      .then(() => {
        const $toastContent = $(`<span>${this.props.message}</span>`)
        Materialize.toast($toastContent, 2000);
        const user = localStorage.getItem('user');
        this.props.getFavoriteRecipes(JSON.parse(user).id);
      });
  }

  render() {
    const { favorite } = this.props;

    return (
      <div>
        <li className="collection-item">
          <Link to={`/userRecipe/${favorite.recipeId}`} className="caps">
            {favorite.name} <span className="black-text" >
             posted by {favorite.User.firstName} {favorite.User.surname} </span>
          </Link>
          <a href="#" className="secondary-content">
            <i onClick={this.clickEvent} className="material-icons">delete</i>
          </a>
        </li>
      </div>
    )
  };
}

Favorites.propTypes = {
  deleteFavorite: PropTypes.func.isRequired,
  getFavoriteRecipes: PropTypes.func.isRequired,
}

export default Favorites;
