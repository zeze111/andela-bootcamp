import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UpdateRecipeForm from './UpdateRecipeForm';
import { updateRecipe, getARecipe } from '../../actions/recipeActions';

/** Passes the necessary props to update form
 *
 * @class UpdateRecipePage
 *
 * @extends {React.Component}
 */
class UpdateRecipePage extends Component {
  /** calls action to get recipe details when compoment has mounted
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.getARecipe(this.props.match.params.recipeId);
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    return (
      <div id="addRecipebody">
        <main id="wrapper">
          <div className="container full-container">
            <div className="row remove-margin-bottom card-width">
              <div className="col s12 m10 l8 push-l2 push-m1 form-padding">
                <div className="card z-depth-2" >
                  <span
                    className="card-title col s12 m12 l12 center-align text-color inner"
                  > UPDATE RECIPE
                  </span>
                  <UpdateRecipeForm
                    recipe={this.props.recipe}
                    updateRecipe={this.props.updateRecipe}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div >
    );
  }
}

UpdateRecipePage.propTypes = {
  updateRecipe: PropTypes.func.isRequired,
  getARecipe: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  recipe: PropTypes.objectOf(PropTypes.any)
};

UpdateRecipePage.defaultProps = {
  recipe: {}
};

const mapStateToProps = state => ({
  recipe: state.recipeReducer.currentRecipe,
});

export default connect(
  mapStateToProps,
  { updateRecipe, getARecipe }
)(UpdateRecipePage);
