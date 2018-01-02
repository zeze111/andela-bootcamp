import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserRecipes, deleteRecipe } from '../../actions/recipeActions'

import Details from './Details';
import PasswordForm from './PasswordForm';
import Recipes from './Recipes';
import Favorites from './Favorites';


class Profile extends Component {

  componentDidMount() {
    const user = localStorage.getItem('user');
    this.props.getUserRecipes(JSON.parse(user).id);
  }

  componentWillUpdate() {
    $(document).ready(() => {
      Materialize.updateTextFields();
    });
  }

  render() {
    const { getUserRecipes, deleteRecipe } = this.props;
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
                      <Tab >
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
                          <Link to="/addRecipe" className="btn waves-effect waves-light grey"> Add Recipe
                          <i className="material-icons left">add</i></Link>
                        </div>
                        <div className="col s12 offest-s4">
                          <br />
                          <div className="divider"></div>
                        </div>
                        <div id="myrecipe" className="col s9 offset-s2">
                          <br />
                          <div className="col s12">
                            <ul id="userlist" className="collection">
                              {
                                this.props.recipes.map((recipe, index) => {
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
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <Favorites />
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
  deleteRecipe: PropTypes.func.isRequired
}

// const mapStateToProps = state => ({
//   recipes: state.recipeReducer.recipes,
// });

function mapStateToProps(state) {
  return {
    recipes: state.recipeReducer.recipes,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { getUserRecipes, deleteRecipe })(Profile);
