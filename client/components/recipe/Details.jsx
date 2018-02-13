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

    <div className="col s12 m12 l12 creator right-align edit-text">
      <Link
        to={`/update-recipe/${props.recipe.id}`}
        href={`/update-recipe/${props.recipe.id}`}
        className="text-color col l3 m4 push-l5 push-m3"
      >
        Edit this recipe
      </Link>
      <button
        className="creator-button
        text-color
        right
        delete-text
        text-style
        white left-align
        col l3 m4"
        onClick={props.clickEvent}
      >Delete this recipe
      </button>
    </div >
  );

  const guestUser = (
    <div />
  );

  return (
    <div className="row">
      <div className="col s10 l9 m10 offset-s1 offset-l1 offset-m1">
        <h5 className="center-align title text-headers" > Recipe </h5>
        {(props.ingredients.length <= 0) &&
        <div className="center-align loader-style">
          <PreLoader />
        </div>
      }
        {(props.ingredients.length > 0) &&
        <div className="row">
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
            {props.instructions}
          </div>
          {(props.id === props.recipe.userId) ? creatorUser : guestUser}
          {props.isLoading &&
            <div className="right-align delete">
              <PreLoader />
            </div>
          }
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
  instructions: PropTypes.objectOf(PropTypes.any),
  id: PropTypes.number,
  isLoading: PropTypes.bool.isRequired
};

Details.defaultProps = {
  recipe: {},
  ingredients: [],
  instructions: {},
  id: 0
};

export default Details;
