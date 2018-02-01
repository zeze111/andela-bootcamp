import React from 'react';
import PropTypes from 'prop-types';

/** Stateless component to render recipe image and actions
 *
 * @export {function} Recipe
 *
 * @param {object} props
 *
 * @returns {null} null
 */
const Recipe = props => (
  <div className="row">
    <div className="col s12 m6 l5 push-m1 push-l1 text-flex">
      <div className="card right card-width" >
        <div className="card-image">
          <img
            alt="Recipe"
            src={props.recipe.image || '/images/noimg.png'}
            className="materialboxed responsive-img pic-style"
          />
        </div>
        <div className="card-action card-buttons">
          <div className="row reduce-row">
            <div className="col s4 m4 l2 push-l1">
              <button className="icon-button" onClick={props.onUpvote}>
                <i className="material-icons icon-color right-align">
                thumb_up
                </i>
              </button >
              <p className="votes" > {props.upvotes} </p>
            </div>
            <div className="col s4 m4 l2 push-l2">
              <button className="icon-button" onClick={props.onDownvote}>
                <i className="material-icons icon-color down right-align">
                thumb_down
                </i>
              </button>
              <p className="votes down-text" > {props.downvotes} </p>
            </div>
            <div className="col s4 m4 l2 push-l4 right-align">
              <button className="icon-button" onClick={props.onClickFave}>
                <i className="material-icons small icon-color favorite">{
                  props.icon}
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col s12 m5 l6 push-m1 push-l1 text-flex2">
      <div className="row" >
        <div className="col s12">
          <h5 className="title-details break name col s10 l10 remove-margin-bottom">
            {props.recipe.name}
          </h5>
        </div>
        <div className="col s12 ">
          {props.creator &&
            <p className="title-details top-style"> Posted by
              <a className="text-color user" href="user-recipe.html">
                {props.creator.firstName}
              </a>
            </p>
          }
        </div>
        <div className="col s12">
          <p
            id="desc"
            className="title-details"
          >
            {props.recipe.description || 'Try out this recipe'}
          </p>
        </div>
        <div className="col s12">
          <p className="remove-margin-bottom">
          Like this Recipe? Add to your favourites
          </p> <br />
        </div>
        <div className="col s12">
          <a
            href="#rev"
            className="scrollspy text-color remove-margin-bottom"
          >
          Reviews
          </a>
        </div>
      </div>
    </div>
  </div>
);

Recipe.propTypes = {
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onClickFave: PropTypes.func.isRequired,
  upvotes: PropTypes.number,
  downvotes: PropTypes.number,
  icon: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any),
  creator: PropTypes.objectOf(PropTypes.any)
};

Recipe.defaultProps = {
  recipe: {},
  creator: {},
  upvotes: 0,
  downvotes: 0
};

export default Recipe;
