import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { getAllRecipes, getRecipeCategory, searchRecipe } from '../../actions/recipeActions';
import PreLoader from '../common/PreLoader';
import '../../assets/style.scss';
import '../../assets/init';

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
      search: '',
      isLoading: true
    };
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentWillMount() {
    $('.dropown-button').dropdown();
    $('.tooltip').tooltip({ delay: 20 });
    $('select').material_select();
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentDidMount() {
    this.props.getAllRecipes()
      .then(() => {
        this.setState({ isLoading: false })
      });
  }

  /**
   * @param event
   * @memberof Home
   * @return {void}
   */
  onSelectCategory = (event) => {
    this.setState({ isLoading: true });
    this.props.getRecipeCategory(event)
      .then(() => {
        this.setState({ isLoading: false })
      });
  }

  /**
   * @memberof Home
   * @return {void}
   */
  onSelectAllRecipes = () => {
    this.setState({ isLoading: true });
    this.props.getAllRecipes()
      .then(() => {
        this.setState({ isLoading: false })
      });
  }

  /**
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
    const appetizer = "Appetizer";
    const main = "Main";
    const dessert = "Dessert";
    const drinks = "Drinks";

    const noRecipes = (
      <div className="col s12 bottom-style center-align error-message"> {this.props.message} </div>
    );
    return (
      <main >
        <div className="container full-container">
          <div className="row">
            <div className="col s3">
              <ul id="recipesdrop" className="dropdown-content content-recipes">
                <li className="grey-text default-droplist">
                  <div>Select Category</div>
                </li>
                <li className="content-text">
                  <div
                    className="btn-flat dropdown-btn"
                    onClick={() => this.onSelectAllRecipes()}>All Recipes
                  </div>
                </li>
                <li className="content-text">
                  <div
                    className="btn-flat dropdown-btn"
                    onClick={() => this.onSelectCategory(appetizer)}>{appetizer}
                  </div>
                </li>
                <li className="content-text">
                  <div
                    className="btn-flat dropdown-btn"
                    onClick={() => this.onSelectCategory(main)}>{main}
                  </div>
                </li>
                <li className="content-text">
                  <div
                    className="btn-flat dropdown-btn"
                    onClick={() => this.onSelectCategory(dessert)}>{dessert}
                  </div>
                </li>
                <li className="content-text">
                  <div
                    className="btn-flat dropdown-btn"
                    onClick={() => this.onSelectCategory(drinks)}>{drinks}
                  </div>
                </li>
              </ul>
              <a href="#" className="dropdown-button" data-activates="recipesdrop">
                <h5 className="light teal-text darken-4 top"> ALL RECIPES
                <i className="material-icons">arrow_drop_down</i>
                </h5>
              </a>
            </div>
            <form className="col s7 offset-s4">
              <div className="row">
                <div className="input-field col s6">
                  <label htmlFor="search"> </label>
                  <input
                  placeholder="Search for Recipes"
                  type="text"
                  id="search"
                  value={this.state.search}
                  onChange={this.onChange}
                  />
                </div>
                <div className="col s6">
                  <button
                    className="btn grey top"
                    type="button">
                    <i className="material-icons">search</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div >

        <div className="row remove-margin-bottom reviews-style text3">
          {
            (this.state.isLoading) &&
            <div className="center-align loader-style min-preloader">
              <PreLoader />
            </div>
          }
          {(!this.state.isLoading) &&
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
  };
}

AllRecipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  getRecipeCategory: PropTypes.func.isRequired,
  searchRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired
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
