import React, { Component }  from 'react';
import { Link  } from 'react-router-dom';
import { Tabs, Tab } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';
import { userSigninRequest } from '../../actions/signinActions';
import { addFlashMessages } from '../../actions/FlashMessages';


class SignupPage extends Component {
  render() {
    const {userSignupRequest, userSigninRequest, addFlashMessages} = this.props;
    return (
      <div>
        <main>
          <div className="container">
            <br/> <br/>
            <h4 className="center-align grey-text text-darken-3"> Sign In / Register </h4> <br/> <br/>
            <div className="container z-depth-3 white">
              <div className="row">
                <div className="col s12">
                  <Tabs className='tab-demo z-depth-1'>
                    <Tab className="col s6" title="Register User" active>
                      <SignupForm userSignupRequest={userSignupRequest} addFlashMessages={addFlashMessages}/></Tab>
                    <Tab className="col s6" title="Sign In">
                      <SigninForm userSigninRequest={userSigninRequest}/></Tab>
                  </Tabs>
                </div>
              </div>
            </div> <br/> <br/> <br/> <br/>
          </div>
        </main>
    </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  userSigninRequest: PropTypes.func.isRequired,
  addFlashMessages: PropTypes.func.isRequired
}


export default connect(null, {userSignupRequest, userSigninRequest, addFlashMessages}) (SignupPage);

