import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs';
import { pick } from 'lodash';
import { Input, Row } from 'react-materialize';
import { Redirect } from 'react-router-dom';

import validations from '../../../Server/shared/validations';
import PreLoader from '../common/PreLoader';
import { TextFieldGroup, TextFieldGroup2 } from '../common/TextFieldGroup';

/** Form to allow users update their recipe
 *
 * @class UpdateRecipeForm
 *
 * @extends {React.Component}
 */
class UpdateRecipeForm extends React.Component {
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

  /** function to call when component has mounted
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentDidMount() {
    $(this.refs.selectType).material_select(this.onSelectChange.bind(this));
  }

  /** props to receive when component is mounted
   *
   * @param {object} nextProps
   *
   * @memberof Home
   *
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { recipe } = nextProps;
    this.setState({
      name: recipe.name,
      preparationTime: recipe.preparationTime,
      description: recipe.description,
      imageSrc: recipe.image,
      type: recipe.type,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    });
  }

  /** sets state on form input change
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

  /** calls action to update recipe when form data is submitted
   *
   * @param {object} event
   *
   * @memberof Home
   *
   * @return {void}
   */
  onSubmit = (event) => {
    event.preventDefault();

    const recipeId = this.props.recipe.id;
    const recipe = pick(
      this.state,
      [
        'name',
        'preparationTime',
        'description',
        'type',
        'ingredients',
        'instructions',
        'image'
      ]
    );

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.updateRecipe(recipeId, recipe)
        .then(() => this.setState({ redirect: true }))
        .catch(error => this.setState({
          errors: error.response.data, isLoading: false
        }));
    }
  }

  /** sets state when a type is selected
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

  /** sets state of imageFile and changes recipe image display
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
    const validator = new Validator(this.state, validations.updateRecipeRules);
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
    const { recipe } = this.props;

    if (redirect) {
      return <Redirect to={`/recipe/${recipe.id}`} />;
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
                <span className="red-text error-text">
                  {errors.message}
                </span>}
              <TextFieldGroup
                label="Recipe Name"
                value={this.state.name}
                onChange={this.onChange}
                id="name"
                type="text"
                name="name"
                active="active"
                error={errors.name}
              />
              <TextFieldGroup
                label="Recipe Time"
                value={this.state.preparationTime}
                onChange={this.onChange}
                id="time"
                type="text"
                name="preparationTime"
                active="active"
                error={errors.preparationTime}
              />
              <TextFieldGroup
                label="Description"
                value={this.state.description}
                onChange={this.onChange}
                id="desc"
                type="text"
                name="description"
                active="active"
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

UpdateRecipeForm.propTypes = {
  updateRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired
};

export default UpdateRecipeForm;
