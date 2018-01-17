import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import ReviewForm from './ReviewForm';
import Reviews from './Reviews';
import PreLoader from '../common/PreLoader';
import { deleteRecipe, getARecipe } from '../../actions/recipeActions';
import { favoriteRecipe } from '../../actions/favoriteActions';
import { reviewRecipe, getReviews, deleteReview } from '../../actions/reviewActions';
import { upvoteRecipe, downvoteRecipe, getDownvotes, getUpvotes } from '../../actions/ratingActions';

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
      ingredients: '',
      creator: {},
      upvotes: 0,
      downvotes: 0,
    };

    this.onClickFave = this.onClickFave.bind(this);
    this.onUpvote = this.onUpvote.bind(this);
    this.onDownvote = this.onDownvote.bind(this);
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentWillMount() {
    $(document).ready(() => {
      $('.tooltip').tooltip('remove')
      $('.materialboxed').materialbox();
    });
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
   * @memberof Home
   * @return {void}
   */
  componentDidMount() {
    this.props.getARecipe(this.props.match.params.recipeId);

    this.props.getUpvotes(this.props.match.params.recipeId);
    this.props.getDownvotes(this.props.match.params.recipeId);
    this.props.getReviews(this.props.match.params.recipeId);
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  clickEvent = (event) => {
    const $toastContent = $('<span>Are you sure you want to delete this recipe</span>')
      .add($('<button class="btn-flat toast-action" on>Yes</button>')
        .click(() => {
          this.props.deleteRecipe(this.props.recipe.id)
            .then(() => {
              Materialize.Toast.removeAll();
              return this.setState({ redirect: true });
            });
        }))
      .add($('<button class="btn-flat toast-action" onClick=Materialize.Toast.removeAll(); on>No</button>'));
    Materialize.toast($toastContent);
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onClickFave(event) {
    this.props.favoriteRecipe(this.props.recipe.id)
      .then(() => {
        const $toastContent = $(`<span>${this.props.message}</span>`)
        Materialize.toast($toastContent, 2000);
      });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onUpvote(event) {
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
  onDownvote(event) {
    this.props.downvoteRecipe(this.props.recipe.id)
      .then(() => {
        this.props.getDownvotes(this.props.recipe.id);
        this.props.getUpvotes(this.props.recipe.id);
      });
  }

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    if (!this.props.recipe) {
      return (
        <div className="center-align loader-style">
          <PreLoader />
        </div>
      );
    }

    if (redirect) {
      return <Redirect to='/user' />;
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

    const { redirect } = this.state;
    const { id } = this.props.user;
    let ingredients = [];

    if (!this.state.ingredients) {
      ingredients = [];
    } else {
      ingredients = this.state.ingredients.split(',').map((item, i) => (
        <p style={{ marginTop: "0px", marginBottom: "0px" }} key={`${i}`}> - {item} </p>
      ));
    }

    const reviewsList = (reviews) ? (reviews) : [];

    const noReviews = (
      <div className="col s6 bottom-style"> No Reviews Posted Yet </div>
    );

    const creatorUser = (
      <div >
        <div className="col s4 offset-s7 creator">
          <Link to={`/updateRecipe/${recipe.id}`}
            className="waves-effect waves-light orange-text">
            Edit this recipe</Link>
          <div className=" waves-effect waves-light orange-text right div-pointer text-style"
            onClick={this.clickEvent}>Delete this recipe</div>
        </div>
      </div>
    );

    const guestUser = (
      <div> </div>
    );

    return (
      <div >
        <main>
          <div className="row flex-container">
            <div className="col s5">
              <div className="card right" >
                <div className="card-image">
                  <img src={recipe.image || '/images/noimg.png'}
                    className="materialboxed responsive-img pic-style" />
                </div>
                <div className="card-action card-buttons">
                  <div className="div-pointer" onClick={this.onUpvote}>
                    <i className="col s2 material-icons right-align">thumb_up</i></div>
                  <p className="col s1 vote-up-style icon" > {this.state.upvotes} </p>
                  <div className="div-pointer" onClick={this.onDownvote}>
                    <i className="col s2 push-s1 material-icons right-align">thumb_down</i></div>
                  <p className="col s1 icon" > {this.state.downvotes} </p>
                  <div className="col s2 push-s2 right-align div-pointer" onClick={this.onClickFave}>
                    <i className="material-icons">star_border</i></div>
                </div>
              </div>
            </div>
            <div className="col s7">
              <div className="row text-flex" >
                <div className="col s12">
                  <h5 className="title-details remove-margin-bottom">
                    {recipe.name} </h5>
                </div>
                <div className="col s12 ">
                  {this.state.creator &&
                    <p className="title-details top-style"> Posted by <a className="orange-text title-details" href="user-recipe.html">
                      {this.state.creator.firstName} </a> </p>
                  }
                </div>
                <div className="col s12">
                  <p id="desc" className="title-details">{recipe.description || 'Try out this recipe'} </p>
                </div>
                <div className="col s12">
                  <p className="remove-margin-bottom"> Like this Recipe? Add to your favourites
                  </p> <br />
                </div>
                <div className="col s12">
                  <a href="#rev" className="scrollspy orange-text remove-margin-bottom"> Reviews </a>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col s8 offset-s1">
              <h5 className="center-align text-recipe title" > Recipe </h5>
              {(ingredients.length <= 0) &&
                <div className="center-align loader-style">
                  <PreLoader />
                </div>
              }
              {(ingredients.length > 0) &&
                <div>
                  <div id="time" className="col s4 ">
                    <p className="recipe"> Prep Time: {recipe.prepTime} </p>
                  </div>
                  <div id="Ing" className="col s4 r-ingredients">

                    <p className="recipe"> Ingredients: </p>
                    {ingredients}

                  </div>
                  <div id="Ins" className="col s4">
                    <p className="recipe"> Instructions: </p>
                    <p id="instruct" className="no-top"> {recipe.instructions} </p>
                  </div>
                </div>
              }
              {(id === recipe.userId) ? creatorUser : guestUser}
            </div>
          </div> <br />

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
                      reviewsList.map((review, index) => {
                        return (
                          <Reviews
                            key={index}
                            review={review}
                            user={user}
                            deleteReview={deleteReview}
                            message={reviewMessage}
                          />)
                      })
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
// }

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
  deleteReview: PropTypes.func.isRequired
};
RecipeDetails.defaultProps = {
  recipe: {
    User: {
      firstName: ''
    }
  }
};

const mapStateToProps = state => ({
  recipe: (state.recipeReducer.currentRecipe) ? state.recipeReducer.currentRecipe : {},
  user: state.auth.user,
  message: state.favoriteReducer.message,
  upvotes: state.ratingsReducer.upvotes,
  downvotes: state.ratingsReducer.downvotes,
  reviews: state.reviewReducer.reviews,
  reviewMessage: state.reviewReducer.message
});

export default connect(mapStateToProps, {
  getARecipe, deleteRecipe, favoriteRecipe, upvoteRecipe, downvoteRecipe,
  getDownvotes, getUpvotes, reviewRecipe, getReviews, deleteReview
})(RecipeDetails);
