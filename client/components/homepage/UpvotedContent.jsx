import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

/** Stateless component to render details of a recipe card
 *
 * @export {function} UpvotedContent
 *
 * @param {object} recipe
 *
 * @returns {null} null
 */
const UpvotedContent = ({
  recipe: {
    recipeId, upvotes, Recipe
  }
}) => {
  const vote = (
    <span className="home-text">
      <i className="material-icons home-icon">thumb_up</i> {upvotes}
    </span>
  );
  const show = `${Recipe.name.substring(0, 10)}...`;
  return (
    <li >
      <div className="col s2 offset-1">
        <div className="card hoverable grey lighten-4 home-cards">
          <div className="card-image">
            <img
              src={Recipe.image || '/images/noimg.png'}
              alt="recipe"
              className="responsive-img image-style"
            />
            <div className="card-action">
              <Link
                to={`/recipe/${recipeId}`}
                href={`/recipe/${recipeId}`}
                className="home-text-style"
                data-tip={Recipe.name}
              > {show}
                <ReactTooltip />
              </Link> {vote}
            </div>
          </div>
        </div>
      </div>
    </li>

  );
};

UpvotedContent.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired
};

export default UpvotedContent;
