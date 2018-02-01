import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** Form to allow a user post a review
 *
 * @class ReviewForm
 *
 * @extends {React.Component}
 */
class ReviewForm extends Component {
  /**
   * @description Constructor Function
   *
   * @param {object} props
   *
   * @memberof Home
   *
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      comment: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /** sets state on form input change
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** calls action to post a review
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSubmit(event) {
    event.preventDefault();

    const { recipe, limit, offset } = this.props;
    this.props.reviewRecipe(recipe.id, this.state)
      .then(() => {
        this.props.getReviews(recipe.id, limit, offset);
        this.setState({
          title: '',
          comment: '',
        });
      });
    this.refs.reviewForm.reset();
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    return (
      <div>
        <div className="col m9 l8">
          <h5 className="text1" id="rev"> Reviews </h5>
          <div className="col s12 reviews-style">
            <p className="text2" > Add a comment to review this recipe </p>
          </div>
        </div>
        <div className="row no-top">
          <form
            onSubmit={this.onSubmit}
            className="col l5 m7 s10 push-s1 push-m1 push-l1"
            ref="reviewForm"
          >
            <br />
            <div >
              <div className="input-field text3">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  onChange={this.onChange}
                />
              </div>
              <div className="input-field text3">
                <textarea
                  id="cmt"
                  name="comment"
                  className="materialize-textarea "
                  placeholder="Comment"
                  onChange={this.onChange}
                />
              </div>
              <div className="right-align">
                <input className="btn grey" type="submit" value="Review" /> <br /> <br />
              </div>
            </div>
          </form>
        </div>
      </div>
      // </div>
    );
  }
}

ReviewForm.propTypes = {
  reviewRecipe: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired
};


export default ReviewForm;
