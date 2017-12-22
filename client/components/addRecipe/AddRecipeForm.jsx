import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs';
import { map, pick } from 'lodash';
import axios from 'axios';
import { Input, Row } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import validations from '../../../Server/shared/validations';
import { TextFieldGroup, TextFieldGroup2 } from '../common/TextFieldGroup';
import PreLoader from '../updateRecipe/PreLoader';

require('dotenv').config();

class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      prepTime: '',
      description: '',
      type: '',
      ingredients: '',
      instructions: '',
      image: '',
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
    this.setState({ isLoading: true });

    // const imgUrl = process.env.CLOUDINARY_URL;
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/zeze-andela/image/upload';
    // const preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    const CLOUDINARY_UPLOAD_PRESET = 'oenu8grd';

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    delete axios.defaults.headers.common['x-token'];
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: formData
    })
      .then((res) => {
        this.setState({
          image: res.data.secure_url,
          isLoading: false
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false
        });
      })
      axios.defaults.headers.common['x-token'] = window.localStorage.jwtToken;
  }

  isValid() {
    const validator = new Validator(this.state, validations.recipeRules);
    if (validator.fails()) {
      const errors = validator.errors.all()
      this.setState({ errors });
    }

    return validator.passes();
  }

  onSubmit(event) {
    event.preventDefault();

    const recipe = pick(this.state, ["name", "prepTime", "description", "type", "ingredients", "instructions", "image"]);

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.addRecipeRequest(recipe)
        .then(() => {
          return this.setState({ redirect: true });
        })
        .catch((error) => { return this.setState({ errors: error.response.data, isLoading: false }); });
    }
  }

  render() {
    const { errors } = this.state;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/user" />;
    }

    return (
      <div className="row">
        <div className="card-content col s6 offset-s3">
          <form onSubmit={this.onSubmit}>
            <div className="row" style={{ paddingTop: "2em", paddingLeft: "2em" }}>
              <div className="file-field input-field col s12 center-align" >
                {this.state.isLoading &&
                  <PreLoader />
                }
                <div className="image-placeholder">
                  <img
                    src={this.state.image || '/images/noimg.png'}
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

AddRecipeForm.propTypes = {
  addRecipeRequest: PropTypes.func.isRequired,
}

export default AddRecipeForm;
