import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PreLoader from '../updateRecipe/PreLoader';

class Reviews extends Component {

  reviewClickEvent = (event) => {
    this.props.deleteReview(this.props.review.id)
      .then(() => {
        const $toastContent = $(`<span>${this.props.message}</span>`)
        Materialize.toast($toastContent, 2000);
        this.props.getReviews(this.props.review.recipeId);
      })
  }

  render() {
    const { review, user } = this.props;

    const reviewUser = (
      <a href="#" className="secondary-content">
        <i onClick={this.reviewClickEvent} className="material-icons">delete</i>
      </a>
    );

    const nonReviewUser = (
      <span> </span>
    );

    return (
      <li className="collection-item avatar">
        <img src={review.User.image || '/images/profilepic.png'} alt="" className="circle" />
        <span className="review-title "> {review.title} </span>
        <p>  </p>
        <p id="r-cmt"> {review.comment} </p>
        <span className="user caps review-list">
          Posted by {review.User.firstName}, {moment(new Date(`${review.createdAt}`)).fromNow()} </span>
        {(review.userId === user.id) ? reviewUser : nonReviewUser}
      </li>
    );
  }
}

Reviews.propTypes = {
  deleteReview: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired
}


export default Reviews;
