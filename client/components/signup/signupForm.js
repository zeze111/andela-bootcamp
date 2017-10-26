import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validatorjs';
import userRules from '../../../Server/shared/validations';

class signupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      surname: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const validator = new Validator(this.state, userRules);
    validator.passes();

    if (validator.fails()) {
      const errors = validator.errors.all()
      this.setState({ errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state)
        .then(() => { })
        .catch((error) => { this.setState({ errors: error.response.data, isLoading: false }) });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="col s5 offset-s4"> <br/>
          <div className="input-field ">
            <label htmlFor="fname"> First Name: </label>
            <input type="text" id="fname" name='firstName' className="validate"
              value={this.state.firstName} onChange={this.onChange} />
            {errors && <span className='help-block' style={{ fontSize: 13 + 'px' }}>
              {errors.firstName}</span>}
          </div>
          <div className="input-field ">
            <label htmlFor="sname"> Surname: </label>
            <input type="text" id="sname" name='surname' className="validate"
              value={this.state.surname} onChange={this.onChange} />
            {errors && <span className='help-block' style={{ fontSize: 13 + 'px' }}>
              {errors.surname}</span>}
          </div>
          <div className="input-field ">
            <label htmlFor="email"> Email: </label>
            <input type="email" id="email" name='email' className="validate"
              value={this.state.email} onChange={this.onChange} />
            {errors && <span className='help-block' style={{ fontSize: 13 + 'px' }}>
              {errors.email}</span>}
          </div>
          <div className="input-field ">
            <label htmlFor="pwd"> Password: </label>
            <input type="password" id="pwd" name='password' className="validate"
              value={this.state.password} onChange={this.onChange} />
            {errors && <span className='help-block' style={{ fontSize: 13 + 'px' }}>
              {errors.password}</span>}
          </div>
          <div className="input-field ">
            <label htmlFor="cf-pwd"> Password Confirmation: </label>
            <input type="password" id="cf-pwd" name='password_confirmation' className="validate"
              value={this.state.password_confirmation} onChange={this.onChange} />
            {errors && <span className='help-block' style={{ fontSize: 13 + 'px' }}>
              {errors.password_confirmation}</span>}
          </div>
          <div className="right-align">
            <input disabled={this.state.isLoading} className="btn grey white-text" type="submit" value="Create" />
          </div> <br/>
          {errors && <span className='help-block' style={{ fontSize: 13 + 'px' }}>
              {errors.message}</span>}
        </form>
      </div>
    );
  }
}

signupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}


export default signupForm;
