import React, { Component } from 'react';
import { TextFieldGroup3 } from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUserRecipes } from '../../actions/recipeActions';

class Recipes extends Component {
  constructor(props) {
    super(props);

  }

  clickEvent = (event) => {
    const $toastContent = $('<span>Are you sure you want to delete this recipe</span>')
      .add($('<button class="btn-flat toast-action" on>Yes</button>')
        .click(() => {
          this.props.deleteRecipes(this.props.recipe.id)
            .then(() => {
              const user = localStorage.getItem('user');
              this.props.getUserRecipes(JSON.parse(user).id);
            })
        }))
      .add($('<button class="btn-flat toast-action" onClick=Materialize.Toast.removeAll(); on>No</button>'));
    Materialize.toast($toastContent, 5000);
  }

  render() {
    return (
      <li className="collection-item">
        <Link to="/userRecipe"> {this.props.recipe.name}</Link>
        <a href="#!" className="secondary-content">
          <i className="material-icons" >mode_edit</i>
          <i onClick={this.clickEvent} className="material-icons">delete</i></a>
      </li>
    )
  };
}

Recipes.propTypes = {
  deleteRecipes: PropTypes.func.isRequired,
  getUserRecipes: PropTypes.func.isRequired
}

export default Recipes;
