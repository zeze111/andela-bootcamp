import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { deleteRecipe, getARecipe } from '../../actions/recipeActions';

class UserRecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.ingredients = '';
    this.state = {};
  }

  componentDidMount() {
    this.props.getARecipe(this.props.match.params.recipeId);
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
              return this.setState({ redirect: true });
            })
        }))
      .add($('<button class="btn-flat toast-action" onClick=Materialize.Toast.removeAll(); on>No</button>'));
    Materialize.toast($toastContent, 4000);
  }

  render() {
    const { recipe } = this.props;
    const { redirect } = this.state;
    const ingredients = this.ingredients.split(',').map((item, i) => (
      <p style={{ marginTop: "0px", marginBottom: "0px" }} key={`${i}`}> - {item} </p>
    ));

    if (redirect) {
      return <Redirect to='/user' />;
    }

    return (
      <div id="recipe-body" >
        <main id="wrapper">
          <div className="container " style={{ paddingTop: "3em", paddingBottom: "3em" }}>
            <div className="card z-depth-4 lime lighten-5" style={{ marginBottom: "0em" }}>
              <div className="row">
                <div className="col s3 offset-s1">
                  <div className="card" style={{ width: "230px", height: "230px" }}>
                    <div className="card-image" style={{ marginTop: "3em" }}>
                      <img src="assets/images/card.jpeg" className="materialboxed responsive-img" />
                    </div>
                  </div>
                </div>
                <div className="col s7" style={{ paddingLeft: "0em" }}>
                  <div className="row" style={{ marginBottom: "0px", marginTop: "6em" }}>
                    <div className="col s12">
                      <h5 id="title" style={{ marginBottom: "0px", marginTop: "0px", textTransform: "capitalize"}}>
                      {recipe.name} </h5>
                    </div>
                    <div className="col s12">
                      <p style={{ marginTop: "0px", textTransform: "capitalize" }}> Posted by <a id="uname" href="user-recipe.html">
                        {this.props.user.firstName} </a> </p>
                    </div>
                    <div className="col s12">
                      <p id="desc" style={{ marginTop: "0px", textTransform: "capitalize" }}>{recipe.description} </p>
                    </div>
                    <div className="col s12">
                      <p style={{ marginBottom: "0px"}}> Like this Recipe? Add to your favourites
                     <a className="btn-floating btn-small waves-effect waves-light yellow" >
                          <i className="material-icons">star_border</i></a>
                      </p>
                    </div>
                    <div className="col s12">
                      <a href="#rev" style={{ marginTop: "0px" }} className="scrollspy"> Reviews </a>
                    </div>
                  </div>
                </div>

                <div className="col s12">
                    <a href="#!" className="col s1 push-s2 center-align"> <i className="material-icons">thumb_up</i></a>
                    <p className="col s1 push-s1 right-align"> 300 </p>
                    <a href="#!"  className="col s1 push-s1">
                      <i className="material-icons">thumb_down</i></a>
                    <p className="col s1 center-align">150</p>
                </div> <br />
              </div>

              <div className="container">
                <h5 className="left-align" style={{ marginLeft: "50px", paddingTop: "1em"}}> Recipe </h5>
                <div id="time" className="col s6 ">
                  <p style={{ fontSize: "18px", marginBottom: "0px" }}> Prep Time: {recipe.prepTime} </p>
                </div>
                <div id="Ing" className="col s6 ">
                  <p style={{ fontSize: "18px", marginBottom: "0px" }}> Ingredients: </p>
                  {ingredients}
                </div>
                <div id="Ins" className="col s6">
                  <p style={{ fontSize: "18px", marginBottom: "0px" }}> Instructions: </p>
                  <p id="instruct" style={{ marginTop: "0px" }}> {recipe.instructions} </p>
                </div>
                <div className="row">
                  <div className="col s3 offset-s8">
                    <Link to={`/updateRecipe/${recipe.id}`}
                      className="btn-floating btn-medium waves-effect waves-light blue">
                      <i className="material-icons" >mode_edit</i></Link>
                    <a href="#" className="btn-floating btn-medium waves-effect waves-light blue"
                      style={{ marginLeft: "5px" }}>
                      <i onClick={this.clickEvent} className="material-icons">delete</i>
                    </a>
                  </div>
                </div>
              </div> <br />

              <div >
                <br /> <br />
                <h5 id="rev" className="blue-text" style={{ marginLeft: "2em" }}> Reviews </h5>
                <div className="row" style={{ marginLeft: "2em" }}>
                  <p style={{ marginLeft: "2em" }}> Add a comment to review this recipe </p>
                  <div className="row" style={{ marginBottom: "0em" }}>
                    <form className="col s6">
                      <div className="input-field" style={{ marginLeft: "2em" }}>
                        <label htmlFor="cmt"> Review: <i className="material-icons left">mode_edit</i></label>
                        <textarea id="cmt" className="materialize-textarea " placeholder="Comment"></textarea>
                      </div>
                      <div className="right-align">
                        <button className="btn grey" type="button"> Review </button> <br /> <br />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col s8" style={{ paddingBottom: "2em"}}>
                    <ul className="collection" style={{ marginLeft: "2em" }}>
                      <li className="collection-item avatar">
                        <img src="assets/images/profilepic.png" alt="" className="circle" />
                        <span className="title"> <a href="#"> Title </a></span>
                        <p id="r-cmt"> User comment... </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div >
    );
  }
}

UserRecipeDetails.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  getARecipe: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  recipe: state.recipeReducer.currentRecipe,
  user: state.auth.user
});

export default connect(mapStateToProps, { getARecipe, deleteRecipe })(UserRecipeDetails);
