import React from 'react';
import { Tabs, Tab } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { signUp } from '../../actions/signupActions';
import { signIn } from '../../actions/signinActions';

/** Stateless component to render signup and signin form
 *
 * @export {function} SignupPage
 *
 * @param {object} props
 *
 * @returns {null} null
 */
const SignupPage = props => (
  <div id="signup-body">
    <main>
      <div className="container">
        <br /> <br />
        <h4 className="center-align grey-text text-darken-3">
          Sign In / Register
        </h4>
        <br /> <br />
        <div className=" min-auth-height">
          <div className="container z-depth-3 white">
            <div className="row">
              <div className="col s12">
                <Tabs className="tab-demo z-depth-1">
                  <Tab id="register" className="col s6" title="Register User" active>
                    <SignupForm
                      signUp={props.signUp}
                    />
                  </Tab>
                  <Tab id="login" className="col s6 click" title="Sign In">
                    <SigninForm signIn={props.signIn} />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div> <br /> <br /> <br /> <br />
        </div>
      </div>
    </main>
  </div>
);

SignupPage.propTypes = {
  signUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
};


export default connect(
  null,
  { signUp, signIn }
)(SignupPage);
