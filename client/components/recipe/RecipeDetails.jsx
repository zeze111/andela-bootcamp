import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { deleteRecipe, getARecipe } from '../../actions/recipeActions';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.ingredients = '';
    this.state = {};
  }

  componentDidMount() {
    this.props.getARecipe(this.props.match.params.recipeId);

  }

  componentWillMount() {
    $(document).ready(() => {
      $('.tooltipp').tooltip('remove')
    });
  }

  componentWillReceiveProps(nextProps) {
    const { recipe } = nextProps;
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
            })
        }))
      .add($('<button class="btn-flat toast-action" onClick=Materialize.Toast.removeAll(); on>No</button>'));
    Materialize.toast($toastContent);
  }

  render() {
    const { recipe } = this.props;
    const { redirect } = this.state;
    const { id } = this.props.user;
    const ingredients = this.ingredients.split(',').map((item, i) => (
      <p style={{ marginTop: "0px", marginBottom: "0px" }} key={`${i}`}> - {item} </p>
    ));

    const creatorUser = (
      <div>
        <div className="col s4 offset-s5">
          <Link to={`/updateRecipe/${recipe.id}`}
            className="waves-effect waves-light text-blue">
            Edit this recipe</Link>
          <a href="#" className=" waves-effect waves-light text-blue right"
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
      <div className="lime lighten-5">
        <main>
          <div className="row">
            <div className="col s2 offset-s1">
              <div className="view-image">
                <div className="recipe-v-image " >
                  <img src={recipe.image || '/images/noimg.png'}
                    className="materialboxed responsive-img pic-style" />
                </div>
              </div>
            </div>
            <div className="col s7" style={{ paddingLeft: "1em" }}>
              <div className="row" style={{ marginBottom: "0px", marginTop: "6em" }}>
                <div className="col s12">
                  <h5 id="title" style={{ marginBottom: "0px", marginTop: "0px", textTransform: "capitalize" }}>
                    {recipe.name} </h5>
                </div>
                <div className="col s12">
                  <p style={{ marginTop: "0px", textTransform: "capitalize" }}> Posted by <a id="uname" href="user-recipe.html">
                    {this.props.user.firstName} </a> </p>
                </div>
                <div className="col s12">
                  <p id="desc" style={{ marginTop: "0px", textTransform: "capitalize" }}>{recipe.description || 'Try out this recipe'} </p>
                </div>
                <div className="col s12">
                  <p style={{ marginBottom: "0px" }}> Like this Recipe? Add to your favourites
                     <a style={{ marginLeft: "8px" }} className="btn-floating btn-small waves-effect waves-light yellow" >
                      <i className="material-icons">star</i></a>
                  </p>
                </div>
                <div className="col s12">
                  <a href="#rev" style={{ marginTop: "0px" }} className="scrollspy"> Reviews </a>
                </div>
              </div>
            </div>

            <div className="col s12">
              <div className="col s6 push-s1">
                <a href="#!">
                  <i className="col s1 push-s2 material-icons">thumb_up</i></a>
                <p className="col s1 push-s1 right-align" style={{ paddingLeft: "2.2em" }}> 300 </p>
                <a href="#!">
                  <i className="col s1 push-s1 material-icons">thumb_down</i></a>
                <p className="col s1 right-align" style={{ paddingLeft: "2.2em" }}>150</p>
              </div> <br />
            </div>
          </div>

          <div className="container-fluid col s8 push-s2">
            <div className="row">
              <div className="col s8 offset-s1">
                <h5 className="left-align" style={{ marginLeft: "50px", paddingTop: "1em" }}> Recipe </h5>
                <div id="time" className="col s12 ">
                  <p style={{ fontSize: "18px", marginBottom: "0px" }}> Prep Time: {recipe.prepTime} </p>
                </div>
                <div id="Ing" className="col s12 ">
                  <p style={{ fontSize: "18px", marginBottom: "0px" }}> Ingredients: </p>
                  {ingredients}
                </div>
                <div id="Ins" className="col s12">
                  <p style={{ fontSize: "18px", marginBottom: "0px" }}> Instructions: </p>
                  <p id="instruct" style={{ marginTop: "0px" }}> {recipe.instructions} </p>
                </div>
                {(id === recipe.userId) ? creatorUser : guestUser}
              </div>
            </div>
          </div> <br />

          <div className="row remove-margin-bottom">
            <br /> <br />
            <h5 id="rev" className="blue-text" style={{ marginLeft: "5em" }}> Reviews </h5>
            <div className="col s12" style={{ marginLeft: "5em" }}>
              <p style={{ marginLeft: "3em" }}> Add a comment to review this recipe </p>
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
                    <span className="title"> <a href="#"> Title </a></span>
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
  getARecipe: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  recipe: state.recipeReducer.currentRecipe,
  user: state.auth.user
});

export default connect(mapStateToProps, { getARecipe, deleteRecipe })(RecipeDetails);
