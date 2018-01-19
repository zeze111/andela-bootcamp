import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeForm from './AddRecipeForm';
import { addRecipeRequest } from '../../actions/recipeActions';

/**
 *
 *
 * @class AddRecipePage
 * @extends {React.Component}
 */
class AddRecipePage extends React.Component {

  /**
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { addRecipeRequest } = this.props;
    return (
      <div id="addRecipebody">
        <main id="wrapper">
          <div className="container full-container">
            <div className="row remove-margin-bottom">
              <div className="col s8 offset-s2 form-padding">
                <div className="card z-depth-2">
                  <span
                    className="card-title col s5 offset-s4 text-color inner"
                  > SUBMIT A RECIPE
              </span>
                  <AddRecipeForm addRecipeRequest={addRecipeRequest} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div >
    );
  }
}

AddRecipePage.propTypes = {
  addRecipeRequest: PropTypes.func.isRequired,
};

export default connect(null, { addRecipeRequest })(AddRecipePage);
