import React, { Component }  from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textFieldGroup';

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
    .then(() => { 
      this.setState({ redirect: true });
    })
    .catch((error) => { this.setState({ errors: error.response.data, isLoading: false }) });
  }

  render() {
    const { errors } = this.state;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <form onSubmit={this.onSubmit} className="col s5 offset-s4"> <br/>
          <TextFieldGroup
          label="Email"
          value={this.state.email}
          onChange={this.onChange}
          id="email"
          type="email"
          name="email"
        />
          <TextFieldGroup
          label="Password"
          value={this.state.password}
          onChange={this.onChange}
          id="pwd"
          type="password"
          name="password"
        />
        <div>
          <input disabled={this.state.isLoading} className="btn grey white-text right-align" type="submit" value="Sign in"/>
        </div> <br/>
        {errors && <span className='red-text' style={{ fontSize: 16 + 'px' }}>
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
