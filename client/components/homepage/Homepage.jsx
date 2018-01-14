import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllRecipes } from '../../actions/recipeActions';
import Slide from './Slide';
import PopularContent from './PopularContent';
import AllContent from './AllContent';
import '../../assets/style.scss';
import '../../assets/init';

/**
 *
 *
 * @class Homepage
 * @extends {React.Component}
 */
class Homepage extends Component {
  /**
   * @memberof Home
   * @return {void}
   */
  componentWillMount() {
    $(document).ready(() => {
      $('.dropown-button').dropdown();
      $('.materialboxed').materialbox();
      $('.tooltip').tooltip({ delay: 20 });
      Materialize.updateTextFields();
      $('select').material_select();
    });
  }

  /**
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  componentDidMount() {
    this.props.getAllRecipes();
  }

  /**
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { getAllRecipes } = this.props;
    const allRecipes = (this.props.recipes) ? (this.props.recipes) : [];
    return (
      <div id="homepageBody">
        <main>
          <Slide />
          <PopularContent />
          <div className="container full-container">
            <br /> <br />
            <Link
              to="/allRecipes"
              href="/allRecipe"
            >
              <h5 className="light teal-text"> ALL RECIPES </h5>
            </Link>
            <div className="row remove-margin-bottom">
              <ul className="categories flex-container-homepage">
                {
                    allRecipes.map((recipe, index) => (
                      <AllContent
                        recipe={recipe}
                        key={index}
                      />))
                  }
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Homepage.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes
});

export default connect(mapStateToProps, { getAllRecipes })(Homepage);
