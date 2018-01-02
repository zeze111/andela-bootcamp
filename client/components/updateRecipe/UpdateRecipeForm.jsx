import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs';
import { map, pick } from 'lodash';
import { Input, Row } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import validations from '../../../Server/shared/validations';
import PreLoader from './PreLoader';
import { TextFieldGroup, TextFieldGroup2 } from '../common/TextFieldGroup';


class UpdateRecipeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      prepTime: '',
      description: '',
      type: '',
      ingredients: '',
      instructions: '',
      imageSrc: '/images/noimg.png',
      imageFile: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {
    $(this.refs.selectType).material_select(this.onSelectChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    const { recipe } = nextProps;
    this.setState({
      name: recipe.name, prepTime: recipe.prepTime, description: recipe.description, imageSrc: recipe.image,
      type: recipe.type, ingredients: recipe.ingredients, instructions: recipe.instructions
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSelectChange(event) {
    const { value } = event.target;
    this.setState({
      type: value
    });
  }

  uploadImage(event) {
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

  isValid() {
    const validator = new Validator(this.state, validations.updateRecipeRules);
    if (validator.fails()) {
      const errors = validator.errors.all()
      this.setState({ errors });
    }

    return validator.passes();
  }

  onSubmit(event) {
    event.preventDefault();

    const recipeId = this.props.recipe.id;
    const recipe = pick(this.state, ["name", "prepTime", "description", "type", "ingredients", "instructions", "image"]);

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.updateRecipe(recipeId, recipe)
        .then(() => {
          return this.setState({ redirect: true });
        })
        .catch((error) => { return this.setState({ errors: error.response.data, isLoading: false }); });
    }
  }

  render() {

    const { errors } = this.state;
    const { redirect } = this.state;
    const { recipe } = this.props;

    if (redirect) {
      return <Redirect to={`/userRecipe/${recipe.id}`} />;
    }

    return (
      <div className="row">
        <div className="card-content col s6 offset-s3">
          <form onSubmit={this.onSubmit}>
            <div className="row" style={{ paddingTop: "2em", paddingLeft: "2em" }}>
              <div className="file-field input-field col s12 center-align" >
                <div className="image-placeholder">
                  <img
                    src={this.state.imageSrc}
                    alt=""
                    className="recipe-image"
                  />
                </div>
                <div className="btn-floating btn-small waves-effect waves-light blue right-align">
                  <i className="material-icons">photo</i>
                  <input type="file" onChange={this.uploadImage} />
                </div>
              </div>
            </div>
            <div style={{ paddingTop: "0.5em" }}>
              {errors && <span className='red-text' style={{ fontSize: 16 + 'px' }}>
                {errors.message}</span>}
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
                value={this.state.prepTime}
                onChange={this.onChange}
                id="time"
                type="text"
                name="prepTime"
                error={errors.prepTime}
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
                <Input s={12}
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
                {errors && <span className="help-block red-text" style={{ fontSize: 13 + 'px', marginLeft: 1 + 'em' }}>
                  {errors.type}</span>}
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
                <input disabled={this.state.isLoading} className="btn grey" type="submit" value="Submit" />
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
}

export default UpdateRecipeForm;
