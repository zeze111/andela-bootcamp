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

/**
 *
 *
 * @class RecipeDetails
 * @extends {React.Component}
 */
class RecipeDetails extends Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
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
      isLoading: false
    };
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentDidMount() {
    $('.materialboxed').materialbox();
    this.props.getARecipe(this.props.match.params.recipeId);
    this.props.getUpvotes(this.props.match.params.recipeId);
    this.props.getDownvotes(this.props.match.params.recipeId);
    this.props.getReviews(this.props.match.params.recipeId);
  }

  /**
   * @param {any} nextProps
   * @memberof Home
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

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onClickFave = () => {
    this.props.favoriteRecipe(this.props.recipe.id)
      .then(() => {
        const toastContent = $(`<span>${this.props.message}</span>`);
        Materialize.toast(toastContent, 2000);
        if (this.props.message.includes('added')) {
          this.setState({ icon: 'star' });
        } else {
          this.setState({ icon: 'star_border' });
        }
      });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onUpvote = () => {
    this.props.upvoteRecipe(this.props.recipe.id)
      .then(() => {
        this.props.getUpvotes(this.props.recipe.id);
        this.props.getDownvotes(this.props.recipe.id);
      });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onDownvote = () => {
    this.props.downvoteRecipe(this.props.recipe.id)
      .then(() => {
        this.props.getDownvotes(this.props.recipe.id);
        this.props.getUpvotes(this.props.recipe.id);
      });
  }

  /**
   * @param {any} event
   * @memberof Home
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
        .add($(
          '<button class="btn-flat toast-action"',
          'onClick=Materialize.Toast.removeAll(); on>No</button>'
        ));
    Materialize.toast(toastContent);
  }

  /**
   * @memberof Home
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
            />
            <div className="row">
              <div className="col s6 review-section">
                {(reviewsList.length === 0) ? noReviews :
                <ul className="collection" >
                  {
                      reviewsList.map((review, index) => (
                        <Reviews
                          key={index}
                          review={review}
                          user={user}
                          deleteReview={deleteReview}
                          message={reviewMessage}
                        />
                      ))
                    }
                </ul>
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
  user: {}
};

const mapStateToProps = state => ({
  recipe: (state.recipeReducer.currentRecipe) ?
    state.recipeReducer.currentRecipe : {},
  user: state.auth.user,
  message: state.favoriteReducer.message,
  upvotes: state.ratingsReducer.upvotes,
  downvotes: state.ratingsReducer.downvotes,
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
