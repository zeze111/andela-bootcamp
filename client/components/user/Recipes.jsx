import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = ({ recipe: { name } }) => {

  return (
    <li className="collection-item">
      <Link to="/userRecipe"> {name}</Link>
      <a href="#!" className="secondary-content">
        <i className="material-icons">mode_edit</i>
        <i className="material-icons">delete</i></a>
    </li>
  )
};

export default Recipes;