import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @class ReviewForm
 * @extends {React.Component}
 */
class ReviewForm extends Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
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

  /**
   * @param {any} event
   * @memberof Home
   * @return {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @memberof Home
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

  /**
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <div>
        <h5 className="text1" id="rev"> Reviews </h5>
        <div className="col s12 reviews-style">
          <p className="text2" > Add a comment to review this recipe </p>
          <div className="row no-top">
            <form onSubmit={this.onSubmit} className="col l5 m10 s12" ref="reviewForm"> <br />
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
      </div>
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
