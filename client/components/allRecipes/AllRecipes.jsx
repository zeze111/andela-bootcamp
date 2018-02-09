import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';

import RecipeCard from './RecipeCard';
import {
  getPaginatedRecipes,
  getRecipeCategory,
  searchRecipe
} from '../../actions/recipeActions';
import PreLoader from '../common/PreLoader';
import '../../assets/style.scss';
import Categories from './Categories';
import Search from './Search';

/** display all recipes in the app,
 * allows users to serach for recipes by input,
 * allows users to get recipes by category
 *
 * @class AllRecipes
 *
 * @extends {React.Component}
 */
class AllRecipes extends Component {
  /**
   * @description Constructor Function
   *
   * @param {object} props
   *
   * @memberof Home
   *
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      dropdown: 'All Recipes',
      search: '',
      limit: 3,
      isLoading: true
    };
  }

  /** calls action to display all recipes with pagination
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentWillMount() {
    const offset = 0;
    const { limit } = this.state;
    this.props.getPaginatedRecipes(limit, offset)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  /** calls action to get the next / previous set of paginated recipes
   *
   * @param {number} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onNextPage = (event) => {
    const { limit, search, dropdown } = this.state;
    const offset = (limit * event) - limit;
    this.setState({ isLoading: true });

    if (!this.state.searching) {
      if (dropdown === 'All Recipes') {
        this.props.getPaginatedRecipes(limit, offset)
          .then(() => {
            this.setState({ isLoading: false });
          });
      } else {
        this.props.getRecipeCategory(dropdown, limit, offset)
          .then(() => {
            this.setState({ isLoading: false });
          });
      }
    } else {
      this.props.searchRecipe(search, limit, offset)
        .then(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  /** calls action to get all recipes by selected category type
   *
   * @param {string} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSelectCategory = (event) => {
    const offset = 0;
    const { limit } = this.state;
    this.setState({ isLoading: true });

    this.props.getRecipeCategory(event, limit, offset)
      .then(() => {
        this.setState({ dropdown: event, isLoading: false });
      });
  }

  /** calls action to display all recipes with pagination
   *
   * @param {string} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSelectAllRecipes = (event) => {
    this.setState({ isLoading: true });
    const offset = 0;
    const { limit } = this.state;

    this.props.getPaginatedRecipes(limit, offset)
      .then(() => {
        this.setState({ dropdown: event, isLoading: false });
      });
  }

  /** calls action to get all recipes by search input
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onChange = (event) => {
    const offset = 0;
    const { limit } = this.state;
    this.setState({ search: event.target.value });

    if (event.target.value.length) {
      this.setState({ searching: true });
      this.props.searchRecipe(event.target.value, limit, offset);
    } else {
      this.setState({ searching: false });
      this.props.getPaginatedRecipes(limit, offset);
    }
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    const allRecipes = (this.props.recipes) ? (this.props.recipes) : [];
    const { pagination } = this.props;

    const noRecipes = (
      <div className="row paginate">
        <div className="col l12 m12 s10
        bottom-style
        center-align
        error-message"
        >
          {this.props.message}
        </div>
      </div>
    );

    return (
      <main >
        <div className="container full-container">
          <div className="row paginate">
            <div className="col l5 m7 s10">
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

        <div className="row remove-margin-bottom home-width text3">
          {
            this.state.isLoading &&
            <div className="center-align loader-style min-preloader">
              <PreLoader />
            </div>
          }
          {!this.state.isLoading &&
            (allRecipes.length === 0) ? noRecipes :
            <ul className="categories all-style flex-container-homepage">
              {
                allRecipes.map(recipe => (
                  <RecipeCard
                    recipe={recipe}
                    key={recipe.id}
                  />))
              }
            </ul>
          }
          <div className="row paginate">
            <div className="center-align">
              {allRecipes.length > 0 && <Pagination
                items={pagination.pageCount || 0}
                activePage={pagination.page}
                maxButtons={pagination.pageCount}
                onSelect={this.onNextPage}
              />}
            </div>
          </div>
        </div>
      </main >
    );
  }
}

AllRecipes.propTypes = {
  getPaginatedRecipes: PropTypes.func.isRequired,
  getRecipeCategory: PropTypes.func.isRequired,
  searchRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any),
  pagination: PropTypes.objectOf(PropTypes.any),
  message: PropTypes.string
};

AllRecipes.defaultProps = {
  message: '',
  recipes: [],
  pagination: {}
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  message: state.recipeReducer.message,
  pagination: state.recipeReducer.pagination
});

export default connect(mapStateToProps, {
  getPaginatedRecipes,
  getRecipeCategory,
  searchRecipe
})(AllRecipes);
