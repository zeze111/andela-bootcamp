import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeForm from './AddRecipeForm';
import { addRecipeRequest } from '../../actions/recipeActions';

class AddRecipePage extends Component {
  render() {
    const { addRecipeRequest } = this.props;
    return (
      <div>
        <main>
          <div className="container" style={{ width: '100%', margin: '0 auto' }}>
            <p className="center-align grey-text text-lighten-3"
            style={{ marginTop: '2em', marginBottom: '2em', fontSize: '30px' }}> ADD A NEW RECIPE </p>
            <div className="row">
              <div className="col s8 offset-s2">
                <div className="card z-depth-2">
                  <span className="card-title col s3 offset-s5 teal-text" 
                  style={{ marginTop: '1em', marginBottom: '2em' }}> RECIPE </span>
                  <div className="row" style={{ marginBottom: '0' }}>
                    <div className="col s4 offset-s4">
                      <div className="file-field input-field">
                        <input type="text" className="validate col s8"/>
                        <div className="btn-floating btn-mediium waves-effect waves-light blue col s2">
                          <i className="material-icons">photo</i>
                          <input type="file" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <AddRecipeForm addRecipeRequest={addRecipeRequest} />
                  </div>
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