import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllRecipes } from '../../actions/recipeActions'

import Details from './Details';
import PasswordForm from './PasswordForm';
import Recipes from './Recipes';
import Favorites from './Favorites';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.handleOnClick.bind(this);
  }
  
  componentDidMount() {
    this.props.getAllRecipes();
  }

  handleOnClick() {
    console.log("hey, you're beautiful");
  }

  render() {
    const { getAllRecipes } = this.props;
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
                  <Tab className="col s3" title="MY DETAILS" active>
                    <Details /></Tab>
                  <Tab className="col s3" title="CHANGE PASSWORD">
                    <PasswordForm /></Tab>
                  <Tab className="col s3" title="MY RECIPES">
                    {
                      this.props.recipes.map((recipe, index) => {
                        return (
                          <Recipes
                            recipe={recipe}
                            key={index}
                            getAllRecipes={this.props.getAllRecipes}
                          />)
                      })
                    }
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
  getAllRecipes: PropTypes.func.isRequired
}

// const mapStateToProps = state => ({
//   recipes: state.recipeReducer.recipes,
// });

function mapStateToProps(state) {
  return {
    recipes: state.recipeReducer.recipes
  };
}

export default connect(mapStateToProps, { getAllRecipes })(Profile);
