import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

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
export class RecipeDetails extends Component {
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
    const {
      recipe, upvotes, downvotes, fave
    } = nextProps;
    if (fave === true) {
      this.setState({ icon: 'star' });
    } else {
      this.setState({ icon: 'star_border' });
    }
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
    this.props.upvoteRecipe(id);
  }

  /** calls action to downvote recipe
   *
   * @memberof Home
   *
   * @return {void}
   */
  onDownvote = () => {
    const { id } = this.props.recipe;
    this.props.downvoteRecipe(id);
  }

  /** calls action to delete recipe
   *
   * @memberof Home
   *
   * @return {void}
   */
  clickEvent = () => {
    swal({
      text: 'Are you sure you want to delete this recipe',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.setState({ isLoading: true });
          this.props.deleteRecipe(this.props.recipe.id)
            .then(() => {
              this.setState({ redirect: true, isLoading: false });
            });
          swal('Poof! Your recipe has been deleted!', {
            icon: 'success',
          });
        }
      });
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
      return <Redirect to="/user/recipes" />;
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
    let instructions = {};

    if (!this.state.ingredients) {
      ingredients = [];
      instructions = {};
    } else {
      ingredients = this.state.ingredients.split(',').map((item, i) => (
        <li className="no-style" key={`${i}`}> {item} </li>
      ));
      instructions = (
        <ol className="remove-padding">
          {recipe.instructions.split('.').map((item, i) => (
            <li className="no-style" key={`${i}`}> {item} </li>
      ))}
        </ol>
      );
    }

    const reviewsList = (reviews) || [];

    const noReviews = (
      <div className="col s12 bottom-style no-message">
      No Reviews Posted Yet
      </div>
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
            instructions={instructions}
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
              <div className="col l6 m10 s12 review-section">
                {(reviewsList.length === 0) ? noReviews :
                <ul className="collection rev-list" >
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
                  (reviewsList.length !== 0 && this.props.pagination.pageCount !== 1) ?
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
  fave: PropTypes.bool,
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
  fave: false,
  upvotes: {},
  downvotes: {},
  user: {},
  pagination: {}
};

const mapStateToProps = state => ({
  recipe: (state.recipeReducer.currentRecipe) ?
    state.recipeReducer.currentRecipe : {},
  fave: state.recipeReducer.fave,
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
