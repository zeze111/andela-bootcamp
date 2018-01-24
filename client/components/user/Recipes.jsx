import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


/**
 *
 *
 * @class Recipes
 * @extends {React.Component}
 */
class Recipes extends Component {
  /**
   * @memberof Home
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

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <li className="collection-item">
        <Link
          to={`/userRecipe/${this.props.recipe.id}`}
          href={`/userRecipe/${this.props.recipe.id}`}
          className="text-color caps"
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
          to={`/updateRecipe/${this.props.recipe.id}`}
          href={`/updateRecipe/${this.props.recipe.id}`}
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
  recipe: PropTypes.objectOf(PropTypes.any)
};

Recipes.defaultProps = {
  recipe: {}
};

export default Recipes;
