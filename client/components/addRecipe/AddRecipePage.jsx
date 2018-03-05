import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddRecipeForm from './AddRecipeForm';
import { addRecipeRequest } from '../../actions/recipeActions';

/** Stateless component to render recipe's form
*
* @export {function} AddRecipePage
*
* @param {object} props
*
* @returns {null} null
*/
const AddRecipePage = props => (
  <div id="addRecipebody">
    <main id="wrapper">
      <div className="container full-container">
        <div className="row remove-margin-bottom card-width">
          <div className="col s12 m10 l10 push-l1 push-m1 form-padding">
            <div className="card z-depth-2" >
              <span
                className="card-title
                col s12 m12 l12
                text-headers
                center-align
                text-color
                inner"
              > SUBMIT A RECIPE
              </span>
              <AddRecipeForm addRecipeRequest={props.addRecipeRequest} />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div >
);

AddRecipePage.propTypes = {
  addRecipeRequest: PropTypes.func.isRequired,
};

export default connect(null, { addRecipeRequest })(AddRecipePage);
