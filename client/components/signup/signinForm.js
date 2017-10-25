import React, { Component }  from 'react';
import PropTypes from 'prop-types';

class signinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    this.props.userSigninRequest(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="col s4 offset-s4">
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
        <div className="right-align">
          <input className="btn grey white-text" type="submit" value="Sign in"/>
        </div>
      </form>
    </div>
    );
  }
}

signinForm.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
}


export default signinForm;
