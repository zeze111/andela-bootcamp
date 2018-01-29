import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RecipeCard from './RecipeCard';
import {
  getAllRecipes,
  getRecipeCategory,
  searchRecipe
} from '../../actions/recipeActions';
import PreLoader from '../common/PreLoader';
import '../../assets/style.scss';
import '../../assets/init';
import Categories from './Categories';
import Search from './Search';

/**
 *
 *
 * @class RecipeDetails
 * @extends {React.Component}
 */
class AllRecipes extends Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      dropdown: '',
      search: '',
      isLoading: true
    };
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentWillMount() {
    this.props.getAllRecipes()
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onSelectCategory = (event) => {
    this.setState({ isLoading: true });
    this.props.getRecipeCategory(event)
      .then(() => {
        this.setState({ dropdown: event, isLoading: false });
      });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onSelectAllRecipes = (event) => {
    this.setState({ isLoading: true });
    this.props.getAllRecipes()
      .then(() => {
        this.setState({ dropdown: event, isLoading: false });
      });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onChange = (event) => {
    this.setState({ search: event.target.value });
    this.props.searchRecipe(event.target.value);
  }

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    const allRecipes = (this.props.recipes) ? (this.props.recipes) : [];

    const noRecipes = (
      <div className="col s12 bottom-style center-align error-message">
        {this.props.message}
      </div>
    );

    return (
      <main >
        <div className="container full-container">
          <div className="row">
            <div className="col s3">
              <Categories
                dropdown={this.state.dropdown}
                onSelectAllRecipes={this.onSelectAllRecipes}
                onSelectCategory={this.onSelectCategory}
              />
            </div>
            <Search
              search={this.state.search}
              onChange={this.onChange}
            />
          </div>
        </div >

        <div className="row remove-margin-bottom reviews-style text3">
          {
            this.state.isLoading &&
            <div className="center-align loader-style min-preloader">
              <PreLoader />
            </div>
          }
          {!this.state.isLoading &&
            (allRecipes.length === 0) ? noRecipes :
            <ul className="categories flex-container-homepage">
              {
                allRecipes.map((recipe, index) => (
                  <RecipeCard
                    recipe={recipe}
                    key={index}
                  />))
              }
            </ul>
          }
        </div>
      </main >
    );
  }
}

AllRecipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  getRecipeCategory: PropTypes.func.isRequired,
  searchRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any),
  message: PropTypes.string
};

AllRecipes.defaultProps = {
  message: '',
  recipes: []
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  message: state.recipeReducer.message
});

export default connect(mapStateToProps, {
  getAllRecipes,
  getRecipeCategory,
  searchRecipe
})(AllRecipes);
