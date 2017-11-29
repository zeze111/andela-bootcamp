import React, { Component } from 'react';
import { TextFieldGroup3 } from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Recipes extends Component {
  constructor(props) {
    super(props);

  }

  // componentDidMount() {
  //   this.props.getAllRecipes();
  // }

  // componentWillReceiveProps(nextProps) {
  //   getUserRecipes(nextProps.me)
  //     .then(() => {
  //       console.log(userRecipes);
  //     })
  // }

  render() {
    // console.log(this.props.user)
    console.log(this.props.recipe);
    return (
      <div id="recipe" className="col s10 offest-s2" style={{ marginTop: '3em' }}>
        <div className="col s6 offset-s2">
          <Link to="/addRecipe" className="btn waves-effect waves-light grey"> Add Recipe
            <i className="material-icons left">add</i></Link>
        </div>
        <div className="col s12 offest-s4">
          <br />
          <div className="divider"></div>
        </div>
        <div id="myrecipe" className="col s10 offset-s1">
          <br />
          <div className="col s12">
            <ul id="userlist" className="collection">
              <li className="collection-item">
                <Link to="/userRecipe"> {this.props.recipe.name}</Link>
                <a href="#!" className="secondary-content"><i className="material-icons">mode_edit</i>
                  <i className="material-icons">delete</i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  };
}

Recipes.propTypes = {
  getAllRecipes: PropTypes.func.isRequired
}

export default Recipes;
