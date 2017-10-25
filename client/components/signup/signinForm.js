import React, { Component }  from 'react';

class signinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange

  render() {
    return (
      <div>
        <form className="col s4 offset-s4">
        <div className="input-field ">
          <label htmlFor="email"> Email: </label>
          <input type="email" id="email" name='email' className="validate"/>
        </div>
        <div className="input-field ">
          <label htmlFor="pwd"> Password: </label>
          <input type="password" id="pwd" className="validate"/>
        </div>
        <div className="right-align">
          <button className="btn grey" type="button"> Sign In </button>
        </div>
      </form>
    </div>
    );
  }
}
 export default signinForm;
