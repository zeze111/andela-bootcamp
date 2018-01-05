import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeForm from './AddRecipeForm';
import { addRecipeRequest } from '../../actions/recipeActions';

class AddRecipePage extends Component {
  render() {
    const { addRecipeRequest } = this.props;
    return (
      <div id="addRecipebody">
        <main id="wrapper">
          <div className="container" style={{ width: '100%', margin: '0 auto' }}>
            <div className="row remove-margin-bottom">
              <div className="col s8 offset-s2" style={{paddingTop: "5em", paddingBottom: "2em"}}>
                <div className="card z-depth-2">
                  <span className="card-title col s5 offset-s4 teal-text"
                  style={{ marginTop: '1em', marginBottom: '2em' }}> SUBMIT A RECIPE </span>
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
  addRecipeRequest: PropTypes.func.isRequired
}

export default connect(null, { addRecipeRequest })(AddRecipePage);
