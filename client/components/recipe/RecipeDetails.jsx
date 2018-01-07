import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { deleteRecipe, getARecipe } from '../../actions/recipeActions';
import { favoriteRecipe } from '../../actions/favoriteActions';
import { upvoteRecipe, downvoteRecipe, getDownvotes, getUpvotes } from '../../actions/ratingActions';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.ingredients = '';
    this.creator = '';
    this.upvotes = 0;
    this.downvotes = 0;
    this.state = {};

    this.onClickFave = this.onClickFave.bind(this);
    this.onUpvote = this.onUpvote.bind(this);
    this.onDownvote = this.onDownvote.bind(this);
  }

  componentDidMount() {
    this.props.getARecipe(this.props.match.params.recipeId);
    this.props.getUpvotes(this.props.match.params.recipeId);
    this.props.getDownvotes(this.props.match.params.recipeId);
  }

  componentWillMount() {
    $(document).ready(() => {
      $('.tooltipp').tooltip('remove')
      $('.materialboxed').materialbox();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { recipe, upvotes, downvotes } = nextProps;
    this.upvotes = upvotes.count;
    this.downvotes = downvotes.count;
    this.creator = recipe.User;
    this.ingredients = recipe.ingredients;
  }

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

  onClickFave(event) {
    this.props.favoriteRecipe(this.props.recipe.id)
      .then(() => {
        const $toastContent = $(`<span>${this.props.message}</span>`)
        Materialize.toast($toastContent, 2000);
      });
  }

  onUpvote(event) {
    this.props.upvoteRecipe(this.props.recipe.id)
    .then(() => {
      this.props.getUpvotes(this.props.recipe.id);
      this.props.getDownvotes(this.props.recipe.id);
    });
  }

  onDownvote(event) {
    this.props.downvoteRecipe(this.props.recipe.id)
    .then(() => {
      this.props.getDownvotes(this.props.recipe.id);
      this.props.getUpvotes(this.props.recipe.id);
    });
  }

  render() {
    const { recipe } = this.props;
    const { redirect } = this.state;
    const { id } = this.props.user;
    const ingredients = this.ingredients.split(',').map((item, i) => (
      <p style={{ marginTop: "0px", marginBottom: "0px" }} key={`${i}`}> - {item} </p>
    ));

    const creatorUser = (
      <div >
        <div className="col s4 offset-s7 creator">
          <Link to={`/updateRecipe/${recipe.id}`}
            className="waves-effect waves-light orange-text">
            Edit this recipe</Link>
          <a href="#" className=" waves-effect waves-light orange-text right"
            style={{ marginLeft: "5px" }}
            onClick={this.clickEvent}>Delete this recipe</a>
        </div>
      </div>
    );

    const guestUser = (
      <div> </div>
    );

    if (redirect) {
      return <Redirect to='/user' />;
    }

    return (
      <div >
        <main>
          <div className="row flex-container">
            <div className="col s5">
              <div className="card right" style={{ width: '500px', height: '300px' }}>
                <div className="card-image">
                  <img src={recipe.image || '/images/noimg.png'}
                    className="materialboxed responsive-img pic-style" />
                </div>
                <div className="card-action card-buttons">
                  <a href="#" onClick={this.onUpvote}>
                    <i className="col s2 material-icons right-align">thumb_up</i></a>
                  <p className="col s1 vote-up-style icon" > {this.upvotes} </p>
                  <a href="#!" onClick={this.onDownvote}>
                    <i className="col s2 push-s1 material-icons right-align">thumb_down</i></a>
                  <p className="col s1 icon" > {this.downvotes} </p>
                  <a href="#!" className="col s2 push-s2 right-align" onClick={this.onClickFave}>
                    <i className="material-icons">star_border</i></a>
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
                  <p className="title-details top-style"> Posted by <a className="orange-text title-details" href="user-recipe.html">
                     {this.creator.firstName} </a> </p>
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
              <div id="time" className="col s4 ">
                <p className="recipe"> Prep Time: {recipe.prepTime} </p>
              </div>
              <div id="Ing" className="col s4">
                <p className="recipe"> Ingredients: </p>
                {ingredients}
              </div>
              <div id="Ins" className="col s4">
                <p className="recipe"> Instructions: </p>
                <p id="instruct" style={{ marginTop: "0px" }}> {recipe.instructions} </p>
              </div>
              {(id === recipe.userId) ? creatorUser : guestUser}
            </div>
          </div> <br />

          <div className="row remove-margin-bottom">
            <br /> <br />
            <h5 className="text1" id="rev"> Reviews </h5>
            <div className="col s12 reviews-style">
              <p className="text2" > Add a comment to review this recipe </p>
              <div className="row" style={{ marginBottom: "0em" }}>
                <form className="col s6">
                  <div >
                    <div className="input-field" style={{ marginLeft: "2em" }}>
                      <input id="title" type="text" placeholder="Title"></input>
                    </div>
                    <div className="input-field" style={{ marginLeft: "2em" }}>
                      <textarea id="cmt" className="materialize-textarea " placeholder="Comment"></textarea>
                    </div>
                    <div className="right-align">
                      <button className="btn grey" type="button"> Review </button> <br /> <br />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col s6" style={{ marginLeft: "7em", marginTop: "1em" }}>
                <ul className="collection" >
                  <li className="collection-item avatar">
                    <img src="/images/profilepic.png" alt="" className="circle" />
                    <span className="title"> Title </span>
                    <p id="r-cmt"> User comment... </p>
                  </li>
                </ul>
              </div>
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
  getDownvotes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  recipe: state.recipeReducer.currentRecipe,
  user: state.auth.user,
  message: state.favoriteReducer.message,
  upvotes: state.ratingsReducer.upvotes,
  downvotes: state.ratingsReducer.downvotes
});

export default connect(mapStateToProps, {
  getARecipe, deleteRecipe, favoriteRecipe, upvoteRecipe, downvoteRecipe, getDownvotes, getUpvotes
 })(RecipeDetails);
