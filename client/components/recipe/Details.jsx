import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PreLoader from '../common/PreLoader';

const Details = (props) => {
  const creatorUser = (
    <div >
      <div className="col s4 offset-s7 creator">
        <Link
          to={`/updateRecipe/${props.recipe.id}`}
          href={`/updateRecipe/${props.recipe.id}`}
          className="text-color"
        >
          Edit this recipe
        </Link>
        <button
          className="creator-button
          text-color
          right
          delete-text
          text-style"
          onClick={props.clickEvent}
        >Delete this recipe
        </button>
      </div>
    </div >
  );

  const guestUser = (
    <div />
  );

  return (
    <div className="row">
      <div className="col s8 offset-s1">
        <h5 className="center-align text-recipe title" > Recipe </h5>
        {(props.ingredients.length <= 0) &&
        <div className="center-align loader-style">
          <PreLoader />
        </div>
        }
        {(props.ingredients.length > 0) &&
        <div>
          <div id="time" className="col s4 ">
            <p className="recipe"> Prep Time: {props.recipe.prepTime} </p>
          </div>
          <div id="Ing" className="col s4 r-ingredients">
            <p className="recipe"> Ingredients: </p>
            {props.ingredients}
          </div>
          <div id="Ins" className="col s4">
            <p className="recipe"> Instructions: </p>
            <p id="instruct" className="no-top"> {props.recipe.instructions} </p>
          </div>
        </div>
      }
        {(props.id === props.recipe.userId) ? creatorUser : guestUser}
        {props.isLoading &&
        <div className="right-align delete">
          <PreLoader />
        </div>
      }
      </div>
    </div>

  );
};

Details.propTypes = {
  clickEvent: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any),
  ingredients: PropTypes.arrayOf(PropTypes.any),
  id: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

Details.defaultProps = {
  recipe: {},
  ingredients: []
};

export default Details;
