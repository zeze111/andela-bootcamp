import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import PreLoader from '../common/PreLoader';

/** shows all the reviews for one recipe
 *
 * @class Reviews
 *
 * @extends {React.Component}
 */
class Reviews extends Component {
  /** calls action to delete a user's review
   *
   * @memberof Home
   *
   * @return {void}
   */
  reviewClickEvent = () => {
    this.props.deleteReview(this.props.review.id);
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    if (this.props.isLoading) {
      return (
        <div className="center-align loader-style">
          <PreLoader />
        </div>
      );
    }
    const { review, user } = this.props;

    const reviewUser = (
      <div className="secondary-content div-pointer2">
        <i
          role="button"
          tabIndex="0"
          onKeyPress={this.handleKeyPress}
          onClick={this.reviewClickEvent}
          className="material-icons icon-color"
        >delete
        </i>
      </div>
    );

    const nonReviewUser = (
      <span />
    );

    return (
      <li className="collection-item avatar">
        <img src={review.User.image || '/images/profilepic.png'} alt="" className="circle" />
        <span className="review-title "> {review.title} </span>
        <p />
        <p id="r-cmt"> {review.comment} </p>
        <span className="user caps review-list">
          Posted by {review.User.firstName}, {moment(new Date(`${review.createdAt}`)).fromNow()}
        </span>
        {(review.userId === user.id) ? reviewUser : nonReviewUser}
      </li>
    );
  }
}

Reviews.propTypes = {
  deleteReview: PropTypes.func.isRequired,
  review: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool.isRequired
};

Reviews.defaultProps = {
  user: {}
};


export default Reviews;
