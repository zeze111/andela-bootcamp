import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';

import { getUserRecipes, deleteRecipe } from '../../actions/recipeActions';
import { updateUser, getUser, changePassword } from '../../actions/userActions';
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

/** Profile entails of user's details, recipes and favorites
 * allows a user update their details,
 * submit a recipe and view all recipes submitted,
 * view all recipes the user has favorited
 *
 * @class Profile
 *
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * @description Constructor Function
   *
   * @param {any} props
   *
   * @memberof Home
   *
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
      limit: 3,
      index: 0,
      isLoading: true,
      isPicLoading: false
    };
  }

  /** gets user details before component is mounted
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentWillMount() {
    this.props.getUser(this.props.user.id)
      .then(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  /** gets user's recipe and favorites when the component is mounted
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentDidMount() {
    $('.materialboxed').materialbox();
    const offset = 0;
    const { limit } = this.state;

    this.props.getUserRecipes(limit, offset);
    this.props.getFavoriteRecipes(limit, offset);
  }

  /** receives properties from the store when component is mounted
   *
   * @param {any} nextProps
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.tab === 'favorites') {
      this.setState({ index: 3 });
    } else if (this.props.match.params.tab === 'recipes') {
      this.setState({ index: 2 });
    } else {
      this.setState({ index: 0 });
    }

    const { profile } = nextProps;
    this.setState({
      firstName: profile.firstName,
      surname: profile.surname,
      email: profile.email,
    });
  }

  /** sets state on form input
   *
   * @param {string} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** calls action to update user when form data is submitted
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSubmit = (event) => {
    event.preventDefault();

    this.props.updateUser(this.state)
      .then(() => {
        const toastContent = $(`<span>${this.props.userMessage}</span>`);
        Materialize.toast(toastContent, 2000);
      });
  }

  /** gets recipe on next /previous page
   *
   * @param {number} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onNextPage = (event) => {
    const { limit } = this.state;
    const offset = (limit * event) - limit;
    this.setState({ isLoading: true });

    this.props.getUserRecipes(limit, offset)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  /** gets recipe on next /previous page for favorites
   *
   * @param {number} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onNextFavePage = (event) => {
    const { limit } = this.state;
    const offset = (limit * event) - limit;
    this.setState({ isLoading: true });

    this.props.getFavoriteRecipes(limit, offset)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  /** calls action to upload user image to cloudinary
   *
   * @param {object} event
   *
   * @memberof Home
   *
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

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    const {
      profile,
      pagination,
      pagination2,
    } = this.props;

    const faves = (this.props.favorites) ? (this.props.favorites) : [];
    const recipeList = (this.props.recipes) ? (this.props.recipes) : [];

    const noFaves = (
      <div className="col s11 offset-s1 two-top no-message bottom-style">
        You Currently Have No Favorite Recipes
      </div>
    );

    const noRecipes = (
      <div className="col s11 offset-s1 two-top no-message bottom-style">
        {this.props.message}
      </div>
    );

    return (
      <div id="profile-body">
        <main>
          <div className="container full-container two-down">
            <br /> <br />
            <Information
              profile={profile}
              image={this.state.image}
              uploadImage={this.uploadImage}
              isPicLoading={this.state.isPicLoading}
              isLoading={this.state.isLoading}
            />
          </div>
          <div className="container z-depth-1 white " >
            <div className="row two-down" >
              <div className="col s12 m12 l12" >
                {!this.state.isLoading &&
                <Tabs defaultIndex={this.state.index}>
                  <TabList>
                    <Tab >
                      MY DETAILS
                    </Tab>
                    <Tab >
                      CHANGE PASSWORD
                    </Tab >
                    <Tab >
                      MY RECIPES
                    </Tab>
                    <Tab >
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
                    <PasswordForm
                      changePassword={this.props.changePassword}
                    />
                  </TabPanel>
                  <TabPanel>
                    <div id="recipe" className="col s12 form-style">
                      <div className="col s10 push-s1">
                        <Link
                          to="/add-recipe"
                          href="/add-recipe"
                          className="btn waves-effect waves-light grey"
                        > Add A Recipe
                          <i className="material-icons left">add</i>
                        </Link>
                      </div>
                      <div className="col s12">
                        <br />
                        <div className="divider" />
                      </div>
                      <div className="row">
                        <br />
                        <div className="col s12 m8 l8 push-l2 push-m2">
                          {(recipeList.length === 0) ? noRecipes :
                          <ul className="collection two-top bottom-style">
                            {
                                recipeList.map(recipe => (
                                  <Recipes
                                    recipe={recipe}
                                    key={recipe.id}
                                    isLoading={this.state.isLoading}
                                    deleteRecipe={this.props.deleteRecipe}
                                  />))
                              }
                          </ul>
                          }
                        </div>
                      </div>
                      <div className="center-align">
                        {recipeList.length > 0 && <Pagination
                          items={pagination.pageCount || 0}
                          activePage={pagination.page}
                          maxButtons={pagination.pageCount}
                          onSelect={this.onNextPage}
                        />}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="col s12">
                      <br />
                      <div className="col s12 m10 l8 push-l2 push-m1">
                        {(faves.length === 0) ? noFaves :
                        <ul className="collection bottom-style">
                          {
                              faves.map(favorite => (
                                <Favorites
                                  favorites={this.props.favorites}
                                  favorite={favorite}
                                  key={favorite.id}
                                  isLoading={this.state.isLoading}
                                  deleteFavorite={this.props.deleteFavorite}
                                />))
                            }
                        </ul>
                        }
                      </div>
                    </div>
                    <div className="center-align two-down">
                      {faves.length > 0 && <Pagination
                        className="remove-margin-bottom"
                        items={pagination2.pageCount || 0}
                        activePage={pagination2.page}
                        maxButtons={pagination2.pageCount}
                        onSelect={this.onNextFavePage}
                      />}
                    </div>
                  </TabPanel>
                </Tabs>
              }
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
  user: {},
  match: {},
  recipes: [],
  favorites: [],
  pagination: {},
  pagination2: {},
  message: '',
  userMessage: ''
};

Profile.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  getFavoriteRecipes: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  message: PropTypes.string,
  userMessage: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any),
  profile: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  recipes: PropTypes.arrayOf(PropTypes.any),
  pagination: PropTypes.objectOf(PropTypes.any),
  pagination2: PropTypes.objectOf(PropTypes.any),
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
  pagination: state.recipeReducer.pagination,
  pagination2: state.favoriteReducer.pagination,
  delMessage: state.favoriteReducer.delMessage
});

export default connect(mapStateToProps, {
  getUserRecipes,
  deleteRecipe,
  getFavoriteRecipes,
  deleteFavorite,
  updateUser,
  getUser,
  changePassword
})(Profile);
