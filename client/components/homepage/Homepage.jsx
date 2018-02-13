import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getAllRecipes,
  getMostUpvotedRecipe,
  getPopularRecipes
} from '../../actions/recipeActions';
import Slide from './Slide';
import UpvotedContent from './UpvotedContent';
import PopularContent from './PopularContent';
import AllContent from './AllContent';
import PreLoader from '../common/PreLoader';
import '../../assets/style.scss';

/** Landing page for when the app is visited
 *
 * @class Homepage
 *
 * @extends {React.Component}
 */
export class Homepage extends Component {
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
      isLoading: true
    };
  }

  /** actions to be called before component is mounted
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentWillMount() {
    this.props.getAllRecipes()
      .then(() => {
        this.setState({ isLoading: false });
      });
    this.props.getMostUpvotedRecipe()
      .then(() => {
        this.setState({ isLoading: false });
      });
    this.props.getPopularRecipes()
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    const allRecipes = (this.props.recipes) ? (this.props.recipes) : [];
    const upvoted = (this.props.upvotedRecipes) ?
      (this.props.upvotedRecipes) : [];
    const popular = (this.props.popularRecipes) ?
      (this.props.popularRecipes) : [];

    return (
      <div id="homepageBody">
        <main>
          <Slide />
          <div className="container full-container home-width">
            <br /> <br />
            <h5 className="light black-text text-headers lighten-3">
              TRENDING RECIPES
            </h5>
            <div className="row">
              {
                this.state.isLoading &&
                <div className="center-align loader-style min-preloader">
                  <PreLoader />
                </div>
              }
              {!this.state.isLoading &&
                <ul className="categories flex-container-homepage">
                  {
                    popular.map(recipe => (
                      <PopularContent
                        recipe={recipe}
                        key={recipe.id}
                      />))
                  }
                </ul>
              }
            </div>
          </div>
          <div className="container full-container home-width">
            <br /> <br />
            <h5 className="light black-text text-headers lighten-3">
              POPULAR RECIPES
            </h5>
            <div className="row">
              {
                this.state.isLoading &&
                <div className="center-align loader-style min-preloader">
                  <PreLoader />
                </div>
              }
              {!this.state.isLoading &&
                <ul className="categories flex-container-homepage">
                  {
                    upvoted.map(recipe => (
                      <UpvotedContent
                        recipe={recipe}
                        key={recipe.recipeId}
                      />))
                  }
                </ul>
              }
            </div>
          </div>
          <div className="container full-container home-width">
            <br /> <br />
            <Link
              to="/all-recipes"
              href="/all-recipes"
            >
              <h5 className="light text-color text-headers"> ALL RECIPES </h5>
            </Link>
            <div className="row remove-margin-bottom">
              {
                this.state.isLoading &&
                <div className="center-align loader-style min-preloader">
                  <PreLoader />
                </div>
              }
              {!this.state.isLoading &&
                <ul className="categories flex-container-homepage">
                  {
                    allRecipes.slice(0, 5).map(recipe => (
                      <AllContent
                        recipe={recipe}
                        key={recipe.id}
                      />))
                  }
                </ul>
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Homepage.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  getMostUpvotedRecipe: PropTypes.func.isRequired,
  getPopularRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any),
  upvotedRecipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  popularRecipes: PropTypes.arrayOf(PropTypes.any).isRequired
};

Homepage.defaultProps = {
  recipes: []
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  upvotedRecipes: state.recipeReducer.upvotedRecipes,
  popularRecipes: state.recipeReducer.popularRecipes
});

export default connect(mapStateToProps, {
  getAllRecipes,
  getMostUpvotedRecipe,
  getPopularRecipes
})(Homepage);
