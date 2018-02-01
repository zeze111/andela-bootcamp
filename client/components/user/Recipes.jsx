import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PreLoader from '../common/PreLoader';

/** Recipes class contains the list item for a single recipe
 *
 * @class Recipes
 *
 * @extends {React.Component}
 */
class Recipes extends Component {
  /**
   * @memberof Home
   *
   * @return {void}
   */
  clickEvent = () => {
    const toastContent = $('<span>Are you sure you want to delete this recipe</span>')
      .add($('<button class="btn-flat toast-action" on>Yes</button>')
        .click(() => {
          this.props.deleteRecipe(this.props.recipe.id)
            .then(() => {
              Materialize.Toast.removeAll();
            });
        }))
      .add($('<button class="btn-flat toast-action" onClick=Materialize.Toast.removeAll(); on>No</button>'));
    Materialize.toast(toastContent);
  }

  /** html component to render
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

    return (
      <li className="collection-item">
        <Link
          to={`/recipe/${this.props.recipe.id}`}
          href={`/recipe/${this.props.recipe.id}`}
          className="text-color break caps"
        > {this.props.recipe.name}
        </Link>
        <div className="secondary-content div-pointer2">
          <i
            role="button"
            tabIndex="0"
            onKeyDown={this.handleKeyDown}
            onClick={this.clickEvent}
            className="material-icons icon-color"
          >delete
          </i>
        </div>
        <Link
          to={`/update-recipe/${this.props.recipe.id}`}
          href={`/update-recipe/${this.props.recipe.id}`}
          className="secondary-content"
        >
          <i className="material-icons icon-color" >mode_edit</i>
        </Link>
      </li>
    );
  }
}

Recipes.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool.isRequired,
};

Recipes.defaultProps = {
  recipe: {}
};

export default Recipes;
