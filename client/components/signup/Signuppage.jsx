import React from 'react';
import { Tabs, Tab } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';
import { userSigninRequest } from '../../actions/signinActions';


const SignupPage = props => (
  <div id="signup-body">
    <main>
      <div className="container">
        <br /> <br />
        <h4 className="center-align grey-text text-darken-3">
          Sign In / Register
        </h4>
        <br /> <br />
        <div className="container z-depth-3 white">
          <div className="row">
            <div className="col s12">
              <Tabs className="tab-demo z-depth-1">
                <Tab className="col s6" title="Register User" active>
                  <SignupForm userSignupRequest={props.userSignupRequest} />
                </Tab>
                <Tab className="col s6" title="Sign In">
                  <SigninForm userSigninRequest={props.userSigninRequest} />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div> <br /> <br /> <br /> <br />
      </div>
    </main>
  </div>
);

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  userSigninRequest: PropTypes.func.isRequired
};


export default connect(null, { userSignupRequest, userSigninRequest })(SignupPage);
