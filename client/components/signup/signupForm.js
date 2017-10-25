import React, { Component }  from 'react';

class signupForm extends React.Component {
  render() {
    return (
      <div>
        <form className="col s4 offset-s4">
        <div className="input-field ">
          <label htmlFor="fname"> First Name: </label>
          <input type="text" id="fname" className="validate"/>
        </div>
        <div className="input-field ">
          <label htmlFor="sname"> Surname: </label>
          <input type="text" id="sname" className="validate"/> 
        </div>
        <div className="input-field ">
          <label htmlFor="email"> Email: </label>
          <input type="email" id="email" className="validate"/> 
        </div>
        <div className="input-field ">
          <label htmlFor="pwd"> Password: </label>
          <input type="password" id="pwd" className="validate"/> 
        </div>
        <div className="input-field ">
          <label htmlFor="cf-pwd"> Password Confirmation: </label>
          <input type="password" id="cf-pwd" className="validate"/> 
        </div>
        <div className="right-align">
          <button className="btn grey" type="button"> Create </button>
        </div>
      </form>
    </div>
    );
  }
}
 export default signupForm;
