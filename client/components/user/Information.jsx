import React from 'react';
import PropTypes from 'prop-types';

import PreLoader from '../common/PreLoader';

/** Stateless component to render user's information
 *
 * @export {function} Information
 *
 * @param {object} props
 *
 * @returns {null} null
 */
const Information = props => (
  <div>
    <div className="row info-row">
      <div className="col s8 m6 l3 push-m1 push-l2">
        {props.isLoading &&
        <div className="profile-load">
          <PreLoader />
        </div>
        }
        {!props.isLoading &&
        <img
          alt="Profile"
          className="materialboxed responsive-img circle img-style"
          width="200px"
          src={props.profile.image ||
            props.image ||
            '/images/profilepic.png'}
        />
          }
        {props.isPicLoading &&
          <PreLoader />
        }
      </div>
      <div className="col s4 m4 l4 push-l1 pull-s1 pull-m1 profile-text grey-text text-lighten-3">
        <br /> <br /> <br />
        <p className="caps error-text">
          {props.profile.firstName} {props.profile.surname}
        </p>
        <p id="Bio" className="error-text">
          {props.profile.bio || 'Add a bio'}
        </p>
      </div>
    </div>
    <div className="row info-row">
      <div className="col s8 m6 l4 push-l2 push-m1">
        <div className="file-field input-field">
          <div className="btn waves-effect waves-light grey">
            <span> Upload Photo
              <i className="material-icons left">photo</i>
            </span>
            <input type="file" onChange={props.uploadImage} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Information.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any),
  isPicLoading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired
};

Information.defaultProps = {
  profile: {}
};

export default Information;
