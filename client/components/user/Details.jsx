import React from 'react';
import PropTypes from 'prop-types';

import PreLoader from '../common/PreLoader';
import { TextFieldGroup3 } from '../common/TextFieldGroup';

/** Stateless component to render user's form and details
 *
 * @export {function} Details
 *
 * @param {object} props
 *
 * @returns {null} null
 */
const Details = (props) => {
  if (props.isLoading) {
    return (
      <div className="center-align loader-style">
        <PreLoader />
      </div>
    );
  }
  return (
    <div id="detail" className="col s12 m8 l7 push-l1 push-m1 form-style">
      <form onSubmit={props.onSubmit} className="col s10 push-s1">
        <TextFieldGroup3
          label="First Name"
          value={props.firstName}
          onChange={props.onChange}
          id="ufname"
          type="text"
          name="firstName"
          icon="account_circle"
        />
        <TextFieldGroup3
          label="Surname:"
          value={props.surname}
          onChange={props.onChange}
          id="usname"
          type="text"
          name="surname"
          icon="account_circle"
        />
        <TextFieldGroup3
          label="Email:"
          value={props.email}
          onChange={props.onChange}
          id="useremail"
          type="email"
          name="email"
          icon="email"
          isDisabled
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
          <button
            disabled={props.isLoading}
            className="btn grey"
            type="submit"
          > Update
          </button>
        </div >
      </form>
    </div>
  );
};

Details.defaultProps = {
  firstName: '',
  surname: '',
  email: '',
  bio: ''
};

Details.propTypes = {
  firstName: PropTypes.string,
  email: PropTypes.string,
  surname: PropTypes.string,
  bio: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Details;
