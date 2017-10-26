import React, { Component }  from 'react';
import PropTypes from 'prop-types';

class signinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e) {
    this.setState({ errors: {}, isLoading: true });
    e.preventDefault();
    
    this.props.userSigninRequest(this.state)
    .then(() => { })
    .catch((error) => { this.setState({ errors: error.response.data, isLoading: false }) });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="col s4 offset-s4"> <br/>
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
        <div>
          <input className="btn grey white-text right-align" type="submit" value="Sign in"/>
        </div> <br/>
        {errors && <span className='help-block' style={{ fontSize: 16 + 'px' }}>
            {errors.message}</span>} 
      </form>
    </div>
    );
  }
}

signinForm.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
}


export default signinForm;
