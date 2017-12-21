import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdateRecipeForm from './UpdateRecipeForm';
import { updateRecipe, getARecipe } from '../../actions/recipeActions';

class UpdateRecipePage extends Component {
  componentDidMount() {
    this.props.getARecipe(this.props.match.params.recipeId);
  }

  render() {
    const { updateRecipe, recipe } = this.props;
    return (
      <div >
        <main id="addRecipebody">
          <div className="container" style={{ width: '100%', margin: '0 auto' }}>
            <p className="center-align grey-text text-lighten-3"
              style={{ marginTop: '0', marginBottom: '0', fontSize: '30px' }}> UPDATE RECIPE </p>
            <div className="row remove-margin-bottom">
              <div className="col s8 offset-s2">
                <div className="card z-depth-2">
                  <span className="card-title col s3 offset-s5 teal-text"
                    style={{ marginTop: '1em', marginBottom: '2em' }}> RECIPE </span>
                  <div className="row" style={{ marginBottom: '0' }}>
                    <div className="col s4 offset-s4">
                      <div className="file-field input-field">
                        <input type="text" className="validate col s8" />
                        <div className="btn-floating btn-mediium waves-effect waves-light blue col s2">
                          <i className="material-icons">photo</i>
                          <input type="file" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <UpdateRecipeForm
                      recipe={recipe}
                      updateRecipe={updateRecipe}
                    />
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

UpdateRecipePage.propTypes = {
  updateRecipe: PropTypes.func.isRequired,
  getARecipe: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  recipe: state.recipeReducer.currentRecipe,
});

export default connect(mapStateToProps, { updateRecipe, getARecipe })(UpdateRecipePage);
