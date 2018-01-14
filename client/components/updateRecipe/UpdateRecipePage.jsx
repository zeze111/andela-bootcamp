import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdateRecipeForm from './UpdateRecipeForm';
import { updateRecipe, getARecipe } from '../../actions/recipeActions';

/**
 *
 *
 * @class UpdateRecipePage
 * @extends {React.Component}
 */
class UpdateRecipePage extends Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  componentDidMount() {
    this.props.getARecipe(this.props.match.params.recipeId);
  }

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    const { updateRecipe, recipe } = this.props;
    return (
      <div id="addRecipebody">
        <main id="wrapper">
          <div className="container full-container">
            <div className="row remove-margin-bottom">
              <div className="col s8 offset-s2 form-padding">
                <div className="card z-depth-2" >
                  <span
                    className="card-title col s3 offset-s5 teal-text inner"
                  > UPDATE RECIPE
                  </span>
                  <UpdateRecipeForm
                    recipe={recipe}
                    updateRecipe={updateRecipe}
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
  match: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipeReducer.currentRecipe,
});

export default connect(
  mapStateToProps,
  { updateRecipe, getARecipe }
)(UpdateRecipePage);
