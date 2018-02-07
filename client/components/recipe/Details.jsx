import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PreLoader from '../common/PreLoader';

/** Stateless component to render recipe details
 *
 * @export {function} Details
 *
 * @param {object} props
 *
 * @returns {null} null
 */
const Details = (props) => {
  const creatorUser = (
    <div className="row right-align" >
      <div className="col s12 m6 l5 push-l4 push-m4 creator edit-text">
        <Link
          to={`/update-recipe/${props.recipe.id}`}
          href={`/update-recipe/${props.recipe.id}`}
          className="text-color"
        >
          Edit this recipe
        </Link>
        <button
          className="creator-button
          text-color
          right
          delete-text
          text-style
          white"
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
        <h5 className="center-align title text-headers" > Recipe </h5>
        {(props.ingredients.length <= 0) &&
        <div className="center-align loader-style">
          <PreLoader />
        </div>
        }
        {(props.ingredients.length > 0) &&
        <div>
          <div id="time" className="col l4 m4 s12 ">
            <p
              className="recipe"
            > Preparation Time:
            </p>
            {props.recipe.preparationTime}
          </div>
          <div id="Ing" className="col l4 m4 s12 r-ingredients">
            <p className="recipe"> Ingredients: </p>
            {props.ingredients}
          </div>
          <div id="Ins" className="col l4 m4 s12">
            <p className="recipe"> Instructions: </p>
            <p
              id="instruct"
              className="no-top"
            > {props.recipe.instructions}
            </p>
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
  id: PropTypes.number,
  isLoading: PropTypes.bool.isRequired
};

Details.defaultProps = {
  recipe: {},
  ingredients: [],
  id: 0
};

export default Details;
