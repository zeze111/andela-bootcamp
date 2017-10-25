import React, { Component }  from 'react';
import PropTypes from 'prop-types';

class signupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      surname: '',
      email: '',
      password: '',
      password_confirmation: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.userSignupRequest(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="col s4 offset-s4">
        <div className="input-field ">
          <label htmlFor="fname"> First Name: </label>
          <input type="text" id="fname" name='firstName' className="validate" 
            value={this.state.firstName} onChange={this.onChange}/>
        </div>
        <div className="input-field ">
          <label htmlFor="sname"> Surname: </label>
          <input type="text" id="sname" name='surname' className="validate" 
            value={this.state.surname} onChange={this.onChange}/> 
        </div>
        <div className="input-field ">
          <label htmlFor="email"> Email: </label>
          <input type="email" id="email" name='email' className="validate" 
            value={this.state.email} onChange={this.onChange}/> 
        </div>
        <div className="input-field ">
          <label htmlFor="pwd"> Password: </label>
          <input type="password" id="pwd" name='password' className="validate" 
            value={this.state.password} onChange={this.onChange}/> 
        </div>
        <div className="input-field ">
          <label htmlFor="cf-pwd"> Password Confirmation: </label>
          <input type="password" id="cf-pwd" name='password_confirmation' className="validate" 
            value={this.state.password_confirmation} onChange={this.onChange}/> 
        </div>
        <div className="right-align">
        <input className="btn grey white-text" type="submit" value="Create"/>
        </div>
      </form>
    </div>
    );
  }
}

signupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}


export default signupForm;
