import React from 'react';
import PropTypes from 'prop-types';

import PreLoader from '../common/PreLoader';

const Information = props => (
  <div>
    <div className="row">
      <div className="col s3 offset-s2">
        <img
          alt="Profile"
          className="materialboxed responsive-img circle img-style"
          width="200px"
          src={props.profile.image ||
            this.state.image ||
            '/images/profilepic.png'}
        />
        {props.isPicLoading &&
          <PreLoader />
        }
      </div>
      <div className="col s7 pull-s1 grey-text text-lighten-2">
        <br /> <br /> <br />
        <p className="caps error-text">
          {props.profile.firstName} {props.profile.surname}
        </p>
        <p id="Bio" className="error-text">
          {props.profile.bio || 'Add a bio'}
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col s3 offset-s2">
        <div className="file-field input-field">
          <div className="btn waves-effect waves-light grey">
            <span> Upload Photo
              <i className="material-icons left">photo</i>
            </span>
            <input type="file" onChange={this.uploadImage} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Information.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any),
  isPicLoading: PropTypes.bool.isRequired
};

Information.defaultProps = {
  profile: {}
};

export default Information;
