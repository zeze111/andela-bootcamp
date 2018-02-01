import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs';
import { pick } from 'lodash';
import { Input, Row } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import validations from '../../../Server/shared/validations';
import { TextFieldGroup, TextFieldGroup2 } from '../common/TextFieldGroup';
import PreLoader from '../common/PreLoader';

/** Form to allow users create s recipe
 *
 * @class AddRecipeForm
 *
 * @extends {React.Component}
 */
class AddRecipeForm extends React.Component {
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
      name: '',
      preparationTime: '',
      description: '',
      type: '',
      ingredients: '',
      instructions: '',
      imageSrc: '/images/noimg.png',
      imageFile: '',
      errors: {},
      isLoading: false
    };
  }

  /** css initialisation for when a component is mounted
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentDidMount() {
    $(this.refs.selectType).material_select(this.onSelectChange.bind(this));
  }

  /** sets state when form input is changed
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** sets state when a type field is selected
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSelectChange = (event) => {
    const { value } = event.target;
    this.setState({
      type: value
    });
  }

  /** calls action to add user's recipe to the app
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSubmit = (event) => {
    event.preventDefault();

    const recipe = pick(this.state, ['name', 'preparationTime', 'description', 'type',
      'ingredients', 'instructions', 'imageFile']);

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.addRecipeRequest(recipe)
        .then(() => this.setState({ redirect: true }))
        .catch(error => this.setState({
          errors: error.response.data, isLoading: false
        }));
    }
  }


  /** ets state of imageFile and changes recipe image display
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  uploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ imageFile: event.target.files[0] });
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.setState({ imageSrc: readerEvent.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.setState({ imageSrc: '/images/noimg.png', imageFile: '' });
    }
  }

  /** checks if form validation passes or fails
   *
   * @memberof Home
   *
   * @return {boolean} validator
   */
  isValid() {
    const validator = new Validator(this.state, validations.recipeRules);
    if (validator.fails()) {
      const errors = validator.errors.all();
      this.setState({ errors });
    }

    return validator.passes();
  }

  /** html component to render
   *
   * @memberof Home
   *
   * @return {void}
   */
  render() {
    const { errors } = this.state;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/user/2/recipes" />;
    }

    return (
      <div className="row">
        <div className="card-content col s10 m8 l6 push-s1 push-m2 push-l3">
          <form onSubmit={this.onSubmit}>
            <div className="row add-padding">
              <div className="file-field input-field col s12 right-align get-pic-btn" >
                <div className="image-placeholder">
                  <img
                    src={this.state.imageSrc}
                    alt=""
                    className="recipe-image"
                  />
                </div>
                <div
                  className="btn-floating
                btn-small
                waves-effect
                waves-light
                blue"
                >
                  <i className="material-icons">photo</i>
                  <input type="file" onChange={this.uploadImage} />
                </div>
              </div>
            </div>
            <div className="half-top">
              {errors &&
                <span className="red-text error-text" >
                  {errors.message}
                </span>}
              <TextFieldGroup
                label="Recipe Name"
                value={this.state.name}
                onChange={this.onChange}
                id="name"
                type="text"
                name="name"
                error={errors.name}
              />
              <TextFieldGroup
                label="Recipe Time"
                value={this.state.preparationTime}
                onChange={this.onChange}
                id="time"
                type="text"
                name="preparationTime"
                error={errors.preparationTime}
              />
              <TextFieldGroup
                label="Description"
                value={this.state.description}
                onChange={this.onChange}
                id="desc"
                type="text"
                name="description"
                error={errors.description}
              />
              <Row>
                <Input
                  s={12}
                  type="select"
                  label="Recipe Type"
                  name="type"
                  defaultValue="0"
                  onChange={this.onSelectChange}
                >
                  <option value="0" disabled> Choose your option </option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main" >Main</option>
                  <option value="Dessert" >Dessert</option>
                  <option value="Drink" >Drink</option>
                </Input>
                {errors &&
                  <span className="help-block red-text error-text2">
                    {errors.type}
                  </span>}
              </Row>
              <TextFieldGroup2
                label="Ingredients"
                value={this.state.ingredients}
                onChange={this.onChange}
                id="ingred"
                name="ingredients"
                error={errors.ingredients}
              />
              <TextFieldGroup2
                label="Instructions"
                value={this.state.instructions}
                onChange={this.onChange}
                id="instruct"
                name="instructions"
                error={errors.instructions}
              />
              <div className="right-align">
                {
                  (this.state.isLoading) &&
                  <div className="center-align loader-style">
                    <PreLoader />
                  </div>
                }
                <input
                  className="btn grey"
                  type="submit"
                  value="Submit"
                  disabled={this.state.isLoading}
                />
              </div> <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddRecipeForm.propTypes = {
  addRecipeRequest: PropTypes.func.isRequired,
};

export default AddRecipeForm;
