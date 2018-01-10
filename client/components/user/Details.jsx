import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreLoader from '../updateRecipe/PreLoader';
import { TextFieldGroup3 } from '../common/TextFieldGroup';

const Details = (props) => {

  if (props.isLoading) {
    return (
      <div className="center-align loader-style">
        <PreLoader />
      </div>
    );
  }
  return (
    <div id="detail" className="col s10 offest-s2 form-style">
      <form onSubmit={props.onSubmit} className="col s6 offset-s2">
        <TextFieldGroup3
          label="First Name"
          value={props.firstName}
          onChange={props.onChange}
          id="fname"
          type="text"
          name="firstName"
          icon="account_circle"
        />
        <TextFieldGroup3
          label="Surname:"
          value={props.surname}
          onChange={props.onChange}
          id="sname"
          type="text"
          name="surname"
          icon="account_circle"
        />
        <TextFieldGroup3
          label="Email:"
          value={props.email}
          onChange={props.onChange}
          id="email"
          type="email"
          name="email"
          icon="email"
        />
        <TextFieldGroup3
          label="Bio:"
          value={props.bio}
          onChange={props.onChange}
          id="bio"
          type="text"
          name="bio"
          icon="mode_edit"
        />
        <div className="right-align">
          <button className="btn grey" type="submit"> Update </button>
        </div >
      </form>
    </div>
  )
}

Details.defaultProps = {
  firstName: '',
  surname: '',
  email: '',
  bio: ''
};

Details.propTypes = {
  firstName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
}

export default Details;
