import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

/** Stateless component to render details of a recipe card
 *
 * @export {function} PopularContent
 *
 * @param {object} recipe
 *
 * @returns {null} null
 */
const PopularContent = ({
  recipe: {
    id, name, image, favorites, views
  }
}) => {
  const like = (
    <span className="home-text">
      <i className="material-icons home-icon">star</i>
      {favorites}
    </span>
  );
  const view = (
    <span className="pop-text">
      <i className="material-icons home-icon2">visibility</i>
      {views}
    </span>
  );
  const show = `${name.substring(0, 10)}...`;
  return (
    <li >
      <div className="col s2 offset-1">
        <div className="card hoverable grey lighten-4 home-cards">
          <div className="card-image">
            <img
              src={image || '/images/noimg.png'}
              alt="recipe"
              className="responsive-img image-style"
            />
            <div className="card-action">
              <Link
                to={`/recipe/${id}`}
                href={`/recipe/${id}`}
                className="home-text-style"
                data-tip={name}
              > {show}
                <ReactTooltip />
              </Link> {like}
              {view}
            </div>
          </div>
        </div>
      </div>
    </li>

  );
};

PopularContent.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired
};

export default PopularContent;
