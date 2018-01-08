import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextFieldGroup, TextFieldGroup2 } from '../common/TextFieldGroup';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      comment: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.reviewRecipe(this.props.recipe.id, this.state)
    .then(() => {
      this.props.getReviews(this.props.recipe.id);
      this.setState({
        title: '',
        comment: '',
      });
    });
    this.refs.reviewForm.reset();
  }

  render() {

    return (
      <div>
        <h5 className="text1" id="rev"> Reviews </h5>
        <div className="col s12 reviews-style">
          <p className="text2" > Add a comment to review this recipe </p>
          <div className="row" style={{ marginBottom: "0em" }}>
            <form onSubmit={this.onSubmit} className="col s6" ref="reviewForm"> <br />
              <div >
                <div className="input-field text3">
                  <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  onChange={this.onChange}>
                  </input>
                </div>
                <div className="input-field text3">
                  <textarea
                  id="cmt"
                  name="comment"
                  className="materialize-textarea "
                  placeholder="Comment"
                  onChange={this.onChange}>
                  </textarea>
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
  getReviews: PropTypes.func.isRequired
}


export default ReviewForm;
