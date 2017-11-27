import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    return (
      <div className="container" style={{ width: '100%', margin: '0 auto' }}>
        <br /> <br />
        <div className="row">
          <div className="col s3 offset-s2">
            <img className="materialboxed responsive-img circle" width="200" src="assets/images/profilepic.png" />
          </div>
          <div className="col s7 pull-s1 grey-text text-lighten-2">
            <br /> <br /> <br />
            <p id="Name"> Name </p>
            <p id="Bio"> Personal Bio </p>
          </div>
        </div>
        <div className="row">
          <div className="col s3 offset-s2">
            <div className="file-field input-field">
              <div className="btn waves-effect waves-light grey">
                <span> Upload Photo
            <i className="material-icons left">photo</i> </span>
                <input type="file" />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container z-depth-1 white">
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"> <a href="#details" className="teal-text ">  My Details </a> </li>
                <li className="tab col s3"> <a href="#chpwd" className="teal-text ">  Change Password </a> </li>
                <li className="tab col s3"> <a href="#recipe" className="teal-text ">  My Recipes </a> </li>
                <li className="tab col s3"> <a href="#fave" className="teal-text ">  My Favourites </a> </li>
              </ul>
            </div>
            <div id="chpwd" className="col s10 offest-s2">
              <form className="col s6 offset-s2">
                <div className="input-field ">
                  <label for="olpwd"> Old Password: <i className="material-icons left">lock_outline</i></label>
                  <input type="email" id="olpwd" className="validate"> </input>
                </div>
                <div className="input-field ">
                  <label for="npwd"> New Password: <i className="material-icons left">lock_outline</i></label>
                  <input type="password" id="npwd" className="validate"> </input>
                </div>
                <div className="right-align">
                  <button className="btn grey" type="button"> Sign In </button>
                </div>
              </form>
            </div>

            <div id="recipe" className="col s10 offest-s2">
              <div className="col s6 offset-s2">
                <a href="create_recipe.html" className="btn waves-effect waves-light grey"> Add Recipe
                  <i className="material-icons left">add</i></a>
              </div>
              <div className="col s12 offest-s4">
                <br />
                <div className="divider"></div>
              </div>
              <div id="myrecipe" className="col s10 offset-s1">
                <br />
                <div className="col s12">
                  <ul id="userlist" className="collection">
                    <li className="collection-item">
                      <a href="crud_recipe2.html"> Jollof Rice </a>
                      <a href="#!" className="secondary-content"><i className="material-icons">mode_edit</i>
                        <i className="material-icons">delete</i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="fave" className="col s10 offest-s2">
              <div id="myfave" className="col s11 offset-s1"> You currently have no Favourites </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
