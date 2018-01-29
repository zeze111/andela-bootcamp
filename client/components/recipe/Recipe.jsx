import React from 'react';
import PropTypes from 'prop-types';

const Recipe = props => (
  <div className="row flex-container">
    <div className="col s5">
      <div className="card right" >
        <div className="card-image">
          <img
            alt="Recipe"
            src={props.recipe.image}
            className="materialboxed responsive-img pic-style"
          />
        </div>
        <div className="card-action card-buttons">
          <div className="row reduce-row">
            <div className="col s2 push-s1">
              <button className="icon-button" onClick={props.onUpvote}>
                <i className="material-icons icon-color right-align">
                thumb_up
                </i>
              </button >
              <p className="votes" > {props.upvotes} </p>
            </div>
            <div className="col s2 push-s2">
              <button className="icon-button" onClick={props.onDownvote}>
                <i className="material-icons icon-color down right-align">
                thumb_down
                </i>
              </button>
              <p className="votes down-text" > {props.downvotes} </p>
            </div>
            <div className="col s2 push-s4 right-align">
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
    <div className="col s7">
      <div className="row text-flex" >
        <div className="col s12">
          <h5 className="title-details remove-margin-bottom">
            {props.recipe.name}
          </h5>
        </div>
        <div className="col s12 ">
          {props.creator &&
            <p className="title-details top-style"> Posted by
              <a className="text-color title-details caps" href="user-recipe.html">
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
