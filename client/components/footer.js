import React, { Component }  from 'react';
import { Link  } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer teal lighten-2">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Company Bio</h5>
              <p className="grey-text text-lighten-4"> Information about the company, how it started, purpose and goal</p>


            </div>
            <div className="col l3 s12">
              <h5 className="white-text">About Us</h5>
              <ul>
                <li><Link to="#" className="white-text" >Link 1</Link></li>
                <li><Link to="#" className="white-text" >Link 2</Link></li>
              </ul>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Privacy Settings</h5>
              <ul>
                <li><Link to="#" className="white-text" >Link 1</Link></li>
                <li><Link to="#" className="white-text" >Link 2</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            Made by <Link to="#" className="teal-text text-lighten-3">Osaze Edo-Osagie</Link>
          </div>
        </div>
    </footer>
    );
  }
}

export default Footer;
