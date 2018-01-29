import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserRecipes, deleteRecipe } from '../../actions/recipeActions';
import { updateUser, getUser } from '../../actions/userActions';
import {
  getFavoriteRecipes,
  deleteFavorite
} from '../../actions/favoriteActions';
import uploadImageToCloud from '../../utils/image';
import Details from './Details';
import PasswordForm from './PasswordForm';
import Recipes from './Recipes';
import Favorites from './Favorites';
import Information from './Information';

/**
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      surname: '',
      email: '',
      bio: '',
      image: '',
      isLoading: true,
      isPicLoading: false
    };
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentWillMount() {
    const user = localStorage.getItem('user');
    this.props.getUser(JSON.parse(user).id)
      .then(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentDidMount() {
    $('.materialboxed').materialbox();
    const user = localStorage.getItem('user');
    this.props.getUserRecipes(JSON.parse(user).id);
    this.props.getFavoriteRecipes(JSON.parse(user).id);
  }

  /**
   * @param {any} nextProps
   * @memberof Home
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;
    this.setState({
      firstName: profile.firstName,
      surname: profile.surname,
      email: profile.email,
    });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onSubmit = (event) => {
    event.preventDefault();

    this.props.updateUser(this.props.user.id, this.state)
      .then(() => {
        const $toastContent = $(`<span>${this.props.userMessage}</span>`);
        Materialize.toast($toastContent, 2000);
      });
  }

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  uploadImage = (event) => {
    this.setState({ isPicLoading: true });
    const file = event.target.files[0];
    uploadImageToCloud(file)
      .then((response) => {
        this.setState({
          image: response.data.secure_url,
          isPicLoading: false
        });
        if (!this.state.isPicLoading) {
          this.props.updateUser(this.props.user.id, this.state);
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  /**
   * @memberof Home
   * @return {void}
   */
  render() {
    const {
      getUserRecipes,
      deleteRecipe,
      getFavoriteRecipes,
      deleteFavorite,
      faveMessage,
      profile,
      user,
      updateUser,
      getUser
    } = this.props;

    const faves = (this.props.favorites) ? (this.props.favorites) : [];
    const recipeList = (this.props.recipes) ? (this.props.recipes) : [];

    const noFaves = (
      <div className="col s11 offset-s1 bottom-style"> You Currently Have No Favorite Recipes </div>
    );

    const noRecipes = (
      <div className="col s11 offset-s1 bottom-style"> {this.props.message} </div>
    );

    return (
      <div id="profile-body">
        <main>
          <div className="container full-container two-down">
            <br /> <br />
            <Information
              profile={profile}
              isPicLoading={this.state.isPicLoading}
            />
          </div>
          <br />
          <div className="container z-depth-1 white" >
            <div className="row remove-margin-bottom" >
              <div className="col s12" >
                <Tabs defaultIndex={0} className="z-depth-1">
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
                    <Details
                      isLoading={this.state.isLoading}
                      onSubmit={this.onSubmit}
                      onChange={this.onChange}
                      firstName={this.state.firstName}
                      surname={this.state.surname}
                      email={this.state.email}
                      bio={this.state.bio}
                    />
                  </TabPanel>
                  <TabPanel>
                    <PasswordForm />
                  </TabPanel>
                  <TabPanel>
                    <div id="recipe" className="col s10 offest-s2 form-style">
                      <div className="col s6 offset-s2">
                        <Link
                          to="/addRecipe"
                          href="/addRecipe"
                          className="btn waves-effect waves-light grey"
                        > Add A Recipe
                          <i className="material-icons left">add</i>
                        </Link>
                      </div>
                      <div className="col s12 offest-s4">
                        <br />
                        <div className="divider" />
                      </div>
                      <div id="myrecipe" className="col s9 offset-s2">
                        <br />
                        <div className="col s12">
                          {(recipeList.length === 0) ? noRecipes :
                          <ul id="userlist" className="collection bottom-style">
                            {
                              recipeList.map((recipe, index) => (
                                <Recipes
                                  recipe={recipe}
                                  key={index}
                                  deleteRecipe={deleteRecipe}
                                />))
                              }
                          </ul>
                          }
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div id="myrecipe" className="col s9 offset-s1">
                      <br />
                      <div className="col s12">
                        {(faves.length === 0) ? noFaves :
                        <ul id="userlist" className="collection bottom-style">
                          {
                            faves.map((favorite, index) => (
                              <Favorites
                                favorites={this.props.favorites}
                                favorite={favorite}
                                key={index}
                                deleteFavorite={deleteFavorite}
                              />))
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
        </main>
      </div>
    );
  }
}

Profile.defaultProps = {
  profile: {
    firstName: '',
    surname: '',
    email: ''
  },
  recipes: [],
  favorites: []
};

Profile.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  getFavoriteRecipes: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.any),
  recipes: PropTypes.arrayOf(PropTypes.any),
  favorites: PropTypes.arrayOf(PropTypes.any)
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  user: state.auth.user,
  favorites: state.favoriteReducer.favorites,
  faveMessage: state.favoriteReducer.message,
  message: state.recipeReducer.message,
  profile: state.auth.profile,
  userMessage: state.auth.message,
  delMessage: state.favoriteReducer.delMessage
});

export default connect(mapStateToProps, {
  getUserRecipes,
  deleteRecipe,
  getFavoriteRecipes,
  deleteFavorite,
  updateUser,
  getUser
})(Profile);
