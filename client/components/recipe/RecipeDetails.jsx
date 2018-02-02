import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import ReviewForm from './ReviewForm';
import Reviews from './Reviews';
import { deleteRecipe, getARecipe } from '../../actions/recipeActions';
import { favoriteRecipe } from '../../actions/favoriteActions';
import {
  reviewRecipe,
  getReviews,
  deleteReview
} from '../../actions/reviewActions';
import {
  upvoteRecipe,
  downvoteRecipe,
  getDownvotes,
  getUpvotes
} from '../../actions/ratingActions';
import Recipe from './Recipe';
import Details from './Details';

/** shows all the details of a recipe including reviews,
 * upvotes, downvotes, and favorite
 *
 * @class RecipeDetails
 *
 * @extends {React.Component}
 */
class RecipeDetails extends Component {
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
      icon: 'star_border',
      ingredients: '',
      creator: {},
      upvotes: 0,
      downvotes: 0,
      offset: 0,
      limit: 3,
      isLoading: false
    };
  }

  /** actions to be called when component is mounted
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentDidMount() {
    $('.materialboxed').materialbox();
    const limit = 3;
    const { recipeId } = this.props.match.params;
    this.props.getARecipe(recipeId);
    this.props.getUpvotes(recipeId);
    this.props.getDownvotes(recipeId);
    this.props.getReviews(recipeId, limit, this.state.offset);
  }

  /** props to be received when component is mounted
   *
   * @param {object} nextProps
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { recipe, upvotes, downvotes } = nextProps;
    this.setState({
      upvotes: upvotes.count,
      downvotes: downvotes.count,
      creator: recipe.User,
      ingredients: recipe.ingredients,

    });
  }

  /** calls action to add recipe to a user's favorite
   *
   * @memberof Home
   *
   * @return {void}
   */
  onClickFave = () => {
    this.props.favoriteRecipe(this.props.recipe.id)
      .then(() => {
        if (this.props.message.includes('added')) {
          this.setState({ icon: 'star' });
        } else {
          this.setState({ icon: 'star_border' });
        }
      });
  }

  /** calls action to view next set of reviews
   *
   * @memberof Home
   *
   * @return {void}
   */
  onNextSet = () => {
    const limit = this.state.limit + 3;
    this.props.getReviews(this.props.recipe.id, limit, this.state.offset)
      .then(() => {
        this.setState({ limit });
      });
  }

  /** calls action to view less reviews
   *
   * @memberof Home
   *
   * @return {void}
   */
  onPreviousSet = () => {
    const limit = this.state.limit - 3;
    this.props.getReviews(this.props.recipe.id, limit, this.state.offset)
      .then(() => {
        this.setState({ limit });
      });
  }

  /** calls action to upvote a recipe
   *
   * @memberof Home
   *
   * @return {void}
   */
  onUpvote = () => {
    const { id } = this.props.recipe;
    this.props.upvoteRecipe(id)
      .then(() => {
        this.props.getUpvotes(id);
        this.props.getDownvotes(id);
      });
  }

  /** calls action to downvote recipe
   *
   * @memberof Home
   *
   * @return {void}
   */
  onDownvote = () => {
    const { id } = this.props.recipe;
    this.props.downvoteRecipe(id)
      .then(() => {
        this.props.getDownvotes(id);
        this.props.getUpvotes(id);
      });
  }

  /** calls action to delete recipe
   *
   * @memberof Home
   *
   * @return {void}
   */
  clickEvent = () => {
    const toastContent =
      $('<span>Are you sure you want to delete this recipe</span>')
        .add($('<button class="btn-flat toast-action" on>Yes</button>')
          .click(() => {
            this.setState({ isLoading: true });
            this.props.deleteRecipe(this.props.recipe.id)
              .then(() => {
                Materialize.Toast.removeAll();
                this.setState({ redirect: true, isLoading: false });
              });
          }))
        .add($('<button class="btn-flat toast-action" onClick=Materialize.Toast.removeAll(); on>No</button>'));
    Materialize.toast(toastContent);
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/user" />;
    }

    const {
      recipe,
      getReviews,
      reviewRecipe,
      reviews,
      user,
      reviewMessage,
      deleteReview
    } = this.props;

    let ingredients = [];

    if (!this.state.ingredients) {
      ingredients = [];
    } else {
      ingredients = this.state.ingredients.split(',').map((item, i) => (
        <p className="no-style" key={`${i}`}> - {item} </p>
      ));
    }

    const reviewsList = (reviews) || [];

    const noReviews = (
      <div className="col s6 bottom-style"> No Reviews Posted Yet </div>
    );

    return (
      <div >
        <main>
          <Recipe
            recipe={recipe}
            onClickFave={this.onClickFave}
            onUpvote={this.onUpvote}
            onDownvote={this.onDownvote}
            upvotes={this.state.upvotes}
            downvotes={this.state.downvotes}
            creator={this.state.creator}
            icon={this.state.icon}
          />

          <Details
            recipe={recipe}
            clickEvent={this.clickEvent}
            id={this.props.user.id}
            ingredients={ingredients}
            isLoading={this.state.isLoading}
          />
          <br />

          <div className="row remove-margin-bottom">
            <br /> <br />
            <ReviewForm
              recipe={recipe}
              reviewRecipe={reviewRecipe}
              getReviews={getReviews}
              limit={this.state.limit}
              offset={this.state.offset}
            />
            <div className="row">
              <div className="col l7 m10 s12 review-section">
                {(reviewsList.length === 0) ? noReviews :
                <ul className="collection" >
                  {
                      reviewsList.map(review => (
                        <Reviews
                          key={review.id}
                          review={review}
                          user={user}
                          isLoading={this.state.isLoading}
                          deleteReview={deleteReview}
                          message={reviewMessage}
                        />
                      ))
                    }
                </ul>
                }
                {
                  (this.props.pagination.pageSize > 3) ?
                    <button
                      className="creator-button
                    text-color
                    left
                    white
                    one-top"
                      onClick={() => { this.onPreviousSet(); }}
                    >Fewer posts
                    </button>
                :
                    <div />
                }
                {
                  (reviewsList.length !== 0) ?
                    <button
                      className="creator-button
                      text-color
                      right
                      white
                      one-top"
                      onClick={() => { this.onNextSet(); }}
                    >Older posts
                    </button>
                :
                    <div />
                }
              </div >
            </div>
          </div>
        </main>
      </div >
    );
  }
}

RecipeDetails.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  getARecipe: PropTypes.func.isRequired,
  favoriteRecipe: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  getUpvotes: PropTypes.func.isRequired,
  getDownvotes: PropTypes.func.isRequired,
  reviewRecipe: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any),
  upvotes: PropTypes.objectOf(PropTypes.any),
  downvotes: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  message: PropTypes.string,
  pagination: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.any)
};

RecipeDetails.defaultProps = {
  recipe: {
    User: {
      firstName: ''
    }
  },
  message: '',
  upvotes: {},
  downvotes: {},
  user: {},
  pagination: {}
};

const mapStateToProps = state => ({
  recipe: (state.recipeReducer.currentRecipe) ?
    state.recipeReducer.currentRecipe : {},
  user: state.auth.user,
  message: state.favoriteReducer.message,
  color: state.favoriteReducer.color,
  upvotes: state.ratingsReducer.upvotes,
  downvotes: state.ratingsReducer.downvotes,
  pagination: state.reviewReducer.pagination,
  reviews: state.reviewReducer.reviews,
  reviewMessage: state.reviewReducer.message
});

export default connect(mapStateToProps, {
  getARecipe,
  deleteRecipe,
  favoriteRecipe,
  upvoteRecipe,
  downvoteRecipe,
  getDownvotes,
  getUpvotes,
  reviewRecipe,
  getReviews,
  deleteReview
})(RecipeDetails);
