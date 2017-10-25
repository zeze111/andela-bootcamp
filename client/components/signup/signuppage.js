import React, { Component }  from 'react';
import { Link  } from 'react-router-dom';
import { Tabs, Tab } from 'react-materialize';
import SigninForm from './signinForm';
import SignupForm from './signupForm';


class signupPage extends Component {
  render() {
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
                    <Tab className="col s6" title="Create User"><SignupForm/></Tab>
                    <Tab className="col s6" title="Sign In" active><SigninForm/></Tab>
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
 export default signupPage;

