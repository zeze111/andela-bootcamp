import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserRecipes, deleteRecipe } from '../../actions/recipeActions';
import { getFavoriteRecipes, deleteFavorite } from '../../actions/favoriteActions';


import Details from './Details';
import PasswordForm from './PasswordForm';
import Recipes from './Recipes';
import Favorites from './Favorites';


class Profile extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const user = localStorage.getItem('user');
    this.props.getUserRecipes(JSON.parse(user).id);
    this.props.getFavoriteRecipes(JSON.parse(user).id);
  }

  componentWillUpdate() {
    $(document).ready(() => {
      Materialize.updateTextFields();
    });
  }

  render() {
    const { getUserRecipes, deleteRecipe, getFavoriteRecipes, deleteFavorite, faveMessage } = this.props;

    const faves = (this.props.favorites) ? (this.props.favorites) : [];
    const recipeList = (this.props.recipes) ? (this.props.recipes) : [];

    const noFaves = (
      <div className="col s11 offset-s1 bottom-style"> {faveMessage} </div>
    );

    const noRecipes = (
      <div className="col s11 offset-s1 bottom-style"> {this.props.message} </div>
    );

    return (
      <div id="profile-body">
        <main>
          <div className="container" style={{ width: '100%', margin: '0 auto', paddingBottom: '2em' }}>
            <br /> <br />
            <div className="row" style={{ paddingBottom: '1em' }}>
              <div className="col s3 offset-s2">
                <img className="materialboxed responsive-img circle" width="200" src="/images/profilepic.png" />
              </div>
              <div className="col s7 pull-s1 grey-text text-lighten-2">
                <br /> <br /> <br />
                <p id="Name"> Name </p>
                <p id="Bio"> Personal Bio </p>
              </div>
            </div>
            <div className="row">
              <div className="col s3 offset-s2">
                <div className="file-field input-field">
                  <div className="btn waves-effect waves-light grey">
                    <span> Upload Photo
                      <i className="material-icons left">photo</i> </span>
                    <input type="file" />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="container z-depth-1 white" >
              <div className="row remove-margin-bottom" >
                <div className="col s12" >
                  <Tabs defaultIndex={0} className='z-depth-1'>
                    <TabList>
                      <Tab >
                        MY DETAILS
                      </Tab>
                      <Tab >
                        CHANGE PASSWORD
                      </Tab>
                      <Tab >
                        MY RECIPES
                      </Tab>
                      <Tab id="faves">
                        FAVORITES
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <Details />
                    </TabPanel>
                    <TabPanel>
                      <PasswordForm />
                    </TabPanel>
                    <TabPanel>
                      <div id="recipe" className="col s10 offest-s2" style={{ marginTop: '3em', marginBottom: '3em' }}>
                        <div className="col s6 offset-s2">
                          <Link to="/addRecipe" className="btn waves-effect waves-light grey"> Add A Recipe
                          <i className="material-icons left">add</i></Link>
                        </div>
                        <div className="col s12 offest-s4">
                          <br />
                          <div className="divider"></div>
                        </div>
                        <div id="myrecipe" className="col s9 offset-s2">
                          <br />
                          <div className="col s12">
                            {(recipeList.length === 0) ? noRecipes :
                              <ul id="userlist" className="collection bottom-style">
                                {
                                  recipeList.map((recipe, index) => {
                                    return (
                                      <Recipes
                                        recipe={recipe}
                                        key={index}
                                        getUserRecipes={getUserRecipes}
                                        deleteRecipe={deleteRecipe}
                                      />)
                                  })
                                }
                              </ul>
                            }
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel><div id="myrecipe" className="col s9 offset-s1">
                      <br />
                      <div className="col s12">
                        {(faves.length === 0) ? noFaves :
                          <ul id="userlist" className="collection bottom-style">
                            {
                              faves.map((favorite, index) => {
                                return (
                                  <Favorites
                                    favorites={this.props.favorites}
                                    favorite={favorite}
                                    key={index}
                                    getFavoriteRecipes={getFavoriteRecipes}
                                    deleteFavorite={deleteFavorite}
                                    message={faveMessage}
                                  />)
                              })
                            }
                          </ul>
                        }
                      </div>
                    </div>
                    </TabPanel>
                  </Tabs>
                </div> <br /> <br />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  getFavoriteRecipes: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    recipes: state.recipeReducer.recipes,
    user: state.auth.user,
    favorites: state.favoriteReducer.favorites,
    faveMessage: state.favoriteReducer.message,
    message: state.recipeReducer.message
  };
}

export default connect(mapStateToProps, {
  getUserRecipes, deleteRecipe, getFavoriteRecipes, deleteFavorite,
})(Profile);
