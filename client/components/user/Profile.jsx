import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserRecipes } from '../../actions/recipeActions'

import Details from './Details';
import PasswordForm from './PasswordForm';
import Recipes from './Recipes';
import Favorites from './Favorites';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // $('ul.tabs').tabs('select_tab', 'tab_10');
    const user = localStorage.getItem('user');
    this.props.getUserRecipes(JSON.parse(user).id);
  }

  render() {
    const { getUserRecipes } = this.props;
    return (
      <main>
        <div className="container" style={{ width: '100%', margin: '0 auto' }}>
          <br /> <br />
          <div className="row">
            <div className="col s3 offset-s2">
              <img className="materialboxed responsive-img circle" width="200" src="assets/images/profilepic.png" />
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
          <div className="container z-depth-1 white">
            <div className="row">
              <div className="col s12">
                <Tabs className='tab-demo z-depth-1'>
                  <Tab className="col s3" title="MY DETAILS" >
                    <Details /></Tab>
                  <Tab className="col s3" title="CHANGE PASSWORD">
                    <PasswordForm /></Tab>

                  <Tab className="col s3" title="MY RECIPES">
                    <div id="recipe" className="col s10 offest-s2" style={{ marginTop: '3em' }}>
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
                            {this.state.recipes &&
                              this.state.recipes.map((recipe, index) => {
                                return (
                                  <Recipes
                                    recipe={recipe}
                                    key={index}
                                    getUserRecipes={this.props.getUserRecipes}
                                  />)
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab className="col s3" title="FAVORITES">
                    <Favorites /> </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

Profile.propTypes = {
  getUserRecipes: PropTypes.func.isRequired
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

export default connect(mapStateToProps, { getUserRecipes })(Profile);
